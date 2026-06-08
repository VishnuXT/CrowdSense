from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import psycopg2

router = APIRouter(
    prefix="/api/events",
    tags=["events"]
)

DB_CONFIG = {
    "host": "192.168.30.221",
    "port": 5432,
    "database": "crowdsense",
    "user": "postgres",
    "password": "v1I2s3h4n5u6"
}

def get_conn():
    return psycopg2.connect(**DB_CONFIG)


def crowd_label(expected_crowd: int) -> str:
    """Convert numeric crowd to a label."""
    if expected_crowd is None:
        return "Low"
    if expected_crowd >= 5000:
        return "Very High"
    if expected_crowd >= 2000:
        return "High"
    if expected_crowd >= 500:
        return "Medium"
    return "Low"


def label_to_crowd(label: str) -> int:
    """Convert label back to a representative number."""
    mapping = {
        "Low": 200,
        "Medium": 1000,
        "High": 3000,
        "Very High": 7000,
    }
    return mapping.get(label, 200)


class EventIn(BaseModel):
    eventName: str
    eventType: str
    location: str          # location name (we resolve to location_id)
    eventDate: str         # YYYY-MM-DD
    startTime: str         # HH:MM
    endTime: str           # HH:MM
    crowdLevel: str        # Low / Medium / High / Very High
    status: str = "Active"
    description: Optional[str] = ""


# ─────────────────────────────────────────────
# GET /api/events/
# ─────────────────────────────────────────────
@router.get("/")
def get_events():
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            e.id,
            e.title,
            l.name AS location_name,
            e.start_date,
            e.end_date,
            e.expected_crowd,
            e.status,
            e.description,
            e.location_id
        FROM events e
        LEFT JOIN locations l ON e.location_id = l.id
        ORDER BY e.id DESC
    """)

    rows = cur.fetchall()
    cur.close()
    conn.close()

    result = []
    for row in rows:
        event_id, title, location_name, start_date, end_date, expected_crowd, status, description, location_id = row

        # Build event date and times from timestamps
        event_date = start_date.strftime("%Y-%m-%d") if start_date else ""
        start_time = start_date.strftime("%H:%M") if start_date else ""
        end_time   = end_date.strftime("%H:%M")   if end_date   else ""

        result.append({
            "id":          event_id,
            "eventName":   title or "",
            "eventType":   "General",
            "location":    location_name or "",
            "location_id": location_id,
            "eventDate":   event_date,
            "startTime":   start_time,
            "endTime":     end_time,
            "crowdLevel":  crowd_label(expected_crowd),
            "status":      status.capitalize() if status else "Active",
            "description": description or "",
        })

    return result


# ─────────────────────────────────────────────
# POST /api/events/
# ─────────────────────────────────────────────
@router.post("/")
def create_event(event: EventIn):
    conn = get_conn()
    cur = conn.cursor()

    # Resolve location name → location_id
    cur.execute("SELECT id FROM locations WHERE name ILIKE %s LIMIT 1", (event.location,))
    loc_row = cur.fetchone()
    if loc_row is None:
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail=f"Location '{event.location}' not found")

    location_id = loc_row[0]
    expected_crowd = label_to_crowd(event.crowdLevel)
    db_status = event.status.upper()

    start_dt = f"{event.eventDate} {event.startTime}:00"
    end_dt   = f"{event.eventDate} {event.endTime}:00"

    cur.execute("""
        INSERT INTO events
            (title, event_type, description, location_id, start_date, end_date, expected_crowd, status)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id
    """, (
        event.eventName,
        event.eventType,
        event.description,
        location_id,
        start_dt,
        end_dt,
        expected_crowd,
        db_status,
    ))

    event_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Event created successfully", "event_id": event_id}


# ─────────────────────────────────────────────
# PUT /api/events/{id}
# ─────────────────────────────────────────────
@router.put("/{id}")
def update_event(id: int, event: EventIn):
    conn = get_conn()
    cur = conn.cursor()

    # Resolve location name → location_id
    cur.execute("SELECT id FROM locations WHERE name ILIKE %s LIMIT 1", (event.location,))
    loc_row = cur.fetchone()
    if loc_row is None:
        cur.close()
        conn.close()
        raise HTTPException(status_code=400, detail=f"Location '{event.location}' not found")

    location_id = loc_row[0]
    expected_crowd = label_to_crowd(event.crowdLevel)
    db_status = event.status.upper()

    start_dt = f"{event.eventDate} {event.startTime}:00"
    end_dt   = f"{event.eventDate} {event.endTime}:00"

    cur.execute("""
        UPDATE events
        SET title          = %s,
            event_type     = %s,
            description    = %s,
            location_id    = %s,
            start_date     = %s,
            end_date       = %s,
            expected_crowd = %s,
            status         = %s
        WHERE id = %s
    """, (
        event.eventName,
        event.eventType,
        event.description,
        location_id,
        start_dt,
        end_dt,
        expected_crowd,
        db_status,
        id,
    ))

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Event updated successfully"}


# ─────────────────────────────────────────────
# DELETE /api/events/{id}  (soft-delete → INACTIVE)
# ─────────────────────────────────────────────
@router.delete("/{id}")
def deactivate_event(id: int):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("UPDATE events SET status = 'INACTIVE' WHERE id = %s", (id,))
    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Event deactivated successfully"}


# ─────────────────────────────────────────────
# PATCH /api/events/{id}/reactivate
# ─────────────────────────────────────────────
@router.patch("/{id}/reactivate")
def reactivate_event(id: int):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("UPDATE events SET status = 'ACTIVE' WHERE id = %s", (id,))
    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Event reactivated successfully"}


# ─────────────────────────────────────────────
# GET /api/events/locations  – for dropdowns
# ─────────────────────────────────────────────
@router.get("/locations")
def get_location_names():
    conn = get_conn()
    cur = conn.cursor()
    cur.execute("SELECT id, name FROM locations WHERE status = 'ACTIVE' ORDER BY name")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [{"id": r[0], "name": r[1]} for r in rows]
