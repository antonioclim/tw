@echo off
setlocal

echo Starting Seminar 12 Redux dashboard on http://localhost:3000
echo.
cd /d "%~dp0dashboard"
call npm start
