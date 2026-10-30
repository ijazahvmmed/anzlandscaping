<?php $icon=get_query_var('anz_icon',0); ?>
<svg class="botanical-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<?php if($icon===0): ?><path d="M20 35V17M20 24C8 24 6 18 7 7C19 7 23 13 20 24ZM20 19C20 9 25 5 35 6C35 16 29 20 20 19Z"/>
<?php elseif($icon===1): ?><path d="M10 18H30L27 36H13L10 18ZM20 18V6M20 13C13 13 10 8 10 3C17 3 20 7 20 13ZM20 11C22 5 27 3 32 4C31 10 27 14 20 13M7 18H33"/>
<?php else: ?><path d="M20 3C17 10 9 17 9 25A11 11 0 0 0 31 25C31 17 23 10 20 3ZM15 24C14 28 16 31 20 32"/>
<?php endif; ?></svg>
