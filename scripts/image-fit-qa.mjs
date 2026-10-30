import {chromium,webkit} from '@playwright/test';
import fs from 'node:fs/promises';
const results=[];
for(const engine of ['edge','webkit']){
 const browser=engine==='edge'?await chromium.launch({channel:'msedge'}):await webkit.launch();
 const page=await browser.newPage({reducedMotion:'reduce',viewport:{width:1440,height:1000}});
 for(const path of ['/','/projects/','/projects/bhive-premium/','/workplace-greenery/']){
  await page.goto('http://127.0.0.1:8765'+path,{waitUntil:'networkidle'});
  for(const width of [1440,390,320]){
   await page.setViewportSize({width,height:1000});
   await page.waitForTimeout(150);
   const photos=await page.locator('.photo-frame img,.project-cover img,.project-gallery img,.pillar-image img,.pillar-hero figure img,.scene-frame>img,.collage-images img,.mega-menu img').evaluateAll(imgs=>imgs.map(img=>{const s=getComputedStyle(img),r=img.getBoundingClientRect();return {fit:s.objectFit,position:s.objectPosition,width:r.width,height:r.height};}).filter(p=>p.width&&p.height));
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);results.push({engine,path,width,photos,overflow});
  }
  if(path==='/projects/'&&engine==='edge'){
   await page.setViewportSize({width:1440,height:850});
   await page.locator('img').evaluateAll(imgs=>{imgs.forEach(img=>img.loading='eager');return Promise.all(imgs.map(img=>img.decode().catch(()=>{})));});
   await page.waitForTimeout(200);
   await page.locator('.project-grid').first().screenshot({path:'qa/fitted-project-images.png',style:'.site-header{visibility:hidden!important}'});
  }
 }
 // Full original photographs remain available in the project viewer.
 await page.setViewportSize({width:390,height:844});
 await page.goto('http://127.0.0.1:8765/projects/bhive-premium/',{waitUntil:'networkidle'});await page.locator('.gallery-open').first().click();
 const fullPhoto=await page.locator('.lightbox img').evaluate(img=>getComputedStyle(img).objectFit);if(fullPhoto!=='contain')throw Error('Full-photo viewer must preserve entire photograph');
 await browser.close();
}
const failures=results.filter(r=>r.overflow||r.photos.some(p=>p.fit!=='cover'||p.position!=='50% 50%'));
await fs.writeFile('qa/image-fit-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({cases:results.length,failures},null,2));if(failures.length)process.exitCode=1;
