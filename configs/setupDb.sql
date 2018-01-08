-- DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS friendships;
-- DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(300) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    first VARCHAR(200) NOT NULL,
    last VARCHAR (200) NOT NULL,
    pic VARCHAR(300),
    bio VARCHAR(300),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    fromUserId INTEGER NOT NULL,
    toUserId INTEGER NOT NULL,
    status VARCHAR (200) NOT NULL
);
--
-- CREATE TABLE messages(
--     mid SERIAL PRIMARY KEY,
--     "fromUserId" INTEGER NOT NULL REFERENCES users(id),
--     "toUserId" INTEGER REFERENCES users(id),
--     "toAll" BIT DEFAULT B'0'::"bit",
--     "messageBody" VARCHAR (300) NOT NULL,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     read BIT DEFAULT B'0'::"bit"
-- );
