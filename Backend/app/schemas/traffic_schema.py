from typing import Optional

from pydantic import BaseModel


class TrafficResponse(BaseModel):
    location: str
    congestion: str
    travel_time: str
    status: str
    current_speed: Optional[int] = None
    free_flow_speed: Optional[int] = None
    confidence: Optional[float] = None
    source: str = "sample"
