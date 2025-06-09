# Movies API Backend

Backend en Java con Spring Boot para gestionar películas, directores, estrellas y géneros.

## Requisitos

- Java 17+
- Maven 3.6+
- MySQL 8.0+

## Configuración

1. **Base de datos**: Ejecuta el script `db_movies.sql` en tu servidor MySQL
2. **Configuración**: Edita `src/main/resources/application.properties` y cambia:
   - `spring.datasource.username=TU_USUARIO`
   - `spring.datasource.password=TU_PASSWORD`

## Ejecutar la aplicación

```bash
cd backend
mvn spring-boot:run
```

La aplicación estará disponible en: `http://localhost:8080`

## Documentación API

Una vez ejecutando la aplicación, puedes acceder a la documentación interactiva en:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: http://localhost:8080/api-docs

## Endpoints disponibles

### Películas
- `GET /api/movies` - Obtener todas las películas (como DTO con relaciones)
- `GET /api/movies/entity` - Obtener todas las películas (entidades completas)
- `GET /api/movies/{id}` - Obtener película por ID
- `POST /api/movies` - Crear nueva película
- `PUT /api/movies/{id}` - Actualizar película
- `DELETE /api/movies/{id}` - Eliminar película

### Directores
- `GET /api/directors` - Obtener todos los directores
- `GET /api/directors/{id}` - Obtener director por ID
- `POST /api/directors` - Crear nuevo director
- `PUT /api/directors/{id}` - Actualizar director
- `DELETE /api/directors/{id}` - Eliminar director

### Estrellas
- `GET /api/stars` - Obtener todas las estrellas
- `GET /api/stars/{id}` - Obtener estrella por ID
- `POST /api/stars` - Crear nueva estrella
- `PUT /api/stars/{id}` - Actualizar estrella
- `DELETE /api/stars/{id}` - Eliminar estrella

### Géneros
- `GET /api/genres` - Obtener todos los géneros
- `GET /api/genres/{id}` - Obtener género por ID
- `POST /api/genres` - Crear nuevo género
- `PUT /api/genres/{id}` - Actualizar género
- `DELETE /api/genres/{id}` - Eliminar género

## Características

- ✅ CRUD completo para todas las entidades
- ✅ Lombok para getters/setters automáticos
- ✅ Documentación automática con Swagger/OpenAPI
- ✅ DTO especial para películas con relaciones
- ✅ Relaciones ManyToMany entre entidades
- ✅ Configuración de CORS para frontend 