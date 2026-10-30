// Vercel serves a public review snapshot; WordPress remains the production runtime.
import {cp,mkdir,readFile,writeFile,access} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const outputDist=path.join(root,'dist');
const outputSite=path.join(root,'dist/site');
const snapshots=path.join(root,'preview/pages');
await access(path.join(snapshots,'index.html')).catch(()=>{throw new Error('Missing preview snapshot. Run npm run preview:export against local WordPress and commit preview/pages before deploying.');});

for (const output of [outputDist, outputSite]) {
  await mkdir(output,{recursive:true});
  await cp(snapshots,output,{recursive:true});
  await cp(path.join(root,'wordpress/wp-content/themes/anz-2027/assets'),path.join(output,'wp-content/themes/anz-2027/assets'),{recursive:true});
  await writeFile(path.join(output,'robots.txt'),'User-agent: *\nDisallow: /\n');
}

const manifest=JSON.parse(await readFile(path.join(root,'preview/manifest.json'),'utf8'));
console.log(`Vercel preview ready: ${manifest.routes.length} pages and 404; output dist. Forms use call/email links in this static preview.`);
