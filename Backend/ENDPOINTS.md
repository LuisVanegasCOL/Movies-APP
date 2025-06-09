# API Endpoints - Examples

## Películas (Movies)

### GET /api/movies
Obtiene todas las películas como DTO con relaciones.
```json
[
  {
    "id": 1,
    "title": "Inception",
    "description": "Un ladrón roba secretos a través de sueños.",
    "directors": ["Christopher Nolan"],
    "genres": ["Acción", "Ciencia Ficción"],
    "stars": ["Leonardo DiCaprio"]
  }
]
```

### GET /api/movies/entity
Obtiene todas las películas como entidades completas.

### GET /api/movies/{id}
Obtiene una película específica por ID.

### POST /api/movies
Crea una nueva película.
```json
{
  "title": "Nueva Película",
  "year": 2024,
  "imageUrl": "https://example.com/image.jpg",
  "certificate": "PG-13",
  "runtime": 120,
  "imdbRating": 8.5,
  "description": "Descripción de la película",
  "metacore": 85,
  "votes": 1000000,
  "gross": 500000000
}
```

### PUT /api/movies/{id}
Actualiza una película existente.

### DELETE /api/movies/{id}
Elimina una película.

## Directores (Directors)

### GET /api/directors
Obtiene todos los directores.
```json
[
  {
    "id": 1,
    "name": "Christopher Nolan",
    "about": "Director británico conocido por Inception y The Dark Knight."
  }
]
```

### POST /api/directors
Crea un nuevo director.
```json
{
  "name": "Nuevo Director",
  "about": "Descripción del director"
}
```

### PUT /api/directors/{id}
Actualiza un director existente.

### DELETE /api/directors/{id}
Elimina un director.

## Estrellas (Stars)

### GET /api/stars
Obtiene todas las estrellas.
```json
[
  {
    "id": 1,
    "name": "Leonardo DiCaprio",
    "about": "Actor estadounidense, protagonista de Inception y Titanic."
  }
]
```

### POST /api/stars
Crea una nueva estrella.
```json
{
  "name": "Nueva Estrella",
  "about": "Descripción del actor/actriz"
}
```

## Géneros (Genres)

### GET /api/genres
Obtiene todos los géneros.
```json
[
  {
    "id": 1,
    "name": "Acción"
  }
]
```

### POST /api/genres
Crea un nuevo género.
```json
{
  "name": "Nuevo Género"
}
```

## Notas importantes

- Todos los endpoints PUT y DELETE siguen el mismo patrón: `/{id}`
- La respuesta de error estándar incluye status code HTTP apropiado
- Para crear relaciones entre películas y directores/estrellas/géneros, usa los IDs correspondientes
- La documentación interactiva completa está disponible en `/swagger-ui.html` cuando la aplicación está ejecutándose 