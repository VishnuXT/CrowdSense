from datetime import datetime, timezone


SAMPLE_LOCATIONS = [
    {
        "id": 1,
        "name": "Lulu Mall",
        "address": "Akkulam, Trivandrum",
        "latitude": 8.5241,
        "longitude": 76.9366,
        "category_id": 2,
    },
    {
        "id": 2,
        "name": "Mall of Travancore",
        "address": "Chackai, Trivandrum",
        "latitude": 8.4887,
        "longitude": 76.9492,
        "category_id": 2,
    },
    {
        "id": 3,
        "name": "Centre Square Mall",
        "address": "Kochi",
        "latitude": 9.9816,
        "longitude": 76.2999,
        "category_id": 2,
    },
    {
        "id": 4,
        "name": "Kovalam Beach",
        "address": "Kovalam, Thiruvananthapuram",
        "latitude": 8.4003,
        "longitude": 76.9780,
        "category_id": 1,
    },
]


def get_sample_location(location_id: int):
    return next(
        (location for location in SAMPLE_LOCATIONS if location["id"] == location_id),
        None,
    )


def get_updated_at() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()
