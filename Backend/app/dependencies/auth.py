import os
import base64
import hmac
import json
from datetime import datetime, timezone
from fastapi import Depends, HTTPException, Header
from typing import Optional

from ..services.admin_auth_service import verify_admin_token

def get_admin_user(authorization: Optional[str] = Header(None)) -> dict:
    """FastAPI dependency to get current admin user from Bearer token.
    Raises HTTPException 401 if token missing or invalid.
    """
    if authorization is None or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or malformed")
    token = authorization.split(" ", 1)[1]
    try:
        payload = verify_admin_token(token)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
    return payload
