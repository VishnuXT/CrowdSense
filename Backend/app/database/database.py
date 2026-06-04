import os
from contextlib import contextmanager
from pathlib import Path

from dotenv import load_dotenv

try:
    import psycopg
    from psycopg.rows import dict_row
except Exception:
    psycopg = None
    dict_row = None


def get_database_url() -> str:
    backend_dir = Path(__file__).resolve().parents[2]
    load_dotenv(backend_dir / ".env")

    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise RuntimeError("DATABASE_URL is not configured")
    return database_url


def get_connection():
    if psycopg is None:
        raise RuntimeError("psycopg is not installed. Install it with: pip install psycopg[binary]")

    return psycopg.connect(get_database_url(), row_factory=dict_row)


@contextmanager
def db_cursor():
    connection = get_connection()
    try:
        with connection:
            with connection.cursor() as cursor:
                yield cursor
    finally:
        connection.close()


def run_sql_file(path: str) -> None:
    with open(path, "r", encoding="utf-8") as sql_file:
        sql = sql_file.read()

    with db_cursor() as cursor:
        cursor.execute(sql)
