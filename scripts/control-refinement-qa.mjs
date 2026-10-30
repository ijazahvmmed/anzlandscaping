import {chromium,webkit} from '@playwright/test';
import fs from 'node:fs/promises';
const results=[];
for(const engine of ['edge','webkit']){
 const browser=engine==='edge'?await chromium.launch({channel:'msedge'}):await webkit.launch();
 const page=await browser.newPage({viewport:{width:1440,height:1100}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});await page.waitForTimeout(1700);
 for(const width of [1440,390,320]){
  await page.setViewportSize({width,height:width===1440?1100:844});await page.mouse.move(0,0);await page.waitForTimeout(700);
  for(const selector of ['.hero-copy>.split-button','.header-cta']){
   const button=page.locator(selector);
   const measure=()=>button.evaluate(el=>{const r=el.getBoundingClientRect(),p=getComputedStyle(el,'::before'),label=el.querySelector('.button-label').getBoundingClientRect(),icon=el.querySelector('.button-icon').getBoundingClientRect();return {panelWidth:parseFloat(p.width),rightInset:parseFloat(p.right),transform:p.transform,panelInside:parseFloat(p.width)+parseFloat(p.right)<r.width,labelGap:icon.left-label.right,overflow:document.documentElement.scrollWidth>innerWidth};});
   const rest=await measure();await button.hover();await page.waitForTimeout(160);const entering=await measure();await page.waitForTimeout(550);const hover=await measure();
   results.push({engine,width,selector,rest,entering,hover});
   await page.mouse.move(0,0);await page.waitForTimeout(650);
  }
  if(width===1440){await page.screenshot({path:`qa/${engine}-refined-controls.png`});await page.locator('.nav-expand').first().focus();await page.locator('.nav-expand').first().press('Enter');await page.waitForTimeout(500);const vector=await page.locator('.nav-expand svg').count();const expanded=await page.locator('.nav-expand').first().getAttribute('aria-expanded');if(vector!==2||expanded!=='true')throw Error(`Chevron disclosure failed: ${vector}, ${expanded}`);await page.keyboard.press('Escape');await page.waitForTimeout(450);}
 }
 if(errors.length)throw Error(errors.join('\n'));await browser.close();
}
const failures=results.filter(r=>[r.rest,r.entering,r.hover].some(s=>!s.panelInside||s.rightInset<4||s.transform!=='none'||s.labelGap<5||s.overflow));
await fs.writeFile('qa/control-refinement-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({cases:results.length,failures},null,2));if(failures.length)process.exitCode=1;
