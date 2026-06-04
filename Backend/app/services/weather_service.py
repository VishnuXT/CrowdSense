import os
from typing import Optional

import requests


def fetch_weather_by_coords(latitude: float, longitude: float) -> Optional[dict]:
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        return None

    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "lat": latitude,
        "lon": longitude,
        "units": "metric",
        "appid": api_key,
    }

    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        weather_data = response.json()
    except requests.RequestException:
        return None

    temperature = weather_data["main"]["temp"]
    humidity = weather_data["main"]["humidity"]
    condition = weather_data["weather"][0]["main"]

    return {
        "temperature": round(temperature),
        "humidity": humidity,
        "condition": condition,
    }
