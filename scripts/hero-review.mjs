import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'msedge',headless:true});
for(const width of [1440,390]){
 const page=await browser.newPage({viewport:{width,height:width===1440?1000:844}});
 page.on('pageerror',e=>console.log('JS ERROR',e.message));
 await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
 await page.waitForTimeout(1800);
 await page.screenshot({path:`qa/revised-hero-${width}.png`});
 console.log(width,await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,blur:getComputedStyle(document.querySelector('.text-reveal>span')).filter,photo:getComputedStyle(document.querySelector('.aperture-photo')).clipPath,hero:document.querySelector('.experimental-hero').getBoundingClientRect().height})));
 await page.close();
}
await browser.close();
