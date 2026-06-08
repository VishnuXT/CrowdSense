from fastapi import APIRouter
from app.services.crowd_score_service import get_crowd_score_for_location
import psycopg2

router = APIRouter(
    prefix="/api/locations",
    tags=["locations"]
)


# GET ALL LOCATIONS


@router.get("/")
def get_locations():

    conn = psycopg2.connect(
        host="192.168.30.221",
        port=5432,
        database="crowdsense",
        user="postgres",
        password="v1I2s3h4n5u6"
    )

    cur = conn.cursor()

    cur.execute(
        """
        SELECT id, name, latitude, longitude ,address ,popularity_score
        FROM locations
        ORDER BY id ASC
        """
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:
        result.append({
            "id": row[0],
            "name": row[1],
            "latitude": row[2],
            "longitude": row[3],
            "address" : row[4],
            "popularity_score" : row[5]
        })

    return result



# GET LOCATION BY ID


@router.get("/{id}")
def get_location(id: int):

    conn = psycopg2.connect(
      host="192.168.30.221",
        port=5432,
        database="crowdsense",
        user="postgres",
        password="v1I2s3h4n5u6"
    )

    cur = conn.cursor()

    cur.execute(
        """
        SELECT id, name, address,
               latitude, longitude,
               category_id
        FROM locations
        WHERE id = %s
        """,
        (id,)
    )

    row = cur.fetchone()

    cur.close()
    conn.close()

    if row is None:
        return {
            "message": "Location not found"
        }

    result = {
        "id": row[0],
        "name": row[1],
        "address": row[2],
        "latitude": row[3],
        "longitude": row[4],
        "category_id": row[5]
    }

    return result


@router.get("/category/{category_id}")
def get_locations_by_category(category_id: int):

    conn = psycopg2.connect(
       host="192.168.30.221",
        port=5432,
        database="crowdsense",
        user="postgres",
        password="v1I2s3h4n5u6"
    )

    cur = conn.cursor()

    cur.execute(
        """
        SELECT
            l.id,
            l.name,
            c.name,
            l.description,
            l.image_url
        FROM locations l
        JOIN categories c
            ON l.category_id = c.id
        WHERE l.category_id = %s
        ORDER BY l.id ASC
        """,
        (category_id,)
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:

        location_id = row[0]

        crowd_data = get_crowd_score_for_location(location_id)

        crowd_status = "Unknown"

        if crowd_data:
            crowd_status = crowd_data.get("crowd_status", "Unknown")

        result.append({
            "id": row[0],
            "name": row[1],
            "category": row[2],
            "description": row[3],
            "image_url": row[4],
            "crowd_status": crowd_status
        })

    return result


# CREATE LOCATION


@router.post("/")
def create_location(location: dict):

    conn = psycopg2.connect(
        host="192.168.30.221",
        port=5432,
        database="crowdsense",
        user="postgres",
        password="v1I2s3h4n5u6"
    )

    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO locations
        (
            name,
            address,
            latitude,
            longitude,
            category_id,
            popularity_score,
            image_url
        )
        VALUES (%s, %s, %s, %s, %s ,%s,%s)
        RETURNING id
        """,
        (
            location["name"],
            location["address"],
            location["latitude"],
            location["longitude"],
            location["category_id"],
            location["popularity_score"],
            location["image_url"]
        )
    )

    new_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Location created successfully",
        "id": new_id
    }



@router.get("/{id}")
def get_location(id: int):

    conn = psycopg2.connect(
        host="192.168.30.221",
        port=5432,
        database="crowdsense",
        user="postgres",
        password="v1I2s3h4n5u6"
    )

    cur = conn.cursor()

    cur.execute(
        """
        SELECT
            id,
            name,
            address,
            latitude,
            longitude,
            category_id,
            popularity_score,
            image_url
        FROM locations
        WHERE id = %s
        """,
        (id,)
    )

    row = cur.fetchone()

    cur.close()
    conn.close()

    if row is None:
        return {
            "message": "Location not found"
        }

    return {
        "id": row[0],
        "name": row[1],
        "address": row[2],
        "latitude": row[3],
        "longitude": row[4],
        "category_id": row[5],
        "popularity_score": row[6],
        "image_url": row[7]
    }