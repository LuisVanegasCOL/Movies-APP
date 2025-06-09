-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS db_movies;
USE db_movies;

-- Tabla de directores
CREATE TABLE IF NOT EXISTS directors (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(50),
    image_url VARCHAR(255),
    biography TEXT,
    PRIMARY KEY (id)
);

-- Tabla de estrellas (actores/actrices)
CREATE TABLE IF NOT EXISTS stars (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(50),
    image_url VARCHAR(255),
    biography TEXT,
    PRIMARY KEY (id)
);

-- Tabla de géneros
CREATE TABLE IF NOT EXISTS genres (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla de películas
CREATE TABLE IF NOT EXISTS movies (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    release_year INT,
    duration INT,
    rating DECIMAL(3,1),
    image_url VARCHAR(255),
    description TEXT,
    PRIMARY KEY (id)
);

-- Tabla intermedia: películas-directores
CREATE TABLE IF NOT EXISTS movies_directors (
    movies_id BIGINT NOT NULL,
    directors_id BIGINT NOT NULL,
    PRIMARY KEY (movies_id, directors_id),
    FOREIGN KEY (movies_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (directors_id) REFERENCES directors(id) ON DELETE CASCADE
);

-- Tabla intermedia: películas-estrellas
CREATE TABLE IF NOT EXISTS movies_stars (
    movies_id BIGINT NOT NULL,
    stars_id BIGINT NOT NULL,
    PRIMARY KEY (movies_id, stars_id),
    FOREIGN KEY (movies_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (stars_id) REFERENCES stars(id) ON DELETE CASCADE
);

-- Tabla intermedia: películas-géneros
CREATE TABLE IF NOT EXISTS movies_genres (
    movies_id BIGINT NOT NULL,
    genres_id BIGINT NOT NULL,
    PRIMARY KEY (movies_id, genres_id),
    FOREIGN KEY (movies_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (genres_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- Índices adicionales
CREATE INDEX idx_movies_title ON movies(title);
CREATE INDEX idx_movies_year ON movies(release_year);
CREATE INDEX idx_directors_name ON directors(name);
CREATE INDEX idx_stars_name ON stars(name);
CREATE INDEX idx_genres_name ON genres(name);

-- Datos de ejemplo para géneros
INSERT INTO genres (name) VALUES 
('Acción'),
('Aventura'),
('Comedia'),
('Drama'),
('Ciencia Ficción'),
('Terror'),
('Romance'),
('Animación'),
('Documental'),
('Fantasía');

-- Datos de ejemplo para directores
INSERT INTO directors (name, birth_date, nationality, biography, image_url) VALUES 
('Christopher Nolan', '1970-07-30', 'Británico', 'Director conocido por Inception y The Dark Knight. Su estilo se caracteriza por narrativas complejas y efectos visuales innovadores.', 'https://image.tmdb.org/t/p/w500/euDPyqLnuwaWMHajcU3oZ9uZezR.jpg'),
('Quentin Tarantino', '1963-03-27', 'Estadounidense', 'Director conocido por Pulp Fiction y Kill Bill. Su estilo se caracteriza por diálogos afilados y violencia estilizada.', 'https://image.tmdb.org/t/p/w500/6grj6oRvn7nqlxKQfi6MZWxaR4T.jpg'),
('Martin Scorsese', '1942-11-17', 'Estadounidense', 'Director conocido por Taxi Driver y Goodfellas. Maestro del cine de gángsters y dramas urbanos.', 'https://image.tmdb.org/t/p/w500/9U9Y5GQuWX3EZy39B8nkk4NY01S.jpg'),
('James Cameron', '1954-08-16', 'Canadiense', 'Director conocido por Titanic y Avatar. Pionero en efectos visuales y tecnología 3D.', 'https://image.tmdb.org/t/p/w500/8CuL1QyBzXqQj8QxqXqQxqQxqQx.jpg'),
('Steven Spielberg', '1946-12-18', 'Estadounidense', 'Director de clásicos como E.T. y Jurassic Park. Maestro del cine de aventuras.', 'https://image.tmdb.org/t/p/w500/8CuL1QyBzXqQj8QxqXqQxqQxqQx.jpg'),
('David Fincher', '1962-08-28', 'Estadounidense', 'Director conocido por Fight Club y Seven. Especialista en thrillers psicológicos.', 'https://image.tmdb.org/t/p/w500/8CuL1QyBzXqQj8QxqXqQxqQxqQx.jpg'),
('Ridley Scott', '1937-11-30', 'Británico', 'Director de Alien y Blade Runner. Maestro del cine de ciencia ficción.', 'https://image.tmdb.org/t/p/w500/8CuL1QyBzXqQj8QxqXqQxqQxqQx.jpg'),
('Peter Jackson', '1961-10-31', 'Neozelandés', 'Director de la trilogía El Señor de los Anillos. Especialista en adaptaciones épicas.', 'https://image.tmdb.org/t/p/w500/8CuL1QyBzXqQj8QxqXqQxqQxqQx.jpg');

-- Datos de ejemplo para estrellas
INSERT INTO stars (name, birth_date, nationality, biography, image_url) VALUES 
('Leonardo DiCaprio', '1974-11-11', 'Estadounidense', 'Actor conocido por Titanic y Inception. Ganador del Oscar por su papel en The Revenant.', 'https://image.tmdb.org/t/p/w500/wojZHnwXx1TI4Lm3nJU06xdgwtF.jpg'),
('Tom Hanks', '1956-07-09', 'Estadounidense', 'Actor conocido por Forrest Gump y Cast Away. Dos veces ganador del Oscar a Mejor Actor.', 'https://image.tmdb.org/t/p/w500/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg'),
('Meryl Streep', '1949-06-22', 'Estadounidense', 'Actriz conocida por The Devil Wears Prada y Mamma Mia!. La actriz más nominada en la historia de los Oscar.', 'https://image.tmdb.org/t/p/w500/1AsXLiIkgGqUwX3ZP1h3Hl6hTpE.jpg'),
('Brad Pitt', '1963-12-18', 'Estadounidense', 'Actor conocido por Fight Club y Once Upon a Time in Hollywood. Ganador del Oscar.', 'https://image.tmdb.org/t/p/w500/cckcYc2v0yh1tc9QjRelptcOBko.jpg'),
('Scarlett Johansson', '1984-11-22', 'Estadounidense', 'Actriz conocida por Lost in Translation y Black Widow. Nominada al Oscar.', 'https://image.tmdb.org/t/p/w500/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg'),
('Robert Downey Jr.', '1965-04-04', 'Estadounidense', 'Actor conocido por Iron Man y Sherlock Holmes. Reconocido por su versatilidad.', 'https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg'),
('Emma Watson', '1990-04-15', 'Británica', 'Actriz conocida por Harry Potter y La Bella y la Bestia. También activista.', 'https://image.tmdb.org/t/p/w500/7xXJ15VEf7G9GdAuV1eRrMxVIzr.jpg'),
('Denzel Washington', '1954-12-28', 'Estadounidense', 'Actor conocido por Training Day y Malcolm X. Dos veces ganador del Oscar.', 'https://image.tmdb.org/t/p/w500/khMf8LLTtppUwuZqqnigD2nq2b1.jpg');

-- Datos de ejemplo para películas
INSERT INTO movies (title, release_year, duration, rating, image_url, description) VALUES 
('Inception', 2010, 148, 8.8, 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', 'Un ladrón que roba información a través del uso de la tecnología de compartir sueños, recibe la tarea inversa de plantar una idea en la mente de un CEO.'),
('The Dark Knight', 2008, 152, 9.0, 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'Cuando la amenaza conocida como el Joker causa estragos y caos en Gotham City, Batman debe aceptar una de las pruebas psicológicas y físicas más grandes de su capacidad para luchar contra la injusticia.'),
('Pulp Fiction', 1994, 154, 8.9, 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 'Las vidas de dos sicarios, un boxeador, la esposa de un gángster y dos bandidos se entrelazan en cuatro historias de violencia y redención.'),
('Avatar', 2009, 162, 7.8, 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg', 'Un ex-marine es enviado a Pandora en una misión única, pero se encuentra dividido entre seguir sus órdenes y proteger el mundo que siente como su hogar.'),
('E.T. the Extra-Terrestrial', 1982, 115, 7.9, 'https://image.tmdb.org/t/p/w500/qIicLxr7B7gIt5hxZxo423BJLlK.jpg', 'Un niño solitario hace amistad con un extraterrestre abandonado en la Tierra.'),
('Fight Club', 1999, 139, 8.8, 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'Un oficinista insomne y un fabricante de jabón forman un club de lucha clandestino que evoluciona hacia algo mucho más grande.'),
('Alien', 1979, 117, 8.4, 'https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3V6Hw.jpg', 'La tripulación de una nave espacial comercial se encuentra con una forma de vida letal después de investigar una señal de socorro.'),
('The Lord of the Rings: The Fellowship of the Ring', 2001, 178, 8.8, 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', 'Un hobbit emprende un épico viaje para destruir un poderoso anillo y salvar a la Tierra Media del Señor Oscuro.'),
('Titanic', 1997, 195, 7.9, 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', 'Una joven aristócrata y un artista se enamoran durante el viaje inaugural del Titanic.'),
('Jurassic Park', 1993, 127, 8.1, 'https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg', 'Un parque temático con dinosaurios clonados se convierte en una pesadilla cuando los animales escapan.'),
('Seven', 1995, 127, 8.6, 'https://image.tmdb.org/t/p/w500/6yOGQVcHjU7MmA5Wr1Qqrm1D6Qq.jpg', 'Dos detectives investigan una serie de asesinatos basados en los siete pecados capitales.'),
('Blade Runner', 1982, 117, 8.1, 'https://image.tmdb.org/t/p/w500/63N9uy8nd9j7Eog2cPQi6vwf5kQ.jpg', 'Un cazador de replicantes debe perseguir a cuatro androides que han escapado a la Tierra.'),
('The Matrix', 1999, 136, 8.7, 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 'Un programador descubre que la realidad tal como la conocemos es una simulación creada por máquinas.');

-- Relaciones películas-directores
INSERT INTO movies_directors (movies_id, directors_id) VALUES 
(1, 1), -- Inception - Christopher Nolan
(2, 1), -- The Dark Knight - Christopher Nolan
(3, 2); -- Pulp Fiction - Quentin Tarantino

-- Relaciones películas-estrellas
INSERT INTO movies_stars (movies_id, stars_id) VALUES 
(1, 1), -- Inception - Leonardo DiCaprio
(2, 1), -- The Dark Knight - Leonardo DiCaprio
(3, 2); -- Pulp Fiction - Tom Hanks

-- Relaciones películas-géneros
INSERT INTO movies_genres (movies_id, genres_id) VALUES 
(1, 5), -- Inception - Ciencia Ficción
(1, 1), -- Inception - Acción
(2, 1), -- The Dark Knight - Acción
(2, 4), -- The Dark Knight - Drama
(3, 4), -- Pulp Fiction - Drama
(3, 3); -- Pulp Fiction - Comedia

-- Datos adicionales para directores
INSERT INTO directors (name, birth_date, nationality, biography, image_url) VALUES 
('Steven Spielberg', '1946-12-18', 'Estadounidense', 'Director de clásicos como E.T. y Jurassic Park. Maestro del cine de aventuras.', 'https://image.tmdb.org/t/p/w500/8CuL1QyBzXqQj8QxqXqQxqQxqQx.jpg'),
('David Fincher', '1962-08-28', 'Estadounidense', 'Director conocido por Fight Club y Seven. Especialista en thrillers psicológicos.', 'https://image.tmdb.org/t/p/w500/8CuL1QyBzXqQj8QxqXqQxqQxqQx.jpg'),
('Ridley Scott', '1937-11-30', 'Británico', 'Director de Alien y Blade Runner. Maestro del cine de ciencia ficción.', 'https://image.tmdb.org/t/p/w500/8CuL1QyBzXqQj8QxqXqQxqQxqQx.jpg'),
('Peter Jackson', '1961-10-31', 'Neozelandés', 'Director de la trilogía El Señor de los Anillos. Especialista en adaptaciones épicas.', 'https://image.tmdb.org/t/p/w500/8CuL1QyBzXqQj8QxqXqQxqQxqQx.jpg');

-- Datos adicionales para estrellas
INSERT INTO stars (name, birth_date, nationality, biography, image_url) VALUES 
('Brad Pitt', '1963-12-18', 'Estadounidense', 'Actor conocido por Fight Club y Once Upon a Time in Hollywood. Ganador del Oscar.', 'https://image.tmdb.org/t/p/w500/cckcYc2v0yh1tc9QjRelptcOBko.jpg'),
('Scarlett Johansson', '1984-11-22', 'Estadounidense', 'Actriz conocida por Lost in Translation y Black Widow. Nominada al Oscar.', 'https://image.tmdb.org/t/p/w500/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg'),
('Robert Downey Jr.', '1965-04-04', 'Estadounidense', 'Actor conocido por Iron Man y Sherlock Holmes. Reconocido por su versatilidad.', 'https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg'),
('Emma Watson', '1990-04-15', 'Británica', 'Actriz conocida por Harry Potter y La Bella y la Bestia. También activista.', 'https://image.tmdb.org/t/p/w500/7xXJ15VEf7G9GdAuV1eRrMxVIzr.jpg'),
('Denzel Washington', '1954-12-28', 'Estadounidense', 'Actor conocido por Training Day y Malcolm X. Dos veces ganador del Oscar.', 'https://image.tmdb.org/t/p/w500/khMf8LLTtppUwuZqqnigD2nq2b1.jpg');

-- Datos adicionales para películas
INSERT INTO movies (title, release_year, duration, rating, image_url, description) VALUES 
('Avatar', 2009, 162, 7.8, 'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg', 'Un ex-marine es enviado a Pandora en una misión única, pero se encuentra dividido entre seguir sus órdenes y proteger el mundo que siente como su hogar.'),
('E.T. the Extra-Terrestrial', 1982, 115, 7.9, 'https://image.tmdb.org/t/p/w500/qIicLxr7B7gIt5hxZxo423BJLlK.jpg', 'Un niño solitario hace amistad con un extraterrestre abandonado en la Tierra.'),
('Fight Club', 1999, 139, 8.8, 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', 'Un oficinista insomne y un fabricante de jabón forman un club de lucha clandestino que evoluciona hacia algo mucho más grande.'),
('Alien', 1979, 117, 8.4, 'https://image.tmdb.org/t/p/w500/vfrQk5IPloGg1v9Rzbh2Eg3V6Hw.jpg', 'La tripulación de una nave espacial comercial se encuentra con una forma de vida letal después de investigar una señal de socorro.'),
('The Lord of the Rings: The Fellowship of the Ring', 2001, 178, 8.8, 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', 'Un hobbit emprende un épico viaje para destruir un poderoso anillo y salvar a la Tierra Media del Señor Oscuro.'),
('Titanic', 1997, 195, 7.9, 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', 'Una joven aristócrata y un artista se enamoran durante el viaje inaugural del Titanic.'),
('Jurassic Park', 1993, 127, 8.1, 'https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg', 'Un parque temático con dinosaurios clonados se convierte en una pesadilla cuando los animales escapan.'),
('Seven', 1995, 127, 8.6, 'https://image.tmdb.org/t/p/w500/6yOGQVcHjU7MmA5Wr1Qqrm1D6Qq.jpg', 'Dos detectives investigan una serie de asesinatos basados en los siete pecados capitales.'),
('Blade Runner', 1982, 117, 8.1, 'https://image.tmdb.org/t/p/w500/63N9uy8nd9j7Eog2cPQi6vwf5kQ.jpg', 'Un cazador de replicantes debe perseguir a cuatro androides que han escapado a la Tierra.'),
('The Matrix', 1999, 136, 8.7, 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 'Un programador descubre que la realidad tal como la conocemos es una simulación creada por máquinas.');

-- Relaciones películas-directores adicionales
INSERT INTO movies_directors (movies_id, directors_id) VALUES 
(4, 4), -- Avatar - James Cameron
(5, 5), -- E.T. - Steven Spielberg
(6, 6), -- Fight Club - David Fincher
(7, 7), -- Alien - Ridley Scott
(8, 8), -- LOTR - Peter Jackson
(9, 4), -- Titanic - James Cameron
(10, 5), -- Jurassic Park - Steven Spielberg
(11, 6), -- Seven - David Fincher
(12, 7), -- Blade Runner - Ridley Scott
(13, 1); -- The Matrix - Christopher Nolan

-- Relaciones películas-estrellas adicionales
INSERT INTO movies_stars (movies_id, stars_id) VALUES 
(4, 4), -- Avatar - Scarlett Johansson
(5, 5), -- E.T. - Robert Downey Jr.
(6, 6), -- Fight Club - Brad Pitt
(7, 7), -- Alien - Emma Watson
(8, 8), -- LOTR - Denzel Washington
(9, 1), -- Titanic - Leonardo DiCaprio
(10, 2), -- Jurassic Park - Tom Hanks
(11, 6), -- Seven - Brad Pitt
(12, 8), -- Blade Runner - Denzel Washington
(13, 4); -- The Matrix - Scarlett Johansson

-- Relaciones películas-géneros adicionales
INSERT INTO movies_genres (movies_id, genres_id) VALUES 
(4, 5), -- Avatar - Ciencia Ficción
(4, 1), -- Avatar - Acción
(5, 5), -- E.T. - Ciencia Ficción
(5, 4), -- E.T. - Drama
(6, 4), -- Fight Club - Drama
(6, 1), -- Fight Club - Acción
(7, 5), -- Alien - Ciencia Ficción
(7, 6), -- Alien - Terror
(8, 2), -- LOTR - Aventura
(8, 10), -- LOTR - Fantasía
(9, 4), -- Titanic - Drama
(9, 7), -- Titanic - Romance
(10, 1), -- Jurassic Park - Acción
(10, 5), -- Jurassic Park - Ciencia Ficción
(11, 4), -- Seven - Drama
(11, 6), -- Seven - Terror
(12, 5), -- Blade Runner - Ciencia Ficción
(12, 4), -- Blade Runner - Drama
(13, 5), -- The Matrix - Ciencia Ficción
(13, 1); -- The Matrix - Acción 