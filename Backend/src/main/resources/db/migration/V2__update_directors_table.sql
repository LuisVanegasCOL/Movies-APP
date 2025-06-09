-- Actualizar la tabla de directores
ALTER TABLE directors
    ADD COLUMN IF NOT EXISTS birth_date VARCHAR(10),
    ADD COLUMN IF NOT EXISTS nationality VARCHAR(100),
    ADD COLUMN IF NOT EXISTS image_url VARCHAR(255),
    MODIFY COLUMN name VARCHAR(100) NOT NULL;

-- Si existe la columna 'about', copiar su contenido a 'biography' y eliminarla
ALTER TABLE directors
    ADD COLUMN IF NOT EXISTS biography TEXT AFTER nationality;

UPDATE directors 
SET biography = about 
WHERE about IS NOT NULL;

ALTER TABLE directors
    DROP COLUMN IF EXISTS about; 