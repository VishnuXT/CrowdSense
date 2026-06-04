from typing import Optional

from app.repositories.location_repository import (
    get_location_by_id,
    get_locations_for_recommendations,
)
from app.services.crowd_score_service import get_crowd_score_for_location


def get_recommendations_for_location(location_id: int) -> Optional[dict]:
    current_location = get_location_by_id(location_id)
    if not current_location:
        return None

    category_id = current_location["category_id"]
    alternatives = []
    for location in get_locations_for_recommendations(location_id, category_id):
        crowd_data = get_crowd_score_for_location(location["id"])
        alternatives.append(
            {
                "id": location["id"],
                "name": location["name"],
                "crowd_score": crowd_data["crowd_score"] if crowd_data else 50,
            }
        )

    alternatives.sort(key=lambda item: item["crowd_score"])
    return {
        "current_location": current_location["name"],
        "recommendations": alternatives[:3],
    }
