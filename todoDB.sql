PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE TODO (
todoId INTEGER PRIMARY KEY,
text varchar(255) NOT NULL,
priority int NOT NULL,
status boolean NOT NULL
);
COMMIT;
