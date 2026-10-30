<?php
$s=get_query_var('anz_item');
$briefs=[
721=>['Terrace garden planning',['Structural suitability and permitted load','Waterproofing and drainage condition','Access for installation and long-term care']],
1301=>['Vertical garden requirements',['Available light and plant suitability','Support, irrigation and drainage','Access to maintain the planting']],
1303=>['Villa landscape planning',['Places to gather, play or simply pause','Retained trees and existing garden features','Planting and maintenance preferences']],
1307=>['Pergola and roofing requirements',['How the garden relates to the architecture','Your material and planting preferences','The ongoing care the design will need']],
1309=>['Pool project requirements',['Pool design and engineering responsibilities','Equipment, safety and cleaning access','Surrounding surfaces and landscape integration']],
1311=>['Water feature requirements',['Feature location, scale and water supply','Circulation, filtration and cleaning access','Power, safety and ongoing maintenance']],
1315=>['Commercial landscape requirements',['Site plans, zones and access restrictions','Stakeholder approvals and working hours','Execution priorities and maintenance scope']],
1317=>['Irrigation requirements',['Available water source and existing lines','Planting zones and watering needs','Access for inspection and repairs']],
1319=>['Planting requirements',['Light and soil conditions','Plant growth, spacing and water needs','The level of care available after planting']],
1321=>['Hardscape requirements',['Surface use, circulation and accessibility','Levels, drainage and existing structures','Material finish and upkeep']],
1323=>['Moss wall requirements',['Confirm whether the proposed moss is living or preserved','Agree wall preparation and installation details','Check light, water and care requirements for that product']],
1325=>['Garden maintenance requirements',['The planting, lawn and garden areas included','Agreed tasks and visit frequency','How replacement, extra work and access are handled']],
1327=>['Plant rental requirements',['Plant quantities, planter choices and placement','Rental duration and the agreed care schedule','Replacement terms, access and any exclusions']],
1329=>['Planter requirements',['Current sizes, finishes and availability','Indoor or outdoor product suitability','Plant size, drainage and placement requirements']]];
if($s['id']===1305): $materials=[[3804,'Glass'],[3810,'Mangalore tile'],[3809,'Polycarbonate'],[3811,'Shingle roof'],[3806,'Wood'],[3807,'Retractable']]; ?>
<section class="service-artifact section-pad"><div class="material-selector"><figure><?php anz_photo(3804,'Glass pergola — ANZ service range'); ?></figure><div><h2 class="blur-reveal">Pergola and roofing materials</h2><p>Explore the existing ANZ pergola range. Confirm current material availability, structural requirements and the final specification for your site.</p><div class="material-controls"><?php foreach($materials as $n=>$material): ?><button aria-pressed="<?php echo $n===0?'true':'false'; ?>" data-material="<?php echo esc_url(anz_media($material[0])); ?>" data-alt="<?php echo esc_attr($material[1].' pergola — ANZ service range'); ?>"><?php echo esc_html($material[1]); ?></button><?php endforeach; ?></div></div></div></section>
<?php elseif(isset($briefs[$s['id']])):$brief=$briefs[$s['id']]; ?>
<section class="brief-list section-pad"><h2 class="blur-reveal"><?php echo esc_html($brief[0]); ?></h2><div><p>Useful details to share when we talk about your <?php echo esc_html(strtolower($s['title'])); ?> requirements.</p><ul><?php foreach($brief[1] as $line):?><li><?php echo esc_html($line); ?></li><?php endforeach; ?></ul><?php anz_link('/contact-us/?service='.rawurlencode($s['title']),'Share your brief'); ?></div></section>
<?php endif; ?>
