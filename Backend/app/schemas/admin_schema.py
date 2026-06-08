from pydantic import BaseModel
from typing import Dict, Optional

class AdminLoginRequest(BaseModel):
    email: str
    password: str

class AdminLoginResponse(BaseModel):
    success: bool
    message: str
    admin: Optional[Dict[str, str | int]] = None
