# Rendert die Standort-Karte (src/imports/standort-map.svg) aus OpenStreetMap-Daten
# im Markenstil. Selbst gehostet: keine Requests an Google/OSM beim Seitenaufruf.
#
#   curl -A "ga-webdesign-map" -o osm.xml \
#     "https://api.openstreetmap.org/api/0.6/map?bbox=8.3140,48.1180,8.3385,48.1335"
#   python3 scripts/render-standort-map.py osm.xml src/imports/standort-map.svg
#
# Mittelpunkt = Technologiezentrum, Leopoldstraße 1 (OSM-Relation 1387241).
# Der Pin in LocationMap.tsx sitzt fest in der Bildmitte – Mittelpunkt nicht verschieben.
# Kartendaten © OpenStreetMap-Mitwirkende, ODbL.
import sys, math, xml.etree.ElementTree as ET
src, out = sys.argv[1], sys.argv[2]
r = ET.parse(src).getroot()
LAT0, LON0 = 48.1256505, 8.3262723
W, H = 1300, 650           # Meter = SVG-Einheiten, Pin exakt in der Mitte
KX = 111320 * math.cos(math.radians(LAT0)); KY = 110574
def proj(lat, lon):
    return (W/2 + (lon-LON0)*KX, H/2 - (lat-LAT0)*KY)
nodes = {n.get('id'): proj(float(n.get('lat')), float(n.get('lon'))) for n in r.iter('node')}
ways = {}
for w in r.iter('way'):
    pts = [nodes[nd.get('ref')] for nd in w.iter('nd') if nd.get('ref') in nodes]
    ways[w.get('id')] = (pts, {k.get('k'): k.get('v') for k in w.iter('tag')})
M = 60
def visible(pts):
    xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
    return max(xs) > -M and min(xs) < W+M and max(ys) > -M and min(ys) < H+M
def d(pts, close=False):
    s = "M" + " L".join(f"{x:.0f} {y:.0f}" for x, y in pts)
    return s + ("Z" if close else "")
def stitch(segs):
    segs=[list(s) for s in segs if s]; rings=[]
    while segs:
        cur=segs.pop(0)
        changed=True
        while cur[0]!=cur[-1] and changed:
            changed=False
            for i,s in enumerate(segs):
                if s[0]==cur[-1]: cur+=s[1:]
                elif s[-1]==cur[-1]: cur+=s[::-1][1:]
                elif s[-1]==cur[0]: cur=s+cur[1:]
                elif s[0]==cur[0]: cur=s[::-1]+cur[1:]
                else: continue
                segs.pop(i); changed=True; break
        rings.append(cur)
    return rings

layers = {k: [] for k in ['wood','green','water','building','target','rail','stream','path','service','minor','major']}
target_ids=set()
for rel in r.iter('relation'):
    t={k.get('k'):k.get('v') for k in rel.iter('tag')}
    outers=[m.get('ref') for m in rel.iter('member') if m.get('type')=='way' and m.get('role') in ('outer','') and m.get('ref') in ways]
    if rel.get('id')=='1387241':
        target_ids.update(outers)
        for ring in stitch([ways[i][0] for i in outers]): layers['target'].append(d(ring,True))
        continue
    kind = 'wood' if t.get('landuse')=='forest' or t.get('natural')=='wood' else 'water' if t.get('natural')=='water' else 'building' if 'building' in t else None
    if kind:
        for ring in stitch([ways[i][0] for i in outers]):
            if len(ring)>2 and visible(ring): layers[kind].append(d(ring,True))

