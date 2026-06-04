from fastapi import APIRouter, HTTPException

from app.repositories.location_repository import get_location_by_id
from app.schemas.weather_schema import WeatherResponse
from app.services.weather_service import fetch_weather_by_coords

router = APIRouter(
    prefix="/api/weather",
    tags=["Weather"]
)


@router.get("/{location_id}", response_model=WeatherResponse)
def weather_for_location(location_id: int):
    location = get_location_by_id(location_id)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    weather = fetch_weather_by_coords(location["latitude"], location["longitude"])
    if not weather:
        raise HTTPException(status_code=502, detail="Failed to fetch weather data")

    return {
        "location": location["name"],
        "temperature": weather["temperature"],
        "humidity": weather["humidity"],
        "condition": weather["condition"],
    }
