-- Drop table if exists
DROP TABLE IF EXISTS question_tags, question_options, tags, questions CASCADE;

-- QUESTIONS TABLE
CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- QUESTION OPTIONS TABLE
CREATE TABLE question_options(
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE
);

-- TAGS TABLE
CREATE TABLE tags(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- QUESTION_TAGS (JOIN TABLE for MANY-TO-MANY)
CREATE TABLE question_tags(
    question_id INTEGER REFERENCES question(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, tag_id)
);