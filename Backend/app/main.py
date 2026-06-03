from fastapi import FastAPI

from api.health import router as health_router

app = FastAPI(
    title="CrowdSense API",
    version="1.0.0"
)

app.include_router(health_router)

@app.get("/")
def root():
    return {
        "success": True,
        "message": "CrowdSense Backend Running"
    }