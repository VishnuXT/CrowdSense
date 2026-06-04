from fastapi import APIRouter

from app.schemas.dashboard_schema import DashboardSummaryResponse
from app.repositories.dashboard_repository import get_dashboard_counts

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary", response_model=DashboardSummaryResponse)
def get_summary():
    return get_dashboard_counts()
