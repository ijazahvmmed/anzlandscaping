<?php
// Restore only original Elementor form templates into the isolated preview.
// Do not run this script on staging/production or overwrite an existing template.
if(PHP_SAPI!=='cli')exit;
require dirname(__DIR__).'/.local/wordpress/wp-load.php';
if(wp_get_environment_type()!=='local')die('Local environment required');
if(!post_type_exists('elementor_library'))register_post_type('elementor_library',['public'=>false]);
$records=json_decode(file_get_contents(dirname(__DIR__).'/content-migration/export-audit.json'),true);
$report=[];
foreach($records as $record){
 if($record['type']!=='elementor_library'||!in_array((int)$record['id'],[834,874,1953,2068,4050],true))continue;
 $id=(int)$record['id'];$existing=get_post($id);
 if($existing){$report[]=['id'=>$id,'state'=>$existing->post_type==='elementor_library'?'already present; untouched':'ID occupied; skipped'];continue;}
 $created=wp_insert_post(wp_slash(['import_id'=>$id,'post_title'=>$record['title'],'post_name'=>$record['slug'],'post_type'=>'elementor_library','post_status'=>$record['status'],'post_content'=>$record['content']??'']),true);
 if(is_wp_error($created))die($created->get_error_message());
 if($created!==$id)die('Original template ID could not be retained');
 foreach($record['meta'] as $key=>$value)update_post_meta($id,$key,wp_slash(maybe_unserialize($value)));
 $report[]=['id'=>$id,'state'=>'restored original template and metadata'];
}
$source_quote=null;foreach($records as $record)if((int)$record['id']===3743)$source_quote=maybe_unserialize($record['meta']['forminator_form_meta']);
$report[]=['quote_id'=>3743,'configuration_matches_export'=>get_post_meta(3743,'forminator_form_meta',true)===$source_quote,'elementor_pro_available'=>class_exists('ElementorPro\Modules\Forms\Module')];
file_put_contents(dirname(__DIR__).'/qa/original-forms-restoration.json',wp_json_encode($report,JSON_PRETTY_PRINT));echo wp_json_encode($report,JSON_PRETTY_PRINT).PHP_EOL;
