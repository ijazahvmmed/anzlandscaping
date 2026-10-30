// Run locally after PHP/content changes; Vercel builds require neither PHP nor a database.
import {chromium} from '@playwright/test';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const origin=process.env.ANZ_PREVIEW_ORIGIN||'http://127.0.0.1:8765';
const records=JSON.parse(await readFile(path.join(root,'content-migration/page-summary.json'),'utf8'));
const routes=[...new Set([...records.map(p=>p.id===10?'/':p.path),'/workplace-greenery/','/landscape-design-execution/'])];
const browser=await chromium.launch({channel:process.env.ANZ_BROWSER_CHANNEL||'msedge'});
try{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.route('**/*',r=>r.abort());
 for(const route of (process.argv.includes('--home-only')?['/']:[...routes,'/this-page-does-not-exist/'])){
  const response=await fetch(origin+route);if(response.status!==(routes.includes(route)?200:404))throw new Error(`Unexpected response ${response.status} for ${route}`);
  await page.setContent(await response.text(),{waitUntil:'domcontentloaded'});
  await page.evaluate(({origin,route})=>{
   // Strip WordPress endpoints, plugin bootstraps, nonces and operational forms.
   document.querySelectorAll('script').forEach(el=>{if(el.type!=='application/ld+json'&&!el.src.includes('/themes/anz-2027/assets/dist/main.js'))el.remove();});
   document.querySelectorAll('link').forEach(el=>{if(el.href.includes('/wp-includes/')||el.href.includes('/plugins/')||el.href.includes('/forminator/')||/wp-json|wp-admin|xmlrpc\.php/.test(el.href)||['https://api.w.org/','EditURI'].includes(el.rel))el.remove();});
   document.querySelectorAll('[data-original-form],.anz-lead-form,form').forEach(el=>{
    if(!el.isConnected)return;
    const fallback=document.createElement('div');fallback.className='form-fallback';fallback.innerHTML='<p>This preview accepts enquiries by phone or email.</p><a class="button" href="tel:+919845292729">Call +91 98452 92729 <span aria-hidden="true">↗</span></a><p><a href="mailto:contact@anzlandscaping.in">contact@anzlandscaping.in</a></p>';el.replaceWith(fallback);
   });
   document.querySelectorAll('.original-assistance>div:first-child>p').forEach(el=>{if(el.textContent.includes('Fill out the form'))el.textContent='We’re here to help you find the right solution. Call or email the team to discuss your space.';});
   document.querySelectorAll('.original-form-card>p,.privacy-note').forEach(el=>{if(/Leave your name|before submitting/.test(el.textContent))el.remove();});
   document.querySelectorAll('.home-question-list details').forEach(el=>{if(el.querySelector('summary')?.textContent.includes('How can I request')){const answer=el.querySelector('p');if(answer)answer.textContent='Call +91 98452 92729 or email contact@anzlandscaping.in. Share your site location, service requirements and budget with the team.';}});
   document.querySelectorAll('meta[name="robots"]').forEach(el=>el.remove());const robots=document.createElement('meta');robots.name='robots';robots.content='noindex, nofollow';document.head.append(robots);
   document.querySelectorAll('link[rel="canonical"]').forEach(el=>el.setAttribute('href','https://anzlandscaping.in'+(route==='/this-page-does-not-exist/'?'/':route)));
   document.querySelectorAll('script[type="application/ld+json"]').forEach(el=>el.remove());
   const walker=document.createTreeWalker(document,NodeFilter.SHOW_COMMENT);const comments=[];while(walker.nextNode())comments.push(walker.currentNode);comments.forEach(el=>el.remove());
   document.documentElement.classList.remove('js-enabled');
  },{origin,route});
  const html='<!doctype html>\n'+(await page.locator('html').evaluate(el=>el.outerHTML)).replaceAll(origin,'');
  if(/localhost|127\.0\.0\.1|<form\b|admin-ajax\.php|wp-json\//i.test(html))throw new Error(`Unsafe runtime reference in ${route}`);
  const target=path.join(root,'preview/pages',route==='/this-page-does-not-exist/'?'404.html':route.slice(1),'index.html');
  const destination=route==='/this-page-does-not-exist/'?path.join(root,'preview/pages/404.html'):target;
  await mkdir(path.dirname(destination),{recursive:true});await writeFile(destination,html);
 }
 await writeFile(path.join(root,'preview/manifest.json'),JSON.stringify({generatedAt:new Date().toISOString(),runtime:'Static review only; WordPress forms and administration require WordPress hosting',routes},null,2));
 console.log(process.argv.includes('--home-only')?'Refreshed homepage snapshot; other existing routes retained.':`Exported ${routes.length} preview pages and 404.`);
}finally{await browser.close();}
