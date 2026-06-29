# 🔧 Guía de Actualización del Backend para React

## ⚠️ Cambios Necesarios en el Backend

Ahora que el frontend es una aplicación React separada, el backend necesita ser actualizado para funcionar como API REST pura, en lugar de renderizar vistas EJS.

## 1️⃣ Instalar y Configurar CORS

### Instalar CORS
```bash
npm install cors
```

### Agregar CORS en app.js

```javascript
const cors = require('cors');

// Después de crear const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## 2️⃣ Actualizar Rutas para Devolver JSON

Ahora las rutas deben devolver JSON en lugar de renderizar vistas EJS.

### ANTES (EJS):
```javascript
router.get('/courses', async (req, res) => {
  const courses = await coursesModel.getAllCourses();
  res.render('./pages/courses', { 
    courses: courses,
    username: req.user?.username 
  });
});
```

### AHORA (JSON):
```javascript
router.get('/api/courses', async (req, res) => {
  try {
    const courses = await coursesModel.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
});
```

## 3️⃣ Endpoints Necesarios

El frontend espera estos endpoints JSON:

### Autenticación
```javascript
GET  /api/user              # Obtener usuario actual
POST /api/logout            # Cerrar sesión
```

### Cursos
```javascript
GET    /api/courses                      # Listar todos los cursos
GET    /api/courses/:courseId           # Detalles de un curso
POST   /api/courses/enroll              # Inscribirse a un curso
```

### Mis Cursos
```javascript
GET    /api/my-courses                   # Mis cursos inscritos
```

### Lecciones
```javascript
GET    /api/my-courses/:courseId/lessons      # Lecciones del curso
GET    /api/lessons/:lessonId                # Detalles de lección
POST   /api/lessons/:lessonId/complete      # Marcar como completada
```

## 4️⃣ Estructura de Respuestas JSON

### Listar Cursos
```json
[
  {
    "_id": "courseId",
    "title": "Fundamentos de Dibujo",
    "author": "Juan García",
    "description": "...",
    "coverUrl": "https://...",
    "category": "dibujo",
    "level": "beginner",
    "enrolledStudents": 150,
    "lessonsCount": 10,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Detalles de Curso
```json
{
  "_id": "courseId",
  "title": "Fundamentos de Dibujo",
  "author": "Juan García",
  "description": "...",
  "coverUrl": "https://...",
  "category": "dibujo",
  "level": "beginner",
  "enrolledStudents": 150,
  "lessonsCount": 10,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Mis Cursos
```json
{
  "user": {
    "_id": "userId",
    "username": "nombreUsuario"
  },
  "courses": [
    {
      "_id": "courseId",
      "title": "...",
      "coverUrl": "...",
      "level": "...",
      "category": "...",
      "progress": {
        "percentage": 50,
        "completed": 5,
        "total": 10
      }
    }
  ]
}
```

### Lecciones del Curso
```json
[
  {
    "_id": "lessonId",
    "title": "Introducción",
    "stepNumber": 1,
    "description": "...",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Detalles de Lección
```json
{
  "_id": "lessonId",
  "title": "Introducción",
  "description": "...",
  "content": "...",
  "completed": false,
  "materials": [
    {
      "name": "PDF de referencia",
      "url": "https://..."
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## 5️⃣ Manejo de Errores

Todos los endpoints deben devolver errores en formato JSON:

```json
{
  "error": "Descripción del error",
  "message": "Mensaje adicional (opcional)"
}
```

### Códigos HTTP
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## 6️⃣ Autenticación

Las cookies de sesión seguirán funcionando con `credentials: 'include'` en Axios/Fetch.

### Verificar Usuario Autenticado
```javascript
router.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});
```

## 7️⃣ Ejemplo Completo de Actualización

### Archivo: routes/coursesRoutes.js

```javascript
const express = require('express');
const coursesController = require('../controllers/coursesController');
const { ensureAuth } = require('../middleware/authentication');

const router = express.Router();

// Rutas públicas
router.get('/courses', coursesController.getAllCoursesJson);
router.get('/courses/:id', coursesController.getCourseByIdJson);

// Rutas protegidas
router.post('/courses/enroll', ensureAuth, coursesController.enrollCourse);

module.exports = router;
```

### Controlador: controllers/coursesController.js

```javascript
// Versión JSON
async function getAllCoursesJson(req, res) {
  try {
    const courses = await coursesModel.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
}

async function getCourseByIdJson(req, res) {
  try {
    const course = await coursesModel.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching course' });
  }
}

async function enrollCourse(req, res) {
  try {
    const { courseId } = req.body;
    const userId = req.user._id;
    
    // Lógica de inscripción
    await userCoursesModel.enrollUserInCourse(userId, courseId);
    
    res.json({ message: 'Successfully enrolled' });
  } catch (error) {
    res.status(400).json({ error: 'Error enrolling in course' });
  }
}

module.exports = {
  getAllCoursesJson,
  getCourseByIdJson,
  enrollCourse
};
```

## 8️⃣ Testing de Endpoints

Use Postman o curl para verificar:

```bash
# Obtener todos los cursos
curl http://localhost:3000/api/courses

# Obtener curso específico
curl http://localhost:3000/api/courses/courseId

# Con autenticación
curl http://localhost:3000/api/my-courses \
  -H "Cookie: connect.sid=tu_cookie"
```

## ✅ Checklist

- [ ] CORS instalado y configurado
- [ ] Todas las rutas devuelven JSON
- [ ] Cookies funcionan correctamente
- [ ] Errores en formato JSON
- [ ] Códigos HTTP correctos
- [ ] Endpoints de autenticación funcionan
- [ ] Inscripción a cursos funciona
- [ ] Lecciones se cargan correctamente
- [ ] Marcar completada funciona

## 📝 Notas Importantes

1. **No eliminar rutas EJS aún** - Mantenerlas por compatibilidad
2. **Nuevas rutas con prefijo `/api`** - Para distinguir de las antiguas
3. **Headers CORS** - Permitir requests desde 5173
4. **Modo development** - Verificar todo en `localhost` antes de producción

## 🚀 Próximos Pasos

1. Actualizar rutas según la guía
2. Testear con Postman
3. Verificar que frontend conecta
4. Deploy a producción

---

**Nota:** Estos cambios aseguran compatibilidad total con el nuevo frontend React.
