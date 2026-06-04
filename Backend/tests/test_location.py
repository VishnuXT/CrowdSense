from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Realtime Weather Endpoint Tests
def test_get_weather_success():
    response = client.get("/api/weather/1")
    assert response.status_code == 200
    data = response.json()
    assert "location" in data
    assert data["location"] == "Lulu Mall"
    assert "temperature" in data
    assert "humidity" in data
    assert "condition" in data

def test_get_weather_location_not_found():
    response = client.get("/api/weather/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Location not found"


# Realtime Traffic Endpoint Tests
def test_get_traffic_success():
    response = client.get("/api/traffic/1")
    assert response.status_code == 200
    data = response.json()
    assert data["location"] == "Lulu Mall"
    assert "congestion" in data
    assert "travel_time" in data
    assert "status" in data

def test_get_traffic_location_not_found():
    response = client.get("/api/traffic/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Location not found"


# Crowd Score Endpoint Tests
def test_get_crowd_score_success():
    response = client.get("/api/crowd-score/1")
    assert response.status_code == 200
    data = response.json()
    assert data["location_id"] == 1
    assert "crowd_score" in data
    assert "crowd_status" in data
    assert "updated_at" in data

def test_get_crowd_score_location_not_found():
    response = client.get("/api/crowd-score/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Location not found"


# Recommendations Endpoint Tests
def test_get_recommendations_success():
    response = client.get("/api/recommendations/1")
    assert response.status_code == 200
    data = response.json()
    assert data["current_location"] == "Lulu Mall"
    assert "recommendations" in data
    assert isinstance(data["recommendations"], list)
    for rec in data["recommendations"]:
        assert "id" in rec
        assert "name" in rec
        assert "crowd_score" in rec

def test_get_recommendations_location_not_found():
    response = client.get("/api/recommendations/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Location not found"
