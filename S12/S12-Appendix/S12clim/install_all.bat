@echo off
setlocal enabledelayedexpansion

rem Keep the install output clean in a lab setting.
rem (Suppresses npm funding messages and the automatic audit summary.)
rem If you prefer the full output, set NPM_FLAGS to empty.
set "NPM_FLAGS=--no-fund --no-audit"

if /I "%~1"=="verbose" (
  set "NPM_FLAGS="
)

echo.
echo ==========================================================
echo  Seminar 12 - Redux: Install dependencies (Windows 11)
echo ==========================================================
echo  This will run "npm install" in:
echo    - dashboard
echo    - steps\step1_router
echo    - steps\step2_useReducer
echo    - steps\step3_redux
echo    - steps\step4_redux_async
echo    - steps\tool_postman_lite
echo    - servers\notes-api
echo.
echo  Make sure Node.js + npm are installed and available in PATH.
echo ==========================================================
echo.

call :install "dashboard" || goto :fail
call :install "steps\step1_router" || goto :fail
call :install "steps\step2_useReducer" || goto :fail
call :install "steps\step3_redux" || goto :fail
call :install "steps\step4_redux_async" || goto :fail
call :install "steps\tool_postman_lite" || goto :fail
call :install "servers\notes-api" || goto :fail

echo.
echo ==========================================================
echo  DONE. You can now run: run_dashboard.bat
echo ==========================================================
echo.
pause
exit /b 0

:fail
echo.
echo ==========================================================
echo  INSTALL FAILED. Fix the error above and re-run install_all.bat
echo ==========================================================
echo.
pause
exit /b 1

:install
echo.
echo --- Installing in %~1 ---
pushd "%~1" >nul
if errorlevel 1 (
  echo [ERROR] Cannot access folder: %~1
  popd >nul
  exit /b 1
)
call npm install %NPM_FLAGS%
if errorlevel 1 (
  echo [ERROR] npm install failed in %~1
  popd >nul
  exit /b 1
)
popd >nul
exit /b 0
