<#
.SYNOPSIS
  Rulează rapid o fază (FAZA0..FAZA12): npm install + npm run dev, cu setare opțională de PORT.
.DESCRIPTION
  Exemplu:
    .\Run-Faza.ps1 12            # pornește FAZA12 pe portul implicit (3012)
    .\Run-Faza.ps1 6 -Port 5173  # pornește FAZA6 pe portul 5173
.PARAMETER Phase
  Numărul fazei (0..12). Caută subdirectorul .\FAZA<Phase>.
.PARAMETER Port
  Opțional, setează variabila de mediu PORT pentru sesiunea curentă.
#>
param(
  [Parameter(Mandatory=$true, Position=0)]
  [ValidateRange(0,12)]
  [int]$Phase,
  [int]$Port
)
$ErrorActionPreference = 'Stop'

function Write-Step($m){ Write-Host "[STEP] $m" -ForegroundColor Cyan }
function Write-Ok($m){ Write-Host "[OK]   $m" -ForegroundColor Green }
function Write-Err($m){ Write-Host "[ERR]  $m" -ForegroundColor Red }

# Detectăm rădăcina (folderul curent)
$root = Get-Location
$phasePath = Join-Path $root ("FAZA{0}" -f $Phase)
if(-not (Test-Path $phasePath)){ Write-Err "Nu găsesc $phasePath"; exit 1 }

# Setăm PORT opțional
if($PSBoundParameters.ContainsKey('Port')){
  $env:PORT = $Port
  Write-Step "PORT=$Port (doar pentru această sesiune)"
}

Write-Step "cd $phasePath"
Set-Location $phasePath

if(-not (Get-Command node -ErrorAction SilentlyContinue)){
  Write-Err "Node.js nu este în PATH."; exit 1
}
if(-not (Get-Command npm -ErrorAction SilentlyContinue)){
  Write-Err "npm nu este în PATH."; exit 1
}

Write-Step "npm install"
npm install

Write-Step "npm run dev"
npm run dev
