#!/bin/bash

echo "🧪 PROBANDO API DE PELÍCULAS..."
echo "================================"

BASE_URL="http://localhost:8080/api"

echo ""
echo "🎬 1. Probando GET /api/movies (DTO con relaciones)..."
curl -s $BASE_URL/movies | head -5

echo ""
echo "🎭 2. Probando GET /api/directors..."
curl -s $BASE_URL/directors | head -5

echo ""
echo "⭐ 3. Probando GET /api/stars..."
curl -s $BASE_URL/stars | head -5

echo ""
echo "🏷️ 4. Probando GET /api/genres..."
curl -s $BASE_URL/genres | head -5

echo ""
echo "📄 5. Probando GET /api/movies/entity (entidades completas)..."
curl -s $BASE_URL/movies/entity | head -5

echo ""
echo "🔍 6. Probando GET /api/movies/1 (película específica)..."
curl -s $BASE_URL/movies/1 | head -5

echo ""
echo "✅ ¡Pruebas completadas!"
echo "📝 Revisa los logs del servidor para ver la actividad de la BD" 