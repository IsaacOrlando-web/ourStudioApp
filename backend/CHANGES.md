# ✅ Cambios Realizados en el Backend

## Resumen de Actualización

El backend ha sido actualizado para funcionar exclusivamente como **API REST** que sirve JSON, eliminando la necesidad de renderizar vistas EJS. El frontend React ahora consume todos los datos desde el backend a través de endpoints API.

## 🔄 Cambios Principales

### 1. **Instalación de CORS**
- Se instaló y configuró `cors` para permitir requests desde el frontend en `http://localhost:5173`
- Configuración en `server.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 2. **Cambios en server.js**
- ✅ Agregado CORS configurado
- ✅ Removido `express-ejs-layouts` 
- ✅ Removida configuración de motor de vistas EJS
- ✅ Agregado prefijo `/api` a las rutas
- ✅ Mejor logging en el servidor

**Antes:**
```javascript
app.use('/', indexRouter);
app.use('/', authRouter);
```

**Después:**
```javascript
app.use('/api/auth', authRouter);
app.use('/api', indexRouter);
```

### 3. **Cambios en routes/index.js**
- ✅ Eliminada ruta que renderizaba login
- ✅ Simplificadas las rutas
- ✅ Estructuración clara de rutas públicas y privadas

**Antes:**
```javascript
router.use('/', authRoutes);
router.use('/courses', coursesRoutes);
router.use('/my-courses', ensureAuth, myCoursesRoutes);
router.use('/',  (req, res) => res.render('./pages/login', ...));
```

**Después:**
```javascript
router.use('/courses', coursesRoutes);
router.use('/my-courses', ensureAuth, myCoursesRoutes);
```

### 4. **Cambios en routes/auth.js**
- ✅ Cambios OAuth redirection a frontend
- ✅ Agregada ruta GET `/api/auth/user` para verificar autenticación
- ✅ Cambio de GET a POST para `/logout`
- ✅ Todos los endpoints devuelven JSON

**Nuevas rutas:**
```javascript
GET  /api/auth/user      # Obtener usuario autenticado
POST /api/auth/logout    # Cerrar sesión
```

### 5. **Cambios en Controladores**

#### coursesController.js
- `getAllCourses()`: Cambiado de `res.render()` a `res.json(courses)`
- `getCourseById()`: Cambiado de `res.render()` a `res.json(course)`

#### coursesUserController.js
- `getAllUserCourses()`: Ahora devuelve JSON con estructura `{ user, courses }`
- `getLessonsByCourseId()`: Cambiado de render a `res.json(lessons)`
- `enrollInCourse()`: Cambio de redirect a `res.json({ message, courseId, progress })`

#### lessonsController.js
- `getLessonById()`: Cambiado de render a `res.json({ lesson, prevLesson, nextLesson, courseId })`

## 📋 Endpoints Disponibles

### Autenticación
```
GET  /login/federated/google        # Iniciar OAuth con Google
GET  /oauth2/redirect/google        # Callback de Google
GET  /api/auth/user                 # Obtener usuario actual
POST /api/auth/logout               # Cerrar sesión
```

### Cursos
```
GET  /api/courses                   # Listar todos los cursos
GET  /api/courses/:id               # Obtener detalles del curso
GET  /api/courses/level/:level      # Obtener cursos por nivel
GET  /api/courses/category/:category # Obtener cursos por categoría
```

### Mis Cursos
```
GET    /api/my-courses                           # Listar mis cursos inscritos
POST   /api/courses/enroll                       # Inscribirse a un curso
```

### Lecciones
```
GET    /api/my-courses/:courseId/lessons        # Listar lecciones del curso
GET    /api/lessons/:lessonId                   # Obtener detalles de lección
POST   /api/lessons/:lessonId/complete          # Marcar lección como completada
```

## 🔐 Autenticación y Cookies

- Las cookies de sesión **siguen funcionando** igual
- El frontend envía `credentials: 'include'` en todas las llamadas
- Las cookies se comparten automáticamente entre frontend y backend
- La autenticación se mantiene mediante sesiones

## 📁 Archivos Modificados

1. ✅ `server.js` - Configuración de CORS y rutas
2. ✅ `routes/index.js` - Simplificación de rutas
3. ✅ `routes/auth.js` - Cambios a JSON y nuevos endpoints
4. ✅ `controllers/coursesController.js` - JSON responses
5. ✅ `controllers/coursesUserController.js` - JSON responses
6. ✅ `controllers/lessonsController.js` - JSON responses
7. ✅ `package.json` - Agregado `cors`

## ⚠️ Archivos NO Modificados (Innecesarios)

Los siguientes archivos y carpetas siguen existiendo pero **NO se usan**:
- `views/` - Carpeta completa de vistas EJS
- `express-ejs-layouts` - Dependencia (aún instalada, puede removerse)
- `ejs` - Dependencia (aún instalada, puede removerse)

**Nota:** Se dejaron en el proyecto por si en el futuro se necesite hacer rollback o mantener compatibilidad.

## 🚀 Cómo Usar Ahora

### 1. Iniciar Backend
```bash
cd backend
npm run dev
# Backend en http://localhost:3000
```

### 2. Iniciar Frontend
```bash
cd frontend
npm run dev
# Frontend en http://localhost:5173
```

### 3. El Frontend Automáticamente:
- Se conecta a `http://localhost:3000/api` para todas las llamadas
- Maneja las cookies automáticamente
- Redirige a login si no hay sesión
- Después de OAuth, redirige al dashboard

## ✨ Ventajas de Esta Configuración

✅ **Separación clara** - Backend (API) y Frontend (UI) independientes  
✅ **Escalabilidad** - Fácil agregar múltiples frontends  
✅ **Deploy flexible** - Pueden hospedarse en diferentes servidores  
✅ **Mejor testing** - API puede testearse independientemente  
✅ **Mejor performance** - SPA con carga más rápida  
✅ **Modern stack** - Sigue las mejores prácticas actuales  

## 🔧 Próximos Pasos (Opcionales)

1. **Remover dependencias no usadas** (si no se usa EJS más):
```bash
npm remove ejs express-ejs-layouts
```

2. **Agregar validación más robusta** en los endpoints

3. **Implementar rate limiting** en API

4. **Agregar autenticación con tokens JWT** (alternativa a sesiones)

## 📝 Notas Importantes

- Las vistas EJS siguen en `views/` pero no se usan
- Las rutas estáticas (`public/css`, `public/img`, etc.) siguen siendo servidas
- La autenticación con Google sigue funcionando igual
- Las cookies persisten automáticamente

---

**Status:** ✅ Backend completamente funcional como API REST  
**Última actualización:** Junio 2026  
**Compatible con:** Frontend React en `http://localhost:5173`
