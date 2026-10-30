import xml.etree.ElementTree as E, json, re, csv, pathlib, collections, urllib.request, concurrent.futures
ROOT=pathlib.Path(__file__).resolve().parents[1]
D=pathlib.Path.home()/'Downloads'
OUT=ROOT/'content-migration'; OUT.mkdir(exist_ok=True)
NS={'wp':'http://wordpress.org/export/1.2/','content':'http://purl.org/rss/1.0/modules/content/','excerpt':'http://wordpress.org/export/1.2/excerpt/'}
items=[]
for e in E.parse(D/'anzlandscaping.WordPress.2026-10-29.xml').findall('./channel/item'):
 def get(k): return e.findtext(k,'',NS)
 meta={m.findtext('wp:meta_key','',NS):m.findtext('wp:meta_value','',NS) for m in e.findall('wp:postmeta',NS)}
 item={'id':int(get('wp:post_id')),'title':get('title'),'slug':get('wp:post_name'),'type':get('wp:post_type'),'status':get('wp:status'),'parent':int(get('wp:post_parent') or 0),'link':get('link'),'content':get('content:encoded'),'excerpt':get('excerpt:encoded'),'meta':meta,'date':get('wp:post_date'),'url':get('wp:attachment_url')}
 try: item['elementor']=json.loads(meta.get('_elementor_data','[]'))
 except: item['elementor']=[]
 items.append(item)
byid={i['id']:i for i in items}
def path(i): return ('/' if not i['parent'] or i['parent'] not in byid else path(byid[i['parent']]))+i['slug']+'/'
for i in items: i['path']=path(i)
(OUT/'export-audit.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
pages=[i for i in items if i['type'] in ('page','post') and i['status']=='publish']
with (OUT/'URL_MIGRATION_MAP.csv').open('w',newline='',encoding='utf-8') as f:
 w=csv.writer(f);w.writerow(['id','type','title','old_path','target_path','disposition','live_status'])
 for i in pages:w.writerow([i['id'],i['type'],i['title'],i['path'],'/' if i['id']==10 else i['path'],'retain; review utility/legal/duplicate posts' if i['id'] in (3628,3733,701,703,705,707) or i['type']=='post' else 'retain','pending crawl'])
with (OUT/'MEDIA_REGISTER.csv').open('w',newline='',encoding='utf-8') as f:
 w=csv.writer(f);w.writerow(['id','title','source','alt','rights'])
 for i in items:
  if i['type']=='attachment':w.writerow([i['id'],i['title'],i['url'],i['meta'].get('_wp_attachment_image_alt',''),'client library; rights confirmation pending'])
def walk(nodes):
 for n in nodes:
  yield n
  yield from walk(n.get('elements',[]))
summary=[]
for i in pages:
 imgs=[];texts=[]
 for n in walk(i['elementor']):
  s=n.get('settings',{})
  if not isinstance(s,dict): continue
  for k,v in s.items():
   if isinstance(v,dict) and v.get('url') and re.search(r'\.(jpe?g|png|webp)',v['url'],re.I):imgs.append(v)
   if k in ['title','editor','description','testimonial_content'] and isinstance(v,str):texts.append(re.sub('<[^>]+>',' ',v))
  if n.get('widgetType') in ['image-gallery','gallery']:
   for v in s.get('wp_gallery',s.get('gallery',[])):
    if isinstance(v,dict) and v.get('url'):imgs.append(v)
 summary.append({'id':i['id'],'title':i['title'],'path':i['path'],'type':i['type'],'texts':texts,'images':list({v['url']:v for v in imgs}.values())})
(OUT/'page-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(collections.Counter(i['type'] for i in items))
for i in summary: print(i['id'],i['title'],len(i['images']),len(i['texts']))
