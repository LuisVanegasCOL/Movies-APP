import React from 'react';

const DEFAULT_MOVIE_IMAGE = 'https://placehold.co/400x600/1a1a1a/ffffff?text=No+Image';

interface MovieImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
}

const MovieImage: React.FC<MovieImageProps> = ({ src, alt, className = '' }) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_MOVIE_IMAGE;
  };

  return (
    <img
      src={src || DEFAULT_MOVIE_IMAGE}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

export default MovieImage; 