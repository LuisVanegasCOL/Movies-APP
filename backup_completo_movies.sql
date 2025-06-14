-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: db_movies
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `db_movies`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `db_movies` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `db_movies`;

--
-- Table structure for table `directors`
--

DROP TABLE IF EXISTS `directors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `directors` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `biography` text,
  PRIMARY KEY (`id`),
  KEY `idx_directors_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directors`
--

LOCK TABLES `directors` WRITE;
/*!40000 ALTER TABLE `directors` DISABLE KEYS */;
INSERT INTO `directors` VALUES (1,'Christopher Nolan','1970-07-30','Brit├â┬ínico','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg','Director conocido por Inception y The Dark Knight. Su estilo se caracteriza por narrativas complejas y efectos visuales innovadores.'),(2,'Quentin Tarantino','1963-03-27','Estadounidense','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/1gjcpAa99FAOWGnrUvHEXXsRs7o.jpg','Director conocido por Pulp Fiction y Kill Bill. Su estilo se caracteriza por di├â┬ílogos afilados y violencia estilizada.'),(3,'Martin Scorsese','1942-11-17','Estadounidense','https://image.tmdb.org/t/p/w500/9U9Y5GQuWX3EZy39B8nkk4NY01S.jpg','Director conocido por Taxi Driver y Goodfellas. Maestro del cine de g├â┬íngsters y dramas urbanos.'),(4,'James Cameron','1954-08-16','Canadiense','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/9NAZnTjBQ9WcXAQEzZpKy4vdQto.jpg','Director conocido por Titanic y Avatar. Pionero en efectos visuales y tecnolog├â┬¡a 3D.'),(9,'Steven Spielberg','1946-12-18','Estadounidense','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/tZxcg19YQ3e8fJ0pOs7hjlnmmr6.jpg','Director de cl├â┬ísicos como E.T. y Jurassic Park. Maestro del cine de aventuras.'),(10,'David Fincher','1962-08-28','Estadounidense','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/tpEczFclQZeKAiCeKZZ0adRvtfz.jpg','Director conocido por Fight Club y Seven. Especialista en thrillers psicol├â┬│gicos.'),(11,'Ridley Scott','1937-11-30','Brit├â┬ínico','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/zABJmN9opmqD4orWl3KSdCaSo7Q.jpg','Director de Alien y Blade Runner. Maestro del cine de ciencia ficci├â┬│n.'),(12,'Peter Jackson','1961-10-31','Neozeland├â┬®s','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/bNc908d59Ba8VDNr4eCcm4G1cR.jpg','Director de la trilog├â┬¡a El Se├â┬▒or de los Anillos. Especialista en adaptaciones ├â┬®picas.');
/*!40000 ALTER TABLE `directors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  KEY `idx_genres_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Acci├â┬│n',NULL),(2,'Aventura',NULL),(3,'Comedia',NULL),(4,'Drama',NULL),(5,'Ciencia Ficci├â┬│n',NULL),(6,'Terror',NULL),(7,'Romance',NULL),(8,'Animaci├â┬│n',NULL),(9,'Documental',NULL),(10,'Fantas├â┬¡a',NULL);
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `release_year` int DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `description` text,
  `certificate` varchar(255) DEFAULT NULL,
  `gross` bigint DEFAULT NULL,
  `imdb_rating` float DEFAULT NULL,
  `metacore` int DEFAULT NULL,
  `runtime` int DEFAULT NULL,
  `votes` bigint DEFAULT NULL,
  `year` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_movies_title` (`title`),
  KEY `idx_movies_year` (`release_year`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'Inception',2010,148,8.8,'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg','Un ladr├â┬│n que roba informaci├â┬│n a trav├â┬®s del uso de la tecnolog├â┬¡a de compartir sue├â┬▒os, recibe la tarea inversa de plantar una idea en la mente de un CEO.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'The Dark Knight',2008,152,9.0,'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg','Cuando la amenaza conocida como el Joker causa estragos y caos en Gotham City, Batman debe aceptar una de las pruebas psicol├â┬│gicas y f├â┬¡sicas m├â┬ís grandes de su capacidad para luchar contra la injusticia.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'Pulp Fiction',1994,154,8.9,'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg','Las vidas de dos sicarios, un boxeador, la esposa de un g├â┬íngster y dos bandidos se entrelazan en cuatro historias de violencia y redenci├â┬│n.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'Fight Club',1999,139,8.8,'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg','Un oficinista insomne y un fabricante de jab├â┬│n forman un club de lucha clandestino que evoluciona hacia algo mucho m├â┬ís grande.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'Alien',1979,117,8.4,'https://image.tmdb.org/t/p/original/mtvqzEb4vYdOQP984k1dAuWMdiz.jpg','La tripulaci├â┬│n de una nave espacial comercial se encuentra con una forma de vida letal despu├â┬®s de investigar una se├â┬▒al de socorro.','G',NULL,NULL,NULL,NULL,NULL,NULL),(12,'Blade Runner',1982,117,8.1,'https://image.tmdb.org/t/p/original/khdYqU16YC3QVkz6PDbADJjSAey.jpg','Un cazador de replicantes debe perseguir a cuatro androides que han escapado a la Tierra.','G',NULL,NULL,NULL,NULL,NULL,NULL),(14,'Avatar',2009,162,7.8,'https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg','Un ex-marine es enviado a Pandora en una misi├â┬│n ├â┬║nica, pero se encuentra dividido entre seguir sus ├â┬│rdenes y proteger el mundo que siente como su hogar.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(15,'E.T. the Extra-Terrestrial',1982,115,7.9,'https://image.tmdb.org/t/p/w500/qIicLxr7B7gIt5hxZxo423BJLlK.jpg','Un ni├â┬▒o solitario hace amistad con un extraterrestre abandonado en la Tierra.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'The Lord of the Rings: The Fellowship of the Ring',2001,178,8.8,'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg','Un hobbit emprende un ├â┬®pico viaje para destruir un poderoso anillo y salvar a la Tierra Media del Se├â┬▒or Oscuro.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'Titanic',1997,195,7.9,'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg','Una joven arist├â┬│crata y un artista se enamoran durante el viaje inaugural del Titanic.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'Jurassic Park',1993,127,8.1,'https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg','Un parque tem├â┬ítico con dinosaurios clonados se convierte en una pesadilla cuando los animales escapan.',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'Seven',1995,127,8.6,'https://image.tmdb.org/t/p/original/i5H7zusQGsysGQ8i6P361Vnr0n2.jpg','Dos detectives investigan una serie de asesinatos basados en los siete pecados capitales.','G',NULL,NULL,NULL,NULL,NULL,NULL),(23,'The Matrix',1999,136,8.7,'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg','Un programador descubre que la realidad tal como la conocemos es una simulaci├â┬│n creada por m├â┬íquinas.',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies_directors`
--

DROP TABLE IF EXISTS `movies_directors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies_directors` (
  `movies_id` bigint NOT NULL,
  `directors_id` bigint NOT NULL,
  PRIMARY KEY (`movies_id`,`directors_id`),
  KEY `directors_id` (`directors_id`),
  CONSTRAINT `movies_directors_ibfk_1` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `movies_directors_ibfk_2` FOREIGN KEY (`directors_id`) REFERENCES `directors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies_directors`
--

LOCK TABLES `movies_directors` WRITE;
/*!40000 ALTER TABLE `movies_directors` DISABLE KEYS */;
INSERT INTO `movies_directors` VALUES (1,1),(2,1),(3,2);
/*!40000 ALTER TABLE `movies_directors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies_genres`
--

DROP TABLE IF EXISTS `movies_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies_genres` (
  `movies_id` bigint NOT NULL,
  `genres_id` bigint NOT NULL,
  PRIMARY KEY (`movies_id`,`genres_id`),
  KEY `genres_id` (`genres_id`),
  CONSTRAINT `movies_genres_ibfk_1` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `movies_genres_ibfk_2` FOREIGN KEY (`genres_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies_genres`
--

LOCK TABLES `movies_genres` WRITE;
/*!40000 ALTER TABLE `movies_genres` DISABLE KEYS */;
INSERT INTO `movies_genres` VALUES (1,1),(2,1),(6,1),(3,3),(2,4),(3,4),(6,4),(12,4),(1,5),(7,5),(12,5),(7,6);
/*!40000 ALTER TABLE `movies_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies_stars`
--

DROP TABLE IF EXISTS `movies_stars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies_stars` (
  `movies_id` bigint NOT NULL,
  `stars_id` bigint NOT NULL,
  PRIMARY KEY (`movies_id`,`stars_id`),
  KEY `stars_id` (`stars_id`),
  CONSTRAINT `movies_stars_ibfk_1` FOREIGN KEY (`movies_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE,
  CONSTRAINT `movies_stars_ibfk_2` FOREIGN KEY (`stars_id`) REFERENCES `stars` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies_stars`
--

LOCK TABLES `movies_stars` WRITE;
/*!40000 ALTER TABLE `movies_stars` DISABLE KEYS */;
INSERT INTO `movies_stars` VALUES (1,1),(2,1),(3,2),(12,8);
/*!40000 ALTER TABLE `movies_stars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stars`
--

DROP TABLE IF EXISTS `stars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stars` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `biography` text,
  PRIMARY KEY (`id`),
  KEY `idx_stars_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stars`
--

LOCK TABLES `stars` WRITE;
/*!40000 ALTER TABLE `stars` DISABLE KEYS */;
INSERT INTO `stars` VALUES (1,'Leonardo DiCaprio','1974-11-11','Estadounidense','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg','Actor conocido por Titanic y Inception. Ganador del Oscar por su papel en The Revenant.'),(2,'Tom Hanks','1956-07-09','Estadounidense','https://image.tmdb.org/t/p/w500/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg','Actor conocido por Forrest Gump y Cast Away. Dos veces ganador del Oscar a Mejor Actor.'),(3,'Meryl Streep','1949-06-22','Estadounidense','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/emAAzyK1rJ6aiMi0wsWYp51EC3h.jpg','Actriz conocida por The Devil Wears Prada y Mamma Mia!. La actriz m├â┬ís nominada en la historia de los Oscar.'),(4,'Brad Pitt','1963-12-18','Estadounidense','https://image.tmdb.org/t/p/w500/cckcYc2v0yh1tc9QjRelptcOBko.jpg','Actor conocido por Fight Club y Once Upon a Time in Hollywood. Ganador del Oscar.'),(8,'Denzel Washington','1954-12-28','Estadounidense','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/9Iyt3wbsla5bM6IzbICDVnBhkER.jpg','Actor conocido por Training Day y Malcolm X. Dos veces ganador del Oscar.'),(10,'Scarlett Johansson','1984-11-22','Estadounidense','https://image.tmdb.org/t/p/w500/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg','Actriz conocida por Lost in Translation y Black Widow. Nominada al Oscar.'),(11,'Robert Downey Jr.','1965-04-04','Estadounidense','https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg','Actor conocido por Iron Man y Sherlock Holmes. Reconocido por su versatilidad.'),(12,'Emma Watson','1990-04-15','Brit├â┬ínica','https://media.themoviedb.org/t/p/w300_and_h450_bestv2/A14lLCZYDhfYdBa0fFRpwMDiwRN.jpg','Actriz conocida por Harry Potter y La Bella y la Bestia. Tambi├â┬®n activista.');
/*!40000 ALTER TABLE `stars` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-09 14:26:29
