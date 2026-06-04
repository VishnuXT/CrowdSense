from pathlib import Path

from dotenv import load_dotenv

from app.database.database import run_sql_file


BASE_DIR = Path(__file__).resolve().parents[2]
DATABASE_DIR = Path(__file__).resolve().parent


def init_database() -> None:
    load_dotenv(BASE_DIR / ".env")
    run_sql_file(str(DATABASE_DIR / "schema.sql"))
    run_sql_file(str(DATABASE_DIR / "seed.sql"))


if __name__ == "__main__":
    init_database()
    print("Database initialized successfully")
