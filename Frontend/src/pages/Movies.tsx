import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { moviesApi, directorsApi, starsApi, genresApi } from '@/services/api';
import { Movie, CreateMovieRequest } from '@/types/api';
import { Plus, Edit, Trash2, Star, Calendar, Film } from 'lucide-react';
import MovieImage from '@/components/MovieImage';

// Imagen por defecto
const DEFAULT_MOVIE_IMAGE = 'https://placehold.co/400x600/1a1a1a/ffffff?text=No+Image';

const Movies = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  // Queries
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ['movies-entities'],
    queryFn: moviesApi.getAllEntities,
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

  // Mutations
  const createMutation = useMutation({
    mutationFn: moviesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies-entities'] });
      queryClient.invalidateQueries({ queryKey: ['movies-dto'] });
      toast({ title: 'Éxito', description: 'Película creada correctamente' });
      setIsCreateOpen(false);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al crear la película', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, movie }: { id: number; movie: Movie }) => moviesApi.update(id, movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies-entities'] });
      queryClient.invalidateQueries({ queryKey: ['movies-dto'] });
      toast({ title: 'Éxito', description: 'Película actualizada correctamente' });
      setEditingMovie(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al actualizar la película', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: moviesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies-entities'] });
      queryClient.invalidateQueries({ queryKey: ['movies-dto'] });
      toast({ title: 'Éxito', description: 'Película eliminada correctamente' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al eliminar la película', variant: 'destructive' });
    },
  });

  // Filtrado
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para manejar errores de carga de imágenes
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_MOVIE_IMAGE;
  };

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const movieData: CreateMovieRequest = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      year: formData.get('year') ? Number(formData.get('year')) : undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
      certificate: formData.get('certificate') as string || undefined,
      runtime: formData.get('runtime') ? Number(formData.get('runtime')) : undefined,
      imdbRating: formData.get('imdbRating') ? Number(formData.get('imdbRating')) : undefined,
      metacore: formData.get('metacore') ? Number(formData.get('metacore')) : undefined,
      votes: formData.get('votes') ? Number(formData.get('votes')) : undefined,
      gross: formData.get('gross') as string || undefined,
    };
    createMutation.mutate(movieData);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingMovie) return;
    
    const formData = new FormData(e.currentTarget);
    const movieData: Movie = {
      ...editingMovie,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      year: formData.get('year') ? Number(formData.get('year')) : undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
      certificate: formData.get('certificate') as string || undefined,
      runtime: formData.get('runtime') ? Number(formData.get('runtime')) : undefined,
      imdbRating: formData.get('imdbRating') ? Number(formData.get('imdbRating')) : undefined,
      metacore: formData.get('metacore') ? Number(formData.get('metacore')) : undefined,
      votes: formData.get('votes') ? Number(formData.get('votes')) : undefined,
      gross: formData.get('gross') as string || undefined,
    };
    updateMutation.mutate({ id: editingMovie.id, movie: movieData });
  };

  const MovieForm = ({ movie, onSubmit, buttonText }: { 
    movie?: Movie; 
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    buttonText: string;
  }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título *</Label>
          <Input id="title" name="title" defaultValue={movie?.title} required />
        </div>
        <div>
          <Label htmlFor="year">Año</Label>
          <Input id="year" name="year" type="number" defaultValue={movie?.year} />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Descripción *</Label>
        <Textarea id="description" name="description" defaultValue={movie?.description} required />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="imageUrl">URL de Imagen</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={movie?.imageUrl} />
        </div>
        <div>
          <Label htmlFor="certificate">Certificación</Label>
          <Select name="certificate" defaultValue={movie?.certificate}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar certificación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="G">G</SelectItem>
              <SelectItem value="PG">PG</SelectItem>
              <SelectItem value="PG-13">PG-13</SelectItem>
              <SelectItem value="R">R</SelectItem>
              <SelectItem value="NC-17">NC-17</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="runtime">Duración (min)</Label>
          <Input id="runtime" name="runtime" type="number" defaultValue={movie?.runtime} />
        </div>
        <div>
          <Label htmlFor="imdbRating">Rating IMDB</Label>
          <Input id="imdbRating" name="imdbRating" type="number" step="0.1" defaultValue={movie?.imdbRating} />
        </div>
        <div>
          <Label htmlFor="metacore">Metacritic</Label>
          <Input id="metacore" name="metacore" type="number" defaultValue={movie?.metacore} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="votes">Votos</Label>
          <Input id="votes" name="votes" type="number" defaultValue={movie?.votes} />
        </div>
        <div>
          <Label htmlFor="gross">Recaudación</Label>
          <Input id="gross" name="gross" defaultValue={movie?.gross} />
        </div>
      </div>
      
      <Button type="submit" className="w-full gradient-gold">
        {buttonText}
      </Button>
    </form>
  );

  if (isLoading) {
    return <div className="p-8 text-center">Cargando películas...</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Películas</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-gold">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Película
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nueva Película</DialogTitle>
            </DialogHeader>
            <MovieForm onSubmit={handleCreateSubmit} buttonText="Crear" />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Buscar películas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isLoading ? (
        <div className="text-center">Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <Card key={movie.id} className="overflow-hidden">
              <div className="aspect-[2/3] relative">
                <MovieImage
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{movie.title}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingMovie(movie)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMutation.mutate(movie.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 line-clamp-2">{movie.description}</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{movie.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>{movie.imdbRating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!editingMovie} onOpenChange={() => setEditingMovie(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Película</DialogTitle>
          </DialogHeader>
          {editingMovie && (
            <MovieForm
              movie={editingMovie}
              onSubmit={handleEditSubmit}
              buttonText="Guardar"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Movies;
