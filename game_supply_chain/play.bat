@echo off
REM ==========================================================================
REM  CSCO Interview Gauntlet - local launcher (Windows)
REM  Starts a local static web server for this folder and opens the game in
REM  your default browser. No install step: uses whatever runtime you already
REM  have (python -> py -> node -> php).
REM
REM  Usage:   double-click play.bat   OR   run  play.bat  in a terminal
REM  Stop:    press Ctrl+C in the console window
REM ==========================================================================
setlocal

REM Run from the folder this script lives in (the repo root).
cd /d "%~dp0"

set "PORT=8000"
set "URL=http://localhost:%PORT%/index.html"

echo ==================================================================
echo   CSCO Interview Gauntlet
echo   Serving:  %CD%
echo   URL:      %URL%
echo   Stop:     Ctrl+C
echo ==================================================================

REM Open the default browser after a short delay so the server is ready.
start "" cmd /c "timeout /t 1 >nul & start %URL%"

REM Try runtimes in order of likelihood.
where python >nul 2>&1
if %ERRORLEVEL%==0 (
  python -m http.server %PORT%
  goto :eof
)

where py >nul 2>&1
if %ERRORLEVEL%==0 (
  py -m http.server %PORT%
  goto :eof
)

where node >nul 2>&1
if %ERRORLEVEL%==0 (
  node serve.js %PORT%
  goto :eof
)

where php >nul 2>&1
if %ERRORLEVEL%==0 (
  php -S localhost:%PORT%
  goto :eof
)

echo ERROR: No runtime found to serve files ^(need python, py, node, or php^).
echo Install Python 3 from https://www.python.org/downloads/ ^(check "Add to PATH"^) and re-run play.bat
pause
