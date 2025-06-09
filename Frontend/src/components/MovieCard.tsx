
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { MovieDTO } from '@/types/api';

interface MovieCardProps {
  movie: MovieDTO;
  onEdit?: (movie: MovieDTO) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

const MovieCard = ({ movie, onEdit, onDelete, onView }: MovieCardProps) => {
  const defaultImage = "https://images.unsplash.com/photo-1489599511342-b1b2e5f1e3bf?w=400&h=600&fit=crop";

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-gold hover:scale-[1.02] bg-card border-border">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={movie.imageUrl || defaultImage}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {onEdit && (
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(movie);
              }}
              className="w-8 h-8 p-0"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(movie.id);
              }}
              className="w-8 h-8 p-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {movie.imdbRating && (
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-medium">
              {movie.imdbRating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 
          className="font-serif font-semibold text-lg mb-2 text-foreground line-clamp-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => onView?.(movie.id)}
        >
          {movie.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {movie.description}
        </p>

        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
          {movie.year && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{movie.year}</span>
            </div>
          )}
          {movie.runtime && (
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{movie.runtime} min</span>
            </div>
          )}
        </div>

        {movie.genreNames && movie.genreNames.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genreNames.slice(0, 3).map((genre, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
            {movie.genreNames.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{movie.genreNames.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      {(movie.directorNames || movie.starNames) && (
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          {movie.directorNames && movie.directorNames.length > 0 && (
            <div className="w-full">
              <span className="font-medium">Director: </span>
              <span>{movie.directorNames.slice(0, 2).join(', ')}</span>
              {movie.directorNames.length > 2 && <span> y otros</span>}
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default MovieCard;
