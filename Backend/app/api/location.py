from fastapi import APIRouter
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
        SELECT id, name, latitude, longitude
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
            "longitude": row[3]
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





# GET LOCATIONS BY CATEGORY


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
        SELECT id, name, latitude, longitude
        FROM locations
        WHERE category_id = %s
        ORDER BY id ASC
        """,
        (category_id,)
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
            "longitude": row[3]
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
            category_id
        )
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
        """,
        (
            location["name"],
            location["address"],
            location["latitude"],
            location["longitude"],
            location["category_id"]
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


# UPDATE LOCATION


@router.put("/{id}")
def update_location(id: int, location: dict):

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
        UPDATE locations
        SET
            name = %s,
            address = %s,
            latitude = %s,
            longitude = %s,
            category_id = %s
        WHERE id = %s
        """,
        (
            location["name"],
            location["address"],
            location["latitude"],
            location["longitude"],
            location["category_id"],
            id
        )
    )

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Location updated successfully"
    }
    
    

