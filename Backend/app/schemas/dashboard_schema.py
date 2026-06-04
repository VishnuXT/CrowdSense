from pydantic import BaseModel


class DashboardSummaryResponse(BaseModel):
    total_categories: int
    total_locations: int
    active_locations: int
