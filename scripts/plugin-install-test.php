<?php
if(PHP_SAPI!=='cli')exit;require dirname(__DIR__).'/.local/wordpress/wp-load.php';
if(wp_get_environment_type()!=='local')exit;
require_once ABSPATH.'wp-admin/includes/file.php';require_once ABSPATH.'wp-admin/includes/plugin.php';require_once ABSPATH.'wp-admin/includes/class-wp-upgrader.php';
define('FS_METHOD','direct');wp_set_current_user(1);
$upgrader=new Plugin_Upgrader(new Automatic_Upgrader_Skin());$result=$upgrader->install(dirname(__DIR__).'/dist/anz-site-core-plugin.zip',['overwrite_package'=>true]);
if(is_wp_error($result))die($result->get_error_message());
$activated=activate_plugin('anz-site-core/anz-site-core.php');if(is_wp_error($activated))die($activated->get_error_message());
echo 'Companion plugin installed and activated locally.'.PHP_EOL;
