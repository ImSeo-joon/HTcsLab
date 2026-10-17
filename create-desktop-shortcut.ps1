# ============================================================
#  Create a desktop shortcut for "Laboratoire de la Haute Table"
#
#  Opens index.html in Chrome / Edge app mode (own window, own taskbar icon).
#  The icon is taken from assets/img/favicon.ico.
#
#  Run this file directly, or double-click create-desktop-shortcut.bat.
#  (Inside the file I keep everything ASCII on purpose: Windows PowerShell 5.1
#   reads .ps1 as ANSI unless the file has a BOM, so non-ASCII text would be
#   garbled. Chinese instructions live in README.md instead.)
# ============================================================

$ErrorActionPreference = 'Stop'

$root  = $PSScriptRoot
$index = Join-Path $root 'index.html'
$icon  = Join-Path $root 'assets\img\favicon.ico'

if (-not (Test-Path -LiteralPath $index)) {
    Write-Host 'index.html not found. Put this script in the site root folder.'
    exit 1
}

# Prefer a browser that supports --app (application mode)
$candidates = @(
    (Join-Path $env:ProgramFiles 'Google\Chrome\Application\chrome.exe'),
    (Join-Path ${env:ProgramFiles(x86)} 'Google\Chrome\Application\chrome.exe'),
    (Join-Path $env:LOCALAPPDATA 'Google\Chrome\Application\chrome.exe'),
    (Join-Path $env:ProgramFiles 'Microsoft\Edge\Application\msedge.exe'),
    (Join-Path ${env:ProgramFiles(x86)} 'Microsoft\Edge\Application\msedge.exe')
)
$browser = $candidates | Where-Object { $_ -and (Test-Path -LiteralPath $_) } | Select-Object -First 1

$desktop = [Environment]::GetFolderPath('Desktop')
$link    = Join-Path $desktop 'Laboratoire de la Haute Table.lnk'

$shell = New-Object -ComObject WScript.Shell
$sc = $shell.CreateShortcut($link)

if ($browser) {
    $url = 'file:///' + ($index -replace '\\', '/')
    $sc.TargetPath = $browser
    $sc.Arguments  = '--app="' + $url + '"'
} else {
    # No Chrome / Edge found: fall back to the default browser
    $sc.TargetPath = $index
}

$sc.WorkingDirectory = $root
$sc.Description = 'Laboratoire de la Haute Table - High Table Lab'
if (Test-Path -LiteralPath $icon) { $sc.IconLocation = "$icon,0" }
$sc.Save()

if ($browser) {
    Write-Host "Desktop shortcut created (browser app mode): $link"
} else {
    Write-Host "Desktop shortcut created (default browser): $link"
}
