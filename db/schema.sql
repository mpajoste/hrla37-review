DROP DATABASE IF EXISTS pokemon;

CREATE DATABASE pokemon;

USE pokemon;

CREATE TABLE poke (
    id int NOT NULL AUTO_INCREMENT,
    pokeName VARCHAR(255),
    pokeType VARCHAR(255),
    pokeImg VARCHAR(255),
    PRIMARY KEY(id)
)

