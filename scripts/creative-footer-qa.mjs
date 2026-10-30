import {chromium,webkit} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const results=[];
for(const engine of ['edge','webkit']){
 const b=engine==='edge'?await chromium.launch({channel:'msedge'}):await webkit.launch();const c=await b.newContext({viewport:{width:1440,height:1000},...(engine==='edge'?{recordVideo:{dir:'qa/garden-recording',size:{width:1440,height:1000}}}:{})});const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
 const chapter=p.locator('.home-work');await chapter.locator('img').evaluateAll(imgs=>{imgs.forEach(img=>img.loading='eager');return Promise.all(imgs.map(img=>img.decode().catch(()=>{})));});
 await chapter.scrollIntoViewIfNeeded();await p.waitForTimeout(1400);await chapter.screenshot({path:`qa/${engine}-compact-projects.png`,style:'.site-header{visibility:hidden!important}'});
 const canvas=p.locator('.garden-canvas');const garden=p.locator('.footer-playground');await garden.scrollIntoViewIfNeeded();await p.waitForTimeout(1800);const first=await canvas.evaluate(el=>el.toDataURL());
 await p.getByRole('button',{name:'Plant a little green',exact:false}).click();await p.waitForTimeout(1700);const second=await canvas.evaluate(el=>el.toDataURL());
 await p.locator('.footer-garden-field').click({position:{x:250,y:160}});await p.waitForTimeout(1600);const planted=await garden.getAttribute('data-plants');
 const r=await p.locator('.footer-garden-field').boundingBox();await p.mouse.move(r.x+r.width*.2,r.y+110);await p.waitForTimeout(400);const windBefore=await canvas.evaluate(el=>el.toDataURL());await p.mouse.move(r.x+r.width*.8,r.y+110,{steps:18});await p.waitForTimeout(500);const windAfter=await canvas.evaluate(el=>el.toDataURL());
 await garden.screenshot({path:`qa/${engine}-interactive-garden.png`,style:'.site-header{visibility:hidden!important}'});await p.locator('.landscape-footer').screenshot({path:`qa/${engine}-creative-footer.png`,style:'.site-header{visibility:hidden!important}'});
 const axe=await new AxeBuilder({page:p}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 await p.getByRole('button',{name:'Start the interactive garden again'}).click();await p.waitForTimeout(1600);const reset=await garden.getAttribute('data-plants');
 const layouts=[];for(const width of [1440,1024,768,390,320]){await p.setViewportSize({width,height:1000});await p.waitForTimeout(150);layouts.push({width,...await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,sceneCount:document.querySelectorAll('.home-work .project-tile').length,pinned:!!document.querySelector('.scene-enhanced'),frames:[...document.querySelectorAll('.home-work .project-tile')].map(el=>({height:el.getBoundingClientRect().height,image:el.querySelector('img').getBoundingClientRect().height,caption:el.querySelector('.tile-caption').getBoundingClientRect().height})),legal:document.querySelectorAll('.rooted-bottom nav a').length}))});}
 await p.setViewportSize({width:390,height:844});await garden.scrollIntoViewIfNeeded();await p.waitForTimeout(200);await garden.screenshot({path:`qa/${engine}-interactive-garden-mobile.png`,style:'.site-header{visibility:hidden!important}'});
 await p.emulateMedia({reducedMotion:'reduce'});await p.getByRole('button',{name:'Plant a little green',exact:false}).focus();await p.keyboard.press('Enter');await p.waitForTimeout(50);const reducedAdd=await garden.getAttribute('data-plants');const reducedA=await canvas.evaluate(el=>el.toDataURL());await p.waitForTimeout(300);const reducedB=await canvas.evaluate(el=>el.toDataURL());
 results.push({engine,canvasChanges:first!==second,plants:Number(planted),pointerResponse:windBefore!==windAfter,reset:Number(reset),layouts,reducedAdd:Number(reducedAdd),reducedSettled:reducedA===reducedB,axe:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),errors});
 const video=p.video();await c.close();if(engine==='edge')await video.saveAs('qa/creative-footer-demo.webm');await b.close();
}
const failures=results.filter(r=>!r.canvasChanges||r.plants!==8||!r.pointerResponse||r.reset!==6||r.reducedAdd!==7||!r.reducedSettled||r.axe.length||r.errors.length||r.layouts.some(l=>l.overflow||l.sceneCount!==3||l.pinned||l.legal!==4||l.frames.some(f=>f.image>260||f.height>400)));
await fs.writeFile('qa/creative-footer-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({engines:results.length,failures},null,2));if(failures.length)process.exitCode=1;
