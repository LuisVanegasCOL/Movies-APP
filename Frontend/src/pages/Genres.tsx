
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { genresApi } from '@/services/api';
import { Genre } from '@/types/api';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';

const Genres = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);

  // Queries
  const { data: genres = [], isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: genresApi.getAll,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: genresApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      toast({ title: 'Éxito', description: 'Género creado correctamente' });
      setIsCreateOpen(false);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al crear el género', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, genre }: { id: number; genre: Genre }) => genresApi.update(id, genre),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      toast({ title: 'Éxito', description: 'Género actualizado correctamente' });
      setEditingGenre(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al actualizar el género', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: genresApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      toast({ title: 'Éxito', description: 'Género eliminado correctamente' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al eliminar el género', variant: 'destructive' });
    },
  });

  // Filtrado
  const filteredGenres = genres.filter(genre =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (genre.description && genre.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const genreData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string || undefined,
    };
    createMutation.mutate(genreData);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingGenre) return;
    
    const formData = new FormData(e.currentTarget);
    const genreData: Genre = {
      ...editingGenre,
      name: formData.get('name') as string,
      description: formData.get('description') as string || undefined,
    };
    updateMutation.mutate({ id: editingGenre.id, genre: genreData });
  };

  const GenreForm = ({ genre, onSubmit, buttonText }: { 
    genre?: Genre; 
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    buttonText: string;
  }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre *</Label>
        <Input id="name" name="name" defaultValue={genre?.name} required />
      </div>
      
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" name="description" defaultValue={genre?.description} />
      </div>
      
      <Button type="submit" className="w-full gradient-gold">
        {buttonText}
      </Button>
    </form>
  );

  // Colores predefinidos para géneros
  const getGenreColor = (genreName: string) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500',
      'bg-teal-500', 'bg-cyan-500'
    ];
    const index = genreName.length % colors.length;
    return colors[index];
  };

  if (isLoading) {
    return <div className="p-8 text-center">Cargando géneros...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Buscar géneros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-gold">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Género
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Género</DialogTitle>
            </DialogHeader>
            <GenreForm onSubmit={handleCreateSubmit} buttonText="Crear Género" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Tag className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{genres.length}</p>
                <p className="text-sm text-muted-foreground">Total Géneros</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded mr-3"></div>
              <div>
                <p className="text-2xl font-bold">
                  {genres.filter(g => g.description).length}
                </p>
                <p className="text-sm text-muted-foreground">Con Descripción</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vista de tarjetas para géneros */}
      <Card>
        <CardHeader>
          <CardTitle>Géneros ({filteredGenres.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredGenres.map((genre) => (
              <Card key={genre.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${getGenreColor(genre.name)}`}></div>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="font-medium">
                      {genre.name}
                    </Badge>
                    <div className="flex space-x-1">
                      <Dialog open={editingGenre?.id === genre.id} onOpenChange={(open) => !open && setEditingGenre(null)}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setEditingGenre(genre)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Género</DialogTitle>
                          </DialogHeader>
                          <GenreForm 
                            genre={genre} 
                            onSubmit={handleEditSubmit} 
                            buttonText="Actualizar Género" 
                          />
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteMutation.mutate(genre.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {genre.description || 'Sin descripción'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabla alternativa */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Género</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGenres.map((genre) => (
                <TableRow key={genre.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded ${getGenreColor(genre.name)}`}></div>
                      <Badge variant="secondary">{genre.name}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {genre.description || 'Sin descripción'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog open={editingGenre?.id === genre.id} onOpenChange={(open) => !open && setEditingGenre(null)}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingGenre(genre)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Género</DialogTitle>
                          </DialogHeader>
                          <GenreForm 
                            genre={genre} 
                            onSubmit={handleEditSubmit} 
                            buttonText="Actualizar Género" 
                          />
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteMutation.mutate(genre.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Genres;
