from pathlib import Path
import zipfile,json,hashlib,shutil
R=Path(__file__).resolve().parents[1];D=R/'dist';D.mkdir(exist_ok=True)
T=R/'wordpress/wp-content/themes/anz-2027';P=R/'wordpress/wp-content/plugins/anz-site-core'
def zip_folder(folder,target,root):
 with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
  for path in sorted(folder.rglob('*')):
   if path.is_file():z.write(path,Path(root)/path.relative_to(folder))
zip_folder(T,D/'anz-2027-theme.zip','anz-2027')
zip_folder(P,D/'anz-site-core-plugin.zip','anz-site-core')
zip_folder(T,R/'.local/anz-2027-install-proof.zip','anz-2027-proof')
with zipfile.ZipFile(D/'anz-2027-source.zip','w',zipfile.ZIP_DEFLATED) as z:
 for folder in ['src','scripts','wordpress','docs','preview']:
  for path in (R/folder).rglob('*'):
   if path.is_file():z.write(path,Path('anz-2027')/path.relative_to(R))
 for name in ['package.json','package-lock.json','tsconfig.json','vite.config.ts','vercel.json','README.md','.gitignore']:
  path=R/name
  if path.exists():z.write(path,Path('anz-2027')/name)
 for name in ['URL_MIGRATION_MAP.csv','LIVE_SOURCE_CRAWL.csv','MEDIA_REGISTER.csv','downloaded-assets.json','PHOTO_EDIT_REGISTER.json','ORIGINAL_HOME_ASSETS.json','page-summary.json','local-seed.json']:
  path=R/'content-migration'/name
  if path.exists():z.write(path,Path('anz-2027/content-migration')/name)
 for path in (R/'qa').glob('*.json'):z.write(path,Path('anz-2027/qa')/path.name)
with zipfile.ZipFile(D/'anz-2027-review-evidence.zip','w',zipfile.ZIP_DEFLATED) as z:
 for folder in ['screenshots','motion','before']:
  for path in (R/'qa'/folder).glob('*'):
   if path.is_file():z.write(path,Path('qa')/folder/path.name)
 for path in (R/'qa').glob('*.json'):z.write(path,Path('qa')/path.name)
 for path in (R/'qa').glob('*refined-controls.png'):z.write(path,Path('qa')/path.name)
 for path in (R/'qa').glob('fitted-project-images.png'):z.write(path,Path('qa')/path.name)
 for path in (R/'qa').glob('*-footer-*.png'):z.write(path,Path('qa')/path.name)
 for path in (R/'qa').glob('*-service-accordion.png'):z.write(path,Path('qa')/path.name)
 for path in (R/'qa').glob('*-original-form-*.png'):z.write(path,Path('qa')/path.name)
 for path in (R/'qa').glob('*-brand-*.png'):z.write(path,Path('qa')/path.name)
 for path in (R/'qa').glob('*-clean-*.png'):z.write(path,Path('qa')/path.name)
 for pattern in ['*-hero-video*.png','*-original-home-*.png','*-source-*.png','*-homepage*.png','*-header-marquee-restored.png','homepage-story-preview.png','homepage-story-overview.jpg','homepage-story-hero.png']:
  for path in (R/'qa').glob(pattern):z.write(path,Path('qa')/path.name)
 if (R/'qa/homepage-story-walkthrough.webm').exists():z.write(R/'qa/homepage-story-walkthrough.webm','qa/homepage-story-walkthrough.webm')
 for pattern in ['*-compact-projects.png','*-interactive-garden*.png','*-creative-footer.png']:
  for path in (R/'qa').glob(pattern):z.write(path,Path('qa')/path.name)
 if (R/'qa/creative-footer-walkthrough.webm').exists():z.write(R/'qa/creative-footer-walkthrough.webm','qa/creative-footer-walkthrough.webm')
 if (R/'qa/service-accordion-demo.webm').exists():z.write(R/'qa/service-accordion-demo.webm','qa/service-accordion-demo.webm')
 for name in ['revised-flagships.jpg','revised-home-desktop.png','scroll-demo.webm','forminator-mobile.png','menu-marquee-demo.webm','drawer-entering.png','drawer-open.png','blog-marquee-mobile.png','glass-home-desktop.png','glass-home-mobile.png','glass-navigation.png','glass-button-hover.png','glass-drawer.png']:
  path=R/'qa'/name
  if path.exists():z.write(path,Path('qa')/name)
 for path in (R/'qa').glob('webkit-home-*.png'):z.write(path,Path('qa')/path.name)
with zipfile.ZipFile(D/'anz-2027-photo-edits.zip','w',zipfile.ZIP_DEFLATED) as z:
 for path in (R/'output/photo-edits').glob('*.png'):z.write(path,Path('edited-masters')/path.name)
 for key in ['2415','2397','2304','2350','2365']:
  path=T/'assets/media'/f'{key}.webp';z.write(path,Path('originals')/path.name)
 z.write(R/'docs/PHOTO_EDIT_PROMPTS.md','PHOTO_EDIT_PROMPTS.md')
 z.write(R/'content-migration/PHOTO_EDIT_REGISTER.json','PHOTO_EDIT_REGISTER.json')
checks=[]
for path in D.glob('*.zip'):checks.append({'file':path.name,'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()})
(D/'checksums.json').write_text(json.dumps(checks,indent=2));print(json.dumps(checks,indent=2))
