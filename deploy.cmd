@echo off
REM Deploy script for I.N.T. Software Development
REM Deploy target: synology:/volume1/web via SSH

echo ========================================
echo   I.N.T. Software Development - Deploy
echo ========================================

set TARGET_HOST=synology
set TARGET_PATH=/volume1/web
set BUILD_DIR=.\dist
set LOG_FILE=.\deploy.log

REM Check if build exists
if not exist "%BUILD_DIR%" (
    echo [%date% %time%] Build directory not found. Building project...
    call npm run build
)

REM Check if rsync is available
where rsync >/dev/null 2>&1
if errorlevel 1 (
    echo [%date% %time%] ERROR: rsync not found.
    echo Please install rsync or use WSL for SSH deployment.
    pause
    exit /b 1
)

REM Sync files
echo [%date% %time%] Deploying files to: %TARGET_HOST%%TARGET_PATH%

REM Ensure target directory exists
echo [%date% %time%] Creating target directory...
ssh %TARGET_HOST% "mkdir -p %TARGET_PATH%"

REM Sync build files
echo [%date% %time%] Syncing build files...
rsync -avz --exclude='.gitkeep' "%BUILD_DIR%/" "%TARGET_HOST%:%TARGET_PATH%/" || (
    echo [%date% %time%] ERROR: rsync failed
    pause
    exit /b 1
)

REM Sync public files if they exist
if exist "public\" (
    echo [%date% %time%] Syncing public files...
    rsync -avz --exclude='.gitkeep' "public/" "%TARGET_HOST%:%TARGET_PATH%/" || (
        echo [%date% %time%] WARNING: rsync of public files failed
    )
)

REM Log deployment
echo Deployment completed at %date% %time% >> "%LOG_FILE%"

echo ========================================
echo   Deployment successful!
echo   Target: %TARGET_HOST%%TARGET_PATH%
echo ========================================
