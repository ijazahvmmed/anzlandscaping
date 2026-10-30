import {chromium,webkit} from '@playwright/test';
import fs from 'node:fs/promises';
const results=[];
for(const engine of ['edge','webkit']){
 const b=engine==='edge'?await chromium.launch({channel:'msedge'}):await webkit.launch();const p=await b.newPage({reducedMotion:'reduce',viewport:{width:1440,height:1000}});
 await p.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
 for(const width of [1920,1440,1024,951,950,768,390,360,320]){
  await p.setViewportSize({width,height:1000});await p.waitForTimeout(120);
  const geometry=await p.evaluate(()=>{
   const logos=[...document.querySelectorAll('.brand-art')].map(svg=>{const r=svg.getBoundingClientRect(),wrapper=svg.parentElement.getBoundingClientRect(),matrix=svg.getScreenCTM();const a=new DOMPoint(193,120).matrixTransform(matrix),z=new DOMPoint(976,553).matrixTransform(matrix);return {complete:a.x>=wrapper.left&&a.y>=wrapper.top&&z.x<=wrapper.right&&z.y<=wrapper.bottom,width:r.width,height:r.height,visible:getComputedStyle(svg.parentElement).overflow==='visible'};});
   const controls=[...document.querySelector('.site-header').children].map(el=>el.getBoundingClientRect()).filter(r=>r.width&&r.height).sort((a,b)=>a.left-b.left);const overlap=controls.some((r,n)=>n&&r.left<controls[n-1].right-1);
   return {logos,overlap,overflow:document.documentElement.scrollWidth>innerWidth};
  });results.push({engine,width,...geometry});
  if([1440,390,320].includes(width))await p.locator('.site-header').screenshot({path:`qa/${engine}-brand-header-${width}.png`});
 }
 await p.locator('.rooted-logo').screenshot({path:`qa/${engine}-brand-footer.png`,style:'.site-header{visibility:hidden!important}'});await b.close();
}
const failures=results.filter(r=>r.overlap||r.overflow||r.logos.length!==2||r.logos.some(l=>!l.complete||!l.visible));await fs.writeFile('qa/brand-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({cases:results.length,failures},null,2));if(failures.length)process.exitCode=1;
