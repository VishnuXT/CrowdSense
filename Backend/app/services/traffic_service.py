import os

import requests

from app.repositories.location_repository import get_location_by_id


SAMPLE_TRAFFIC = {
    1: {"congestion": "High", "travel_time": "20 min", "status": "Heavy Traffic"},
    2: {"congestion": "Medium", "travel_time": "14 min", "status": "Moderate Traffic"},
    3: {"congestion": "Low", "travel_time": "9 min", "status": "Smooth Traffic"},
}


def calculate_traffic_status(current_speed, free_flow_speed):
    if not free_flow_speed:
        return "Unknown", "Traffic data unavailable"

    speed_ratio = current_speed / free_flow_speed

    if speed_ratio < 0.45:
        return "High", "Heavy Traffic"
    if speed_ratio < 0.75:
        return "Medium", "Moderate Traffic"
    return "Low", "Smooth Traffic"


def convert_seconds_to_minutes(seconds):
    if not seconds:
        return "N/A"

    minutes = max(1, round(seconds / 60))
    return f"{minutes} min"


def get_tomtom_traffic(latitude, longitude, location_name):
    api_key = os.getenv("TOMTOM_API_KEY")
    if not api_key:
        return None

    url = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json"
    params = {
        "point": f"{float(latitude)},{float(longitude)}",
        "unit": "KMPH",
        "key": api_key,
    }

    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        traffic_data = response.json().get("flowSegmentData")
    except Exception:
        return None

    if not traffic_data:
        return None

    current_speed = traffic_data.get("currentSpeed")
    free_flow_speed = traffic_data.get("freeFlowSpeed")
    travel_time = traffic_data.get("currentTravelTime")

    if traffic_data.get("roadClosure"):
        congestion = "High"
        status = "Road Closed"
    elif current_speed is not None and free_flow_speed is not None:
        congestion, status = calculate_traffic_status(current_speed, free_flow_speed)
    else:
        congestion = "Unknown"
        status = "Traffic data unavailable"

    return {
        "location": location_name,
        "congestion": congestion,
        "travel_time": convert_seconds_to_minutes(travel_time),
        "status": status,
        "current_speed": round(current_speed) if current_speed is not None else None,
        "free_flow_speed": round(free_flow_speed) if free_flow_speed is not None else None,
        "confidence": traffic_data.get("confidence"),
        "source": "tomtom",
    }


def get_sample_traffic(location_id, location_name):
    traffic = SAMPLE_TRAFFIC.get(
        location_id,
        {"congestion": "Low", "travel_time": "10 min", "status": "Smooth Traffic"},
    )

    return {
        "location": location_name,
        "congestion": traffic["congestion"],
        "travel_time": traffic["travel_time"],
        "status": traffic["status"],
        "current_speed": None,
        "free_flow_speed": None,
        "confidence": None,
        "source": "sample",
    }


def get_traffic_for_location(location_id):
    location = get_location_by_id(location_id)
    if not location:
        return None

    if location["latitude"] is None or location["longitude"] is None:
        print(f"[Traffic Service] '{location['name']}' is missing coordinates. Using sample traffic data.")
        return get_sample_traffic(location_id, location["name"])

    traffic = get_tomtom_traffic(
        location["latitude"],
        location["longitude"],
        location["name"],
    )

    if traffic:
        print(f"[Traffic Service] TomTom API data retrieved successfully for '{location['name']}'.")
        return traffic

    print(f"[Traffic Service] TomTom API call failed/missing key for '{location['name']}'. Falling back to sample traffic data.")
    return get_sample_traffic(location_id, location["name"])
