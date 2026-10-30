from pathlib import Path
import urllib.request,zipfile,io
R=Path(__file__).resolve().parents[1];p=R/'.local/wordpress/wp-content/plugins'
if not (p/'forminator').exists():
 with urllib.request.urlopen('https://downloads.wordpress.org/plugin/forminator.latest-stable.zip',timeout=120) as response: payload=response.read()
 with zipfile.ZipFile(io.BytesIO(payload)) as z:z.extractall(p)
print('Forminator downloaded to isolated local WordPress only.')
