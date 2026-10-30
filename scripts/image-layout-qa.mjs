import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge'});const page=await browser.newPage({reducedMotion:'reduce'});const results=[];
for(const width of [1440,1024,768,390,320]){
 await page.setViewportSize({width,height:900});
 for(const path of ['/','/projects/','/projects/bhive-premium/']){
  await page.goto('http://127.0.0.1:8765'+path,{waitUntil:'networkidle'});
  const measurements=await page.evaluate(()=>{
   const center=selector=>{const el=document.querySelector(selector);if(!el)return null;const r=el.getBoundingClientRect();return {width:r.width,left:r.left,right:innerWidth-r.right,centerError:Math.abs((r.left+r.width/2)-innerWidth/2)};};
   const cards=[...document.querySelectorAll('.project-grid>.project-tile')].slice(0,2).map(el=>el.getBoundingClientRect().width);
   const photos=[...document.querySelectorAll('.photo-frame img,.project-gallery img,.project-cover img,.hero-photo img')].map(el=>({fit:getComputedStyle(el).objectFit,position:getComputedStyle(el).objectPosition}));
   return {overflow:document.documentElement.scrollWidth>innerWidth,hero:center('.hero-photo'),cover:center('.project-cover'),cards,equalCards:cards.length<2||Math.abs(cards[0]-cards[1])<1,photos};
  });results.push({width,path,...measurements});
 }
}
await fs.writeFile('qa/image-layout-results.json',JSON.stringify(results,null,2));console.log(JSON.stringify({cases:results.length,failures:results.filter(r=>r.overflow||!r.equalCards||(r.hero&&r.hero.centerError>1)||(r.cover&&r.cover.centerError>1)||r.photos.some(p=>p.fit!=='cover'))},null,2));await browser.close();
