import {chromium,webkit} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const results=[];
for(const engine of ['edge','webkit']){
 const b=engine==='edge'?await chromium.launch({channel:'msedge'}):await webkit.launch();const c=await b.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
 for(const width of [1440,1024,768,390,320]){
  await p.setViewportSize({width,height:1000});await p.waitForTimeout(150);await p.locator('.landscape-footer').scrollIntoViewIfNeeded();
  const layout=await p.locator('.landscape-footer').evaluate(el=>{const r=el.getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth,footerOverflow:el.scrollWidth>el.clientWidth+1,links:[...el.querySelectorAll('a')].filter(a=>{const b=a.getBoundingClientRect();return b.left<r.left-1||b.right>r.right+1;}).map(a=>a.textContent),legal:el.querySelectorAll('[aria-label="Legal"] a').length,contact:el.querySelector('a[href="mailto:contact@anzlandscaping.in"]')!==null};});
  results.push({engine,width,...layout});
  if(width===1440||width===390){await p.locator('.landscape-footer').screenshot({path:`qa/${engine}-footer-${width}.png`,style:'.site-header{visibility:hidden!important}'});const axe=await new AxeBuilder({page:p}).include('.landscape-footer').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();results.push({engine,width,axe:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});}
 }
 await p.setViewportSize({width:1440,height:1000});await p.emulateMedia({reducedMotion:'no-preference'});await p.reload({waitUntil:'networkidle'});await p.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await p.waitForTimeout(2200);
 const revealed=await p.locator('.rooted-invitation').evaluate(el=>getComputedStyle(el).opacity==='1');await p.locator('.rooted-top').click();await p.waitForTimeout(2200);const top=await p.evaluate(()=>scrollY<150);results.push({engine,revealed,backToTop:top,errors});
 await b.close();
}
const failures=results.filter(r=>r.overflow||r.footerOverflow||r.links?.length||r.legal===0||r.contact===false||r.axe?.length||r.revealed===false||r.backToTop===false||r.errors?.length);await fs.writeFile('qa/footer-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({checks:results.length,failures},null,2));if(failures.length)process.exitCode=1;
