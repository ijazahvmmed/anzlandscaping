import json,pathlib,urllib.request,concurrent.futures,io,csv
from PIL import Image,ImageOps,ImageDraw
R=pathlib.Path(__file__).resolve().parents[1]; out=R/'wordpress/wp-content/themes/anz-2027/assets/media';out.mkdir(parents=True,exist_ok=True)
pages=json.loads((R/'content-migration/page-summary.json').read_text(encoding='utf8'))
chosen={}
for p in pages:
 imgs=[x for x in p['images'] if '/uploads/' in x['url'] and not any(s in x['url'].lower() for s in ['placeholder','card_','logo','icon','vector','google_reviews'])]
 if p['path'].startswith('/projects/') and p['id']!=695: imgs=imgs
 else: imgs=[x for x in imgs if '.webp' in x['url']][:4]
 for x in imgs: chosen[x['url']]=str(x.get('id') or pathlib.Path(x['url']).stem)
def fetch(pair):
 url,key=pair
 try:
  target=out/(key+'.webp')
  if not target.exists():
   b=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'ANZ staging asset audit'}),timeout=40).read();im=Image.open(io.BytesIO(b)).convert('RGB');im.thumbnail((1920,1920));im.save(target,'WEBP',quality=87)
  im=Image.open(target)
  return {'key':key,'url':url,'width':im.width,'height':im.height,'bytes':target.stat().st_size}
 except Exception as e:return {'key':key,'url':url,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex: results=list(ex.map(fetch,chosen.items()))
(R/'content-migration/downloaded-assets.json').write_text(json.dumps(results,indent=2))
valid=[x for x in results if 'error' not in x]
sheet=Image.new('RGB',(1000,((len(valid)+4)//5)*145),'#eeeeee');d=ImageDraw.Draw(sheet)
for n,x in enumerate(valid):
 im=Image.open(out/(x['key']+'.webp'));im=ImageOps.fit(im,(192,115));a=(n%5*200,n//5*145);sheet.paste(im,a);d.text((a[0]+4,a[1]+118),x['key'],fill='black')
(R/'qa').mkdir(exist_ok=True);sheet.save(R/'qa/asset-contact-sheet.jpg')
for src,key in [('Artboard 21@33.33x.png','logo-colour'),('Artboard 22@33.33x.png','logo-black')]:
 Image.MAX_IMAGE_PIXELS=None
 im=Image.open(pathlib.Path.home()/'Downloads'/src);im.thumbnail((1200,720));im.save(out/(key+'.webp'),'WEBP',quality=95)
print('Downloaded',len(valid),'of',len(results)); print([x for x in results if 'error' in x])
