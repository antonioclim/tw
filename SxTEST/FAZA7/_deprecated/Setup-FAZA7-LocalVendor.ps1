<#
.SYNOPSIS
  Configurează FAZA7 să folosească biblioteci UMD LOCALE (fără CDN), pentru a evita CORS/CSP/MIME.
.DESCRIPTION
  - Instalează: react@18.3.1, react-dom@18.3.1, react-router-dom@6.26.2
  - Copiază bundle-urile UMD în .\public\vendor\
  - Nu modifică serverul — doar fișierele din public/ și package.json (dep).
.USAGE
  Rulează din folderul FAZA7 (Z:\tw\SxTEST\FAZA7):
    .\Setup-FAZA7-LocalVendor.ps1
#>

$ErrorActionPreference = 'Stop'
function Ok($m){ Write-Host "[OK] $m" -ForegroundColor Green }
function Step($m){ Write-Host "[STEP] $m" -ForegroundColor Cyan }
function Err($m){ Write-Host "[ERR] $m" -ForegroundColor Red }

# 0) Verificări
if(!(Test-Path ".\package.json")) { Err "Rulează scriptul din folderul FAZA7 (are package.json)."; exit 1 }
if(!(Get-Command npm -ErrorAction SilentlyContinue)) { Err "npm nu este în PATH."; exit 1 }

# 1) Instalează deps
Step "npm install react@18.3.1 react-dom@18.3.1 react-router-dom@6.26.2"
npm install react@18.3.1 react-dom@18.3.1 react-router-dom@6.26.2

# 2) Creează vendor/
$vendor = Join-Path (Get-Location) "public\vendor"
if(!(Test-Path $vendor)){ New-Item -ItemType Directory -Path $vendor | Out-Null }

# 3) Copiază UMD bundle-urile
$reactSrc = "node_modules\react\umd\react.production.min.js"
$reactDomSrc = "node_modules\react-dom\umd\react-dom.production.min.js"
$rrdSrc = "node_modules\react-router-dom\dist\umd\react-router-dom.production.min.js"

if(!(Test-Path $reactSrc))    { Err "Lipsește $reactSrc"; exit 1 }
if(!(Test-Path $reactDomSrc)) { Err "Lipsește $reactDomSrc"; exit 1 }
if(!(Test-Path $rrdSrc))      { Err "Lipsește $rrdSrc"; exit 1 }

Copy-Item $reactSrc    -Destination (Join-Path $vendor "react.production.min.js") -Force
Copy-Item $reactDomSrc -Destination (Join-Path $vendor "react-dom.production.min.js") -Force
Copy-Item $rrdSrc      -Destination (Join-Path $vendor "react-router-dom.production.min.js") -Force

Ok "Bundle-urile UMD au fost copiate în public\vendor"

Write-Host "`nAcum înlocuiește index.html să folosească scripturile din /vendor/ (vezi fișierul livrat alături)." -ForegroundColor Yellow
