@echo off
cd /d "%~dp0"
echo Installing dependencies (root)...
call npm install
if errorlevel 1 goto error
echo Installing dependencies (client)...
cd client
call npm install
cd ..
if errorlevel 1 goto error
echo.
echo Starting server and client...
echo Open http://localhost:3000 in your browser.
echo.
start "Server" cmd /k "cd /d %~dp0 && node server/index.js"
timeout /t 3 /nobreak >nul
start "Client" cmd /k "cd /d %~dp0client && npm start"
echo.
echo Two windows opened. When both are ready, go to http://localhost:3000
pause
goto end
:error
echo Something went wrong. Make sure Node.js is installed (node -v).
pause
:end
