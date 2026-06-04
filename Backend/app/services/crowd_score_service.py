from typing import Optional

from app.core.sample_data import get_updated_at
from app.repositories.event_repository import get_active_events_for_location
from app.repositories.location_repository import get_location_by_id


def get_crowd_status(score: int) -> str:
    if score >= 70:
        return "High"
    if score >= 45:
        return "Medium"
    return "Low"


def estimate_base_score(location: dict) -> int:
    category_id = location.get("category_id")
    if category_id == 2:
        return 55
    if category_id == 1:
        return 50
    if category_id == 3:
        return 45
    return 40


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


def calculate_crowd_score(location: dict, events: list[dict]) -> int:
    score = estimate_base_score(location) + estimate_event_boost(events)
    return max(0, min(score, 100))


def get_crowd_score_for_location(location_id: int) -> Optional[dict]:
    location = get_location_by_id(location_id)
    if not location:
        return None

    active_events = get_active_events_for_location(location_id)
    score = calculate_crowd_score(location, active_events)

    return {
        "location_id": location_id,
        "crowd_score": score,
        "crowd_status": get_crowd_status(score),
        "updated_at": get_updated_at(),
    }
