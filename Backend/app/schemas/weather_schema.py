from pydantic import BaseModel


class WeatherResponse(BaseModel):
    location: str
    temperature: int
    humidity: int
    condition: str
