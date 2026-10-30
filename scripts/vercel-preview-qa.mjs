import {chromium} from '@playwright/test';
import {readFile,writeFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),output=path.join(root,'dist/site');
const {routes}=JSON.parse(await readFile(path.join(root,'preview/manifest.json'),'utf8'));
const failures=[],results=[];
const browser=await chromium.launch({channel:'msedge'});
try{
 const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();
 for(const route of routes){
  const html=await readFile(path.join(output,route.slice(1),'index.html'),'utf8');
  if(/127\.0\.0\.1|localhost|<form\b|admin-ajax\.php|wp-json\//i.test(html))failures.push({route,error:'WordPress runtime/localhost leak'});
  const response=await page.request.get('http://127.0.0.1:8766'+route);if(response.status()!==200)failures.push({route,status:response.status()});
  results.push({route,status:response.status()});
 }
 const errors=[],requestFailures=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)requestFailures.push({url:r.url(),status:r.status()});});
 await page.goto('http://127.0.0.1:8766/',{waitUntil:'networkidle'});
 await page.locator('img').evaluateAll(imgs=>{imgs.forEach(i=>i.loading='eager');return Promise.all(imgs.map(i=>i.decode().catch(()=>{})));});
 const brokenImages=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.naturalWidth).map(i=>i.src));
 const layouts=[];for(const width of [1440,390,320]){await page.setViewportSize({width,height:1000});layouts.push({width,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});}
 await page.getByRole('button',{name:'Menu',exact:false}).click();const drawer=await page.locator('.mobile-menu').evaluate(d=>d.open);await page.keyboard.press('Escape');
 await page.locator('.home-questions details').first().locator('summary').click();const faq=await page.locator('.home-questions details').first().evaluate(d=>d.open);
 const noForms=await page.locator('form').count()===0;
 await page.emulateMedia({reducedMotion:'no-preference'});await page.reload({waitUntil:'networkidle'});await page.locator('video').scrollIntoViewIfNeeded();await page.waitForFunction(()=>{const v=document.querySelector('video');return !v.paused&&v.currentTime>0;});const videoPlaying=true;
 if(errors.length||requestFailures.length||brokenImages.length||layouts.some(l=>l.overflow)||!drawer||!faq||!noForms)failures.push({errors,requestFailures,brokenImages,layouts,drawer,faq,noForms});
 await access(path.join(output,'404.html'));const robots=await readFile(path.join(output,'robots.txt'),'utf8');if(!robots.includes('Disallow: /'))failures.push({robots});
 const phpFiles=[];async function scan(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())await scan(file);else if(file.endsWith('.php')||file.endsWith('.zip'))phpFiles.push(file);}}await scan(output);if(phpFiles.length)failures.push({phpFiles});
 const report={routes:results,layouts,drawer,faq,noForms,videoPlaying,errors,requestFailures,brokenImages,phpFiles,failures};await writeFile(path.join(root,'qa/vercel-preview-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({pages:results.length,layouts,drawer,faq,noForms,videoPlaying,failures},null,2));
}finally{await browser.close();}
if(failures.length)process.exitCode=1;
