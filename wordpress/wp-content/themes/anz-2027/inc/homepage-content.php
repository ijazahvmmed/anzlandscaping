<?php
defined('ABSPATH')||exit;
function anz_home_content(){static $data;if($data===null)$data=json_decode(file_get_contents(__DIR__.'/home-content.json'),true)?:[];return $data;}
function anz_home_asset_url($id){$asset=anz_home_content()['assets'][(string)$id]??null;return $asset?get_template_directory_uri().'/'.$asset['file']:'';}
function anz_home_asset($id,$alt,$class=''){$asset=anz_home_content()['assets'][(string)$id]??null;if(!$asset)return;$path=get_template_directory().'/'.$asset['file'];$size=getimagesize($path);printf('<img src="%s" alt="%s" class="%s" width="%d" height="%d" loading="lazy" decoding="async">',esc_url(anz_home_asset_url($id)),esc_attr($alt),esc_attr($class),$size[0],$size[1]);}
add_filter('pre_get_document_title',function($title){return is_front_page()&&!defined('WPSEO_VERSION')&&!defined('RANK_MATH_VERSION')?anz_home_content()['seo']['title']:$title;},20);
add_filter('wpseo_title',function($title){return is_front_page()?anz_home_content()['seo']['title']:$title;});
add_action('wp_head',function(){
 if(!is_front_page()||defined('WPSEO_VERSION')||defined('RANK_MATH_VERSION'))return;
 $data=anz_home_content();$url=home_url('/');$id=$url.'#business';
 $offers=[];foreach($data['services'] as $service)$offers[]=['@type'=>'Offer','itemOffered'=>['@type'=>'Service','name'=>$service['title'],'description'=>$service['description'],'url'=>home_url($service['path']),'provider'=>['@id'=>$id]]];
 $business=['@type'=>'LocalBusiness','@id'=>$id,'name'=>'ANZ Landscaping','url'=>$url,'logo'=>anz_media('logo-colour'),'image'=>get_template_directory_uri().'/assets/media/video/landscape-hero-poster.webp','description'=>$data['seo']['description'],'telephone'=>'+91 98452 92729','email'=>'contact@anzlandscaping.in','address'=>['@type'=>'PostalAddress','streetAddress'=>'2948, 6th Cross Road, HAL 2nd Stage, Indiranagar','addressLocality'=>'Bengaluru','addressRegion'=>'Karnataka','postalCode'=>'560008','addressCountry'=>'IN'],'areaServed'=>['@type'=>'City','name'=>'Bengaluru'],'hasOfferCatalog'=>['@type'=>'OfferCatalog','name'=>'Landscaping services','itemListElement'=>$offers]];
 $questions=[];foreach($data['faq'] as $faq)$questions[]=['@type'=>'Question','name'=>$faq['question'],'acceptedAnswer'=>['@type'=>'Answer','text'=>$faq['answer']]];
 $graph=['@context'=>'https://schema.org','@graph'=>[$business,['@type'=>'WebSite','@id'=>$url.'#website','url'=>$url,'name'=>'ANZ Landscaping','publisher'=>['@id'=>$id]],['@type'=>'FAQPage','@id'=>$url.'#questions','url'=>$url.'#questions','mainEntity'=>$questions]]];
 echo '<script type="application/ld+json" id="anz-home-schema">'.wp_json_encode($graph,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_HEX_QUOT).'</script>'."\n";
},30);
