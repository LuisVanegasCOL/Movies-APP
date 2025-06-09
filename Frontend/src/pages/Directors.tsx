
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { directorsApi } from '@/services/api';
import { Director } from '@/types/api';
import { Plus, Edit, Trash2, Users, Calendar } from 'lucide-react';

const Directors = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingDirector, setEditingDirector] = useState<Director | null>(null);

  // Queries
  const { data: directors = [], isLoading } = useQuery({
    queryKey: ['directors'],
    queryFn: directorsApi.getAll,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: directorsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directors'] });
      toast({ title: 'Éxito', description: 'Director creado correctamente' });
      setIsCreateOpen(false);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al crear el director', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, director }: { id: number; director: Director }) => directorsApi.update(id, director),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directors'] });
      toast({ title: 'Éxito', description: 'Director actualizado correctamente' });
      setEditingDirector(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al actualizar el director', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: directorsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['directors'] });
      toast({ title: 'Éxito', description: 'Director eliminado correctamente' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al eliminar el director', variant: 'destructive' });
    },
  });

  // Filtrado
  const filteredDirectors = directors.filter(director =>
    director.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (director.nationality && director.nationality.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const directorData = {
      name: formData.get('name') as string,
      birthDate: formData.get('birthDate') as string || undefined,
      nationality: formData.get('nationality') as string || undefined,
      biography: formData.get('biography') as string || undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
    };
    createMutation.mutate(directorData);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingDirector) return;
    
    const formData = new FormData(e.currentTarget);
    const directorData: Director = {
      ...editingDirector,
      name: formData.get('name') as string,
      birthDate: formData.get('birthDate') as string || undefined,
      nationality: formData.get('nationality') as string || undefined,
      biography: formData.get('biography') as string || undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
    };
    updateMutation.mutate({ id: editingDirector.id, director: directorData });
  };

  const DirectorForm = ({ director, onSubmit, buttonText }: { 
    director?: Director; 
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    buttonText: string;
  }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nombre *</Label>
          <Input id="name" name="name" defaultValue={director?.name} required />
        </div>
        <div>
          <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
          <Input id="birthDate" name="birthDate" type="date" defaultValue={director?.birthDate} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nationality">Nacionalidad</Label>
          <Input id="nationality" name="nationality" defaultValue={director?.nationality} />
        </div>
        <div>
          <Label htmlFor="imageUrl">URL de Imagen</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={director?.imageUrl} />
        </div>
      </div>
      
      <div>
        <Label htmlFor="biography">Biografía</Label>
        <Textarea id="biography" name="biography" defaultValue={director?.biography} />
      </div>
      
      <Button type="submit" className="w-full gradient-gold">
        {buttonText}
      </Button>
    </form>
  );

  if (isLoading) {
    return <div className="p-8 text-center">Cargando directores...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Buscar directores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-gold">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Director
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Director</DialogTitle>
            </DialogHeader>
            <DirectorForm onSubmit={handleCreateSubmit} buttonText="Crear Director" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{directors.length}</p>
                <p className="text-sm text-muted-foreground">Total Directores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-2xl font-bold">
                  {directors.filter(d => d.birthDate).length}
                </p>
                <p className="text-sm text-muted-foreground">Con Fecha Nacimiento</p>
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
                  {directors.filter(d => d.imageUrl).length}
                </p>
                <p className="text-sm text-muted-foreground">Con Imagen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Directores ({filteredDirectors.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Director</TableHead>
                <TableHead>Fecha Nacimiento</TableHead>
                <TableHead>Nacionalidad</TableHead>
                <TableHead>Biografía</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDirectors.map((director) => (
                <TableRow key={director.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {director.imageUrl && (
                        <img 
                          src={director.imageUrl} 
                          alt={director.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-medium">{director.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{director.birthDate || 'N/A'}</TableCell>
                  <TableCell>{director.nationality || 'N/A'}</TableCell>
                  <TableCell>
                    {director.biography 
                      ? (director.biography.length > 50 
                          ? `${director.biography.substring(0, 50)}...` 
                          : director.biography)
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog open={editingDirector?.id === director.id} onOpenChange={(open) => !open && setEditingDirector(null)}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingDirector(director)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Editar Director</DialogTitle>
                          </DialogHeader>
                          <DirectorForm 
                            director={director} 
                            onSubmit={handleEditSubmit} 
                            buttonText="Actualizar Director" 
                          />
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteMutation.mutate(director.id)}
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

export default Directors;
