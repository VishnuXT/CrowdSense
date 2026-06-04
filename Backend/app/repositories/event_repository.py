from app.database.database import db_cursor


def get_active_events_for_location(location_id: int) -> list[dict]:
    with db_cursor() as cursor:
        cursor.execute(
            """
            SELECT
                id,
                location_id,
                title,
                expected_crowd,
                start_date,
                end_date,
                status
            FROM events
            WHERE location_id = %s
              AND status = 'ACTIVE'
              AND start_date <= CURRENT_TIMESTAMP
              AND end_date >= CURRENT_TIMESTAMP
            ORDER BY expected_crowd DESC NULLS LAST
            """,
            (location_id,),
        )
        return cursor.fetchall()
