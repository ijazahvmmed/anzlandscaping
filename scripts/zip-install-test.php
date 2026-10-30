<?php
// Install the release bytes under a local proof slug to keep the editable source checkout intact.
if(PHP_SAPI!=='cli')exit;
require dirname(__DIR__).'/.local/wordpress/wp-load.php';
if(wp_get_environment_type()!=='local')die('Local environment required');
require_once ABSPATH.'wp-admin/includes/file.php';require_once ABSPATH.'wp-admin/includes/class-wp-upgrader.php';
define('FS_METHOD','direct');wp_set_current_user(1);
$upgrader=new Theme_Upgrader(new Automatic_Upgrader_Skin());
$result=$upgrader->install(dirname(__DIR__).'/.local/anz-2027-install-proof.zip',['overwrite_package'=>true]);
if(is_wp_error($result))die($result->get_error_message());
wp_clean_themes_cache();$theme=wp_get_theme('anz-2027-proof');
if($theme->errors())die($theme->errors()->get_error_message());
switch_theme('anz-2027-proof');
file_put_contents(dirname(__DIR__).'/qa/zip-install.json',wp_json_encode(['installed'=>(bool)$result,'name'=>$theme->get('Name'),'version'=>$theme->get('Version'),'active'=>get_stylesheet(),'runtime'=>'Local PHP '.PHP_VERSION.' / WordPress '.get_bloginfo('version'),'note'=>'Same release files under proof slug; production Hostinger staging not tested'],JSON_PRETTY_PRINT));
echo 'Installed and activated: '.$theme->get('Name').' / '.get_stylesheet().PHP_EOL;
