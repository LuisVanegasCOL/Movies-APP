import { Movie, MovieDTO, Director, Star, Genre, CreateMovieRequest } from '@/types/api';

const API_BASE_URL = '/api';

// Configuración base para fetch
const fetchConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Función helper para manejar errores
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
  }
  
  // Para respuestas 204 No Content, devolver undefined
  if (response.status === 204) {
    return undefined as T;
  }
  
  return response.json() as Promise<T>;
};

// PELÍCULAS
export const moviesApi = {
  // Obtener todas las películas como DTO
  getAllDTO: (): Promise<MovieDTO[]> =>
    fetch(`${API_BASE_URL}/movies`, fetchConfig).then(res => handleResponse<MovieDTO[]>(res)),

  // Obtener todas las películas como entidades completas
  getAllEntities: (): Promise<Movie[]> =>
    fetch(`${API_BASE_URL}/movies/entity`, fetchConfig).then(res => handleResponse<Movie[]>(res)),

  // Obtener película por ID
  getById: (id: number): Promise<Movie> =>
    fetch(`${API_BASE_URL}/movies/${id}`, fetchConfig).then(res => handleResponse<Movie>(res)),

  // Crear nueva película
  create: (movie: CreateMovieRequest): Promise<Movie> =>
    fetch(`${API_BASE_URL}/movies`, {
      ...fetchConfig,
      method: 'POST',
      body: JSON.stringify(movie),
    }).then(res => handleResponse<Movie>(res)),

  // Actualizar película
  update: (id: number, movie: Movie): Promise<Movie> =>
    fetch(`${API_BASE_URL}/movies/${id}`, {
      ...fetchConfig,
      method: 'PUT',
      body: JSON.stringify(movie),
    }).then(res => handleResponse<Movie>(res)),

  // Eliminar película
  delete: (id: number): Promise<void> =>
    fetch(`${API_BASE_URL}/movies/${id}`, {
      ...fetchConfig,
      method: 'DELETE',
    }).then(res => handleResponse<void>(res)),
};

// DIRECTORES
export const directorsApi = {
  getAll: (): Promise<Director[]> =>
    fetch(`${API_BASE_URL}/directors`, fetchConfig).then(res => handleResponse<Director[]>(res)),

  getById: (id: number): Promise<Director> =>
    fetch(`${API_BASE_URL}/directors/${id}`, fetchConfig).then(res => handleResponse<Director>(res)),

  create: (director: Omit<Director, 'id'>): Promise<Director> =>
    fetch(`${API_BASE_URL}/directors`, {
      ...fetchConfig,
      method: 'POST',
      body: JSON.stringify(director),
    }).then(res => handleResponse<Director>(res)),

  update: (id: number, director: Director): Promise<Director> =>
    fetch(`${API_BASE_URL}/directors/${id}`, {
      ...fetchConfig,
      method: 'PUT',
      body: JSON.stringify(director),
    }).then(res => handleResponse<Director>(res)),

  delete: (id: number): Promise<void> =>
    fetch(`${API_BASE_URL}/directors/${id}`, {
      ...fetchConfig,
      method: 'DELETE',
    }).then(res => handleResponse<void>(res)),
};

// ESTRELLAS/ACTORES
export const starsApi = {
  getAll: (): Promise<Star[]> =>
    fetch(`${API_BASE_URL}/stars`, fetchConfig).then(res => handleResponse<Star[]>(res)),

  getById: (id: number): Promise<Star> =>
    fetch(`${API_BASE_URL}/stars/${id}`, fetchConfig).then(res => handleResponse<Star>(res)),

  create: (star: Omit<Star, 'id'>): Promise<Star> =>
    fetch(`${API_BASE_URL}/stars`, {
      ...fetchConfig,
      method: 'POST',
      body: JSON.stringify(star),
    }).then(res => handleResponse<Star>(res)),

  update: (id: number, star: Star): Promise<Star> =>
    fetch(`${API_BASE_URL}/stars/${id}`, {
      ...fetchConfig,
      method: 'PUT',
      body: JSON.stringify(star),
    }).then(res => handleResponse<Star>(res)),

  delete: (id: number): Promise<void> =>
    fetch(`${API_BASE_URL}/stars/${id}`, {
      ...fetchConfig,
      method: 'DELETE',
    }).then(res => handleResponse<void>(res)),
};

// GÉNEROS
export const genresApi = {
  getAll: (): Promise<Genre[]> =>
    fetch(`${API_BASE_URL}/genres`, fetchConfig).then(res => handleResponse<Genre[]>(res)),

  getById: (id: number): Promise<Genre> =>
    fetch(`${API_BASE_URL}/genres/${id}`, fetchConfig).then(res => handleResponse<Genre>(res)),

  create: (genre: Omit<Genre, 'id'>): Promise<Genre> =>
    fetch(`${API_BASE_URL}/genres`, {
      ...fetchConfig,
      method: 'POST',
      body: JSON.stringify(genre),
    }).then(res => handleResponse<Genre>(res)),

  update: (id: number, genre: Genre): Promise<Genre> =>
    fetch(`${API_BASE_URL}/genres/${id}`, {
      ...fetchConfig,
      method: 'PUT',
      body: JSON.stringify(genre),
    }).then(res => handleResponse<Genre>(res)),

  delete: (id: number): Promise<void> =>
    fetch(`${API_BASE_URL}/genres/${id}`, {
      ...fetchConfig,
      method: 'DELETE',
    }).then(res => handleResponse<void>(res)),
};
