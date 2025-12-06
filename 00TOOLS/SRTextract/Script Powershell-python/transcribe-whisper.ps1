# transcribe-whisper.ps1
# Necesită:
#   - Python 3.11+ (accesibil ca 'py', 'python' sau 'python3')
#   - ffmpeg în PATH
#   - pachetul Python 'faster-whisper' (py -m pip install -U faster-whisper)

$ErrorActionPreference = "Stop"

# Directorul unde se află scriptul
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Determinăm comanda Python disponibilă
$pythonCmd = $null
foreach ($candidate in @("py", "python", "python3")) {
    if (Get-Command $candidate -ErrorAction SilentlyContinue) {
        $pythonCmd = $candidate
        break
    }
}

if (-not $pythonCmd) {
    Write-Host "Nu am găsit nicio comandă Python (py/python/python3) în PATH." -ForegroundColor Red
    Write-Host "Instalați Python și/sau adăugați-l în PATH, apoi reîncercați." -ForegroundColor Yellow
    exit 1
}

# Verificăm dacă ffmpeg este accesibil (opțional, dar util)
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "Atenție: ffmpeg nu pare să fie în PATH. Unele fișiere video ar putea să nu fie decodate." -ForegroundColor Yellow
}

$video = Read-Host "Introduceți numele fișierului video (ex: S4v01.mp4)"
if (-not (Test-Path -LiteralPath $video)) {
  Write-Host "Fișierul nu există în $scriptDir" -ForegroundColor Red
  exit 1
}

$outType = Read-Host "Format ieșire [srt/txt] (implicit: srt)"
if ([string]::IsNullOrWhiteSpace($outType)) { $outType = "srt" }
$outType = $outType.ToLowerInvariant()
if ($outType -notin @("srt","txt")) {
  Write-Host "Format invalid (alege srt sau txt)." -ForegroundColor Red
  exit 1
}

$model = Read-Host "Model Whisper [small|medium|large-v3] (implicit: medium)"
if ([string]::IsNullOrWhiteSpace($model)) { $model = "medium" }

$device = Read-Host "Dispozitiv [cpu|cuda] (implicit: cpu)"
if ([string]::IsNullOrWhiteSpace($device)) { $device = "cpu" }
$device = $device.ToLowerInvariant()
if ($device -notin @("cpu","cuda")) {
    Write-Host "Dispozitiv invalid (alege cpu sau cuda)." -ForegroundColor Red
    exit 1
}

# Tipul de calcul: pentru GPU folosim float16, altfel int8 pentru CPU
$compute = if ($device -eq "cuda") { "float16" } else { "int8" }

# Limbă pentru transcriere (ro, en, fr, ... sau 'auto' pentru autodetecție)
$lang = Read-Host "Cod limbă [ro/en/.../auto] (implicit: ro)"
if ([string]::IsNullOrWhiteSpace($lang)) { $lang = "ro" }

$base = [System.IO.Path]::GetFileNameWithoutExtension($video)
$outFile = Join-Path $scriptDir ($base + "." + $outType)

# Scriem un mic script Python care face transcrierea cu faster-whisper
$py = @'
"""Script intern generat de transcribe-whisper.ps1 pentru rularea faster-whisper."""
import argparse
import warnings

# Suprimăm UserWarning-ul specific privind pkg_resources emis de ctranslate2/setuptools,
# pentru a nu polua ieșirea, dar lăsăm restul avertismentelor vizibile.
warnings.filterwarnings(
    "ignore",
    message=r"pkg_resources is deprecated as an API.*",
    category=UserWarning,
)

try:
    from faster_whisper import WhisperModel
except ImportError as e:
    raise SystemExit(
        "Nu a putut fi importat modulul 'faster-whisper'. "
        "Asigurați-vă că este instalat în mediul curent (ex.: 'py -m pip install -U faster-whisper')."
    ) from e


def srt_ts(t: float) -> str:
    h = int(t // 3600)
    m = int((t % 3600) // 60)
    s = t % 60
    ms = int(round((s - int(s)) * 1000))
    return f"{h:02d}:{m:02d}:{int(s):02d},{ms:03d}"


def write_srt(segs, path: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        for i, seg in enumerate(segs, 1):
            f.write(
                f"{i}\n"
                f"{srt_ts(seg.start)} --> {srt_ts(seg.end)}\n"
                f"{seg.text.strip()}\n\n"
            )


def write_txt(segs, path: str) -> None:
    with open(path, "w", encoding="utf-8") as f:
        f.write(" ".join(s.text.strip() for s in segs).strip() + "\n")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True)
    ap.add_argument("--output", required=True)
    ap.add_argument("--fmt", choices=["srt", "txt"], default="srt")
    ap.add_argument("--model", default="medium")
    ap.add_argument("--device", default="cpu")
    ap.add_argument("--compute", default="int8")
    ap.add_argument(
        "--language",
        default="ro",
        help="Cod limbă (ISO 639-1, ex. ro, en, fr) sau 'auto' pentru autodetecție.",
    )
    args = ap.parse_args()

    # Încarcă modelul; pentru CPU -> compute_type 'int8' (rapid), pentru GPU -> 'float16'
    try:
        model = WhisperModel(args.model, device=args.device, compute_type=args.compute)
    except Exception as e:
        raise SystemExit(f"Eroare la inițializarea modelului Whisper: {e}") from e

    language = None if args.language.lower() == "auto" else args.language

    # Transcriere; VAD filtrează pauzele; beam_size pentru acuratețe stabilă.
    segments, info = model.transcribe(
        args.input,
        language=language,
        vad_filter=True,
        beam_size=5,
    )
    segs = list(segments)

    if args.fmt == "srt":
        write_srt(segs, args.output)
    else:
        write_txt(segs, args.output)


if __name__ == "__main__":
    main()
'@

$pyFile = Join-Path $scriptDir "transcribe_fw.py"
$py | Out-File -FilePath $pyFile -Encoding UTF8

Write-Host "Rulez transcrierea cu faster-whisper..." -ForegroundColor Cyan

# Rulăm transcrierea (folosim comanda Python detectată mai sus)
& $pythonCmd "$pyFile" --input "$video" --output "$outFile" --fmt "$outType" --model "$model" --device "$device" --compute "$compute" --language "$lang"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Transcrierea a eșuat (cod ieșire: $LASTEXITCODE)." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Transcriere salvată: $outFile" -ForegroundColor Green
