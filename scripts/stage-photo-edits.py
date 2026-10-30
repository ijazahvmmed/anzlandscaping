from pathlib import Path
from PIL import Image
import shutil,json
R=Path(__file__).resolve().parents[1]
G=Path.home()/'.codex/generated_images/01a1882f-0425-76b0-83b1-edf22d95cbbe'
files={2415:'exec-d3b85e96-8884-4152-ae49-9361d55e3261.png',2397:'exec-89319ea3-4b16-4017-97bc-a4e9c44cb449.png',2304:'exec-876e2ff2-2117-4828-9497-79cb17a14408.png',2350:'exec-f0707816-e7a3-4ac3-b2aa-587367e5645e.png',2365:'exec-dbd32895-6b2c-405a-a7f7-ba918b699322.png'}
out=R/'wordpress/wp-content/themes/anz-2027/assets/media/edited';out.mkdir(exist_ok=True)
masters=R/'output/photo-edits';masters.mkdir(parents=True,exist_ok=True)
records=[]
for key,filename in files.items():
 source=G/filename;shutil.copyfile(source,masters/f'{key}-enhanced.png')
 image=Image.open(source).convert('RGB');image.thumbnail((1920,1920));image.save(out/f'{key}.webp','WEBP',quality=91)
 records.append({'source':f'assets/media/{key}.webp','edited':f'assets/media/edited/{key}.webp','master':f'output/photo-edits/{key}-enhanced.png','method':'Built-in imagegen, realistic source-based architectural-photo edit','original_retained':True})
(R/'content-migration/PHOTO_EDIT_REGISTER.json').write_text(json.dumps(records,indent=2))
catalogue=R/'wordpress/wp-content/themes/anz-2027/inc/catalogue.json'
items=json.loads(catalogue.read_text(encoding='utf8'))
for item in items:
 key={2334:'2397',2338:'2415'}.get(item['id'])
 if key and key in item['images']:item['images']=[key]+[image for image in item['images'] if image!=key]
catalogue.write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf8')
print('Staged',len(records),'reviewed photo edits; originals unchanged.')
