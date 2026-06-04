from app.database.database import db_cursor


def get_dashboard_counts() -> dict:
    with db_cursor() as cursor:
        cursor.execute("SELECT COUNT(*) AS count FROM categories")
        total_categories = int(cursor.fetchone()["count"])

        cursor.execute("SELECT COUNT(*) AS count FROM locations")
        total_locations = int(cursor.fetchone()["count"])

        cursor.execute("SELECT COUNT(*) AS count FROM locations WHERE status = 'ACTIVE'")
        active_locations = int(cursor.fetchone()["count"])

    return {
        "total_categories": total_categories,
        "total_locations": total_locations,
        "active_locations": active_locations,
    }
