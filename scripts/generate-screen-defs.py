"""
Turn reference/structure.json into TypeScript screen definitions.

Produces columns and form fields for every screen so the React pages can be
rendered from data. Labels are humanised; field types are mapped to our
FormFieldDef types.
"""
import json, re
from pathlib import Path

SRC = Path("reference/structure.json")
OUT = Path("apps/web/src/modules/screens/definitions.generated.ts")

data = json.load(open(SRC, encoding="utf-8"))

SKIP_FIELDS = {"_token", "chk", "selectAll", "search", "remember"}
SKIP_PATTERNS = (re.compile(r"^notes\["), re.compile(r"^_"),)

LABEL_FIXES = {
    "firstname": "First Name", "lastname": "Last Name", "displayname": "Display Name",
    "dob": "Date of Birth", "landlineno": "Landline No", "country_id": "Country",
    "join_date": "Join Date", "left_date": "Left Date", "mobile": "Mobile Number",
    "number_plate": "Number Plate", "modelname": "Model Name", "modelyear": "Model Year",
    "engineno": "Engine No", "enginesize": "Engine Size", "chasicno": "Chassis No",
    "odometerreading": "Odometer Reading", "gearno": "Gear No", "gearboxno": "Gearbox No",
    "keyno": "Key No", "dom": "Date of Manufacturing", "vehical_type": "Vehicle Type",
    "vehical_brand": "Vehicle Brand", "vehicabrand": "Vehicle Brand", "fuel_type": "Fuel Type",
    "fueltype": "Fuel Type", "model_name": "Model Name", "c_name": "Colour Name",
    "c_code": "Colour Code", "vhi_for": "Vehicle For", "vehical_id": "Vehicle",
    "password_confirmation": "Confirm Password", "image": "Image",
}

def label_of(name):
    base = re.sub(r"\[.*$", "", name)
    if base in LABEL_FIXES:
        return LABEL_FIXES[base]
    words = re.split(r"[_\-]", base)
    out = []
    for w in words:
        if not w: continue
        if w.lower() == "id": continue
        out.append(w[:1].upper() + w[1:])
    return " ".join(out) or base

SELECT_HINTS = ("country", "state", "city", "branch", "designation", "gender",
                "type", "brand", "model", "colour", "color", "customer",
                "supplier", "product", "status", "method", "tax", "fuel", "gearbox")

def type_of(name, raw):
    n = name.lower()
    if raw == "select": return "select"
    if raw == "textarea": return "textarea"
    if raw in ("date",): return "date"
    if raw in ("datetime-local",): return "datetime"
    if raw == "number": return "number"
    if raw == "file": return "upload"
    if raw == "password": return "text"
    if raw == "email": return "text"
    if "date" in n or n == "dob": return "date"
    if any(h in n for h in ("price", "amount", "qty", "quantity", "total", "rate")): return "money"
    if any(h in n for h in ("description", "address", "note", "remark")): return "textarea"
    if any(h in n for h in SELECT_HINTS): return "select"
    return "text"

def esc(s): return s.replace("\\", "\\\\").replace("'", "\'")

screens = {}
for key, v in data.items():
    entry = {"title": v.get("title") or label_of(key), "columns": [], "fields": []}
    for c in v.get("columns", []):
        if c.lower() in ("action", "actions", ""): continue
        entry["columns"].append(c)
    seen = set()
    for f in v.get("fields", []):
        n = f["name"]
        if n in SKIP_FIELDS or any(p.match(n) for p in SKIP_PATTERNS): continue
        base = re.sub(r"\[.*$", "", n)
        if base in seen: continue
        seen.add(base)
        entry["fields"].append({
            "name": base, "label": label_of(base),
            "type": type_of(base, f.get("type", "text")),
            "required": bool(f.get("required")),
        })
    screens[key] = entry

lines = [
    "/**",
    " * Screen definitions generated from the reference product's page structure.",
    " *",
    " * Columns and field lists only - no markup or styling is taken from the",
    " * source. Screens render through our own T02 and T05 templates.",
    " *",
    " * Regenerate with: python scripts/generate-screen-defs.py",
    " */",
    "",
    "import type { FormFieldDef } from '@garage/ui'",
    "",
    "export interface ScreenDef {",
    "  title: string",
    "  columns: string[]",
    "  fields: FormFieldDef[]",
    "}",
    "",
    "export const screenDefs: Record<string, ScreenDef> = {",
]
for key, e in sorted(screens.items()):
    lines.append(f"  '{key}': {{")
    lines.append(f"    title: '{esc(e['title'])}',")
    if e["columns"]:
        cols = ", ".join(f"'{esc(c)}'" for c in e["columns"])
        lines.append(f"    columns: [{cols}],")
    else:
        lines.append("    columns: [],")
    if e["fields"]:
        lines.append("    fields: [")
        for f in e["fields"]:
            req = ", required: true" if f["required"] else ""
            lines.append(
                f"      {{ name: '{f['name']}', label: '{esc(f['label'])}', "
                f"type: '{f['type']}'{req} }},"
            )
        lines.append("    ],")
    else:
        lines.append("    fields: [],")
    lines.append("  },")
lines.append("}")
lines.append("")

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text("\n".join(lines), encoding="utf-8")

total_c = sum(len(e["columns"]) for e in screens.values())
total_f = sum(len(e["fields"]) for e in screens.values())
print(f"{len(screens)} screens -> {OUT}")
print(f"{total_c} columns, {total_f} fields")
