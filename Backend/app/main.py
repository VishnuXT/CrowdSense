import sys
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Supports both:
#   Backend> uvicorn app.main:app --reload
#   Backend/app> uvicorn main:app --reload
BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from app.api.admin import router as admin_router
from app.api.crowd_score import router as crowd_score_router
from app.api.dashboard import router as dashboard_router
from app.api.health import router as health_router
from app.api.recommendation import router as recommendation_router
from app.api.traffic import router as traffic_router
from app.api.weather import router as weather_router
from app.api.category import router as categories_router
from app.api.location import router as locations_router
from app.api.event import router as events_router

load_dotenv(BACKEND_DIR / ".env.example")
load_dotenv(BACKEND_DIR / ".env", override=True)

app = FastAPI(
    title="CrowdSense API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(admin_router)
app.include_router(weather_router)
app.include_router(traffic_router)
app.include_router(crowd_score_router)
app.include_router(recommendation_router)
app.include_router(dashboard_router)
app.include_router(events_router)       
app.include_router(categories_router)
app.include_router(locations_router)

@app.get("/")
def root():
    return {
        "success": True,
        "message": "CrowdSense Backend Running",
    }
