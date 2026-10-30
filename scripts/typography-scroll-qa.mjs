import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge'});
const context=await browser.newContext({viewport:{width:1440,height:900}});
const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
const smoothing=[];
for(const width of [1440,768,390]){
 await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});await page.locator('.scroll-progress').waitFor({state:'attached'});await page.waitForTimeout(500);
 const initialized=await page.evaluate(()=>document.documentElement.classList.contains('lenis'));
 await page.mouse.wheel(0,600);await page.waitForTimeout(40);const early=await page.evaluate(()=>scrollY);await page.waitForTimeout(220);const middle=await page.evaluate(()=>scrollY);await page.waitForTimeout(1100);const settled=await page.evaluate(()=>scrollY);
 smoothing.push({width,initialized,early,middle,settled,interpolates:early<middle&&middle<settled});
}
await page.getByRole('button',{name:'Menu',exact:false}).click();await page.waitForTimeout(100);const modalStopped=await page.evaluate(()=>document.documentElement.classList.contains('lenis-stopped'));await page.keyboard.press('Escape');await page.waitForTimeout(500);const resumed=await page.evaluate(()=>!document.documentElement.classList.contains('lenis-stopped'));
const responsive=[];const sizes=[];
await page.emulateMedia({reducedMotion:'reduce'});
for(const path of ['/','/workplace-greenery/','/services/plant-rentals-services-bangalore/','/projects/','/projects/bhive-premium/','/contact-us/']){
 for(const width of [1440,1024,768,430,390,360,320]){
  await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:8765'+path,{waitUntil:'networkidle'});
  const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:parseFloat(getComputedStyle(document.querySelector('h1')).fontSize),h2:document.querySelector('h2')?parseFloat(getComputedStyle(document.querySelector('h2')).fontSize):null}));
  responsive.push({path,width,...result});if(width===1440||width===390)sizes.push({path,width,...result});
 }
}
await page.setViewportSize({width:1440,height:900});await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});const reduced=await page.evaluate(()=>!document.documentElement.classList.contains('lenis'));
const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
const result={smoothing,modalStopped,resumed,reducedMotionUsesNativeScroll:reduced,responsive,sizes,axeViolations:axe.violations.map(v=>({id:v.id,nodes:v.nodes.length})),errors};
await fs.writeFile('qa/typography-scroll-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify({...result,responsive:undefined},null,2));
await context.close();await browser.close();
