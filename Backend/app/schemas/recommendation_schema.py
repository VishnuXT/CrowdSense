from pydantic import BaseModel


class RecommendationItem(BaseModel):
    id: int
    name: str
    crowd_score: int


class RecommendationResponse(BaseModel):
    current_location: str
    recommendations: list[RecommendationItem]
