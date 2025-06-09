
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
import { starsApi } from '@/services/api';
import { Star as StarType } from '@/types/api';
import { Plus, Edit, Trash2, Star, Calendar } from 'lucide-react';

const Stars = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingStar, setEditingStar] = useState<StarType | null>(null);

  // Queries
  const { data: stars = [], isLoading } = useQuery({
    queryKey: ['stars'],
    queryFn: starsApi.getAll,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: starsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stars'] });
      toast({ title: 'Éxito', description: 'Actor creado correctamente' });
      setIsCreateOpen(false);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al crear el actor', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, star }: { id: number; star: StarType }) => starsApi.update(id, star),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stars'] });
      toast({ title: 'Éxito', description: 'Actor actualizado correctamente' });
      setEditingStar(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al actualizar el actor', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: starsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stars'] });
      toast({ title: 'Éxito', description: 'Actor eliminado correctamente' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Error al eliminar el actor', variant: 'destructive' });
    },
  });

  // Filtrado
  const filteredStars = stars.filter(star =>
    star.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (star.nationality && star.nationality.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const starData = {
      name: formData.get('name') as string,
      birthDate: formData.get('birthDate') as string || undefined,
      nationality: formData.get('nationality') as string || undefined,
      biography: formData.get('biography') as string || undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
    };
    createMutation.mutate(starData);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingStar) return;
    
    const formData = new FormData(e.currentTarget);
    const starData: StarType = {
      ...editingStar,
      name: formData.get('name') as string,
      birthDate: formData.get('birthDate') as string || undefined,
      nationality: formData.get('nationality') as string || undefined,
      biography: formData.get('biography') as string || undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
    };
    updateMutation.mutate({ id: editingStar.id, star: starData });
  };

  const StarForm = ({ star, onSubmit, buttonText }: { 
    star?: StarType; 
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    buttonText: string;
  }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nombre *</Label>
          <Input id="name" name="name" defaultValue={star?.name} required />
        </div>
        <div>
          <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
          <Input id="birthDate" name="birthDate" type="date" defaultValue={star?.birthDate} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nationality">Nacionalidad</Label>
          <Input id="nationality" name="nationality" defaultValue={star?.nationality} />
        </div>
        <div>
          <Label htmlFor="imageUrl">URL de Imagen</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={star?.imageUrl} />
        </div>
      </div>
      
      <div>
        <Label htmlFor="biography">Biografía</Label>
        <Textarea id="biography" name="biography" defaultValue={star?.biography} />
      </div>
      
      <Button type="submit" className="w-full gradient-gold">
        {buttonText}
      </Button>
    </form>
  );

  if (isLoading) {
    return <div className="p-8 text-center">Cargando actores...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Buscar actores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-gold">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Actor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Actor</DialogTitle>
            </DialogHeader>
            <StarForm onSubmit={handleCreateSubmit} buttonText="Crear Actor" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-2xl font-bold">{stars.length}</p>
                <p className="text-sm text-muted-foreground">Total Actores</p>
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
                  {stars.filter(s => s.birthDate).length}
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
                  {stars.filter(s => s.imageUrl).length}
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
          <CardTitle>Actores ({filteredStars.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actor</TableHead>
                <TableHead>Fecha Nacimiento</TableHead>
                <TableHead>Nacionalidad</TableHead>
                <TableHead>Biografía</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStars.map((star) => (
                <TableRow key={star.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {star.imageUrl && (
                        <img 
                          src={star.imageUrl} 
                          alt={star.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-medium">{star.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{star.birthDate || 'N/A'}</TableCell>
                  <TableCell>{star.nationality || 'N/A'}</TableCell>
                  <TableCell>
                    {star.biography 
                      ? (star.biography.length > 50 
                          ? `${star.biography.substring(0, 50)}...` 
                          : star.biography)
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog open={editingStar?.id === star.id} onOpenChange={(open) => !open && setEditingStar(null)}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setEditingStar(star)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Editar Actor</DialogTitle>
                          </DialogHeader>
                          <StarForm 
                            star={star} 
                            onSubmit={handleEditSubmit} 
                            buttonText="Actualizar Actor" 
                          />
                        </DialogContent>
                      </Dialog>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteMutation.mutate(star.id)}
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

export default Stars;
