$ErrorActionPreference='Stop'
$phpExe='C:\Users\ijasa\scoop\apps\php\8.4.12\php.exe'
$failures=0
Get-ChildItem -LiteralPath 'wordpress' -Filter '*.php' -Recurse | ForEach-Object {
    & $phpExe -l $_.FullName
    if ($LASTEXITCODE -ne 0) { $failures++ }
}
if ($failures -gt 0) { throw "$failures PHP lint failures" }
