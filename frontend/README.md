# OurStudy Frontend - React Application

## 📱 Descripción

Frontend de React para la plataforma OurStudy, una aplicación de cursos en línea. Este proyecto reemplaza la interfaz EJS anterior con componentes React modernos y estilos mejorados.

## 🚀 Características

- ✅ Autenticación con Google
- ✅ Catálogo de cursos con búsqueda y filtros
- ✅ Detalles del curso
- ✅ Inscripción a cursos
- ✅ Dashboard de mis cursos con progreso
- ✅ Sistema de lecciones
- ✅ Visualización de lecciones individuales
- ✅ Barra de navegación responsiva
- ✅ Diseño responsive para móviles y desktops

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/           # Componentes reutilizables
│   │   └── Navigation.jsx    # Barra de navegación
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Login.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetails.jsx
│   │   ├── MyCourses.jsx
│   │   ├── Lessons.jsx
│   │   └── ShowLesson.jsx
│   ├── services/            # Servicios de API
│   │   └── apiService.js
│   ├── styles/              # Estilos CSS
│   │   ├── navigation.css
│   │   ├── login.css
│   │   ├── courses.css
│   │   ├── courseDetails.css
│   │   ├── myCourses.css
│   │   ├── lessons.css
│   │   └── showLesson.css
│   ├── App.jsx              # Componente principal
│   ├── index.css            # Estilos globales
│   └── main.jsx             # Punto de entrada
├── public/
│   └── css/                 # Estilos CSS adicionales del backend
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Asegurar que el backend está corriendo:**
El frontend hace proxy de las llamadas al backend en `http://localhost:3000`

3. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Vite
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción

## 🔌 Configuración de Proxy

El archivo `vite.config.js` configura un proxy para las siguientes rutas:
- `/api/*` → `http://localhost:3000/api/*`
- `/login/*` → `http://localhost:3000/login/*`

## 📚 Páginas Principales

### Login
- Página de bienvenida con autenticación Google
- Redirige a `/courses` después de autenticarse

### Courses (Catálogo)
- Lista todos los cursos disponibles
- Búsqueda por título, autor o descripción
- Filtros por categoría y nivel
- Tarjetas de curso con información resumida

### Course Details
- Información detallada del curso
- Estadísticas (nivel, categoría, lecciones, estudiantes)
- Descripción completa
- Botón para inscribirse al curso

### My Courses
- Lista de cursos inscritos
- Barra de progreso por curso
- Contador de lecciones completadas
- Botones para continuar, comenzar o repasar cursos

### Lessons
- Lista de lecciones del curso
- Número de lección y estado (completada/no completada)
- Fecha de creación
- Botones para acceder a cada lección

### Show Lesson
- Visualización de lección individual
- Descripción y contenido
- Materiales descargables
- Botón para marcar como completada

## 🎨 Paleta de Colores

- **Marrón primario:** `#6c584c`
- **Marrón secundario:** `#8b7355`
- **Verde/Lima:** `#adc178`
- **Crema claro:** `#f0ead2`
- **Crema oscuro:** `#dde5b6`

## 🔐 Variables de Entorno

Si necesitas configurar URLs diferentes, puedes editar `src/services/apiService.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

## 🚀 Despliegue a Producción

1. **Construir:**
```bash
npm run build
```

2. **Servidor estático:**
El contenido en `dist/` puede servirse desde cualquier servidor web estático

3. **Variables de Entorno:**
Actualizar `API_BASE_URL` en `apiService.js` con la URL del backend en producción

## 📞 Soporte

Para reportar bugs o sugerir mejoras, contacta al equipo de desarrollo.

## 📄 Licencia

Este proyecto es parte de OurStudy Platform.
