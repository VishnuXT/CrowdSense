import requests
import json

BASE_URL = "http://127.0.0.1:8000"

# Define endpoints to test (method, path, optional payload)
endpoints = [
    ("GET", "/api/health/"),
    ("GET", "/api/admin/login"),  # will 404 or 401 because missing payload
    ("GET", "/api/categories/"),
    ("GET", "/api/categories/1"),
    ("GET", "/api/locations/"),
    ("GET", "/api/locations/1"),
    ("GET", "/api/locations/category/1"),
    ("GET", "/api/events/"),
    ("GET", "/api/events/1"),
    ("GET", "/api/recommendations/1"),
    ("GET", "/api/traffic/1"),
    ("GET", "/api/weather/1"),
    ("GET", "/api/crowd-score/1"),
    ("GET", "/api/dashboard/summary"),
]

for method, path in endpoints:
    url = BASE_URL + path
    try:
        resp = requests.request(method, url, timeout=5)
        print(f"{method} {path} -> {resp.status_code}")
        # Print brief JSON if possible
        if resp.headers.get('content-type', '').startswith('application/json'):
            try:
                data = resp.json()
                print(json.dumps(data, indent=2)[:200])
            except Exception:
                pass
    except Exception as e:
        print(f"{method} {path} -> ERROR: {e}")
