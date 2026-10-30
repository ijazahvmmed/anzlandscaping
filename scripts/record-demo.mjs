import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge'});
const context=await browser.newContext({viewport:{width:1440,height:900},recordVideo:{dir:'qa/demo-recording',size:{width:1440,height:900}}});
const page=await context.newPage();await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
await page.locator('img').evaluateAll(imgs=>imgs.forEach(img=>img.loading='eager'));
await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode().catch(()=>{}))));
await page.mouse.move(1000,460);await page.waitForTimeout(1600);await page.screenshot({path:'qa/revised-home-desktop.png'});
for(let i=0;i<65;i++){await page.mouse.wheel(0,200);await page.waitForTimeout(180);}
await page.waitForTimeout(900);
for(let i=0;i<40;i++){await page.mouse.wheel(0,-320);await page.waitForTimeout(150);}
await page.waitForTimeout(1200);const video=page.video();await context.close();await video.saveAs('qa/scroll-demo.webm');await browser.close();console.log('Saved qa/scroll-demo.webm');
