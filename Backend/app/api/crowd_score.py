from fastapi import APIRouter, HTTPException

from app.schemas.crowd_score_schema import CrowdScoreResponse
from app.services.crowd_score_service import get_crowd_score_for_location


router = APIRouter(
    prefix="/api/crowd-score",
    tags=["Crowd Score"],
)


@router.get("/{location_id}", response_model=CrowdScoreResponse)
def crowd_score_for_location(location_id: int):
    crowd_score = get_crowd_score_for_location(location_id)
    if not crowd_score:
        raise HTTPException(status_code=404, detail="Location not found")
    return crowd_score
