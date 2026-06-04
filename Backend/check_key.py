import os
import requests
from dotenv import load_dotenv

# Load env files
load_dotenv(".env.example")
load_dotenv(".env", override=True)

api_key = os.getenv("TOMTOM_API_KEY")

print(f"Loaded TOMTOM_API_KEY: {api_key}")

if not api_key:
    print("Error: TOMTOM_API_KEY is not defined in your env files.")
    exit(1)

# Coordinates for testing (Lulu Mall)
lat, lon = 8.5241, 76.9366
url = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"
params = {
    "point": f"{lat},{lon}",
    "unit": "KMPH",
    "key": api_key,
}

print("Testing connection to TomTom API...")
try:
    response = requests.get(url, params=params, timeout=10)
    print(f"HTTP Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        flow = data.get("flowSegmentData", {})
        print("Success! Connection is working.")
        print(f"Current Speed: {flow.get('currentSpeed')} KMPH")
        print(f"Free Flow Speed: {flow.get('freeFlowSpeed')} KMPH")
    elif response.status_code == 403:
        print("Error 403: Forbidden. The API key is invalid, blocked, or not yet active.")
    else:
        print(f"Error {response.status_code}: {response.text}")
except Exception as e:
    print(f"Network error or request failed: {e}")
