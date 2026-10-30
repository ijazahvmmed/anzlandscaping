<?php
/**
 * Plugin Name: ANZ Site Core
 * Description: Non-destructive page editing fields and explicit setup for the ANZ 2027 theme. No form processing or tracking changes.
 * Version: 1.0.0
 * Requires PHP: 8.0
 * License: GPL-2.0-or-later
 */
defined('ABSPATH') || exit;
add_action('init', function () {
    foreach (['intro','headline','body','scope','faq_question','faq_answer','gallery'] as $field) {
        register_post_meta('page','_anz_'.$field,['type'=>'string','single'=>true,'show_in_rest'=>true,'sanitize_callback'=>$field==='body'?'wp_kses_post':'sanitize_textarea_field','auth_callback'=>fn()=>current_user_can('edit_pages')]);
    }
});
add_action('add_meta_boxes_page', function () {
    add_meta_box('anz-page-fields','ANZ page content',function ($post) {
        wp_nonce_field('anz_save_page','anz_page_nonce');
        echo '<p>These fields override the theme’s source defaults without changing the page URL, form settings or SEO metadata. Use Featured Image for the cover photograph. Leave a field empty to use the source default.</p>';
        $fields=['intro'=>'Introduction','headline'=>'Supporting headline','body'=>'Additional body (safe HTML allowed)','scope'=>'Scope — one item per line','faq_question'=>'Service FAQ question','faq_answer'=>'Service FAQ answer','gallery'=>'Gallery — WordPress attachment IDs, comma separated'];
        foreach ($fields as $key=>$label) {
            printf('<p><label for="anz-%s"><strong>%s</strong></label><br><textarea style="width:100%%" rows="%d" id="anz-%s" name="anz_fields[%s]">%s</textarea></p>',esc_attr($key),esc_html($label),$key==='body'?6:3,esc_attr($key),esc_attr($key),esc_textarea(get_post_meta($post->ID,'_anz_'.$key,true)));
        }
    },'page','normal','high');
});
add_action('save_post_page',function ($id) {
    if (wp_is_post_revision($id) || (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE)) return;
    if (!isset($_POST['anz_page_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['anz_page_nonce'])),'anz_save_page') || !current_user_can('edit_post',$id)) return;
    $fields=isset($_POST['anz_fields']) && is_array($_POST['anz_fields']) ? wp_unslash($_POST['anz_fields']) : [];
    foreach (['intro','headline','body','scope','faq_question','faq_answer','gallery'] as $key) {
        if (!isset($fields[$key]) || !is_string($fields[$key])) continue;
        $value=$key==='body'?wp_kses_post($fields[$key]):sanitize_textarea_field($fields[$key]);
        if($key==='gallery') $value=implode(',',array_filter(array_map('absint',explode(',',$value))));
        update_post_meta($id,'_anz_'.$key,$value);
    }
});
add_action('admin_menu',function () {
    add_management_page('ANZ setup','ANZ setup','manage_options','anz-setup',function () {
        if (!current_user_can('manage_options')) return;
        if (isset($_POST['anz_create_pillars'])) {
            check_admin_referer('anz_create_pillars');
            foreach (['workplace-greenery'=>'Workplace Greenery','landscape-design-execution'=>'Landscape Design & Execution'] as $slug=>$title) {
                if (!get_page_by_path($slug)) wp_insert_post(['post_type'=>'page','post_status'=>'draft','post_title'=>$title,'post_name'=>$slug]);
            }
            echo '<div class="notice notice-success"><p>Missing pillar pages created as drafts. Review and publish them before adding navigation links.</p></div>';
        }
        echo '<div class="wrap"><h1>ANZ site setup</h1><p>Activation does not modify posts, form settings, SEO settings or leads. Create the two new pillar drafts only when you are ready to review them.</p><form method="post">';
        wp_nonce_field('anz_create_pillars');submit_button('Create missing pillar drafts','primary','anz_create_pillars');
        echo '</form><h2>Form dependencies</h2><p>Main enquiry: Elementor Pro and published template 834. Short quote: Forminator and form 3743. Check both in staging; this plugin does not replace their handlers.</p></div>';
    });
});
