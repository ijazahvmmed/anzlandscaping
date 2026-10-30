<?php
if(PHP_SAPI!=='cli')exit;
require dirname(__DIR__).'/.local/wordpress/wp-load.php';
if(wp_get_environment_type()!=='local')exit;
global $wpdb;
$rows=$wpdb->get_results("SELECT entry_id, form_id, entry_type FROM {$wpdb->prefix}frmt_form_entry WHERE form_id=3743",ARRAY_A);
file_put_contents(dirname(__DIR__).'/qa/forminator-storage.json',wp_json_encode(['entries'=>$rows,'transport'=>'Blocked local mail; not evidence of inbox delivery'],JSON_PRETTY_PRINT));
echo wp_json_encode($rows).PHP_EOL;
