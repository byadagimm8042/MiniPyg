@echo off
cd /d "%~dp0"
echo Starting Kids Investment App...

echo Starting server on port 3003...
start "Server" cmd /k "cd /d %~dp0 && node server/index.js"

timeout /t 3

echo Starting client on port 3000...
start "Client" cmd /k "cd /d %~dp0client && npm start"

echo.
echo App is starting!
echo Server: http://localhost:3003
echo Client: http://localhost:3000
echo.
echo To expose with ngrok: npm run tunnel
pause