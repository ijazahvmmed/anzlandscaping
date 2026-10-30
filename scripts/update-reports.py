from pathlib import Path
import json,csv,datetime
R=Path(__file__).resolve().parents[1]
live=list(csv.DictReader((R/'content-migration/LIVE_SOURCE_CRAWL.csv').open(encoding='utf8')))
local=json.loads((R/'qa/results.json').read_text())
source={r['path']:r for r in live};localmap={r['path']:r for r in local['routes']}
original=list(csv.DictReader((R/'content-migration/URL_MIGRATION_MAP.csv').open(encoding='utf8')))
original=[r for r in original if r['id']!='new']
fields=['id','type','title','old_path','target_path','disposition','live_status','local_status','canonical','traffic_ad_dependency','review']
rows=[]
for r in original:
 p=r['target_path'];s=source.get(p,{});q=localmap.get(p,{})
 r.update({'live_status':s.get('status','unverified'),'local_status':q.get('status','unverified'),'canonical':q.get('canonical',''),'traffic_ad_dependency':'unknown; Search Console and ad destinations not supplied','review':'Legal/utility/duplicate dispositions need approval' if r['id'] in ['701','703','705','707','3628','3733'] or r['type']=='post' else ''})
 rows.append(r)
for p in ['/workplace-greenery/','/landscape-design-execution/']:
 q=localmap[p];rows.append({'id':'new','type':'page','title':q['h1'][0],'old_path':'','target_path':p,'disposition':'new; staging review/publish required','live_status':'not applicable','local_status':q['status'],'canonical':q.get('canonical',''),'traffic_ad_dependency':'new page','review':'Review copy and publish draft before production navigation'})
with (R/'content-migration/URL_MIGRATION_MAP.csv').open('w',newline='',encoding='utf8') as f:
 w=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');w.writeheader();w.writerows(rows)
print('Updated',len(rows),'URL map rows.')
lines=['# Route inventory','','44 content routes: 38 retained page records, two new pillar pages and four retained posts. All source service/project paths are preserved.','', '| Type | Route | Local HTTP |','| --- | --- | --- |']
for r in rows:lines.append('| '+r['type']+' | `'+r['target_path']+'` | '+str(r['local_status'])+' |')
lines+=['','Utilities are retained and noindex; retirement requires dependency review. The four duplicate post paths remain directly accessible. Home renders at `/`; `/home/` must remain a canonical alias rather than a second landing page. New hub records on production require explicit draft review and publication.']
(R/'docs/ROUTE_INVENTORY.md').write_text('\n'.join(lines),encoding='utf8')
