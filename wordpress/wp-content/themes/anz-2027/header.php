<!doctype html>
<html <?php language_attributes(); ?>>
<head><meta charset="<?php bloginfo('charset'); ?>"><meta name="viewport" content="width=device-width, initial-scale=1"><?php wp_head(); ?></head>
<body <?php body_class('anz-site'); ?>><?php wp_body_open(); ?>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
<a class="brand" href="<?php echo anz_url('/'); ?>" aria-label="ANZ Landscaping home"><?php if (has_custom_logo()) { $logo=wp_get_attachment_image_src(get_theme_mod('custom_logo'),'full'); ?><img src="<?php echo esc_url($logo[0]); ?>" alt="ANZ Landscaping" width="180" height="100"><?php } else { anz_brand_art(); } ?></a>
<nav class="desktop-nav" aria-label="Main navigation">
<span class="nav-lens" aria-hidden="true"></span>
<?php foreach (['Workplace greenery'=>'/workplace-greenery/','Landscaping'=>'/landscape-design-execution/'] as $label=>$path): ?>
<div class="nav-group"><a href="<?php echo anz_url($path); ?>"><?php echo esc_html($label); ?></a><button class="nav-expand" aria-label="Show <?php echo esc_attr($label); ?> services" aria-expanded="false"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div class="mega-menu"><div><?php anz_photo($path==='/workplace-greenery/'?3845:2397,''); ?></div><div><p><?php echo esc_html($label); ?></p><?php foreach (anz_catalogue('service') as $s) if (($path==='/workplace-greenery/')===$s['workplace']) { ?><a href="<?php echo anz_url($s['path']); ?>"><?php echo esc_html($s['title']); ?> ↗</a><?php } anz_link('/services/','All services'); ?></div></div></div>
<?php endforeach; ?>
<a href="<?php echo anz_url('/projects/'); ?>">Projects</a><a href="<?php echo anz_url('/about-us/'); ?>">About</a><a href="<?php echo anz_url('/blog/'); ?>">Insights</a>

<div class="nav-ribbon" aria-hidden="true"><div class="nav-ribbon-track"><?php for($copy=0;$copy<2;$copy++): ?><div class="header-marquee-group"><span>Landscape design</span><i></i><span>Office plants</span><i></i><span>Plant maintenance</span><i></i></div><?php endfor; ?></div></div>

</nav>
<?php anz_link('/contact-us/','Start a project','header-cta'); ?>
<button class="menu-toggle" aria-expanded="false" aria-controls="mobile-menu">Menu <span aria-hidden="true">☰</span></button>
</header>
<dialog class="mobile-menu" id="mobile-menu" aria-label="Navigation"><div class="menu-top"><span>Explore ANZ</span><button class="menu-close" aria-label="Close menu">Close ×</button></div><nav aria-label="Mobile navigation"><?php foreach (['Workplace greenery'=>'/workplace-greenery/','Landscaping'=>'/landscape-design-execution/','All services'=>'/services/','Projects'=>'/projects/','About'=>'/about-us/','Insights'=>'/blog/','Contact'=>'/contact-us/'] as $label=>$path) { ?><a href="<?php echo anz_url($path); ?>"><?php echo esc_html($label); ?><span aria-hidden="true">↗</span></a><?php } ?><details><summary>Explore every service</summary><?php foreach(anz_catalogue('service') as $s) anz_link($s['path'],$s['title']); ?></details></nav><a href="tel:+919845292729">+91 98452 92729</a></dialog>
<main id="main">
<noscript><nav class="nojs-nav" aria-label="Navigation without JavaScript"><?php foreach(['/services/'=>'Services','/projects/'=>'Projects','/about-us/'=>'About','/blog/'=>'Insights','/contact-us/'=>'Contact'] as $path=>$label) anz_link($path,$label); ?></nav></noscript>
