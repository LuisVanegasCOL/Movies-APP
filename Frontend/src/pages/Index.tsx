
// Este archivo se mantiene como fallback pero no se usa
// La aplicación ahora usa Dashboard como página principal

import { Navigate } from 'react-router-dom';

const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
