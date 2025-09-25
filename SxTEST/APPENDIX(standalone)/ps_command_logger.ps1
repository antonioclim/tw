# ===================== ps_command_logger.ps1 =====================
# Jurnalizare comenzi PowerShell (timp, folder, comandă), incl. sesiuni paralele,
# backfill istoric curent și (opțional) istoricul persistent PSReadLine.
# Scriere concurentă într-un CSV comun.
#
# CSV: Z:\tw\ps_command_history_PwShell.csv
# Coloane: Timestamp,Folder,Command,HistoryId,SessionGuid,ProcessId,MachineName,Source
#
# Source values:
#   Realtime    - comandă înregistrată în timp real (PSReadLine.OnCommandLineAccepted / fallback prompt)
#   BackfillSes - comandă exportată din istoricul sesiunii curente (Get-History), când pornește loggerul manual
#   BackfillPSR - comandă exportată din istoricul persistent PSReadLine (fișier), fără informații de folder
#
# Limitare: istoricul existent (BackfillSes/BackfillPSR) NU conține folderul exact în care s-au rulat comenzile.
# Pentru transparență, Folder = 'UNKNOWN' în backfill.
#
# === Config general ===
$script:PSCL_Config = [ordered]@{
    LogDirectory = 'Z:\tw'
    LogPath      = 'Z:\tw\ps_command_history_PwShell.csv'
    MutexName    = 'Global\PSCommandLogMutex'
    SessionGuid  = [guid]::NewGuid().Guid
    ProcessId    = $PID
    MachineName  = $env:COMPUTERNAME
    EnablePSReadLineBackfill = $true   # setați $false dacă NU doriți backfill din fișierul PSReadLine
}

# Creează directorul și CSV cu antet, dacă lipsesc
if (-not (Test-Path -LiteralPath $script:PSCL_Config.LogDirectory)) {
    New-Item -ItemType Directory -Force -Path $script:PSCL_Config.LogDirectory | Out-Null
}
if (-not (Test-Path -LiteralPath $script:PSCL_Config.LogPath)) {
    $header = 'Timestamp,Folder,Command,HistoryId,SessionGuid,ProcessId,MachineName,Source'
    Set-Content -LiteralPath $script:PSCL_Config.LogPath -Value $header -Encoding UTF8
}

# === Funcție sigură de scriere în CSV (mutex global) ===
function Write-PSCLRow {
    param(
        [Parameter(Mandatory=$true)] [datetime] $Timestamp,
        [Parameter(Mandatory=$true)] [string]   $Folder,
        [Parameter(Mandatory=$true)] [string]   $Command,
        [Parameter(Mandatory=$true)] [int]      $HistoryId,
        [Parameter(Mandatory=$true)] [string]   $Source
    )
    $row = [PSCustomObject]@{
        Timestamp   = $Timestamp.ToString('o')  # ISO 8601 with offset
        Folder      = $Folder
        Command     = $Command
        HistoryId   = $HistoryId
        SessionGuid = $script:PSCL_Config.SessionGuid
        ProcessId   = $script:PSCL_Config.ProcessId
        MachineName = $script:PSCL_Config.MachineName
        Source      = $Source
    }

    $mtx = New-Object System.Threading.Mutex($false, $script:PSCL_Config.MutexName)
    $acquired = $false
    try {
        for ($i = 0; $i -lt 20 -and -not $acquired; $i++) {
            $acquired = $mtx.WaitOne([TimeSpan]::FromMilliseconds(250))
        }
        if (-not $acquired) { return }
        $row | Export-Csv -LiteralPath $script:PSCL_Config.LogPath -Append -NoTypeInformation -Encoding UTF8
    }
    finally {
        if ($acquired) { $mtx.ReleaseMutex() | Out-Null }
        $mtx.Dispose()
    }
}

# === Marker de start sesiune ===
Write-PSCLRow -Timestamp (Get-Date) -Folder (Get-Location).Path -Command '#SESSION_START' -HistoryId 0 -Source 'Realtime'

# === Backfill istoric din sesiunea curentă (dacă există deja comenzi rulate înainte de a porni loggerul manual) ===
# Notă: Folder necunoscut -> 'UNKNOWN'
try {
    $existing = Get-History -ErrorAction SilentlyContinue
    if ($existing) {
        foreach ($e in $existing) {
            $ts = Get-Date
            if ($null -ne $e.EndExecutionTime) { $ts = $e.EndExecutionTime }
            Write-PSCLRow -Timestamp $ts -Folder 'UNKNOWN' -Command $e.CommandLine -HistoryId $e.Id -Source 'BackfillSes'
        }
    }
} catch { }

