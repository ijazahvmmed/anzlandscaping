import {firefox,webkit} from '@playwright/test';
import fs from 'node:fs/promises';
const results=[];
const watchdog=setTimeout(async()=>{results.push({unverified:true,error:'Cross-engine browser session did not respond within 45 seconds on this Windows host.'});await fs.writeFile('qa/cross-browser.json',JSON.stringify(results,null,2));process.exit(2);},45000);
for(const [name,engine] of Object.entries({firefox,webkit})){
 if(process.argv.includes('--webkit-only') && name!=='webkit')continue;
 console.log('Starting',name);
 let browser;
 try {
 browser=await engine.launch({timeout:15000});const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();page.setDefaultTimeout(15000);page.setDefaultNavigationTimeout(15000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  for(const path of ['/','/workplace-greenery/','/projects/bhive-premium/']){
   const response=await page.goto('http://127.0.0.1:8765'+path,{waitUntil:'networkidle'});
   const stats=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,h1:document.querySelectorAll('h1').length,font:document.fonts.check('16px Satoshi')}));
   results.push({engine:name,width,path,status:response.status(),...stats});
   if(path==='/')await page.screenshot({path:`qa/${name}-home-${width}.png`,timeout:10000});
  }
 }
 await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});await page.waitForTimeout(1500);
 results.push({engine:name,motion:await page.evaluate(()=>({lenis:document.documentElement.classList.contains('lenis'),pinned:document.querySelector('.scene-stage').classList.contains('scene-enhanced'),split:!!document.querySelector('.blur-word')})),errors});
 await context.close();await browser.close();
 } catch(error){results.push({engine:name,unverified:true,error:String(error).slice(0,500)});if(browser)await Promise.race([browser.close(),new Promise(resolve=>setTimeout(resolve,1500))]);}
 await fs.writeFile('qa/cross-browser.json',JSON.stringify(results,null,2));
}
await fs.writeFile('qa/cross-browser.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
clearTimeout(watchdog);
