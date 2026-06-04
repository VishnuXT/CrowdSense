INSERT INTO admins (id, name, email, password)
VALUES
    (1, 'Admin', 'admin@crowdsense.com', 'admin123')
ON CONFLICT (id) DO UPDATE
SET
    name = EXCLUDED.name,
    email = EXCLUDED.email,
    password = EXCLUDED.password;

INSERT INTO categories (id, name, description)
VALUES
    (1, 'Religious', 'Temples and religious places'),
    (2, 'Shopping', 'Malls and commercial shopping locations'),
    (3, 'Tourism', 'Beaches, parks and tourist attractions')
ON CONFLICT (id) DO UPDATE
SET
    name = EXCLUDED.name,
    description = EXCLUDED.description;

INSERT INTO locations (
    id,
    category_id,
    name,
    address,
    description,
    latitude,
    longitude,
    image_url
)
VALUES
    (
        1,
        2,
        'Lulu Mall',
        'Akkulam, Trivandrum',
        'Popular shopping mall in Thiruvananthapuram.',
        8.52410000,
        76.93660000,
        NULL
    ),
    (
        2,
        1,
        'Sree Padmanabhaswamy Temple',
        'West Nada, Fort, Thiruvananthapuram',
        'Historic temple and major religious destination.',
        8.48280000,
        76.94360000,
        NULL
    ),
    (
        3,
        3,
        'Kovalam Beach',
        'Kovalam, Thiruvananthapuram',
        'Popular beach destination known for the lighthouse and coastline.',
        8.40030000,
        76.97800000,
        NULL
    )
ON CONFLICT (id) DO UPDATE
SET
    category_id = EXCLUDED.category_id,
    name = EXCLUDED.name,
    address = EXCLUDED.address,
    description = EXCLUDED.description,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    image_url = EXCLUDED.image_url;

INSERT INTO events (
    id,
    location_id,
    title,
    description,
    start_date,
    end_date,
    expected_crowd,
    status
)
VALUES
    (
        1,
        2,
        'Christmas Celebration',
        'Annual festive celebration expected to attract visitors.',
        '2026-12-24 18:00:00',
        '2026-12-25 22:00:00',
        2000,
        'ACTIVE'
    )
ON CONFLICT (id) DO UPDATE
SET
    location_id = EXCLUDED.location_id,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    start_date = EXCLUDED.start_date,
    end_date = EXCLUDED.end_date,
    expected_crowd = EXCLUDED.expected_crowd,
    status = EXCLUDED.status;

SELECT setval('admins_id_seq', (SELECT MAX(id) FROM admins));
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations));
SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));
