<#
.SYNOPSIS
  Comite și împinge DOAR schimbările din SxTEST. Versiune v2: dezactivează pagerul Git și setează UTF‑8.
#>

[CmdletBinding()]
param(
  [string]$Path = 'Z:\tw\SxTEST',
  [string]$Message = 'SxTEST: actualizări',
  [switch]$NoStatus,
  [switch]$NoDiff
)

$ErrorActionPreference = 'Stop'

# Forțează UTF-8 pentru ieșire (reduce artefactele de afișare a diacriticelor)
try {
  [Console]::OutputEncoding = New-Object System.Text.UTF8Encoding($false)
  $PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'
} catch {}

function Write-Step([string]$msg) { Write-Host "[STEP] $msg" -ForegroundColor Cyan }
function Write-Info([string]$msg) { Write-Host "[INFO] $msg" -ForegroundColor DarkGray }
function Write-Ok([string]$msg)   { Write-Host "[OK]   $msg" -ForegroundColor Green }
function Write-Warn([string]$msg) { Write-Host "[WARN] $msg" -ForegroundColor Yellow }
function Write-Err([string]$msg)  { Write-Host "[ERR]  $msg" -ForegroundColor Red }

# Dezactivează pagerul Git în această sesiune
$env:GIT_PAGER = 'cat'

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git nu este instalat sau nu este în PATH."
}
if (-not (Test-Path -LiteralPath $Path)) {
  throw "Calea specificată nu există: $Path"
}

$orig = Get-Location
try {
  Set-Location -LiteralPath $Path

  $top = (& git rev-parse --show-toplevel) 2>$null
  if ([string]::IsNullOrWhiteSpace($top)) {
    throw "Nu pari a fi într-un repository Git. Inițializează-l în Z:\tw."
  }
  Write-Info "Rădăcina repo: $top"
  Write-Info "Subdirector curent: $(Get-Location)"

  if (-not $NoStatus) {
    Write-Step "git status"
    & git --no-pager status
  }

  Write-Step "git add -A .    (doar în $((Get-Location).Path))"
  & git add -A .

  $staged = (& git --no-pager diff --cached --name-only)
  if ([string]::IsNullOrWhiteSpace(($staged -join ''))) {
    Write-Warn "Nu există schimbări staged. Nimic de comis."
    return
  }
  Write-Ok ("Fișiere staged:" + [Environment]::NewLine + ($staged -join [Environment]::NewLine))

  if (-not $NoDiff) {
    Write-Step "git diff --staged (fără pager)"
    & git --no-pager diff --staged
  }

  Write-Step "git commit -m `"$Message`""
  & git commit -m $Message

  $branch = (& git branch --show-current).Trim()
  if ([string]::IsNullOrWhiteSpace($branch)) { $branch = "HEAD" }
  Write-Step "git push -u origin $branch"
  & git push -u origin HEAD

  $remote = (& git remote get-url origin) 2>$null
  function Get-GitHubUrl([string]$remoteUrl, [string]$branchName, [string]$subPath) {
    if (-not $remoteUrl) { return $null }
    if ($remoteUrl -match '^git@github\.com:(.+?)(?:\.git)?$') {
      $slug = $Matches[1]
      return "https://github.com/$slug/tree/$branchName/$subPath"
    }
    if ($remoteUrl -match '^https://github\.com/(.+?)(?:\.git)?$') {
      $slug = $Matches[1]
      return "https://github.com/$slug/tree/$branchName/$subPath"
    }
    return $null
  }
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
