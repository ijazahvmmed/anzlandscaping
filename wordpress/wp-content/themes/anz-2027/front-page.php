<?php $original=anz_home_content();get_header(); ?>
<section class="home-hero experimental-hero">
 <div class="hero-copy"><h1 aria-label="Excellence in transforming corporate spaces"><span class="text-reveal"><span><?php echo esc_html($original['hero']['title'][0]); ?></span></span><span class="text-reveal"><span><?php echo esc_html($original['hero']['title'][1]); ?></span></span></h1><div class="hero-description"><p><?php echo esc_html($original['hero']['description']); ?></p></div><div class="hero-actions"><?php anz_link('/contact-us/','Request a quote','button button-light magnetic'); ?><?php anz_link('/#our-work','See our work'); ?></div></div>
 <figure class="hero-photo aperture-photo hero-video"><div class="hero-video-frame"><video muted loop playsinline preload="none" poster="<?php echo esc_url(get_template_directory_uri().'/assets/media/video/landscape-hero-poster.webp'); ?>" data-hero-video="<?php echo esc_url(get_template_directory_uri().'/assets/media/video/landscape-hero.mp4'); ?>" aria-hidden="true" tabindex="-1"></video><span class="hero-video-shade" aria-hidden="true"></span><button class="hero-video-toggle" type="button" aria-label="Pause hero video" hidden><svg viewBox="0 0 20 20" aria-hidden="true"><path class="video-pause-icon" d="M7 5v10M13 5v10"/><path class="video-play-icon" d="m7 4 9 6-9 6Z"/></svg></button></div><figcaption><a class="image-project-label" href="<?php echo anz_url('/services/'); ?>"><strong>Explore landscaping</strong><span aria-hidden="true">↗</span></a></figcaption></figure>
</section>

<?php get_template_part('template-parts/original-home-about');get_template_part('template-parts/original-home-services'); ?>

<section class="home-chapter home-work" id="our-work" aria-labelledby="home-work-title">
 <div class="home-chapter-head"><h2 class="blur-reveal" id="home-work-title">Our work</h2><div><p>Explore our project showcase and see how ANZ Landscaping transforms commercial spaces with expert design and precision. From corporate offices to retail exteriors, our work reflects quality, innovation and sustainability.</p><?php anz_link('/projects/','All projects'); ?></div></div>
 <div class="project-grid"><?php $projects=anz_catalogue('project');foreach([1027,2326,2328] as $id)foreach($projects as $project)if($project['id']===$id)anz_project_tile($project); ?></div>
</section>

<?php get_template_part('template-parts/original-home-proof'); ?>
<div class="home-approach-wrap"><section class="home-chapter home-approach" id="our-approach" aria-labelledby="home-approach-title">
 <div class="home-chapter-head"><h2 class="blur-reveal" id="home-approach-title">Our approach</h2><p>Start with the site. Agree the work. Plan how the planting will be cared for.</p></div>
 <div class="home-approach-grid"><figure class="home-approach-photo reveal-image"><?php anz_photo(3845,'Indoor plants arranged beside office glazing'); ?><figcaption>Plant selection considers light, layout and access for care.</figcaption></figure><div class="home-approach-steps">
  <details open><summary>Understand your site</summary><p>Share your location, photographs and what you want to change. Light, water, access and existing planting help define the brief.</p></details>
  <details><summary>Define the work</summary><p>Discuss plant choices, materials, layout and installation needs. Agree the scope and responsibilities before the work begins.</p></details>
  <details><summary>Plan for ongoing care</summary><p>Confirm watering, pruning, visits and any replacement arrangements so the landscape or office planting can be cared for after installation.</p></details>
  <?php anz_link('/contact-us/','Discuss your project','home-approach-contact text-link'); ?>
 </div></div>
</section></div>

<section class="home-chapter home-care" id="ongoing-care" aria-labelledby="home-care-title"><div class="home-care-copy"><h2 class="blur-reveal" id="home-care-title">Ongoing care</h2><p>Gardens and office plants need regular attention. Discuss a maintenance plan for your planting, lawns and watering systems.</p><?php anz_link('/services/garden-maintenance-services-bangalore/','Explore garden maintenance'); ?></div><figure class="home-care-photo reveal-image"><?php anz_photo(3815,'ANZ team carrying out landscape maintenance'); ?><figcaption>ANZ landscape maintenance team</figcaption></figure></section>

<?php get_template_part('template-parts/original-home-enquiry');get_footer(); ?>
