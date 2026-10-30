from pathlib import Path
import urllib.request,io,zipfile
R=Path(__file__).resolve().parents[1];p=R/'wordpress/wp-content/themes/anz-2027/assets/fonts';p.mkdir(exist_ok=True)
url='https://api.fontshare.com/v2/fonts/download/satoshi'
try:
 data=urllib.request.urlopen(url,timeout=90).read()
 with zipfile.ZipFile(io.BytesIO(data)) as z:
  for name in z.namelist():
   if any(name.endswith(font) for font in ['Satoshi-Variable.woff2','Satoshi-Regular.woff2','Satoshi-Medium.woff2']) or 'license' in name.lower():
    (p/Path(name).name).write_bytes(z.read(name));print(name)
except Exception as e:print(type(e).__name__,str(e))
