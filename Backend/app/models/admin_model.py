from pydantic import BaseModel


class Admin(BaseModel):
    id: int
    name: str
    email: str
    password: str
    role: str = "admin"
