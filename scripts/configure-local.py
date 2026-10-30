from pathlib import Path
import shutil,secrets
R=Path(__file__).resolve().parents[1];W=R/'.local/wordpress'
shutil.copy(W/'wp-content/plugins/sqlite-database-integration/db.copy',W/'wp-content/db.php')
salts='\n'.join("define('%s', '%s');"%(k,secrets.token_hex(32)) for k in ['AUTH_KEY','SECURE_AUTH_KEY','LOGGED_IN_KEY','NONCE_KEY','AUTH_SALT','SECURE_AUTH_SALT','LOGGED_IN_SALT','NONCE_SALT'])
cfg="""<?php
define('DB_NAME','anz_local');define('DB_USER','local');define('DB_PASSWORD','');define('DB_HOST','localhost');
define('DB_CHARSET','utf8');define('DB_COLLATE','');
define('WP_HOME','http://127.0.0.1:8765');define('WP_SITEURL','http://127.0.0.1:8765');
define('WP_ENVIRONMENT_TYPE','local');define('WP_DEBUG',true);define('WP_DEBUG_LOG',true);define('WP_DEBUG_DISPLAY',false);
define('DISABLE_WP_CRON',true);define('WP_HTTP_BLOCK_EXTERNAL',true);
"""+salts+"\n$table_prefix='anz_';\ndefine('ABSPATH',__DIR__.'/');require_once ABSPATH.'wp-settings.php';\n"
cfg=cfg.replace("define('ABSPATH',__DIR__.'/');", "if(!defined('ABSPATH')) define('ABSPATH',__DIR__.'/');")
(W/'wp-config.php').write_text(cfg)
print('Configured isolated local SQLite WordPress.')
