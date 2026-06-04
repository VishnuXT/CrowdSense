from typing import Optional

from app.database.database import db_cursor


def get_location_by_id(location_id: int) -> Optional[dict]:
    with db_cursor() as cursor:
        cursor.execute(
            """
            SELECT
                id,
                category_id,
                name,
                address,
                description,
                latitude,
                longitude,
                popularity_score,
                image_url,
                status,
                created_at
            FROM locations
            WHERE id = %s
            """,
            (location_id,),
        )
        return cursor.fetchone()


def get_locations_for_recommendations(exclude_location_id: int, category_id: int) -> list[dict]:
    with db_cursor() as cursor:
        cursor.execute(
            """
            SELECT
                id,
                category_id,
                name,
                address,
                latitude,
                longitude,
                popularity_score,
                image_url,
                status
            FROM locations
            WHERE id <> %s AND category_id = %s AND status = 'ACTIVE'
            ORDER BY name ASC
            """,
            (exclude_location_id, category_id),
        )
        return cursor.fetchall()
