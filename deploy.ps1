# Deploy script for I.N.T. Software Development
# Deploy target: synology:/volume1/web via SSH

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  I.N.T. Software Development - Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Configuration
$TargetHost = "synology"
$TargetPath = "/volume1/web"
$BuildDir = "./dist"
$LogFile = "./deploy.log"

# Check if build exists
if (-not (Test-Path $BuildDir)) {
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Build directory not found. Building project..." -ForegroundColor Yellow
    npm run build
}

# Check if rsync is available
try {
    Get-Command rsync -ErrorAction Stop | Out-Null
} catch {
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] ERROR: rsync not found." -ForegroundColor Red
    Write-Host "Please install rsync or use WSL for SSH deployment." -ForegroundColor Yellow
    exit 1
}

# Sync files
Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Deploying files to: $TargetHost:$TargetPath" -ForegroundColor Yellow

# Ensure target directory exists
Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Creating target directory..."
ssh $TargetHost "mkdir -p $TargetPath"

# Sync build files
Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Syncing build files..."
rsync -avz --exclude='.gitkeep' "$BuildDir/" "$TargetHost:$TargetPath/"

# Sync public files if they exist
if (Test-Path "public") {
    Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Syncing public files..."
    rsync -avz --exclude='.gitkeep' "public/" "$TargetHost:$TargetPath/"
}

# Log deployment
"Deployment completed at $(Get-Date)" | Add-Content -Path $LogFile

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deployment successful!" -ForegroundColor Green
Write-Host "  Target: $TargetHost:$TargetPath" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
