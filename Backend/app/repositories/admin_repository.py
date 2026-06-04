from typing import Optional

from app.models.admin_model import Admin


ADMINS = [
    Admin(
        id=1,
        name="Admin User",
        email="admin@crowdsense.com",
        password="admin123",
        role="admin",
    )
]


def get_admin_by_email(email: str) -> Optional[Admin]:
    return next((admin for admin in ADMINS if admin.email == email), None)
