
// Tipos para la API de películas

export interface Movie {
  id: number;
  title: string;
  description: string;
  year?: number;
  imageUrl?: string;
  certificate?: string;
  runtime?: number;
  imdbRating?: number;
  metacore?: number;
  votes?: number;
  gross?: string;
  directors?: Director[];
  stars?: Star[];
  genres?: Genre[];
}

export interface MovieDTO {
  id: number;
  title: string;
  description: string;
  year?: number;
  imageUrl?: string;
  certificate?: string;
  runtime?: number;
  imdbRating?: number;
  metacore?: number;
  votes?: number;
  gross?: string;
  directorNames?: string[];
  starNames?: string[];
  genreNames?: string[];
}

export interface Director {
  id: number;
  name: string;
  birthDate?: string;
  nationality?: string;
  biography?: string;
  imageUrl?: string;
}

export interface Star {
  id: number;
  name: string;
  birthDate?: string;
  nationality?: string;
  biography?: string;
  imageUrl?: string;
}

export interface Genre {
  id: number;
  name: string;
  description?: string;
}

export interface CreateMovieRequest {
  title: string;
  description: string;
  year?: number;
  imageUrl?: string;
  certificate?: string;
  runtime?: number;
  imdbRating?: number;
  metacore?: number;
  votes?: number;
  gross?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
