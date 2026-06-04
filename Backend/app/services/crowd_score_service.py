from datetime import datetime
from typing import Optional

from app.core.sample_data import get_updated_at
from app.repositories.event_repository import get_active_events_for_location
from app.repositories.location_repository import get_location_by_id
from app.services.weather_service import fetch_weather_by_coords
from app.services.traffic_service import get_traffic_for_location


def get_crowd_status(score: int) -> str:
    if score >= 70:
        return "High"
    if score >= 45:
        return "Medium"
    return "Low"


def estimate_base_score(location: dict) -> int:
    return location.get("popularity_score") or 35


def estimate_event_boost(events: list[dict]) -> int:
    if not events:
        return 0

    total_expected_crowd = sum(event.get("expected_crowd") or 0 for event in events)
    if total_expected_crowd >= 3000:
        return 35
    if total_expected_crowd >= 1500:
        return 25
    if total_expected_crowd >= 500:
        return 15
    return 8


def estimate_weekend_boost() -> int:
    # 5 = Saturday, 6 = Sunday
    weekday = datetime.now().weekday()
    if weekday in (5, 6):
        return 15
    return 0


def estimate_evening_boost() -> int:
    # 4 PM to 9 PM (16:00 to 21:00 inclusive)
    hour = datetime.now().hour
    if 16 <= hour <= 21:
        return 10
    return 0


def estimate_weather_factor(weather: Optional[dict]) -> int:
    if not weather:
        return 0
    condition = weather.get("condition", "").lower()
    temp = weather.get("temperature")

    factor = 0
    # Rain/storms decrease crowd significantly
    if any(cond in condition for cond in ["rain", "thunder", "drizzle", "snow"]):
        factor -= 20
    # Extreme heat decreases crowd
    elif temp is not None and temp > 35:
        factor -= 10
    
    return factor


def estimate_traffic_boost(traffic: Optional[dict]) -> int:
    if not traffic:
        return 0
    congestion = traffic.get("congestion", "").lower()
    if congestion == "high":
        return 15
    if congestion == "medium":
        return 8
    return 0


def calculate_crowd_score(location: dict, events: list[dict], weather: Optional[dict], traffic: Optional[dict]) -> int:
    base = estimate_base_score(location)
    event_boost = estimate_event_boost(events)
    weekend_boost = estimate_weekend_boost()
    evening_boost = estimate_evening_boost()
    weather_factor = estimate_weather_factor(weather)
    traffic_boost = estimate_traffic_boost(traffic)

    score = base + event_boost + weekend_boost + evening_boost + weather_factor + traffic_boost
    return max(0, min(score, 100))


def get_crowd_score_for_location(location_id: int) -> Optional[dict]:
    location = get_location_by_id(location_id)
    if not location:
        return None

    active_events = get_active_events_for_location(location_id)
    
    weather = None
    if location.get("latitude") is not None and location.get("longitude") is not None:
        weather = fetch_weather_by_coords(location["latitude"], location["longitude"])

    traffic = get_traffic_for_location(location_id)
    
    score = calculate_crowd_score(location, active_events, weather, traffic)

    return {
        "location_id": location_id,
        "crowd_score": score,
        "crowd_status": get_crowd_status(score),
        "updated_at": get_updated_at(),
    }

