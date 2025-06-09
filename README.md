# 🎬 Movies Catalog App

Aplicación web para la gestión y visualización de un catálogo de películas, desarrollada por Luis Vanegas.

## 📋 Descripción

Movies Catalog es una aplicación web moderna que permite gestionar y visualizar un catálogo completo de películas. La aplicación incluye información detallada sobre películas, directores, actores y géneros, ofreciendo una experiencia de usuario intuitiva y atractiva.

## 🚀 Características Principales

### Gestión de Películas
- Visualización de catálogo completo
- Detalles completos de cada película
- Búsqueda y filtrado
- Gestión CRUD (Crear, Leer, Actualizar, Eliminar)

### Gestión de Directores
- Listado de directores
- Perfiles detallados
- Relación con películas
- Gestión CRUD

### Gestión de Actores
- Catálogo de actores/actrices
- Biografías y detalles
- Relación con películas
- Gestión CRUD

### Gestión de Géneros
- Categorización de películas
- Filtrado por género
- Gestión CRUD

## 🛠️ Tecnologías Utilizadas

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- React Router
- React Query
- Shadcn/ui
- Lucide Icons

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- MySQL
- Swagger/OpenAPI

### DevOps
- Docker
- Docker Compose
- GitHub
- Render (Despliegue)

## 📦 Estructura del Proyecto

```
movies-app/
├── Frontend/               # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/        # Páginas principales
│   │   └── lib/          # Utilidades y configuraciones
│   └── public/           # Archivos estáticos
│
├── Backend/               # Aplicación Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   ├── controller/  # Controladores REST
│   │   │   │   ├── service/     # Lógica de negocio
│   │   │   │   ├── repository/  # Acceso a datos
│   │   │   │   └── entity/      # Modelos de datos
│   │   │   └── resources/
│   │   │       └── db/          # Scripts de base de datos
│   │   └── test/                # Pruebas
│   └── pom.xml
│
└── docker-compose.yml     # Configuración de Docker
```

## 🔌 Endpoints API

### Películas
- `GET /api/movies` - Obtener todas las películas
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

### Actores
- `GET /api/stars` - Obtener todos los actores
- `GET /api/stars/{id}` - Obtener actor por ID
- `POST /api/stars` - Crear nuevo actor
- `PUT /api/stars/{id}` - Actualizar actor
- `DELETE /api/stars/{id}` - Eliminar actor

### Géneros
- `GET /api/genres` - Obtener todos los géneros
- `GET /api/genres/{id}` - Obtener género por ID
- `POST /api/genres` - Crear nuevo género
- `PUT /api/genres/{id}` - Actualizar género
- `DELETE /api/genres/{id}` - Eliminar género

## 🚀 Despliegue

La aplicación está desplegada en Render:
- Frontend: https://movies-catalog-app.onrender.com
- Backend: https://movies-catalog-app.onrender.com/api
- Swagger UI: https://movies-catalog-app.onrender.com/swagger-ui.html

## 🛠️ Instalación Local

1. Clonar el repositorio:
```bash
git clone https://github.com/TU_USUARIO/movies-app.git
```

2. Iniciar con Docker:
```bash
docker-compose up -d
```

3. Acceder a la aplicación:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

## 👨‍💻 Autor

- **Luis Vanegas** - *Desarrollador Full Stack*

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. 