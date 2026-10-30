<?php get_header();while(have_posts()):the_post(); ?>
<article class="article-page"><header class="article-header section-pad"><nav class="breadcrumbs" aria-label="Breadcrumb"><?php anz_link('/blog/','Insights'); ?></nav><time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date('j F Y')); ?></time><h1 class="blur-reveal"><?php the_title(); ?></h1></header><div class="article-body prose section-pad"><?php the_content(); ?></div></article>
<?php endwhile;anz_enquiry('A greener space starts here.');get_footer(); ?>
