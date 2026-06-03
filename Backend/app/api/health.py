from fastapi import APIRouter

router = APIRouter(
    prefix="/api/health",
    tags=["Health"]
)

@router.get("/")
def health_check():
    return {
        "success": True,
        "service": "CrowdSense Backend",
        "status": "healthy",
        "version": "1.0.0"
    }