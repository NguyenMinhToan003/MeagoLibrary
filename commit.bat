@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
cd /d "%~dp0"

echo ==============================================
echo   MEAGO CORE - VERIFY, COMMIT AND RELEASE
echo ==============================================
echo.

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Thu muc hien tai khong phai Git repository.
  goto :fail
)

for /f "delims=" %%B in ('git branch --show-current') do set "CURRENT_BRANCH=%%B"
if not defined CURRENT_BRANCH (
  echo [ERROR] Dang o detached HEAD. Hay checkout mot branch truoc.
  goto :fail
)

git diff --check
if errorlevel 1 (
  echo [ERROR] Diff co whitespace error hoac conflict marker.
  goto :fail
)

echo [1/6] Chay quality gate...
call npm run verify
if errorlevel 1 (
  echo [ERROR] npm run verify that bai. Khong commit/publish.
  goto :fail
)

echo.
set "COMMIT_MESSAGE="
set /p "COMMIT_MESSAGE=Nhap commit message: "
if not defined COMMIT_MESSAGE (
  echo [ERROR] Commit message khong duoc de trong.
  goto :fail
)

echo [2/6] Stage va commit thay doi...
git add -A
git diff --cached --quiet
if not errorlevel 1 (
  echo [ERROR] Khong co thay doi de commit.
  goto :fail
)

git commit -m "%COMMIT_MESSAGE%"
if errorlevel 1 goto :git_fail

echo [3/6] Dong bo origin/%CURRENT_BRANCH% bang rebase...
git pull --rebase origin "%CURRENT_BRANCH%"
if errorlevel 1 (
  echo [ERROR] Pull/rebase that bai. Xu ly conflict, sau do chay lai.
  goto :fail
)

echo.
set "CONFIRM_PUBLISH=y"
set /p "CONFIRM_PUBLISH=Phat hanh npm package moi? (Y/n) [Enter = Y]: "
if /i "%CONFIRM_PUBLISH%"=="n" goto :push_code

:select_bump
set "VERSION_BUMP=patch"
set /p "VERSION_BUMP=Loai version patch/minor/major [Enter = patch]: "
if not defined VERSION_BUMP set "VERSION_BUMP=patch"
if /i "%VERSION_BUMP%"=="patch" goto :bump_valid
if /i "%VERSION_BUMP%"=="minor" goto :bump_valid
if /i "%VERSION_BUMP%"=="major" goto :bump_valid
echo [ERROR] Chi chap nhan patch, minor hoac major.
goto :select_bump

:bump_valid
echo [4/6] Tang %VERSION_BUMP% version, tao release commit va Git tag...
call npm version "%VERSION_BUMP%" -m "chore(release): v%s"
if errorlevel 1 goto :fail

for /f "usebackq delims=" %%V in (`node -p "require('./package.json').version"`) do set "NEW_VERSION=%%V"
echo Version se publish: %NEW_VERSION%
set "CONFIRM_VERSION=y"
set /p "CONFIRM_VERSION=Xac nhan publish @meago/core@%NEW_VERSION%? (Y/n) [Enter = Y]: "
if /i "%CONFIRM_VERSION%"=="n" (
  echo [STOP] Chua publish. Release commit/tag van o local de ban review.
  echo Neu muon huy, tu rollback bang Git sau khi kiem tra lich su.
  goto :success
)

echo [5/6] Publish package public len npm...
call npm publish --access public
if errorlevel 1 (
  echo [ERROR] npm publish that bai. Khong push release tag.
  echo Sua authentication/2FA roi chay npm publish --access public thu cong.
  goto :fail
)

echo [6/6] Push branch va release tag...
git push origin "%CURRENT_BRANCH%" --follow-tags
if errorlevel 1 (
  echo [ERROR] Package da publish nhung Git push that bai.
  echo Chay lai: git push origin %CURRENT_BRANCH% --follow-tags
  goto :fail
)
goto :success

:push_code
echo [4/4] Khong publish; push commit len origin/%CURRENT_BRANCH%...
git push origin "%CURRENT_BRANCH%"
if errorlevel 1 goto :git_fail
goto :success

:git_fail
echo [ERROR] Git command that bai. Kiem tra remote, quyen va conflict.
goto :fail

:success
echo.
echo [OK] Hoan tat.
exit /b 0

:fail
echo.
echo [FAILED] Quy trinh da dung; khong tu dong force push hay xoa thay doi.
exit /b 1

