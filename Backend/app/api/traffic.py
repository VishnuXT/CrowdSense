from fastapi import APIRouter, HTTPException

from app.schemas.traffic_schema import TrafficResponse
from app.services.traffic_service import get_traffic_for_location


router = APIRouter(
    prefix="/api/traffic",
    tags=["Traffic"],
)


@router.get("/{location_id}", response_model=TrafficResponse)
def traffic_for_location(location_id: int):
    traffic = get_traffic_for_location(location_id)
    if not traffic:
        raise HTTPException(status_code=404, detail="Location not found")
    return traffic
