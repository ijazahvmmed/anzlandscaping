<?php
// Isolated local test setup. Never run against a production database.
if(PHP_SAPI!=='cli')exit;
require dirname(__DIR__).'/.local/wordpress/wp-load.php';
if(wp_get_environment_type()!=='local')die('Local environment required');
require_once ABSPATH.'wp-admin/includes/plugin.php';
wp_set_current_user(1);
$activated=activate_plugin('forminator/forminator.php');if(is_wp_error($activated))die($activated->get_error_message());
$records=json_decode(file_get_contents(dirname(__DIR__).'/content-migration/export-audit.json'),true);
foreach($records as $record)if($record['type']==='forminator_forms') {
    if(!get_post(3743))wp_insert_post(['import_id'=>3743,'post_title'=>'Quote Request Form','post_name'=>'quote-request-form','post_type'=>'forminator_forms','post_status'=>'publish']);
    $value=maybe_unserialize($record['meta']['forminator_form_meta']);
    update_post_meta(3743,'forminator_form_meta',$value);
}
echo 'Imported source Forminator configuration at local ID 3743. No production data changed.'.PHP_EOL;
