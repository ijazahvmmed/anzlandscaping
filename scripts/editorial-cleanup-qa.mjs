import {chromium,webkit} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const catalogue=JSON.parse(await fs.readFile('wordpress/wp-content/themes/anz-2027/inc/catalogue.json','utf8'));const frp=catalogue.find(p=>p.id===1329).path;
const results=[];
for(const engine of ['edge','webkit']){
 const b=engine==='edge'?await chromium.launch({channel:'msedge'}):await webkit.launch();const c=await b.newContext({reducedMotion:'reduce',viewport:{width:1440,height:1000}});const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/','/workplace-greenery/','/services/',frp]){
  await p.goto('http://127.0.0.1:8765'+path,{waitUntil:'networkidle'});
  for(const width of [1440,390,320]){
   await p.setViewportSize({width,height:1000});await p.waitForTimeout(120);
   const state=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,framed:[...document.querySelectorAll('svg.photo-framed')].map(el=>({box:el.getAttribute('viewBox'),source:el.getAttribute('data-photo-source'),width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height})),noise:document.body.innerText.match(/Nature, precisely placed|A living framework|One practice\. Two perspectives|A greener working day|The living workplace|Different scales\. The same care|Material matters|A little more nature\. A little more life/g),badges:document.querySelectorAll('.image-tag,.scene-count').length}));results.push({engine,path,width,...state});
  }
  await p.setViewportSize({width:1440,height:1000});const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();results.push({engine,path,axe:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
  if(path==='/'){await p.locator('img').evaluateAll(imgs=>{imgs.forEach(img=>img.loading='eager');return Promise.all(imgs.map(img=>img.decode().catch(()=>{})));});await p.locator('.home-approach').screenshot({path:`qa/${engine}-clean-workplace.png`,style:'.site-header{visibility:hidden!important}'});await p.locator('.original-services').screenshot({path:`qa/${engine}-clean-declaration.png`,style:'.site-header{visibility:hidden!important}'});}
  if(path==='/services/'){
   const links=p.locator('[data-preview]');await links.first().focus();await p.waitForTimeout(350);const preview=await p.locator('.directory-photo').first().evaluate(el=>!!el.querySelector('img,svg.photo-framed'));results.push({engine,preview});
  }
 }
 await p.emulateMedia({reducedMotion:'no-preference'});await p.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});await p.locator('.home-approach').scrollIntoViewIfNeeded();await p.waitForTimeout(1300);await p.locator('.home-approach').hover();const customCursor=await p.locator('.custom-cursor').count();results.push({engine,customCursor,errors});await b.close();
}
const failures=results.filter(r=>r.overflow||r.noise||r.badges>0||r.axe?.length||r.preview===false||r.customCursor>0||r.errors?.length||r.framed?.some(f=>f.box!=='300 0 1000 1000'));await fs.writeFile('qa/editorial-cleanup-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({checks:results.length,failures},null,2));if(failures.length)process.exitCode=1;
