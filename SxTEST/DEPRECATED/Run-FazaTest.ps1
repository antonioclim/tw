<#
.SYNOPSIS
  Rulează rapid testele unei faze (FAZA0..FAZA12): npm install + npm test.
.PARAMETER Phase
  Numărul fazei (0..12). Caută subdirectorul .\FAZA<Phase>.
#>
param(
  [Parameter(Mandatory=$true, Position=0)]
  [ValidateRange(0,12)]
  [int]$Phase
)
$ErrorActionPreference = 'Stop'
function Write-Step($m){ Write-Host "[STEP] $m" -ForegroundColor Cyan }
function Write-Err($m){ Write-Host "[ERR]  $m" -ForegroundColor Red }

$root = Get-Location
$phasePath = Join-Path $root ("FAZA{0}" -f $Phase)
if(-not (Test-Path $phasePath)){ Write-Err "Nu găsesc $phasePath"; exit 1 }

Set-Location $phasePath
if(-not (Get-Command npm -ErrorAction SilentlyContinue)){
  Write-Err "npm nu este în PATH."; exit 1
}
Write-Step "npm install (dacă e necesar)"
npm install
Write-Step "npm test"
npm test
