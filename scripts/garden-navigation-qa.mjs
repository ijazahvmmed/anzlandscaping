import {chromium,webkit} from '@playwright/test';
import fs from 'node:fs/promises';
const results=[];
for(const engine of ['edge','webkit']){
 const b=engine==='edge'?await chromium.launch({channel:'msedge'}):await webkit.launch();const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const p=await c.newPage();
 await p.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});await p.locator('.footer-playground').scrollIntoViewIfNeeded();await p.getByRole('button',{name:'Plant a little green',exact:false}).click();
 await p.goto('http://127.0.0.1:8765/projects/',{waitUntil:'networkidle'});await p.goBack({waitUntil:'networkidle'});await p.locator('.footer-playground').scrollIntoViewIfNeeded();await p.getByRole('button',{name:'Plant a little green',exact:false}).click();await p.waitForTimeout(100);
 const back=await p.locator('.footer-playground').evaluate(el=>Number(el.dataset.plants)>=7);await c.close();
 const staticContext=await b.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const q=await staticContext.newPage();await q.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
 const nojs=await q.evaluate(()=>({cards:document.querySelectorAll('.home-work .project-tile').length,legal:document.querySelectorAll('.rooted-bottom nav a').length,buttonHidden:document.querySelector('.garden-actions').hidden,hintHidden:getComputedStyle(document.querySelector('.garden-hint')).display==='none',overflow:document.documentElement.scrollWidth>innerWidth}));
 results.push({engine,back,nojs});await b.close();
}
const failures=results.filter(r=>!r.back||r.nojs.cards!==3||r.nojs.legal!==4||!r.nojs.buttonHidden||!r.nojs.hintHidden||r.nojs.overflow);await fs.writeFile('qa/garden-navigation-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({results,failures},null,2));if(failures.length)process.exitCode=1;
