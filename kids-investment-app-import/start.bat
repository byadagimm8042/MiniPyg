@echo off
echo Starting Kids Investment App...
echo.

echo Installing dependencies...
call npm install
cd client
call npm install
cd ..

echo.
echo Starting development servers...
echo Server will run on http://localhost:3001
echo Client will run on http://localhost:3000
echo.
echo To expose server with ngrok, run: npm run tunnel
echo.

start cmd /k "npm run dev"

echo.
echo App is starting! Check the new terminal window.
pause