import {chromium,webkit} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const results=[];
for(const engine of ['edge','webkit']){
 const b=engine==='edge'?await chromium.launch({channel:'msedge'}):await webkit.launch();const c=await b.newContext({viewport:{width:390,height:844},...(engine==='edge'?{recordVideo:{dir:'qa/accordion-recording',size:{width:390,height:844}}}:{})});const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});await p.getByRole('button',{name:'Menu',exact:false}).click();await p.waitForTimeout(800);
 const summary=p.locator('.mobile-menu .service-accordion>summary'),panel=p.locator('.mobile-menu .service-accordion-panel');
 await summary.scrollIntoViewIfNeeded();await summary.click();await p.waitForTimeout(130);
 const opening=await panel.evaluate(el=>({height:el.getBoundingClientRect().height,total:el.scrollHeight,animations:el.getAnimations({subtree:true}).length}));await p.waitForTimeout(850);
 const opened=await panel.evaluate(el=>({height:el.getBoundingClientRect().height,total:el.scrollHeight,links:el.querySelectorAll('a').length,inert:el.inert,expanded:el.previousElementSibling.getAttribute('aria-expanded')}));
 await summary.evaluate(el=>{const menu=el.closest('dialog');menu.scrollTop+=el.getBoundingClientRect().top-menu.getBoundingClientRect().top-65;});
 await p.screenshot({path:`qa/${engine}-service-accordion.png`});
 const axe=await new AxeBuilder({page:p}).include('.mobile-menu').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 await summary.click();await p.waitForTimeout(100);const closing=await panel.evaluate(el=>({open:el.parentElement.open,height:el.getBoundingClientRect().height,inert:el.inert}));await p.waitForTimeout(450);const closed=await panel.evaluate(el=>!el.parentElement.open&&el.inert);
 // Reverse an in-flight animation twice; the final state must match the last input.
 await summary.click();await p.waitForTimeout(80);await summary.click();await p.waitForTimeout(70);await summary.click();await p.waitForTimeout(900);const rapid=await panel.evaluate(el=>el.parentElement.open&&el.previousElementSibling.getAttribute('aria-expanded')==='true'&&!el.inert&&Math.abs(el.getBoundingClientRect().height-el.scrollHeight)<2);
 await summary.focus();await summary.press('Enter');await p.waitForTimeout(450);const keyboard=await panel.evaluate(el=>!el.parentElement.open);
 await summary.press('Space');await p.waitForTimeout(850);await p.keyboard.press('Escape');await p.waitForTimeout(450);const reset=await panel.evaluate(el=>!el.parentElement.open&&el.previousElementSibling.getAttribute('aria-expanded')==='false');
 await p.emulateMedia({reducedMotion:'reduce'});await p.getByRole('button',{name:'Menu',exact:false}).click();await summary.click();const reduced=await panel.evaluate(el=>el.parentElement.open&&el.getAnimations({subtree:true}).length===0);await summary.click();const reducedClose=await panel.evaluate(el=>!el.parentElement.open);
 results.push({engine,opening,opened,closing,closed,rapid,keyboard,reset,reduced,reducedClose,axe:axe.violations.map(v=>v.id),errors});
 const video=p.video();await c.close();if(engine==='edge')await video.saveAs('qa/service-accordion-demo.webm');await b.close();
}
const failures=results.filter(r=>!(r.opening.height>0&&r.opening.height<r.opening.total&&r.opening.animations>0)||r.opened.links!==15||r.opened.inert||r.opened.expanded!=='true'||!r.closing.open||!r.closing.inert||!r.closed||!r.rapid||!r.keyboard||!r.reset||!r.reduced||!r.reducedClose||r.axe.length||r.errors.length);await fs.writeFile('qa/accordion-results.json',JSON.stringify({results,failures},null,2));console.log(JSON.stringify({results,failures},null,2));if(failures.length)process.exitCode=1;
