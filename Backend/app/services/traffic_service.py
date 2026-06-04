import os
from typing import Optional

from app.repositories.location_repository import get_location_by_id

try:
    import requests
except Exception:
    requests = None


TRAFFIC_BY_LOCATION = {
    1: {"congestion": "High", "travel_time": "20 min", "status": "Heavy Traffic"},
    2: {"congestion": "Medium", "travel_time": "14 min", "status": "Moderate Traffic"},
    3: {"congestion": "Low", "travel_time": "9 min", "status": "Smooth Traffic"},
    4: {"congestion": "Low", "travel_time": "12 min", "status": "Smooth Traffic"},
}


def classify_congestion(current_speed: float, free_flow_speed: float) -> tuple[str, str]:
    if free_flow_speed <= 0:
        return "Unknown", "Traffic data unavailable"

    speed_ratio = current_speed / free_flow_speed
    if speed_ratio < 0.45:
        return "High", "Heavy Traffic"
    if speed_ratio < 0.75:
        return "Medium", "Moderate Traffic"
    return "Low", "Smooth Traffic"


def format_travel_time(seconds: Optional[int]) -> str:
    if not seconds:
        return "N/A"

    minutes = max(1, round(seconds / 60))
    return f"{minutes} min"


def fetch_tomtom_traffic_by_coords(lat: float, lon: float, location_name: str) -> Optional[dict]:
    api_key = os.getenv("TOMTOM_API_KEY")
    if not api_key or requests is None:
        return None

    url = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"
    params = {
        "point": f"{lat},{lon}",
        "unit": "KMPH",
        "key": api_key,
    }

    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        payload = response.json().get("flowSegmentData", {})

        current_speed = payload.get("currentSpeed")
        free_flow_speed = payload.get("freeFlowSpeed")
        current_travel_time = payload.get("currentTravelTime")
        confidence = payload.get("confidence")
        road_closure = payload.get("roadClosure", False)

        if road_closure:
            congestion, status = "High", "Road Closed"
        elif current_speed is not None and free_flow_speed is not None:
            congestion, status = classify_congestion(current_speed, free_flow_speed)
        else:
            congestion, status = "Unknown", "Traffic data unavailable"

        return {
            "location": location_name,
            "congestion": congestion,
            "travel_time": format_travel_time(current_travel_time),
            "status": status,
            "current_speed": round(current_speed) if current_speed is not None else None,
            "free_flow_speed": round(free_flow_speed) if free_flow_speed is not None else None,
            "confidence": confidence,
            "source": "tomtom",
        }
    except Exception:
        return None


def fetch_here_traffic_by_coords(lat: float, lon: float, location_name: str) -> Optional[dict]:
    api_key = os.getenv("HERE_API_KEY")
    if not api_key or requests is None:
        return None

    url = "https://data.traffic.hereapi.com/v7/flow"
    params = {
        "in": f"circle:{lat},{lon};r=1000",
        "locationReferencing": "shape",
        "apiKey": api_key,
    }

    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        payload = response.json()
        results = payload.get("results", [])
        if not results:
            return None

        current_flow = results[0].get("currentFlow", {})
        current_speed = current_flow.get("speed")
        free_flow_speed = current_flow.get("freeFlow")
        jam_factor = current_flow.get("jamFactor")

        if jam_factor is not None:
            if jam_factor >= 7:
                congestion, status = "High", "Heavy Traffic"
            elif jam_factor >= 4:
                congestion, status = "Medium", "Moderate Traffic"
            else:
                congestion, status = "Low", "Smooth Traffic"
        elif current_speed is not None and free_flow_speed is not None:
            congestion, status = classify_congestion(current_speed, free_flow_speed)
        else:
            congestion, status = "Unknown", "Traffic data unavailable"

        return {
            "location": location_name,
            "congestion": congestion,
            "travel_time": "N/A",
            "status": status,
            "current_speed": round(current_speed) if current_speed is not None else None,
            "free_flow_speed": round(free_flow_speed) if free_flow_speed is not None else None,
            "confidence": None,
            "source": "here",
        }
    except Exception:
        return None


def fetch_live_traffic_by_coords(lat: float, lon: float, location_name: str) -> Optional[dict]:
    return (
        fetch_tomtom_traffic_by_coords(lat, lon, location_name)
        or fetch_here_traffic_by_coords(lat, lon, location_name)
    )


def get_sample_traffic(location_id: int, location_name: str) -> dict:
    traffic = TRAFFIC_BY_LOCATION.get(
        location_id,
        {"congestion": "Low", "travel_time": "10 min", "status": "Smooth Traffic"},
    )
    return {"location": location_name, **traffic, "source": "sample"}


def get_traffic_for_location(location_id: int) -> Optional[dict]:
    location = get_location_by_id(location_id)
    if not location:
        return None

    live_traffic = fetch_live_traffic_by_coords(
        location["latitude"],
        location["longitude"],
        location["name"],
    )
    if live_traffic:
        return live_traffic

    return get_sample_traffic(location_id, location["name"])


def get_traffic_for_coords(lat: float, lon: float) -> dict:
    live_traffic = fetch_live_traffic_by_coords(lat, lon, "Selected Location")
    if live_traffic:
        return live_traffic

    return {
        "location": "Selected Location",
        "congestion": "Unknown",
        "travel_time": "N/A",
        "status": "Live traffic unavailable",
        "source": "sample",
    }
