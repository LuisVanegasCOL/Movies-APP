
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/StatsCard';
import MovieCard from '@/components/MovieCard';
import { moviesApi, directorsApi, starsApi, genresApi } from '@/services/api';
import { Film, Users, Star, Tag, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Queries para obtener datos
  const { data: movies = [] } = useQuery({
    queryKey: ['movies-dto'],
    queryFn: moviesApi.getAllDTO,
  });

  const { data: directors = [] } = useQuery({
    queryKey: ['directors'],
    queryFn: directorsApi.getAll,
  });

  const { data: stars = [] } = useQuery({
    queryKey: ['stars'],
    queryFn: starsApi.getAll,
  });

  const { data: genres = [] } = useQuery({
    queryKey: ['genres'],
    queryFn: genresApi.getAll,
  });

  // Estadísticas calculadas
  const topRatedMovies = movies
    .filter(movie => movie.imdbRating)
    .sort((a, b) => (b.imdbRating || 0) - (a.imdbRating || 0))
    .slice(0, 6);

  const recentMovies = movies
    .filter(movie => movie.year)
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 6);

  const averageRating = movies.length > 0 
    ? movies.reduce((acc, movie) => acc + (movie.imdbRating || 0), 0) / movies.filter(m => m.imdbRating).length
    : 0;

  const currentYear = new Date().getFullYear();
  const recentMoviesCount = movies.filter(movie => movie.year && movie.year >= currentYear - 1).length;

  return (
    <div className="space-y-8">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Películas"
          value={movies.length}
          description="En tu catálogo"
          icon={Film}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Directores"
          value={directors.length}
          description="Registrados"
          icon={Users}
        />
        <StatsCard
          title="Actores"
          value={stars.length}
          description="En la base de datos"
          icon={Star}
        />
        <StatsCard
          title="Géneros"
          value={genres.length}
          description="Diferentes categorías"
          icon={Tag}
        />
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Promedio IMDB"
          value={averageRating.toFixed(1)}
          description="Rating promedio"
          icon={TrendingUp}
        />
        <StatsCard
          title="Películas Recientes"
          value={recentMoviesCount}
          description={`Desde ${currentYear - 1}`}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
        />
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estado del Catálogo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Con Rating</span>
                <Badge variant="secondary">
                  {movies.filter(m => m.imdbRating).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Con Imagen</span>
                <Badge variant="secondary">
                  {movies.filter(m => m.imageUrl).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Completas</span>
                <Badge variant="default">
                  {movies.filter(m => m.imdbRating && m.imageUrl && m.year).length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Películas mejor valoradas */}
      {topRatedMovies.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              Películas Mejor Valoradas
            </h2>
            <button
              onClick={() => navigate('/movies')}
              className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Ver todas →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {topRatedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onView={(id) => navigate(`/movies/${id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Películas recientes */}
      {recentMovies.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-semibold text-foreground">
              Películas Recientes
            </h2>
            <button
              onClick={() => navigate('/movies')}
              className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
            >
              Ver todas →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {recentMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onView={(id) => navigate(`/movies/${id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Estado vacío */}
      {movies.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
              No hay películas aún
            </h3>
            <p className="text-muted-foreground mb-6">
              Comienza agregando tu primera película al catálogo
            </p>
            <button
              onClick={() => navigate('/movies')}
              className="gradient-gold text-primary-foreground px-6 py-2 rounded-lg font-medium hover:shadow-gold transition-all duration-200"
            >
              Agregar Película
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
