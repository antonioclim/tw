<#
.SYNOPSIS
  Comite și împinge pe GitHub DOAR schimbările din subdirectorul SxTEST (implicit: Z:\tw\SxTEST).
.DESCRIPTION
  Script PowerShell pentru fluxul:
    cd /d Z:\tw\SxTEST
    git status
    git add -A .
    git diff --staged
    git commit -m "SxTEST: actualizări"
    git push -u origin HEAD
  Include verificări de siguranță (există Git, există repo, există schimbări staged) și afișează linkul GitHub
  către subdirectorul comis, dacă remote-ul este pe github.com.
.PARAMETER Path
  Calea subdirectorului proiectului. Implicit: Z:\tw\SxTEST
.PARAMETER Message
  Mesajul commit-ului. Implicit: "SxTEST: actualizări"
.EXAMPLE
  # Rulare cu implicite
  .\Push-SxTEST.ps1
.EXAMPLE
  # Rulare specificând cale și mesaj
  .\Push-SxTEST.ps1 -Path 'Z:\tw\SxTEST' -Message 'SxTEST: fix rute + README'
.NOTES
  - Rulează în PowerShell (nu în cmd) cu .\Push-SxTEST.ps1  . Poți apela și din orice alt director; scriptul schimbă singur locația.
  - Dacă politica de execuție blochează rularea: Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
#>

[CmdletBinding()]
param(
  [string]$Path = 'Z:\tw\SxTEST',
  [string]$Message = 'SxTEST: actualizări',
  [switch]$NoStatus,
  [switch]$NoDiff
)

$ErrorActionPreference = 'Stop'

function Write-Step([string]$msg) { Write-Host "[STEP] $msg" -ForegroundColor Cyan }
function Write-Info([string]$msg) { Write-Host "[INFO] $msg" -ForegroundColor DarkGray }
function Write-Ok([string]$msg)   { Write-Host "[OK]   $msg" -ForegroundColor Green }
function Write-Warn([string]$msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Err([string]$msg)  { Write-Host "[ERR]  $msg" -ForegroundColor Red }

# 0) Pre-verificări
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git nu este instalat sau nu este în PATH. Instalează Git pentru Windows și reîncearcă."
}
if (-not (Test-Path -LiteralPath $Path)) {
  throw "Calea specificată nu există: $Path"
}

$orig = Get-Location
try {
  Set-Location -LiteralPath $Path

  # Verifică dacă suntem într-un repo git (există director .git în acest repo sau în părinte)
  $top = (& git rev-parse --show-toplevel) 2>$null
  if ([string]::IsNullOrWhiteSpace($top)) {
    throw "Nu pari a fi într-un repository Git. Inițializează-l în Z:\tw (git init, remote, etc.)."
  }
  Write-Info "Rădăcina repo: $top"
  Write-Info "Subdirector curent: $(Get-Location)"

  # 1) Status
  if (-not $NoStatus) {
    Write-Step "git status"
    & git status
  }

  # 2) Stage DOAR schimbările din acest subdirector
  Write-Step "git add -A .    (doar în $((Get-Location).Path))"
  & git add -A .

  # 3) Verifică dacă există ceva staged
  $staged = (& git diff --cached --name-only)
  if ([string]::IsNullOrWhiteSpace(($staged -join ''))) {
    Write-Warn "Nu există schimbări staged în $((Get-Location).Path). Nimic de comis."
    return
  }
  Write-Ok ("Fișiere staged:" + [Environment]::NewLine + ($staged -join [Environment]::NewLine))

  # 4) Diff-ul staged (opțional)
  if (-not $NoDiff) {
    Write-Step "git diff --staged"
    & git diff --staged
  }

  # 5) Commit
  Write-Step "git commit -m `"$Message`""
  & git commit -m $Message

  # 6) Push (setează upstream dacă lipsește)
  $branch = (& git branch --show-current).Trim()
  if ([string]::IsNullOrWhiteSpace($branch)) { $branch = "HEAD" }
  Write-Step "git push -u origin $branch (folosim HEAD pentru upstream la prima împingere)"
  & git push -u origin HEAD

  # 7) Link util pe GitHub (dacă remote-ul este GitHub)
  $remote = (& git remote get-url origin) 2>$null
  function Get-GitHubUrl([string]$remoteUrl, [string]$branchName, [string]$subPath) {
    if (-not $remoteUrl) { return $null }
    if ($remoteUrl -match '^git@github\.com:(.+?)(?:\.git)?$') {
      $slug = $Matches[1]  # owner/repo
      return "https://github.com/$slug/tree/$branchName/$subPath"
    }
    if ($remoteUrl -match '^https://github\.com/(.+?)(?:\.git)?$') {
      $slug = $Matches[1]
      return "https://github.com/$slug/tree/$branchName/$subPath"
    }
    return $null
  }
  # calculează subpath relativ de la rădăcina repo
  $rel = (& git rev-parse --show-prefix).TrimEnd('/')
  if ([string]::IsNullOrWhiteSpace($rel)) {
    $rel = Split-Path -Leaf -Path (Get-Location).Path
  }
  $url = Get-GitHubUrl -remoteUrl $remote -branchName $branch -subPath $rel
  if ($url) {
    Write-Ok "`nLink GitHub (subdirector): $url"
  } else {
    Write-Info "Remote origin nu pare a fi GitHub; verifică: git remote -v"
  }

  Write-Ok "Gata."
}
catch {
  Write-Err $_
  exit 1
}
finally {
  Set-Location $orig
}
