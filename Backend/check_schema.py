import psycopg2
conn = psycopg2.connect(host='192.168.30.221', port=5432, database='crowdsense', user='postgres', password='v1I2s3h4n5u6')
cur = conn.cursor()

# Add event_type column if it doesn't exist
cur.execute("""
    ALTER TABLE events 
    ADD COLUMN IF NOT EXISTS event_type character varying DEFAULT 'General'
""")
conn.commit()

# Verify
cur.execute("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'events' ORDER BY ordinal_position")
rows = cur.fetchall()
print("=== UPDATED EVENTS TABLE ===")
for row in rows:
    print(row)

conn.close()
print("Done!")
