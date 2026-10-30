import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge'});const results=[];
try{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2,reducedMotion:'no-preference'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.ANZ_QA_URL||'http://127.0.0.1:8765/',{waitUntil:'networkidle'});await page.waitForFunction(()=>document.documentElement.classList.contains('lenis'));await page.waitForTimeout(1400);
 const before=await page.evaluate(()=>({headerBackground:getComputedStyle(document.querySelector('.site-header')).backgroundImage,touchEnabled:window.lenis?.touch,coarse:matchMedia('(pointer:coarse)').matches}));
 await page.screenshot({path:'qa/mobile-scroll-header.png'});
 const cdp=await context.newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:220,y:690}]});
 for(let n=1;n<=12;n++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:220,y:690-n*25}]});await page.waitForTimeout(16);}
 const atRelease=await page.evaluate(()=>scrollY);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});const samples=[];for(let n=0;n<12;n++){await page.waitForTimeout(50);samples.push(await page.evaluate(()=>scrollY));}
 const moving=samples.at(-1)>atRelease+5,forward=samples.every((v,n)=>!n||v>=samples[n-1]-2);
 await page.getByRole('button',{name:'Menu',exact:false}).click();await page.waitForTimeout(600);const stopped=await page.evaluate(()=>document.documentElement.classList.contains('lenis-stopped'));await page.keyboard.press('Escape');await page.waitForTimeout(500);const resumed=await page.evaluate(()=>!document.documentElement.classList.contains('lenis-stopped'));
 await page.locator('.original-services').scrollIntoViewIfNeeded();await page.waitForTimeout(800);const effects=await page.locator('.original-services h2').evaluate(el=>[...el.querySelectorAll('.blur-word')].map(s=>getComputedStyle(s).filter));
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 const reduced=await browser.newPage({hasTouch:true,isMobile:true,viewport:{width:390,height:844},reducedMotion:'reduce'});await reduced.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});const reducedLenis=await reduced.evaluate(()=>document.documentElement.classList.contains('lenis'));
 results.push({before,atRelease,samples,moving,forward,stopped,resumed,effects,overflow,reducedLenis,errors});
 const failures=results.filter(r=>r.before.headerBackground!=='none'||!r.before.touchEnabled||!r.before.coarse||!r.moving||!r.forward||!r.stopped||!r.resumed||r.overflow||r.reducedLenis||r.errors.length||r.effects.some(f=>f!=='none'));
 await fs.writeFile('qa/mobile-scroll-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({results,failures},null,2));if(failures.length)process.exitCode=1;
}finally{await browser.close();}
