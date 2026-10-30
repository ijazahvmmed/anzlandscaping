import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
await fs.mkdir('qa/screenshots',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const routes={'home':'/','workplace':'/workplace-greenery/','office-rental':'/services/plant-rentals-services-bangalore/','projects':'/projects/','bhive':'/projects/bhive-premium/'};
for(const [name,path] of Object.entries(routes).filter(([name])=>process.argv.length<3||process.argv.slice(2).includes(name))){
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:width===1440?900:844},reducedMotion:'reduce'});
  const response=await page.goto('http://127.0.0.1:8765'+path,{waitUntil:'networkidle'});
  await page.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));
  await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode().catch(()=>{}))));
  await page.screenshot({path:`qa/screenshots/${name}-${width}.png`,fullPage:true});
  console.log(name,width,response.status(),await page.locator('h1').allTextContents());await page.close();
 }
}
await browser.close();
