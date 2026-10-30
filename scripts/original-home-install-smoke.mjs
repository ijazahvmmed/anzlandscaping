import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge'});
try {
 const page=await browser.newPage({reducedMotion:'reduce'});
 const response=await page.goto('http://127.0.0.1:8765/',{waitUntil:'networkidle'});
 await page.locator('img').evaluateAll(imgs=>{imgs.forEach(i=>i.loading='eager');return Promise.all(imgs.map(i=>i.decode().catch(()=>{})));});
 const result=await page.evaluate(()=>({proofTheme:[...document.styleSheets].some(s=>s.href?.includes('/anz-2027-proof/')),services:document.querySelectorAll('.original-service-card').length,logos:document.querySelectorAll('.original-client-grid img').length,certificates:document.querySelectorAll('.original-award-grid figure').length,faq:document.querySelectorAll('.home-question-list details').length,originalQuoteForm:document.querySelectorAll('#forminator-module-3743').length,brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),schema:JSON.parse(document.querySelector('#anz-home-schema').textContent)['@graph'].map(n=>n['@type'])}));
 result.status=response.status();
 result.passed=result.status===200&&result.proofTheme&&result.services===6&&result.logos===18&&result.certificates===3&&result.faq===5&&result.originalQuoteForm===1&&!result.brokenImages.length;
 await fs.writeFile('qa/original-home-install.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));if(!result.passed)process.exitCode=1;
} finally {await browser.close();}
