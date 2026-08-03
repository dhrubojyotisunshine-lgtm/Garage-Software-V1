"""
Fetch reference pages from the garage product for UI structure reference.

The site is behind a login, so this needs YOUR authenticated session. Nothing
is hard-coded — supply credentials or a session cookie at runtime.

USAGE
  1. Install the one dependency:
        pip install requests

  2. Give it a session. Either:

     (a) Cookie (simplest, no password shared):
         - Open the site logged in, press F12
         - Application > Cookies > copy the value of the Laravel session cookie
           (usually `laravel_session`)
         - Then:
             set GARAGE_COOKIE=laravel_session=eyJpdiI6...
             python scripts/fetch-reference-pages.py

     (b) Email and password:
             set GARAGE_EMAIL=you@example.com
             set GARAGE_PASSWORD=yourpassword
             python scripts/fetch-reference-pages.py

  3. Pages land in reference/html/ as <name>.html

NOTES
  - Tables load their rows over AJAX, so saved pages contain the layout and
    column headers but an empty tbody. That is fine for our purpose: we want
    the structure, not their data.
  - Requests are spaced out so the server is not hammered.
  - reference/ is gitignored; these are working notes, not part of the product.
"""

from __future__ import annotations

import os
import re
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("Missing dependency. Run:  pip install requests")

BASE = "https://pushnifty.com/dasinfoau/php/garage"
OUT = Path(__file__).resolve().parent.parent / "reference" / "html"
DELAY_SECONDS = 1.0

# Taken from the sidebar and quick-create menu in the supplier page source.
PAGES: dict[str, str] = {
    "dashboard": "/",
    # Inventory
    "supplier-list": "/supplier/list",
    "supplier-add": "/supplier/add",
    "product-list": "/product/list",
    "product-add": "/product/add",
    "purchase-list": "/purchase/list",
    "purchase-add": "/purchase/add",
    "stock-list": "/stoke/list",
    # Users
    "customer-list": "/customer/list",
    "customer-add": "/customer/add",
    "employee-list": "/employee/list",
    "employee-add": "/employee/add",
    "supportstaff-list": "/supportstaff/list",
    "supportstaff-add": "/supportstaff/add",
    "accountant-list": "/accountant/list",
    "accountant-add": "/accountant/add",
    "branchadmin-list": "/branchadmin/list",
    "branchadmin-add": "/branchadmin/add",
    # Vehicles
    "vehicle-list": "/vehicle/list",
    "vehicle-add": "/vehicle/add",
    "vehicletype-list": "/vehicletype/list",
    "vehiclebrand-list": "/vehiclebrand/list",
    "vehiclemodel-list": "/vehicalmodel/list",
    "color-list": "/color/list",
    # Operations
    "service-list": "/service/list",
    "service-add": "/service/add",
    "quotation-list": "/quotation/list",
    "quotation-add": "/quotation/add",
    "invoice-list": "/invoice/list",
    "invoice-add": "/invoice/add",
    "jobcard-list": "/jobcard/list",
    "gatepass-list": "/gatepass/list",
    "gatepass-add": "/gatepass/add",
    # Accounts
    "taxrates-list": "/taxrates/list",
    "payment-list": "/payment/list",
    "income-list": "/income/list",
    "income-add": "/income/add",
    "expense-list": "/expense/list",
    "expense-add": "/expense/add",
    # Other
    "partsells-list": "/sales_part/list",
    "compliances-list": "/rto/list",
    "reports-service": "/report/servicereport",
    "email-templates": "/mail/mail",
    "customfields-list": "/setting/custom/list",
    "observation-list": "/observation/list",
    "notes-list": "/notes/list",
    "branch-list": "/branch/list",
    "helpdocument-list": "/helpdocument/list",
    # Settings
    "settings-general": "/setting/general_setting/list",
    "settings-profile": "/setting/profile",
    "addons": "/addons",
    "how-to-videos": "/how-to-videos",
}


def build_session() -> requests.Session:
    """Authenticate, either with a supplied cookie or by logging in."""
    session = requests.Session()
    session.headers["User-Agent"] = "Mozilla/5.0 (reference fetch)"

    cookie = os.environ.get("GARAGE_COOKIE", "").strip()
    if cookie:
        for part in cookie.split(";"):
            if "=" in part:
                name, _, value = part.strip().partition("=")
                session.cookies.set(name, value)
        print("Using supplied session cookie.")
        return session

    email = os.environ.get("GARAGE_EMAIL", "").strip()
    password = os.environ.get("GARAGE_PASSWORD", "").strip()
    if not (email and password):
        sys.exit(
            "No session supplied.\n"
            "Set GARAGE_COOKIE, or set GARAGE_EMAIL and GARAGE_PASSWORD.\n"
            "See the notes at the top of this file."
        )

    # Laravel needs the CSRF token from the login page.
    login_page = session.get(f"{BASE}/login", timeout=30)
    match = re.search(r'name="_token"\s+value="([^"]+)"', login_page.text)
    if not match:
        match = re.search(r'name="csrf-token"\s+content="([^"]+)"', login_page.text)
    if not match:
        sys.exit("Could not find the CSRF token on the login page.")

    response = session.post(
        f"{BASE}/login",
        data={"_token": match.group(1), "email": email, "password": password},
        timeout=30,
        allow_redirects=True,
    )
    if "login" in response.url and "dashboard" not in response.url:
        sys.exit("Login appears to have failed. Check the email and password.")
    print(f"Logged in as {email}.")
    return session


def looks_like_login(html: str) -> bool:
    """A redirect to the login page returns 200, so detect it by content."""
    lowered = html.lower()
    return 'name="password"' in lowered and "forgot password" in lowered


def main() -> int:
    session = build_session()
    OUT.mkdir(parents=True, exist_ok=True)

    saved, skipped, failed = 0, 0, 0

    for name, path in PAGES.items():
        url = f"{BASE}{path}"
        try:
            response = session.get(url, timeout=30)
        except requests.RequestException as exc:
            print(f"  FAIL  {name:24} {exc}")
            failed += 1
            continue

        if response.status_code != 200:
            print(f"  FAIL  {name:24} HTTP {response.status_code}")
            failed += 1
            continue

        if looks_like_login(response.text):
            print(f"  AUTH  {name:24} redirected to login — session expired")
            skipped += 1
            continue

        target = OUT / f"{name}.html"
        target.write_text(response.text, encoding="utf-8")
        print(f"  ok    {name:24} {len(response.text) // 1024} KB")
        saved += 1

        time.sleep(DELAY_SECONDS)

    print(f"\n{saved} saved, {skipped} skipped, {failed} failed")
    print(f"Location: {OUT}")
    if skipped:
        print("\nSkipped pages mean the session expired. Grab a fresh cookie and re-run.")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
