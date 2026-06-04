from typing import Optional

from app.database.database import db_cursor


def get_admin_by_email(email: str) -> Optional[dict]:
    with db_cursor() as cursor:
        cursor.execute(
            """
            SELECT
                id,
                name,
                email,
                password
            FROM admins
            WHERE email = %s
            """,
            (email,),
        )
        admin = cursor.fetchone()

    if not admin:
        return None

    admin["role"] = "admin"
    return admin
