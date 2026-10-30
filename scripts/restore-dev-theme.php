<?php
if(PHP_SAPI!=='cli')exit;require dirname(__DIR__).'/.local/wordpress/wp-load.php';
if(wp_get_environment_type()==='local'){switch_theme('anz-2027');echo 'Editable development theme restored.'.PHP_EOL;}
