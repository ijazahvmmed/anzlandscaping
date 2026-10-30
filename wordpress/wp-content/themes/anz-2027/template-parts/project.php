<?php $p=get_query_var('anz_item'); ?>
<article class="project-page">
<section class="project-intro section-pad"><nav class="breadcrumbs" aria-label="Breadcrumb"><?php anz_link('/projects/','Projects'); ?> <span aria-hidden="true">/</span><span><?php echo esc_html($p['category']); ?></span></nav><h1><?php the_title(); ?></h1><div class="project-meta"><span><?php echo esc_html($p['location']); ?></span><span><?php echo esc_html($p['category']); ?> project</span></div></section>
<figure class="project-cover"><?php if(has_post_thumbnail()) the_post_thumbnail('full',['fetchpriority'=>'high']);else anz_photo($p['images'][0],$p['title'].' — project overview','',true); ?></figure>
<section class="project-overview section-pad"><h2>A sense of place.</h2><p class="lead"><?php anz_intro($p['intro']); ?> <?php echo esc_html($p['location']); ?>.</p></section>
<div class="project-gallery section-pad" aria-label="<?php echo esc_attr($p['title']); ?> gallery">
<?php foreach(array_slice($p['images'],1) as $n=>$image): ?><figure><a class="gallery-open" href="<?php echo esc_url(anz_media($image)); ?>" data-caption="<?php echo esc_attr($p['title'].' · Project photograph '.($n+2)); ?>"><?php anz_photo($image,$p['title'].' — project photograph '.($n+2)); ?><span class="photo-arrow" aria-hidden="true">↗</span></a><figcaption><?php echo esc_html($p['title']); ?></figcaption></figure><?php endforeach; ?>
</div>
<?php $body=get_post_meta(get_the_ID(),'_anz_body',true);if($body):?><section class="prose section-pad"><?php echo wp_kses_post(wpautop($body)); ?></section><?php endif; ?>
<section class="next-project section-pad"><h2>Next project</h2><?php $all=anz_catalogue('project');$index=array_search($p['id'],array_column($all,'id'));anz_project_tile($all[($index+1)%count($all)]); ?></section></article>
<?php anz_enquiry('Have a similar space in mind?'); ?>
