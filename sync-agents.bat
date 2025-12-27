@echo off
REM Sync local agents folder to repository agents folder
echo Syncing agents from local to repository...
xcopy "C:\Users\Ymarquez\Documents\agents\*" "C:\Users\Ymarquez\Documents\GitHub\UniversityAdvisor\agents\" /E /Y /I /EXCLUDE:sync-exclude.txt
echo Sync complete!
pause
