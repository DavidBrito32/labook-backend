-- Active: 1709072183937@@127.0.0.1@3306
CREATE TABLE
    IF NOT EXISTS users (
        id TEXT NOT NULL UNIQUE PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

INSERT INTO
    users (id, name, email, password, role)
VALUES
    (
        'u001',
        'David Brito',
        'david@email.com',
        'David280819',
        'ADMIN'
    );

SELECT
    *
FROM
    users;

create table
    IF NOT EXISTS posts (
        id TEXT NOT NULL PRIMARY KEY,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id)
    );

SELECT
    *
FROM
    posts;

CREATE TABLE
    IF NOT EXISTS likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL DEFAULT 0,
        dislike INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

DROP TABLE likes_dislikes;

PRAGMA table_info (likes_dislikes);