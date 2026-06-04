from fastapi import APIRouter
import psycopg2

router = APIRouter(
    prefix="/api/events",
    tags=["events"]
)

@router.get("/")
def get_events():

    conn = psycopg2.connect(
        host="192.168.30.221",
        port=5432,
        database="crowdsense",
        user="postgres",
        password="v1I2s3h4n5u6"
    )

    cur = conn.cursor()

    cur.execute("SELECT * FROM events")

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:
        result.append({
            "id": row[0],
            "title": row[2],
            "expected_crowd": row[6]
        })

    return result





   

@router.post("/")
def create_event(event: dict):

    conn = psycopg2.connect(
        host="192.168.30.221",
        port=5432,
        database="crowdsense",
        user="postgres",
        password="v1I2s3h4n5u6"
    )

    cur = conn.cursor()

    # Pass the dictionary values as a tuple matching the order of %s
    cur.execute(
        """
        INSERT INTO events (title, description, location_id, start_date, end_date, expected_crowd)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
        """,
        (
            event["title"],
            event["description"],
            event["location_id"],
            event["start_date"],
            event["end_date"],
            event["expected_crowd"]
        )
    )
    
    event_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    # Updated "id" to "event_id" to match your target image design perfectly
    return {
        "message": "Event created successfully",
        "event_id": event_id
    }





@router.put("/{id}")
def update_event(id: int, event: dict):

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
        UPDATE events
        SET title = %s,
            expected_crowd = %s
        WHERE id = %s
        """,
        (
            event["title"],
            event["expected_crowd"],
            id
        )
    )

    conn.commit()

    cur.close()
    conn.close()

    # Matches the exact JSON return message from your screenshot
    return {
        "message": "Event updated"
    }




