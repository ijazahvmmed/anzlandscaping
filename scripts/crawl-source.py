from pathlib import Path
import json,csv,urllib.request,urllib.error,concurrent.futures,re
R=Path(__file__).resolve().parents[1];pages=json.loads((R/'content-migration/page-summary.json').read_text(encoding='utf8'))
def fetch(page):
 path='/' if page['id']==10 else page['path'];url='https://anzlandscaping.in'+path
 result={'id':page['id'],'path':path,'source_url':url,'status':'','final_url':'','canonical':'','error':''}
 try:
  request=urllib.request.Request(url,headers={'User-Agent':'ANZ migration review (read-only)'})
  with urllib.request.urlopen(request,timeout=18) as response:
   html=response.read().decode('utf8',errors='replace');result['status']=response.status;result['final_url']=response.url
   match=re.search(r'<link[^>]+rel=[\"\']canonical[\"\'][^>]+href=[\"\']([^\"\']+)',html,re.I)
   if match:result['canonical']=match[1]
 except urllib.error.HTTPError as e:result['status']=e.code;result['error']=str(e)
 except Exception as e:result['error']=str(e)
 return result
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(fetch,pages))
with (R/'content-migration/LIVE_SOURCE_CRAWL.csv').open('w',newline='',encoding='utf8') as f:
 writer=csv.DictWriter(f,fieldnames=results[0].keys());writer.writeheader();writer.writerows(results)
print('Source routes:',len(results),'HTTP 200:',sum(r['status']==200 for r in results),'other:',[(r['path'],r['status'],r['error']) for r in results if r['status']!=200])
