# 🔄 Guía de Migración: EJS a React

## Resumen de Cambios

El frontend de la aplicación OurStudy ha sido completamente rediseñado, migrando de **EJS (templates del servidor)** a **React (Single Page Application)**. Esta guía explica los cambios principales y cómo usar el nuevo frontend.

## 📊 Comparación de Arquitectura

### ANTES (EJS)
```
Backend (Express + EJS)
├── Views (EJS templates)
├── Rutas de render
└── Lógica en servidor + JS vanilla en cliente
```

### AHORA (React + Vite)
```
Backend (Express + REST API)
├── API endpoints
└── Sirve assets estáticos

Frontend (React + Vite)
├── Componentes React
├── Cliente SPA
└── Lógica en cliente
```

## 🔑 Cambios Principales

### 1. **Estructura de Rutas**

| Página | EJS | React |
|--------|-----|-------|
| Login | `/` | `/login` |
| Catálogo | `/courses` | `/courses` |
| Detalles | `/courses/:id` | `/courses/:id` |
| Mis cursos | `/my-courses/courses` | `/my-courses` |
| Lecciones | `/my-courses/courses/lessons` | `/my-courses/:courseId/lessons` |
| Lección | `/my-courses/courses/lessons/:id` | `/my-courses/courses/lessons/:id` |

### 2. **Cambios en Componentes**

#### Navigation (Navigation.ejs → Navigation.jsx)
- ✅ Mismo diseño visual
- ✅ Links dinámicos con React Router
- ✅ Logout mejorado
- ✅ Responsivo para móviles

#### Login (login.ejs → Login.jsx)
- ✅ Mismo flujo de Google OAuth
- ✅ Redirecciona correctamente
- ✅ Estilos CSS actualizados

#### Courses (courses.ejs → Courses.jsx)
- ✅ Búsqueda en tiempo real (sin necesidad de F5)
- ✅ Filtros de categoría integrados
- ✅ Grid dinámico con scroll
- ✅ Mejor experiencia de usuario

#### Course Details (courseDetails.ejs → CourseDetails.jsx)
- ✅ Estadísticas interactivas
- ✅ Botón de inscripción funcional
- ✅ Carga dinámica de datos

#### My Courses (myCourses.ejs → MyCourses.jsx)
- ✅ Progreso visual mejorado
- ✅ Estados dinámicos de cursos
- ✅ Navegación fluida

#### Lessons (showLessons.ejs → Lessons.jsx)
- ✅ Lista de lecciones mejorada
- ✅ Indicadores de progreso
- ✅ Interfaz moderna

#### Show Lesson (showLesson.ejs → ShowLesson.jsx)
- ✅ Visualización limpia
- ✅ Botón para marcar como completada
- ✅ Descarga de materiales

### 3. **Cambios en la API**

Las rutas del backend siguen siendo las mismas, pero ahora son llamadas via fetch/axios desde React:

```javascript
// Antes (EJS renderizado en servidor)
GET /courses → Express renderiza courses.ejs

// Ahora (React consume API)
GET /api/courses → React renderiza Courses.jsx
```

## 🚀 Cómo Correr Ambos Servidores

### 1. Terminal 1 - Backend
```bash
cd backend
npm run dev
# Backend corriendo en http://localhost:3000
```

### 2. Terminal 2 - Frontend
```bash
cd frontend
npm run dev
# Frontend corriendo en http://localhost:5173
```

## 📝 Rutas de Ambos Servidores

### Backend
- API: `http://localhost:3000/api/*`
- OAuth: `http://localhost:3000/login/federated/google`

### Frontend
- App: `http://localhost:5173`
- Automáticamente redirige `/login` al backend

## 🔗 Próximos Pasos

### Para Desarrolladores
1. El backend **NO** necesita cambios en la estructura
2. Los endpoints API deben mantener el mismo formato
3. Asegurar que CORS esté configurado correctamente
4. Probar que las cookies de sesión funcionan entre servidores

### Para Deploy
1. Frontend construido: `npm run build` → carpeta `dist/`
2. Servir `dist/` desde un servidor estático (Nginx, Vercel, etc.)
3. Configurar CORS en backend para permitir el dominio del frontend
4. Usar variables de entorno para URLs del API

## 🎨 Mejoras Visuales

- ✅ Diseño más moderno
- ✅ Animaciones suaves
- ✅ Mejor feedback del usuario
- ✅ Responsivo en todos los dispositivos
- ✅ Carga más rápida (SPA)
- ✅ No requiere recargar la página

## 📦 Dependencias Nuevas

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.x.x",
    "axios": "^1.x.x"
  },
  "devDependencies": {
    "vite": "^8.x.x",
    "@vitejs/plugin-react": "^4.x.x"
  }
}
```

## 🛠️ Mantenimiento Futuro

### Si necesitas agregar una nueva página:
1. Crear componente en `src/pages/NuevaPagina.jsx`
2. Crear estilos en `src/styles/nuevaPagina.css`
3. Importar en `App.jsx`
4. Agregar ruta en el Router

### Si necesitas nueva llamada a API:
1. Agregar función en `src/services/apiService.js`
2. Usar en componentes con `apiService.nombreFuncion()`

## ✅ Checklist de Verificación

- [ ] Backend corriendo en puerto 3000
- [ ] Frontend corriendo en puerto 5173
- [ ] Google OAuth está configurado
- [ ] CORS habilitado en backend
- [ ] Búsqueda de cursos funciona
- [ ] Inscripción a cursos funciona
- [ ] Logout redirige a login
- [ ] Responsive en móvil

## 📞 Soporte

Si algo no funciona:
1. Verificar que ambos servidores están corriendo
2. Abrir DevTools (F12) y revisar la consola
3. Verificar Network tab para errores de API
4. Revisar CORS headers en response

---

**Última actualización:** Junio 2026
**Status:** ✅ Production Ready
