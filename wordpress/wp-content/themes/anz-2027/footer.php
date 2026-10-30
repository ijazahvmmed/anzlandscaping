</main>
<footer class="site-footer landscape-footer"><div class="rooted-shell">
<div class="rooted-kicker"><a class="rooted-top" href="#main">Back to top <span aria-hidden="true">↑</span></a></div>
<div class="rooted-invitation"><div><h2>Let’s plan<br><span>your space.</span></h2></div><div class="rooted-action"><p>Discuss a landscaping or<br>workplace planting project.</p><?php anz_link('/contact-us/','Request a quote','button button-light'); ?></div></div>
<div class="rooted-grid">
<div class="rooted-identity"><a class="rooted-logo" href="<?php echo anz_url('/'); ?>" aria-label="ANZ Landscaping home"><?php anz_brand_art(); ?></a><p>Plant care. Plantscaping.<br>Plant rentals.</p></div>
<nav aria-label="Footer exploration"><p class="rooted-label">Explore</p><?php foreach(['/workplace-greenery/'=>'Workplace greenery','/landscape-design-execution/'=>'Landscaping','/projects/'=>'Our projects','/about-us/'=>'About ANZ','/blog/'=>'Insights'] as $path=>$label) { ?><a href="<?php echo anz_url($path); ?>"><?php echo esc_html($label); ?><span aria-hidden="true">↗</span></a><?php } ?></nav>
<div><p class="rooted-label">Let’s talk</p><a href="tel:+919845292729">+91 98452 92729</a><a href="tel:+919686111739">+91 96861 11739</a><a class="rooted-email" href="mailto:contact@anzlandscaping.in">contact@anzlandscaping.in <span aria-hidden="true">↗</span></a></div>
<div><p class="rooted-label">Find our roots</p><address>2948, 6th Cross Road,<br>HAL 2nd Stage, Indiranagar,<br>Bengaluru, Karnataka 560008</address><a class="rooted-address-link" href="<?php echo anz_url('/contact-us/'); ?>">Come say hello <span aria-hidden="true">↗</span></a></div>
</div>
<section class="footer-playground" aria-label="An interactive ANZ garden">
<div class="garden-toolbar"><div class="garden-actions" hidden><button class="garden-plant" type="button">Plant a little green <span aria-hidden="true">＋</span></button><button class="garden-reset" type="button" aria-label="Start the interactive garden again">↺</button></div></div>
<div class="footer-garden-field"><span class="footer-grow-word" aria-hidden="true">grow<span>.</span></span><canvas class="garden-canvas" aria-hidden="true"></canvas><svg class="garden-ground" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50Q300 -20 600 45T1200 35V80H0Z" fill="currentColor"/></svg><p class="garden-hint"><span class="garden-desktop-hint">Click to plant. Move to explore.</span><span class="garden-touch-hint">Tap to plant something new.</span></p></div>
<p class="garden-status visually-hidden" aria-live="polite"></p>
</section>
<div class="rooted-bottom"><span>© <?php echo esc_html(wp_date('Y')); ?> ANZ Landscaping</span><nav aria-label="Legal"><?php foreach(['privacy-policy'=>'Privacy','terms-and-condition'=>'Terms','cancellation-refund-policy'=>'Cancellation & refund','payment-security'=>'Payment & security'] as $slug=>$label) { ?><a href="<?php echo anz_url('/'.$slug.'/'); ?>"><?php echo esc_html($label); ?></a><?php } ?></nav></div>
</div></footer>
<?php wp_footer(); ?></body></html>
