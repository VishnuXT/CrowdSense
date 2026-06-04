from pydantic import BaseModel


class CrowdScoreResponse(BaseModel):
    location_id: int
    crowd_score: int
    crowd_status: str
    updated_at: str
