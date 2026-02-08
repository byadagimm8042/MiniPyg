# Fix esbuild Permission Error Script
# Run this script as Administrator

Write-Host "🔧 Fixing esbuild Permission Issues..." -ForegroundColor Cyan

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️  This script should be run as Administrator for best results." -ForegroundColor Yellow
    Write-Host "   Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
}

$projectPath = "C:\Users\roopa\OneDrive\Documents\New_Project_Cursor_MiniPyg"

if (-not (Test-Path $projectPath)) {
    Write-Host "❌ Project path not found: $projectPath" -ForegroundColor Red
    exit 1
}

Set-Location $projectPath

Write-Host "`n1. Stopping Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

Write-Host "2. Clearing cache directories..." -ForegroundColor Yellow
Remove-Item -Path "node_modules\.vite" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules\.cache" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".vite" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "3. Fixing file permissions..." -ForegroundColor Yellow
if ($isAdmin) {
    if (Test-Path "node_modules") {
        icacls "node_modules" /grant "${env:USERNAME}:(OI)(CI)F" /T /Q 2>$null
    }
    if (Test-Path ".vite") {
        icacls ".vite" /grant "${env:USERNAME}:(OI)(CI)F" /T /Q 2>$null
    }
}

Write-Host "4. Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force 2>$null

Write-Host "`n✅ Cleanup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Add Windows Defender exclusions (see FIX_ESBUILD_ERROR.md)" -ForegroundColor White
Write-Host "2. Run: npm install" -ForegroundColor White
Write-Host "3. Run: npm run dev" -ForegroundColor White

Write-Host "`n💡 If issues persist, try running npm commands as Administrator" -ForegroundColor Yellow
