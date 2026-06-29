# 🎓 OurStudy Platform

Plataforma educativa moderna para gestión y consumo de cursos en línea.

## 📁 Estructura del Proyecto

```
ourStudioApp/
├── backend/                 # 🔧 Servidor Express + API REST
│   ├── app.js
│   ├── controllers/        # Lógica de negocio
│   ├── models/             # Modelos de datos
│   ├── routes/             # Rutas de API
│   ├── db/                 # Conexión a base de datos
│   ├── middleware/         # Middleware de autenticación
│   └── package.json
│
├── frontend/               # ⚛️ Aplicación React + Vite
│   ├── src/
│   │   ├── pages/         # Páginas principales
│   │   ├── components/    # Componentes reutilizables
│   │   ├── services/      # Servicios de API
│   │   ├── styles/        # Estilos CSS
│   │   └── App.jsx        # Componente raíz
│   ├── public/            # Archivos estáticos
│   └── package.json
│
├── MIGRATION_GUIDE.md     # 📖 Guía de migración EJS → React
└── README.md              # Este archivo
```

## 🚀 Inicio Rápido

### 1. Clonar/Descargar el Proyecto
```bash
cd ourStudioApp
```

### 2. Instalar Dependencias

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Ejecutar en Desarrollo

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
El backend estará en: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
El frontend estará en: `http://localhost:5173`

### 4. Abrir en el Navegador
```
http://localhost:5173
```

## 📚 Funcionalidades Principales

### ✅ Autenticación
- Inicio de sesión con Google OAuth 2.0
- Gestión de sesiones con cookies

### 📖 Gestión de Cursos
- Catálogo de cursos
- Búsqueda y filtros
- Inscripción a cursos
- Detalles del curso

### 👤 Dashboard Personal
- Mis cursos inscritos
- Progreso de aprendizaje
- Historial de lecciones

### 📝 Contenido de Cursos
- Lecciones organizadas
- Visualización de contenido
- Materiales descargables
- Seguimiento de progreso

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** + **Express.js** - Servidor
- **MongoDB** - Base de datos
- **Passport.js** - Autenticación OAuth
- **JWT** - Tokens seguros
- **Jest** - Testing

### Frontend
- **React 18** - UI Framework
- **Vite** - Build tool (rápido ⚡)
- **React Router v6** - Enrutamiento SPA
- **Axios** - Cliente HTTP
- **CSS 3** - Estilos (sin dependencias)

## 📋 Scripts Disponibles

### Backend
```bash
npm run dev      # Inicia servidor con nodemon
npm test         # Ejecuta tests con Jest
npm run build    # Build para producción
```

### Frontend
```bash
npm run dev      # Inicia servidor Vite (HMR habilitado)
npm run build    # Construye para producción
npm run preview  # Previsualiza build
```

## 🔐 Configuración de Autenticación

### Google OAuth
1. Crear proyecto en [Google Cloud Console](https://console.cloud.google.com/)
2. Configurar credenciales OAuth 2.0
3. Agregar URLs autorizadas:
   - `http://localhost:3000`
   - `http://localhost:3000/login/federated/google/callback`

### Variables de Entorno

**Backend (.env):**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ourstudyapp
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_session_secret
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3000/api
```

## 🎨 Paleta de Colores

- **Marrón Primario**: `#6c584c`
- **Marrón Secundario**: `#8b7355`
- **Verde/Lima**: `#adc178`
- **Crema Claro**: `#f0ead2`
- **Crema Oscuro**: `#dde5b6`

## 📱 Responsive Design

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

## 🧪 Testing

### Backend Tests
```bash
npm test                 # Ejecuta todos los tests
npm test -- --watch     # Modo watch
```

### Frontend (Próximamente)
```bash
npm run test     # Tests con Vitest
```

## 🚀 Deploy

### Frontend (Vercel/Netlify)
```bash
npm run build
# Subir carpeta 'dist/'
```

### Backend (Heroku/Railway)
```bash
git push heroku main
```

### Configurar URLs en Producción
```javascript
// frontend/.env.production
VITE_API_URL=https://api.tudominio.com
```

## 📚 Documentación Adicional

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Guía de Migración](./MIGRATION_GUIDE.md)

## 🤝 Contribuciones

Para contribuir:
1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m "Agregar nueva funcionalidad"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## ⚠️ Troubleshooting

### El frontend no se conecta al backend
- Verificar que ambos servidores estén corriendo
- Revisar CORS en backend
- Verificar URL de API en `.env`

### Puerto 3000 o 5173 ya está en uso
```bash
# Cambiar puerto (Backend)
PORT=3001 npm run dev

# Cambiar puerto (Frontend en vite.config.js)
server: {
  port: 5174
}
```

### OAuth no funciona
- Verificar credentials en Google Cloud Console
- Revisar URLs autorizadas
- Comprobar session secret en variables de entorno

## 📞 Soporte

Para reportar bugs o sugerencias:
- Crear un issue en el repositorio
- Contactar al equipo de desarrollo

## 📄 Licencia

Este proyecto está bajo licencia privada de OurStudy Platform.

---

**Última actualización:** Junio 2026  
**Versión:** 2.0 (React)  
**Status:** ✅ En Desarrollo
