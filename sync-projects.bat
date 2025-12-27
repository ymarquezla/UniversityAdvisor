@echo off
REM Sync local projects folder to repository projects folder
echo Syncing projects from local to repository...
xcopy "C:\Users\Ymarquez\Documents\projects\*" "C:\Users\Ymarquez\Documents\GitHub\UniversityAdvisor\projects\" /E /Y /I /EXCLUDE:sync-exclude.txt
echo Sync complete!
pause
