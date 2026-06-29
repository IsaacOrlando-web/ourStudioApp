#!/bin/bash
# Script para iniciar el proyecto OurStudy con backend y frontend

echo "🚀 Iniciando OurStudy Platform..."
echo ""

# Función para mostrar cómo correr los servidores
start_services() {
    echo "📋 Siga estos pasos en terminal separadas:"
    echo ""
    echo "1️⃣  Terminal 1 - Backend:"
    echo "   cd backend"
    echo "   npm run dev"
    echo ""
    echo "2️⃣  Terminal 2 - Frontend:"
    echo "   cd frontend"
    echo "   npm run dev"
    echo ""
    echo "3️⃣  Abra el navegador:"
    echo "   Frontend: http://localhost:5173"
    echo "   Backend API: http://localhost:3000/api"
    echo ""
}

# Verificar si ambas carpetas existen
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: No se encontraron las carpetas backend y/o frontend"
    echo ""
    start_services
    exit 1
fi

# Verificar si node_modules está instalado
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd backend
    npm install
    cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    cd frontend
    npm install
    cd ..
fi

echo "✅ Dependencias instaladas"
echo ""
start_services
