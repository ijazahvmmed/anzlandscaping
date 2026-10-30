import {chromium,webkit} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const results=[];
for(const engine of ['edge','webkit']){
 const browser=engine==='edge'?await chromium.launch({channel:'msedge'}):await webkit.launch();
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
  const video=page.locator('[data-hero-video]');await video.scrollIntoViewIfNeeded();await page.waitForFunction(()=>{const v=document.querySelector('video');return v.readyState>=2&&!v.paused&&v.currentTime>0;});
  const state=await video.evaluate(v=>({width:v.videoWidth,height:v.videoHeight,duration:v.duration,muted:v.muted,loop:v.loop,inline:v.playsInline}));
  const overlay=await page.locator('.hero-video-shade').evaluate(e=>getComputedStyle(e).backgroundColor);
  await page.getByRole('button',{name:'Pause hero video',exact:true}).click();const paused=await video.evaluate(v=>v.paused);await page.getByRole('button',{name:'Play hero video',exact:true}).click();await page.waitForFunction(()=>!document.querySelector('video').paused);
  await video.evaluate(v=>{v.currentTime=v.duration-.2;});let loops=true;try{await page.waitForFunction(()=>{const v=document.querySelector('video');return !v.seeking&&v.currentTime<2&&!v.paused;},{},{timeout:10000});}catch{loops=false;}
  const layouts=[];for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:1000});await video.scrollIntoViewIfNeeded();layouts.push(await page.evaluate(()=>{const v=document.querySelector('video').getBoundingClientRect();return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,ratio:v.width/v.height};}));}
  await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(500);await page.screenshot({path:`qa/${engine}-hero-video.png`});
  const axe=await new AxeBuilder({page}).include('.home-hero').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  await page.locator('footer').scrollIntoViewIfNeeded();await page.waitForTimeout(300);const offscreenPaused=await video.evaluate(v=>v.paused);
  const reduced=await browser.newPage({reducedMotion:'reduce'});const mediaRequests=[];reduced.on('request',r=>{if(r.url().endsWith('.mp4'))mediaRequests.push(r.url());});await reduced.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});const reducedState=await reduced.locator('video').evaluate(v=>({paused:v.paused,src:v.getAttribute('src'),poster:!!v.poster}));
  results.push({engine,...state,overlay,paused,loops,layouts,offscreenPaused,reducedState,mediaRequests,axe:axe.violations.map(v=>v.id),errors});
 }finally{await browser.close();}
}
const failures=results.filter(r=>!r.muted||!r.loop||!r.inline||!r.paused||!r.loops||!r.offscreenPaused||r.overlay!=='rgba(0, 0, 0, 0.2)'||r.layouts.some(l=>l.overflow)||!r.reducedState.paused||r.reducedState.src||r.mediaRequests.length||r.axe.length||r.errors.length);
await fs.writeFile('qa/hero-video-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({results,failures},null,2));if(failures.length)process.exitCode=1;
