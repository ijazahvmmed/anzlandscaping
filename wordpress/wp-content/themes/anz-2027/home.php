<?php get_header(); ?>
<section class="service-hub-hero section-pad"><h1 class="blur-reveal">The green<br>perspective.</h1><p class="lead">Ideas from the garden,<br>for the spaces we live in.</p></section>
<section class="insight-list section-pad" aria-label="Articles">
<?php $seen=[];if(have_posts()):while(have_posts()):the_post();$fingerprint=hash('sha256',trim(wp_strip_all_tags(get_the_content())));if(isset($seen[$fingerprint]))continue;$seen[$fingerprint]=true; ?>
<article><a class="reveal-image" href="<?php the_permalink(); ?>"><?php if(has_post_thumbnail())the_post_thumbnail('large');else anz_photo(3524,'Garden path — ANZ service library'); ?></a><div><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('j F Y')); ?></time><h2 class="blur-reveal"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php the_excerpt(); ?><?php anz_link(wp_parse_url(get_permalink(),PHP_URL_PATH),'Read the article'); ?></div></article>
<?php endwhile;the_posts_pagination();else: ?><p>No articles are currently published.</p><?php endif; ?></section>
<?php get_template_part('template-parts/marquee');anz_enquiry('Bring an idea to life.');get_footer(); ?>
