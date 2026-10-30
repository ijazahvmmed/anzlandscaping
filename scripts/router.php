<?php
// PHP built-in development server router. Local preview only.
$root=dirname(__DIR__).'/.local/wordpress';
$path=parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH);
if ($path!=='/' && is_file($root.$path)) return false;
require $root.'/index.php';
