from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_admin_login_success():
    payload = {
        "email": "admin@crowdsense.com",
        "password": "admin123"
    }
    response = client.post("/api/admin/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["message"] == "Login successful"
    assert "token" in data
    assert data["admin"]["email"] == "admin@crowdsense.com"
    assert data["admin"]["role"] == "admin"

def test_admin_login_wrong_password():
    payload = {
        "email": "admin@crowdsense.com",
        "password": "wrongpassword"
    }
    response = client.post("/api/admin/login", json=payload)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"

def test_admin_login_nonexistent_email():
    payload = {
        "email": "nonexistent@crowdsense.com",
        "password": "admin123"
    }
    response = client.post("/api/admin/login", json=payload)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"
