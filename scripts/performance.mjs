import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const b=await chromium.launch({channel:'msedge'});const p=await b.newPage({viewport:{width:1440,height:900}});
await p.addInitScript(()=>{
 window.__anzLab={lcp:0,cls:0};
 new PerformanceObserver(list=>{for(const e of list.getEntries())window.__anzLab.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
 new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__anzLab.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
});
await p.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});await p.waitForTimeout(3000);
const result=await p.evaluate(()=>({...window.__anzLab,navigation:performance.getEntriesByType('navigation').map(e=>({ttfb:e.responseStart,domContentLoaded:e.domContentLoadedEventEnd,load:e.loadEventEnd})),transferBytes:performance.getEntriesByType('resource').reduce((sum,e)=>sum+e.transferSize,0),fontLoaded:document.fonts.check('16px Satoshi'),context:'Single local Edge headless run, desktop 1440x900, no throttling; not field CWV, not Lighthouse, no INP claim'}));
await fs.writeFile('qa/performance.json',JSON.stringify(result,null,2));console.log(result);await b.close();
