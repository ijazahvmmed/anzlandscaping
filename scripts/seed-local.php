<?php
if (PHP_SAPI!=='cli') exit;
define('WP_INSTALLING',true);
require dirname(__DIR__).'/.local/wordpress/wp-load.php';
require_once ABSPATH.'wp-admin/includes/upgrade.php';
if (wp_get_environment_type()!=='local') die('Local environment required');
if (!is_blog_installed()) wp_install('ANZ Landscaping — local review','anz-review','review@example.invalid',false,'','local-preview-only');
update_option('blog_public',0);update_option('permalink_structure','/%postname%/');update_option('timezone_string','Asia/Kolkata');
// The seed is ONLY for this empty local database. Never import this over production.
$records=json_decode(file_get_contents(dirname(__DIR__).'/content-migration/local-seed.json'),true);
foreach ($records as $r) {
    if (get_post($r['id'])) continue;
    $id=wp_insert_post(['import_id'=>$r['id'],'post_title'=>$r['title'],'post_name'=>$r['slug'],'post_type'=>$r['type'],'post_status'=>'publish','post_parent'=>$r['parent'],'post_content'=>$r['content'],'post_date'=>$r['date']],true);
    if (is_wp_error($id)) die($id->get_error_message());
}
foreach (['workplace-greenery'=>'Workplace Greenery','landscape-design-execution'=>'Landscape Design & Execution'] as $slug=>$title) {
    if (!get_page_by_path($slug)) wp_insert_post(['post_title'=>$title,'post_name'=>$slug,'post_type'=>'page','post_status'=>'publish']);
}
update_option('show_on_front','page');update_option('page_on_front',10);update_option('page_for_posts',699);
foreach ([1,2] as $default_id) { $default=get_post($default_id);if($default && in_array($default->post_name,['hello-world','sample-page'],true)) wp_update_post(['ID'=>$default_id,'post_status'=>'draft']); }
switch_theme('anz-2027');flush_rewrite_rules();
echo 'WordPress '.get_bloginfo('version').' | '.count(get_pages(['post_status'=>'publish'])).' pages | theme '.wp_get_theme()->get('Name').PHP_EOL;
