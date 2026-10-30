import {chromium,webkit} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const results=[];
for(const engine of ['edge','webkit']){
 const b=engine==='edge'?await chromium.launch({channel:'msedge'}):await webkit.launch();const c=await b.newContext({reducedMotion:'reduce',viewport:{width:1440,height:1000}});const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:8765/contact-us/',{waitUntil:'networkidle'});
 for(const width of [1440,768,390,320]){
  await p.setViewportSize({width,height:1000});await p.waitForTimeout(150);
  const form=p.locator('#forminator-module-3743');results.push({engine,width,visible:await form.isVisible(),instances:await form.count(),fallbacks:await p.locator('.form-fallback').count(),overflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),name:await form.locator('input[name="name-1"]').count(),phone:await form.locator('input[name="phone-1"]').count()});
  if(width===1440||width===390){await p.locator('.original-form-card').screenshot({path:`qa/${engine}-original-form-${width}.png`,style:'.site-header{visibility:hidden!important}'});const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();results.push({engine,width,axe:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});}
 }
 results.push({engine,errors});await b.close();
}
const failures=results.filter(r=>r.visible===false||r.instances===0||r.instances>1||r.fallbacks>0||r.overflow||r.name===0||r.phone===0||r.axe?.length||r.errors?.length);await fs.writeFile('qa/original-form-ui-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({checks:results.length,failures},null,2));if(failures.length)process.exitCode=1;