# === Backfill din istoricul persistent PSReadLine (opțional) ===
# Pentru Windows PowerShell 5.1: C:\Users\<user>\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
# Pentru PowerShell (7+): C:\Users\<user>\AppData\Roaming\Microsoft\PowerShell\PSReadLine\ConsoleHost_history.txt
function Get-PSRLHistoryPath {
    $paths = @(
        (Join-Path $env:APPDATA 'Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt'),
        (Join-Path $env:APPDATA 'Microsoft\PowerShell\PSReadLine\ConsoleHost_history.txt')
    )
    foreach ($p in $paths) {
        if (Test-Path -LiteralPath $p) { return $p }
    }
    return $null
}

if ($script:PSCL_Config.EnablePSReadLineBackfill) {
    try {
        $psrl = Get-PSRLHistoryPath
        if ($psrl) {
            $lines = Get-Content -LiteralPath $psrl -ErrorAction SilentlyContinue
            if ($lines) {
                $i = 1
                foreach ($cmd in $lines) {
                    if ([string]::IsNullOrWhiteSpace($cmd)) { continue }
                    # Folosim HistoryId negativ pentru a separa backfill-ul persistent de cel pe sesiune
                    Write-PSCLRow -Timestamp (Get-Date) -Folder 'UNKNOWN' -Command $cmd -HistoryId (-1000000 - $i) -Source 'BackfillPSR'
                    $i++
                }
            }
        }
    } catch { }
}

# === Jurnalizare în timp real ===
# Preferat: eveniment PSReadLine.OnCommandLineAccepted (disponibil în PSReadLine 2.x pe PS 5.1 și 7+)
# Fallback: override de prompt (ca înainte) dacă evenimentul nu este disponibil.
$script:RealtimeHookActive = $false

try {
    $null = Register-EngineEvent -SourceIdentifier PSReadLine.OnCommandLineAccepted -Action {
        try {
            $cmd = $Event.MessageData      # comanda acceptată de PSReadLine
            if ($null -ne $cmd -and -not [string]::IsNullOrWhiteSpace($cmd)) {
                # HistoryId: încercăm să citim cel mai recent (după acceptare)
                $h = Get-History -Count 1 -ErrorAction SilentlyContinue
                $hid = 0
                if ($h) { $hid = [int]$h.Id }
                Write-PSCLRow -Timestamp (Get-Date) -Folder (Get-Location).Path -Command $cmd -HistoryId $hid -Source 'Realtime'
            }
        } catch { }
    } -ErrorAction Stop
    $script:RealtimeHookActive = $true
} catch {
    $script:RealtimeHookActive = $false
}

# === Fallback: prompt override, doar dacă evenimentul nu e disponibil ===
if (-not $script:RealtimeHookActive) {
    if (-not (Get-Variable -Name PSCL_LastLoggedHistoryId -Scope Script -ErrorAction SilentlyContinue)) {
        $script:PSCL_LastLoggedHistoryId = $null
    }
    $script:OriginalPrompt = $null
    try { $script:OriginalPrompt = (Get-Command prompt -CommandType Function -ErrorAction Stop) } catch { }

    function global:prompt {
        try {
            $h = Get-History -Count 1 -ErrorAction SilentlyContinue
            if ($null -ne $h) {
                if ($h.Id -ne $script:PSCL_LastLoggedHistoryId) {
                    $timestamp = Get-Date
                    if ($null -ne $h.EndExecutionTime) { $timestamp = $h.EndExecutionTime }
                    $folder    = (Get-Location).Path
                    $command   = $h.CommandLine
                    Write-PSCLRow -Timestamp $timestamp -Folder $folder -Command $command -HistoryId $h.Id -Source 'Realtime'
                    $script:PSCL_LastLoggedHistoryId = $h.Id
                }
            }
        } catch { }

        if ($script:OriginalPrompt) { & $script:OriginalPrompt } else { "PS $($ExecutionContext.SessionState.Path.CurrentLocation)> " }
    }
}
# ===================== /ps_command_logger.ps1 =====================
