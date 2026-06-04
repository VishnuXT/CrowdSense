from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_get_dashboard_summary():
    response = client.get("/api/dashboard/summary")
    assert response.status_code == 200
    data = response.json()
    assert "total_categories" in data
    assert "total_locations" in data
    assert "active_locations" in data

    assert isinstance(data["total_categories"], int)
    assert isinstance(data["total_locations"], int)
    assert isinstance(data["active_locations"], int)

    # Basic bounds checking based on seed data
    assert data["total_categories"] >= 3
    assert data["total_locations"] >= 3
    assert data["active_locations"] >= 3
