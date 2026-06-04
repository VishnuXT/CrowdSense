from typing import Dict, Optional

from pydantic import BaseModel


class AdminLoginRequest(BaseModel):
    email: str
    password: str


class AdminLoginResponse(BaseModel):
    success: bool
    message: str
    token: Optional[str] = None
    admin: Optional[Dict[str, str | int]] = None
