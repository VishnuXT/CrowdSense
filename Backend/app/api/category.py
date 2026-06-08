from fastapi import APIRouter
  
import psycopg2

router = APIRouter(
    prefix="/api/categories",
    tags=["categories"]
)

@router.get("/")
def get_categories():

    conn = psycopg2.connect(
         host="192.168.30.221",
        # host="Localhost",
        port=5432,
        database="crowdsense",
        user="postgres",
        password="v1I2s3h4n5u6"
    )

    cur = conn.cursor()

    cur.execute("SELECT * FROM categories")

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:
        result.append({
            "id": row[0],
            "name": row[1],
            "description": row[2],
            "status": row[3]
        })

    return result



# GET CATEGORY BY ID


@router.get("/{id}")
def get_category(id: int):

    conn = psycopg2.connect(
       host="192.168.30.221",
        port=5432,
        database="crowdsense",
        user="postgres",
        password="v1I2s3h4n5u6"
    )

    cur = conn.cursor()

    cur.execute(
        "SELECT * FROM categories WHERE id = %s",
        (id,)
    )

    row = cur.fetchone()

    cur.close()
    conn.close()

    if row is None:
        return {
            "message": "Category not found"
        }

    return {
        "id": row[0],
        "name": row[1],
        "description": row[2],
        "status": row[3]
    }







# CREATE CATEGORY


@router.post("/")
def create_category(category: dict):

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
        INSERT INTO categories
        (name, description, status)

        VALUES (%s, %s, %s)

        RETURNING id
        """,
        (
            category["name"],
            category["description"],
            "ACTIVE"
        )
    )

    new_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Category created successfully",
        "id": new_id
    }
    
    
    
    
    

# UPDATE CATEGORY

# UPDATE CATEGORY

@router.put("/{id}")
def update_category(id: int, category: dict):

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
        UPDATE categories
        SET
            name = %s,
            description = %s
        WHERE id = %s
        """,
        (
            category["name"],
            category["description"],
            id
        )
    )

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Category updated successfully"
    }