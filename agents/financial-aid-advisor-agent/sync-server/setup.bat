@echo off
REM Scholarship Tracker Sync Server - Quick Setup (Windows)

echo.
echo ========================================
echo  Scholarship Tracker - Git Sync Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)

echo [1/4] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Generating secret token...
for /f %%i in ('node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"') do set SECRET_TOKEN=%%i

echo.
echo [3/4] Creating .env file...
if exist .env (
    echo .env already exists. Skipping creation.
) else (
    (
        echo # Scholarship Tracker Sync Server Configuration
        echo # Generated on %date% at %time%
        echo.
        echo PORT=3000
        echo SYNC_SECRET=%SECRET_TOKEN%
        echo REPO_PATH=%CD%\..\..\..\..
        echo ALLOWED_ORIGINS=https://ymarquezla.github.io
    ) > .env
    echo .env file created successfully!
)

echo.
echo [4/4] Configuration complete!
echo.
echo ========================================
echo  IMPORTANT - Save This Information:
echo ========================================
echo.
echo Your Secret Token:
echo %SECRET_TOKEN%
echo.
echo Server URL (for web app):
echo http://localhost:3000
echo.
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Start the server:
echo    npm start
echo.
echo 2. Open scholarship-tracker-with-sync.html
echo.
echo 3. Press Ctrl+, to open settings
echo.
echo 4. Enter:
echo    - Server URL: http://localhost:3000
echo    - Token: %SECRET_TOKEN%
echo.
echo 5. Click Save Settings
echo.
echo ========================================
echo.
pause
