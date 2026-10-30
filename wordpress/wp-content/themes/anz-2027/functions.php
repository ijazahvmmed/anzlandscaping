<?php
defined('ABSPATH') || exit;
require_once __DIR__ . '/inc/site.php';
require_once __DIR__ . '/inc/homepage-content.php';
add_action('after_setup_theme', function () {
    add_theme_support('title-tag'); add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds'); add_theme_support('html5', ['search-form','gallery','caption','style','script']);
    add_theme_support('custom-logo', ['width'=>360,'height'=>200,'flex-width'=>true,'flex-height'=>true]);
    register_nav_menus(['primary'=>'Primary navigation','footer'=>'Footer navigation']);
});
add_action('wp_enqueue_scripts', function () {
    $base = get_template_directory_uri() . '/assets/dist/';
    $manifest_file = __DIR__ . '/assets/dist/.vite/manifest.json';
    if (!file_exists($manifest_file)) return;
    $manifest = json_decode(file_get_contents($manifest_file), true);
    $entry = $manifest['src/main.ts'] ?? null;
    if (!$entry) return;
    foreach (($entry['css'] ?? []) as $n=>$css) wp_enqueue_style('anz-site-'.$n, $base.$css, [], filemtime(__DIR__.'/assets/dist/'.$css));
    wp_enqueue_script('anz-site', $base.$entry['file'], [], filemtime(__DIR__.'/assets/dist/'.$entry['file']), true);
});
add_filter('script_loader_tag', function ($tag, $handle) { return $handle==='anz-site' ? str_replace('<script ', '<script type="module" ', $tag) : $tag; }, 10, 2);
add_filter('wp_robots', function ($robots) {
    if (is_page(['thank-you','otp-anz','otp-test-form'])) $robots['noindex']=true;
    return $robots;
});
add_filter('wpseo_metadesc', function ($description) {
    if(is_front_page())return anz_home_content()['seo']['description'];
    return is_page('plant-rentals-services-bangalore') ? 'Office plant rental in Bengaluru: plant selection, installation and ongoing care for your workplace. Discuss your space with ANZ Landscaping.' : $description;
});
add_filter('wp_sitemaps_posts_query_args',function ($args,$type) {
    if($type==='page') { foreach(['thank-you','otp-anz','otp-test-form'] as $slug) { $page=get_page_by_path($slug);if($page)$args['post__not_in'][]=$page->ID; } }
    return $args;
},10,2);
add_action('wp_head',function () {
    if(defined('WPSEO_VERSION')||defined('RANK_MATH_VERSION'))return;
    $record=is_page()?anz_record():null;
    $description=$record['intro']??(is_front_page()?'ANZ Landscaping — workplace greenery, office plant rental, plant care and landscape design in Bengaluru.':'Explore ANZ Landscaping’s services and project portfolio in Bengaluru.');
    if(is_front_page())$description=anz_home_content()['seo']['description'];
    printf('<meta name="description" content="%s">' . "\n",esc_attr($description));
    if(is_singular()) {
        printf('<meta property="og:title" content="%s"><meta property="og:description" content="%s"><meta property="og:url" content="%s"><meta property="og:type" content="%s">' . "\n",esc_attr(wp_get_document_title()),esc_attr($description),esc_url(get_permalink()),is_single()?'article':'website');
        $image=is_front_page()?3580:($record['images'][0]??2397);printf('<meta property="og:image" content="%s">' . "\n",esc_url(is_front_page()?get_template_directory_uri().'/assets/media/video/landscape-hero-poster.webp':anz_media($image)));
    }
},5);
