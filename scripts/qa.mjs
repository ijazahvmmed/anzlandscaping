import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const base='http://127.0.0.1:8765';
const seed=JSON.parse(await fs.readFile('content-migration/local-seed.json','utf8'));
const all=JSON.parse(await fs.readFile('content-migration/page-summary.json','utf8'));
const paths=[...all.map(p=>p.id===10?'/':p.path),'/workplace-greenery/','/landscape-design-execution/'];
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
const page=await context.newPage();
const routeResults=[];
for(const path of paths){
 const errors=[];const onError=e=>errors.push(e.message);page.on('pageerror',onError);
 const response=await page.goto(base+path,{waitUntil:'networkidle'});
 await page.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));
 await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode().catch(()=>{}))));
 const result=await page.evaluate(()=>({title:document.title,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent),overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),canonical:document.querySelector('link[rel=canonical]')?.href,robots:document.querySelector('meta[name=robots]')?.content}));
 routeResults.push({path,status:response.status(),...result,errors});page.off('pageerror',onError);
}
await fs.writeFile('qa/routes.json',JSON.stringify(routeResults,null,2));
const reps=['/','/workplace-greenery/','/services/plant-rentals-services-bangalore/','/projects/','/projects/bhive-premium/','/contact-us/'];
const responsive=[];const accessibility=[];
for(const path of reps){
 for(const width of [1920,1440,1280,1024,768,430,390,360,320]){
  await page.setViewportSize({width,height:width<768?844:900});await page.goto(base+path,{waitUntil:'networkidle'});
  responsive.push({path,width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
 }
 await page.setViewportSize({width:1440,height:900});await page.goto(base+path,{waitUntil:'networkidle'});
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 accessibility.push({path,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
}
// Exercise actual filter state, modal focus restoration and mobile menu keyboard handling.
await page.goto(base+'/projects/');await page.getByRole('button',{name:'Commercial',exact:true}).click();
const commercial=await page.locator('.portfolio .project-tile:visible').count();
await page.goto(base+'/projects/bhive-premium/');await page.locator('.gallery-open').first().click();
const lightbox=await page.locator('.lightbox').evaluate(d=>d.open);await page.keyboard.press('ArrowRight');await page.keyboard.press('Escape');
const focusReturned=await page.evaluate(()=>document.activeElement.classList.contains('gallery-open'));
await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Menu',exact:false}).click();const menu=await page.locator('.mobile-menu').evaluate(d=>d.open);await page.keyboard.press('Escape');await page.waitForTimeout(450);const menuClosed=await page.locator('.mobile-menu').evaluate(d=>!d.open);
const notFound=await page.goto(base+'/this-page-does-not-exist/');const code404=notFound.status();
await page.close();await context.close();
const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(base+'/');const nojsH1=await nojs.locator('h1').innerText();await nojs.close();
await browser.close();
const results={routes:routeResults,responsive,accessibility,interaction:{commercial,lightbox,focusReturned,menu,menuClosed,code404,nojsH1}};
await fs.writeFile('qa/results.json',JSON.stringify(results,null,2));
console.log(JSON.stringify({routes:routeResults.length,routeFailures:routeResults.filter(r=>r.status!==200||r.overflow||r.brokenImages.length||r.h1.length!==1),responsiveFailures:responsive.filter(r=>r.overflow),accessibility:accessibility.map(r=>({path:r.path,violations:r.violations.map(v=>v.id)})),interaction:results.interaction},null,2));