HW_MAJOR={'primary','secondary','tertiary','primary_link','secondary_link','tertiary_link','trunk'}
HW_MINOR={'residential','unclassified','living_street','pedestrian','road'}
HW_PATH={'footway','path','steps','cycleway','track','bridleway'}
labels={}
for wid,(pts,t) in ways.items():
    if len(pts)<2 or not visible(pts) or wid in target_ids: continue
    closed = pts[0]==pts[-1]
    if 'building' in t and closed: layers['building'].append(d(pts,True))
    elif (t.get('landuse')=='forest' or t.get('natural')=='wood') and closed: layers['wood'].append(d(pts,True))
    elif (t.get('landuse') in ('grass','meadow','recreation_ground','orchard') or t.get('leisure') in ('park','pitch','playground')) and closed: layers['green'].append(d(pts,True))
    elif t.get('natural')=='water' and closed: layers['water'].append(d(pts,True))
    elif t.get('waterway'): layers['stream'].append(d(pts))
    elif t.get('railway')=='rail': layers['rail'].append(d(pts))
    elif 'highway' in t and t.get('area')!='yes':
        h=t['highway']
        key='major' if h in HW_MAJOR else 'minor' if h in HW_MINOR else 'service' if h=='service' else 'path' if h in HW_PATH else None
        if key: layers[key].append(d(pts))
        n=t.get('name')
        if n and key in('major','minor'):
            labels.setdefault(n,[]).append(pts)

def seglen(p): return sum(math.dist(a,b) for a,b in zip(p,p[1:]))
def inside(p, m=40): return all(m<x<W-m and m<y<H-m for x,y in p)
LABELS=['Sommerauer Straße','Hauptstraße','Luisenstraße']
defs=[]; texts=[]
for i,n in enumerate(LABELS):
    cands=[p for p in labels.get(n,[])]
    # Teilstücke an gemeinsamen Enden zusammenfügen, längstes sichtbares Stück nehmen
    chains=stitch(cands)
    chains=[[q for q in c if -20<q[0]<W+20 and -20<q[1]<H+20] for c in chains]
    chains=[c for c in chains if len(c)>1]
    if not chains: print('no label', n); continue
    c=max(chains,key=seglen)
    if c[0][0]>c[-1][0]: c=c[::-1]
    print(n, round(seglen(c)))
    defs.append(f'<path id="l{i}" d="{d(c)}"/>')
    texts.append(f'<text><textPath href="#l{i}" startOffset="50%">{n}</textPath></text>')

C=dict(bg='#10181c', wood='#0b1d27', green='#121d22', water='#0a3a52', bld='#1b262c', road='#2a3840', major='#3a4a55')
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<rect width="{W}" height="{H}" fill="{C['bg']}"/>
<g fill="{C['wood']}"><path d="{' '.join(layers['wood'])}"/></g>
<g fill="{C['green']}"><path d="{' '.join(layers['green'])}"/></g>
<g fill="{C['water']}"><path d="{' '.join(layers['water'])}"/></g>
<g fill="none" stroke="{C['water']}" stroke-width="2" stroke-linecap="round"><path d="{' '.join(layers['stream'])}"/></g>
<g fill="{C['bld']}"><path d="{' '.join(layers['building'])}"/></g>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="{C['road']}" stroke-width="1.2" stroke-dasharray="3 4" d="{' '.join(layers['path'])}"/>
<path stroke="{C['road']}" stroke-width="3.5" d="{' '.join(layers['service'])}"/>
<path stroke="{C['road']}" stroke-width="7" d="{' '.join(layers['minor'])}"/>
<path stroke="{C['major']}" stroke-width="10" d="{' '.join(layers['major'])}"/>
<path stroke="{C['major']}" stroke-width="2" stroke-dasharray="10 6" d="{' '.join(layers['rail'])}"/>
</g>
<path fill="#4dbef3" fill-opacity=".22" stroke="#4dbef3" stroke-opacity=".7" stroke-width="1.5" d="{' '.join(layers['target'])}"/>
<defs>{''.join(defs)}</defs>
<g font-family="Inter Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="15" font-weight="500" letter-spacing=".3" fill="#7a8f9e" text-anchor="middle" paint-order="stroke" stroke="#10181c" stroke-width="4" stroke-linejoin="round">
{''.join(t.replace('<text>','<text dy="5">') for t in texts)}
</g>
</svg>'''
open(out,'w').write(svg)
print({k:len(v) for k,v in layers.items()}, len(svg)//1024,'KB')
