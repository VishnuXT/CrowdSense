-- ============================================================
-- ADMIN
-- ============================================================

INSERT INTO admins (id, name, email, password)
VALUES
    (1, 'Admin', 'admin@crowdsense.com', 'admin123')
ON CONFLICT (id) DO UPDATE
SET
    name     = EXCLUDED.name,
    email    = EXCLUDED.email,
    password = EXCLUDED.password;


-- ============================================================
-- CATEGORIES
-- ============================================================

INSERT INTO categories (id, name, description, status)
VALUES
    (1, 'Beach',         'Popular beach destinations and coastal tourist attractions.', 'ACTIVE'),
    (2, 'Mall',          'Shopping malls and commercial centers.',                      'ACTIVE'),
    (3, 'Temple',        'Religious and pilgrimage locations.',                         'ACTIVE'),
    (4, 'Park',          'Parks, gardens, and recreational spaces.',                   'ACTIVE'),
    (5, 'Tourist Place', 'Museums, landmarks, and tourist attractions.',               'ACTIVE')
ON CONFLICT (id) DO UPDATE
SET
    name        = EXCLUDED.name,
    description = EXCLUDED.description,
    status      = EXCLUDED.status;


-- ============================================================
-- LOCATIONS
-- ============================================================

INSERT INTO locations (
    id,
    category_id,
    name,
    address,
    description,
    latitude,
    longitude,
    popularity_score,
    image_url,
    status
)
VALUES
    (
        1, 1,
        'Kovalam Beach',
        'Kovalam, Thiruvananthapuram',
        'A world-famous crescent-shaped beach known for its lighthouse, calm waters, and scenic coastline.',
        8.39880000, 76.97840000,
        60,
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        'ACTIVE'
    ),
    (
        2, 1,
        'Poovar Beach',
        'Poovar, Thiruvananthapuram',
        'A serene beach where the river meets the sea, known for its backwaters and golden sands.',
        8.31500000, 77.08150000,
        35,
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
        'ACTIVE'
    ),
    (
        3, 1,
        'Varkala Beach',
        'Varkala, Kerala',
        'A stunning clifftop beach renowned for its natural spring, mineral waters, and laid-back vibe.',
        8.73790000, 76.71630000,
        55,
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        'ACTIVE'
    ),
    (
        4, 2,
        'Lulu Mall',
        'Edappally, Kochi',
        'One of the largest shopping malls in India, offering retail, dining, and entertainment under one roof.',
        10.02760000, 76.30840000,
        60,
        'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800',
        'ACTIVE'
    ),
    (
        5, 3,
        'Padmanabhaswamy Temple',
        'East Fort, Thiruvananthapuram',
        'One of the richest and most sacred Hindu temples in the world, dedicated to Lord Vishnu.',
        8.48280000, 76.94360000,
        50,
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
        'ACTIVE'
    ),
    (
        6, 5,
        'Napier Museum',
        'Museum Compound, Thiruvananthapuram',
        'A heritage museum housing an impressive collection of sculptures, ivory carvings, and ancient artifacts.',
        8.50910000, 76.95500000,
        40,
        'https://images.unsplash.com/photo-1569587112025-0d460e81a126?w=800',
        'ACTIVE'
    ),
    (
        7, 1,
        'Shanghumugham Beach',
        'Shanghumugham, Thiruvananthapuram',
        'A city beach near the airport, popular for evening walks and featuring a large mermaid sculpture.',
        8.48140000, 76.91200000,
        45,
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        'ACTIVE'
    ),
    (
        8, 4,
        'Thiruvananthapuram Zoo',
        'Museum Compound, Thiruvananthapuram',
        'One of the oldest zoos in India, home to a wide variety of animals, birds, and reptiles.',
        8.50960000, 76.95460000,
        30,
        'https://images.unsplash.com/photo-1534567200-4d0b2f4e1a8f?w=800',
        'ACTIVE'
    )
ON CONFLICT (id) DO UPDATE
SET
    category_id      = EXCLUDED.category_id,
    name             = EXCLUDED.name,
    address          = EXCLUDED.address,
    description      = EXCLUDED.description,
    latitude         = EXCLUDED.latitude,
    longitude        = EXCLUDED.longitude,
    popularity_score = EXCLUDED.popularity_score,
    image_url        = EXCLUDED.image_url,
    status           = EXCLUDED.status;


-- ============================================================
-- EVENTS
-- ============================================================

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
        1, 1,
        'Kovalam Beach Festival',
        'An annual coastal festival celebrating local culture, music, and water sports at Kovalam Beach.',
        '2026-12-20 09:00:00',
        '2026-12-21 21:00:00',
        2500,
        'ACTIVE'
    ),
    (
        2, 4,
        'Shopping Carnival',
        'A grand multi-day shopping extravaganza with exclusive deals, live performances, and food stalls.',
        '2026-12-24 10:00:00',
        '2026-12-28 22:00:00',
        4000,
        'ACTIVE'
    ),
    (
        3, 5,
        'Temple Festival',
        'A traditional festival at Padmanabhaswamy Temple with rituals, processions, and cultural programs.',
        '2027-01-10 06:00:00',
        '2027-01-12 22:00:00',
        3000,
        'ACTIVE'
    ),
    (
        4, 3,
        'Surf Competition',
        'An exciting surfing competition at Varkala Beach attracting surfers and spectators from across Kerala.',
        '2027-02-15 08:00:00',
        '2027-02-15 18:00:00',
        1500,
        'ACTIVE'
    )
ON CONFLICT (id) DO UPDATE
SET
    location_id    = EXCLUDED.location_id,
    title          = EXCLUDED.title,
    description    = EXCLUDED.description,
    start_date     = EXCLUDED.start_date,
    end_date       = EXCLUDED.end_date,
    expected_crowd = EXCLUDED.expected_crowd,
    status         = EXCLUDED.status;


-- ============================================================
-- RESET SEQUENCES
-- ============================================================

SELECT setval('admins_id_seq',     (SELECT MAX(id) FROM admins));
SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));
SELECT setval('locations_id_seq',  (SELECT MAX(id) FROM locations));
SELECT setval('events_id_seq',     (SELECT MAX(id) FROM events));
