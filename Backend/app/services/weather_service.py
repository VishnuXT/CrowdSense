from typing import Optional, Dict
import os

try:
	import requests
except Exception:
	requests = None


def fetch_weather_by_coords(lat: float, lon: float) -> Optional[Dict]:
	"""Fetch real-time weather from OpenWeather API using latitude and longitude.

	Requires environment variable `OPENWEATHER_API_KEY` to be set.
	Returns a dict with keys: location (None), temperature (int), humidity (int), condition (str)
	or None on error.
	"""
	api_key = os.getenv("OPENWEATHER_API_KEY")
	if not api_key:
		return None
	if requests is None:
		return None

	url = "https://api.openweathermap.org/data/2.5/weather"
	params = {
		"lat": lat,
		"lon": lon,
		"units": "metric",
		"appid": api_key,
	}

	try:
		resp = requests.get(url, params=params, timeout=5)
		resp.raise_for_status()
		data = resp.json()
		main = data.get("main", {})
		weather_arr = data.get("weather", [])
		condition = weather_arr[0]["main"] if weather_arr else "Unknown"
		temperature = main.get("temp")
		humidity = main.get("humidity")

		return {
			"location": data.get("name") or None,
			"temperature": int(round(temperature)) if temperature is not None else None,
			"humidity": int(humidity) if humidity is not None else None,
			"condition": condition,
		}
	except Exception:
		return None
