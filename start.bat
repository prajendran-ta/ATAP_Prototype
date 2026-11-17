@echo off
rem Double-click on Windows to start the ATAP demo and open it in the browser.
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required: https://nodejs.org
  pause
  exit /b 1
)
if "%PORT%"=="" set PORT=8080
start "" "http://localhost:%PORT%"
node serve.js
