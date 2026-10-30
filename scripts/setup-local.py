"""Download official WordPress + SQLite integration for an isolated local preview."""
from pathlib import Path
import urllib.request,zipfile,io,shutil
R=Path(__file__).resolve().parents[1];local=R/'.local';local.mkdir(exist_ok=True)
def extract(url,dest):
 print('Downloading',url,flush=True)
 with urllib.request.urlopen(url,timeout=120) as response: payload=response.read()
 with zipfile.ZipFile(io.BytesIO(payload)) as z:z.extractall(dest)
if not (local/'wordpress/wp-load.php').exists():extract('https://wordpress.org/latest.zip',local)
plugins=local/'wordpress/wp-content/plugins';plugins.mkdir(exist_ok=True)
if not (plugins/'sqlite-database-integration').exists():extract('https://downloads.wordpress.org/plugin/sqlite-database-integration.latest-stable.zip',plugins)
sqlite=plugins/'sqlite-database-integration'
print('SQLite drop-ins:',[str(p.relative_to(sqlite)) for p in sqlite.rglob('*db*php')])
print('WordPress downloaded. Configure with scripts/configure-local.py next.')
