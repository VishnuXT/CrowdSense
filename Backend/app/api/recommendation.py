from fastapi import APIRouter, HTTPException

from app.schemas.recommendation_schema import RecommendationResponse
from app.services.recommendation_service import get_recommendations_for_location


router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"],
)


@router.get("/{location_id}", response_model=RecommendationResponse)
def recommendations_for_location(location_id: int):
    recommendations = get_recommendations_for_location(location_id)
    if not recommendations:
        raise HTTPException(status_code=404, detail="Location not found")
    return recommendations
