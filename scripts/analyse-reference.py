"""
Summarise the fetched reference pages into a build spec.

Extracts page titles, list columns and form fields so screens can be built from
the real structure. We rebuild in React with our own design system - this reads
structure, it does not copy markup.
"""
import re, json
from pathlib import Path

SRC = Path("reference/html")
OUT = Path("reference/structure.json")

def clean(t):
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"&nbsp;?", " ", t)
    t = re.sub(r"\s+", " ", t)
    return t.strip()

def title_of(html):
    m = re.search(r'<span class="titleup">(.*?)(?:<a|</span>)', html, re.S)
    return clean(m.group(1)) if m else ""

def columns_of(html):
    m = re.search(r"<thead>(.*?)</thead>", html, re.S)
    if not m: return []
    ths = re.findall(r"<th[^>]*>(.*?)</th>", m.group(1), re.S)
    return [c for c in (clean(t) for t in ths) if c]

def fields_of(html):
    """Form controls: name attribute plus its visible label where findable."""
    out = []
    for m in re.finditer(r"<(input|select|textarea)\b([^>]*)>", html, re.I):
        attrs = m.group(2)
        name = re.search(r'name="([^"]+)"', attrs)
        typ = re.search(r'type="([^"]+)"', attrs)
        if not name: continue
        n = name.group(1)
        t = (typ.group(1) if typ else m.group(1)).lower()
        if t in ("hidden", "submit", "button", "checkbox") and n in ("_token", "chk", "selectAll"):
            continue
        if n in ("_token",): continue
        req = "required" in attrs.lower()
        out.append({"name": n, "type": t, "required": req})
    seen, uniq = set(), []
    for f in out:
        if f["name"] in seen: continue
        seen.add(f["name"]); uniq.append(f)
    return uniq

result = {}
for f in sorted(SRC.glob("*.html")):
    html = f.read_text(encoding="utf-8", errors="ignore")
    entry = {"title": title_of(html)}
    cols = columns_of(html)
    if cols: entry["columns"] = cols
    if f.stem.endswith("-add") or "settings" in f.stem:
        fields = fields_of(html)
        if fields: entry["fields"] = fields
    result[f.stem] = entry

OUT.write_text(json.dumps(result, indent=2), encoding="utf-8")
print(f"Analysed {len(result)} pages -> {OUT}\n")
for k, v in result.items():
    bits = []
    if v.get("columns"): bits.append(f"{len(v['columns'])} cols")
    if v.get("fields"): bits.append(f"{len(v['fields'])} fields")
    print(f"  {k:22} {v['title'][:28]:30} {' · '.join(bits)}")
