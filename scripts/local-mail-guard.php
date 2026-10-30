<?php
/** Plugin Name: ANZ local mail guard — local preview only */
defined('ABSPATH')||exit;
add_filter('pre_wp_mail',function($result,$attributes){
    if(wp_get_environment_type()==='local'){
        error_log('ANZ LOCAL: blocked outbound mail; no message transmitted.');
        return false;
    }
    return $result;
},PHP_INT_MAX,2);
