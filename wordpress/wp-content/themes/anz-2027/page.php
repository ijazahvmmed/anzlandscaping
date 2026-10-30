<?php
get_header();
while(have_posts()):the_post();
$record=anz_record();
if ($record) { set_query_var('anz_item',$record);get_template_part('template-parts/'.$record['kind']); }
elseif (is_page(['workplace-greenery','landscape-design-execution'])) get_template_part('template-parts/pillar');
elseif (is_page('projects')) get_template_part('template-parts/projects');
elseif (is_page('services')) get_template_part('template-parts/services');
elseif (is_page('about-us')) get_template_part('template-parts/about');
elseif (is_page('contact-us')) get_template_part('template-parts/contact');
elseif (is_page('landscaping-services-in-bangalore')) get_template_part('template-parts/pillar');
elseif (is_page('thank-you')) { ?>
<section class="reading-page section-pad"><h1>Continue the conversation.</h1><p>If you’ve submitted an enquiry, please check the form’s confirmation for its status. You can also reach the team directly.</p><?php anz_link('/contact-us/','Contact ANZ','button'); ?></section>
<?php } else { ?>
<article class="reading-page section-pad"><h1><?php the_title(); ?></h1><div class="prose"><?php the_content(); ?></div></article>
<?php }
endwhile;get_footer();
