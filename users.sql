DROP TABLE IF EXISTS network;

CREATE TABLE network (
    id SERIAL PRIMARY KEY,
    first VARCHAR(100) not null,
    last VARCHAR(100) not null,
    email VARCHAR(250) not null,
    hashedpassword VARCHAR(250) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
