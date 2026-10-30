<?php
defined('ABSPATH') || exit;
function anz_catalogue($kind = '') {
    static $items;
    if ($items === null) $items = json_decode(file_get_contents(__DIR__.'/catalogue.json'), true) ?: [];
    if(!$kind)return $items;
    $published=[];
    foreach($items as $item) {
        if($item['kind']!==$kind)continue;
        $page=get_page_by_path(trim($item['path'],'/'));
        if(!$page || get_post_status($page)!=='publish')continue;
        $item['title']=get_the_title($page);
        $cover=get_post_thumbnail_id($page);
        if($cover && wp_attachment_is_image($cover))$item['images'][0]='wp:'.$cover;
        $published[]=$item;
    }
    return $published;
}
function anz_record() {
    $uri = '/' . trim(get_page_uri(get_queried_object_id()), '/') . '/';
    foreach (anz_catalogue() as $item) if ($item['path']===$uri) {
        $item['title']=get_the_title(get_queried_object_id());
        foreach (['intro','headline'] as $key) { $override=get_post_meta(get_queried_object_id(),'_anz_'.$key,true);if($override) $item[$key]=$override; }
        $scope=get_post_meta(get_queried_object_id(),'_anz_scope',true);if($scope) $item['scope']=array_filter(array_map('trim',explode("\n",$scope)));
        $q=get_post_meta(get_queried_object_id(),'_anz_faq_question',true);$a=get_post_meta(get_queried_object_id(),'_anz_faq_answer',true);if($q && $a) $item['faq']=[$q,$a];
        $gallery=get_post_meta(get_queried_object_id(),'_anz_gallery',true);
        if($gallery) { $images=[];foreach(array_filter(array_map('absint',explode(',',$gallery))) as $attachment) if(wp_attachment_is_image($attachment)) $images[]='wp:'.$attachment; if($images) $item['images']=$images; }
        return $item;
    }
    return null;
}
function anz_url($path) { return esc_url(home_url($path)); }
function anz_brand_art() {
    // The source artboard has wide transparent margins. Frame its entire painted
    // bounds, including the leaf and tagline, without offsetting or clipping it.
    printf('<svg class="brand-art" viewBox="185 112 799 449" width="799" height="449" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><image href="%s" x="0" y="0" width="1200" height="720"/></svg>', esc_url(anz_media('logo-colour')));
}
function anz_media_relative($key) {
    $edited='assets/media/edited/'.rawurlencode((string)$key).'.webp';
    return file_exists(get_template_directory().'/'.$edited) ? $edited : 'assets/media/'.rawurlencode((string)$key).'.webp';
}
function anz_media($key) { return str_starts_with((string)$key,'wp:') ? (wp_get_attachment_image_url(absint(substr($key,3)),'full') ?: '') : get_template_directory_uri().'/'.anz_media_relative($key); }
function anz_photo($key, $alt='', $class='', $eager=false) {
    if(str_starts_with((string)$key,'wp:')) {echo wp_get_attachment_image(absint(substr($key,3)),'full',false,['alt'=>$alt,'class'=>$class,'loading'=>$eager?'eager':'lazy']);return;}
    $path=get_template_directory().'/'.anz_media_relative($key);
    $size=file_exists($path) ? getimagesize($path) : [1600,1000];
    // These two source photos contain white artboard borders inside their pixels.
    // Frame the real photograph directly; keep the original raster unchanged.
    if(in_array((string)$key,['3835','3845'],true)) {
        printf('<svg class="photo-framed %s" viewBox="300 0 1000 1000" width="1000" height="1000" preserveAspectRatio="xMidYMid slice" %s data-photo-source="%s"><image href="%s" x="0" y="0" width="%d" height="%d"/></svg>',esc_attr($class),$alt!==''?'role="img" aria-label="'.esc_attr($alt).'"':'aria-hidden="true"',esc_attr((string)$key),esc_url(anz_media($key)),$size[0],$size[1]);
        return;
    }
    printf('<img src="%s" alt="%s" width="%d" height="%d" class="%s" loading="%s" decoding="async" %s>', esc_url(anz_media($key)), esc_attr($alt), $size[0], $size[1], esc_attr($class), $eager?'eager':'lazy', $eager?'fetchpriority="high"':'');
}
function anz_link($path, $label, $class='text-link') {
    if (preg_match('/(?:^|\s)(button|header-cta)(?:\s|$)/', $class)) {
        printf('<a class="%s split-button" href="%s"><span class="button-label">%s</span><span class="button-icon" aria-hidden="true"><span>↗</span><span>↗</span></span></a>', esc_attr($class), anz_url($path), esc_html($label));
        return;
    }
    printf('<a class="%s" href="%s">%s <span aria-hidden="true">↗</span></a>', esc_attr($class), anz_url($path), esc_html($label));
}
function anz_project_tile($item, $n=0) { ?>
<article class="project-tile tile-<?php echo (int)$n; ?>" data-category="<?php echo esc_attr($item['category']); ?>">
<a href="<?php echo anz_url($item['path']); ?>"><div class="photo-frame"><?php anz_photo($item['images'][0], $item['title'].' — project photograph'); ?><span class="photo-arrow" aria-hidden="true">↗</span></div><div class="tile-caption"><h3><?php echo esc_html($item['title']); ?></h3><span><?php echo esc_html($item['category']); ?></span></div></a></article>
<?php }
function anz_enquiry($title='Let’s make room for nature.') { ?>
<section class="enquiry-band"><h2><?php echo esc_html($title); ?></h2><?php anz_link('/contact-us/', 'Discuss your space', 'button button-light'); ?></section>
<?php }
function anz_form_markup($mode='main') {
    $shortcode=$mode==='quote' ? '[forminator_form id="3743"]' : '[elementor-template id="834"]';
    $tag=$mode==='quote'?'forminator_form':'elementor-template';
    $id=$mode==='quote'?3743:834;
    $rendered='';
    $supported=$mode==='quote' || class_exists('ElementorPro\\Modules\\Forms\\Module');
    if ($supported && shortcode_exists($tag) && get_post_status($id)==='publish') $rendered=do_shortcode($shortcode);
    return stripos($rendered,'<form')!==false ? $rendered : '';
}
function anz_form($mode='main') {
    $rendered=anz_form_markup($mode);
    if (stripos($rendered,'<form')!==false) {
        echo '<div class="anz-lead-form">'.$rendered.'</div>';
    } else { ?>
        <div class="form-fallback" role="status"><h2>Tell us about your space.</h2><p>For enquiries, call or email the ANZ team.</p><a class="button split-button" href="tel:+919845292729"><span class="button-label">Call +91 98452 92729</span><span class="button-icon" aria-hidden="true"><span>↗</span><span>↗</span></span></a><p><a href="mailto:contact@anzlandscaping.in">contact@anzlandscaping.in</a></p></div>
    <?php }
}
function anz_intro($fallback) {
    $custom=get_post_meta(get_the_ID(),'_anz_intro',true);
    echo esc_html($custom ?: $fallback);
}
