import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { moviesApi, directorsApi, starsApi, genresApi } from '@/services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Award, Calendar, Users, Film, Star, Tag } from 'lucide-react';

const Stats = () => {
  // Queries
  const { data: movies = [], isLoading: moviesLoading } = useQuery({
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

  if (moviesLoading) {
    return <div className="p-8 text-center">Cargando estadísticas...</div>;
  }

  // Procesamiento de datos para gráficos
  const moviesByYear = movies
    .filter(m => m.year && !isNaN(m.year))
    .reduce((acc, movie) => {
      const year = movie.year!;
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

  const yearData = Object.entries(moviesByYear)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year)
    .slice(-10); // Últimos 10 años

  const ratingDistribution = movies
    .filter(m => m.imdbRating && !isNaN(m.imdbRating))
    .reduce((acc, movie) => {
      const rating = Math.floor(movie.imdbRating!);
      const range = `${rating}-${rating + 1}`;
      acc[range] = (acc[range] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const ratingData = Object.entries(ratingDistribution)
    .map(([range, count]) => ({ range, count }))
    .sort((a, b) => parseFloat(a.range) - parseFloat(b.range));

  const genreStats = movies
    .flatMap(m => m.genreNames || [])
    .reduce((acc, genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const genreData = Object.entries(genreStats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const COLORS = ['#FBBF24', '#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F', '#451A03', '#1C1917'];

  // Estadísticas calculadas con verificaciones
  const moviesWithRating = movies.filter(m => m.imdbRating && !isNaN(m.imdbRating));
  const avgRating = moviesWithRating.length > 0 
    ? moviesWithRating.reduce((acc, movie) => acc + movie.imdbRating!, 0) / moviesWithRating.length
    : 0;

  const moviesWithRuntime = movies.filter(m => m.runtime && !isNaN(m.runtime));
  const avgRuntime = moviesWithRuntime.length > 0 
    ? moviesWithRuntime.reduce((acc, movie) => acc + movie.runtime!, 0) / moviesWithRuntime.length
    : 0;

  const topRatedMovies = movies
    .filter(movie => movie.imdbRating && !isNaN(movie.imdbRating))
    .sort((a, b) => (b.imdbRating || 0) - (a.imdbRating || 0))
    .slice(0, 5);

  const recentMovies = movies
    .filter(movie => movie.year && !isNaN(movie.year))
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="gradient-gold text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{movies.length}</p>
                <p className="text-sm opacity-90">Películas Totales</p>
              </div>
              <Film className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{avgRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Rating Promedio</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{Math.round(avgRuntime)}</p>
                <p className="text-sm text-muted-foreground">Duración Promedio (min)</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{directors.length + stars.length}</p>
                <p className="text-sm text-muted-foreground">Personas Registradas</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Películas por año */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Películas por Año
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#FBBF24" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribución por rating */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Distribución por Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Géneros más populares */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              Géneros Más Populares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top 5 Películas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Top 5 Películas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRatedMovies.map((movie) => (
                <div key={movie.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{movie.title}</p>
                    <p className="text-sm text-muted-foreground">{movie.year}</p>
                  </div>
                  <Badge variant="secondary">{movie.imdbRating?.toFixed(1)}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumen de base de datos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Estado del Catálogo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Con Rating</span>
              <Badge variant="secondary">{movies.filter(m => m.imdbRating).length}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Con Imagen</span>
              <Badge variant="secondary">{movies.filter(m => m.imageUrl).length}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Completas</span>
              <Badge variant="default">
                {movies.filter(m => m.imdbRating && m.imageUrl && m.year).length}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Directores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Total</span>
              <Badge variant="secondary">{directors.length}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Con Biografía</span>
              <Badge variant="secondary">{directors.filter(d => d.biography).length}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Con Imagen</span>
              <Badge variant="secondary">{directors.filter(d => d.imageUrl).length}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Actores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Total</span>
              <Badge variant="secondary">{stars.length}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Con Biografía</span>
              <Badge variant="secondary">{stars.filter(s => s.biography).length}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Con Imagen</span>
              <Badge variant="secondary">{stars.filter(s => s.imageUrl).length}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Géneros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Total</span>
              <Badge variant="secondary">{genres.length}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Más Popular</span>
              <Badge variant="default">
                {genreData[0]?.name || 'N/A'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Con Descripción</span>
              <Badge variant="secondary">{genres.filter(g => g.description).length}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stats;
