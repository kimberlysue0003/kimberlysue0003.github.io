@echo off
echo Deploying to GitHub Pages...

REM Add remote repository (replace with your repo name)
echo Adding remote repository...
git remote add origin https://github.com/kimberlysue0003/kimberlysue0003.github.io.git

REM Push to GitHub
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo Deployment complete!
echo.
echo Next steps:
echo 1. Go to https://github.com/kimberlysue0003/kimberlysue0003.github.io/settings
echo 2. Scroll down to "Pages" section
echo 3. Under "Source", select "Deploy from a branch"
echo 4. Choose "main" branch and "/ (root)" folder
echo 5. Click "Save"
echo.
echo Your site will be live at: https://kimberlysue0003.github.io
echo (It may take a few minutes to deploy)
pause