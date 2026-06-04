from fastapi import APIRouter, HTTPException

from app.schemas.admin_schema import AdminLoginRequest, AdminLoginResponse
from app.repositories.admin_repository import get_admin_by_email
from app.services.admin_auth_service import create_admin_token

router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"]
)

@router.post("/login", response_model=AdminLoginResponse)
def login_admin(payload: AdminLoginRequest):
    admin = get_admin_by_email(payload.email)
    if not admin or admin["password"] != payload.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "success": True,
        "message": "Login successful",
        "token": create_admin_token(admin["id"], admin["email"]),
        "admin": {
            "id": admin["id"],
            "name": admin["name"],
            "email": admin["email"],
            "role": admin["role"],
        },
    }
