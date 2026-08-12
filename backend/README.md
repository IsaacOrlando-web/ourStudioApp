# 🎨 OurStudio - Backend API

**Learn to draw. Share your progress. Teach others.**

OurStudio Backend es una API REST que sirve datos a la aplicación React del frontend. Maneja la autenticación, cursos, lecciones y seguimiento de progreso del usuario.

🔗 **API Base URL:** `http://localhost:3000/api`  
📦 **Version:** 2.0.0 (API REST)

---

## ✨ Características

- **🔐 Autenticación OAuth 2.0** — Con Google
- **📚 Gestión de Cursos** — CRUD completo
- **📝 Sistema de Lecciones** — Organizadas por curso
- **📊 Seguimiento de Progreso** — Por usuario y por curso
- **🔄 Sessions & Cookies** — Autenticación persistente
- **🚀 API REST** — Endpoints JSON modernos

---

## 🛠️ Tech Stack

| Componente | Tecnología |
|---|---|
| **Runtime** | Node.js 20+ |
| **Framework** | Express.js 5.x |
| **Database** | MongoDB 7.x |
| **Authentication** | Passport.js + Google OAuth 2.0 |
| **Sessions** | express-session |
| **CORS** | cors middleware |

---

## 📋 Endpoints Disponibles

### 🔐 Autenticación
```
GET  /login/federated/google        # Iniciar OAuth con Google
GET  /oauth2/redirect/google        # Callback de Google OAuth
GET  /api/auth/user                 # Obtener usuario autenticado
POST /api/auth/logout               # Cerrar sesión
```

### 📚 Cursos
```
GET  /api/courses                   # Listar todos los cursos
GET  /api/courses/:id               # Obtener detalles del curso
GET  /api/courses/level/:level      # Filtrar por nivel
GET  /api/courses/category/:category # Filtrar por categoría
POST /api/courses/enroll            # Inscribirse a un curso
```

### 📖 Mis Cursos
```
GET  /api/my-courses                # Listar mis cursos inscritos
```

### 📝 Lecciones
```
GET  /api/my-courses/:courseId/lessons      # Lecciones del curso
GET  /api/lessons/:lessonId                 # Detalles de lección
POST /api/lessons/:lessonId/complete        # Marcar completada
```

---

## 🚀 Instalación

### 1. Clonar/Descargar
```bash
cd backend
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Crear archivo `.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ourstudyapp
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
SESSION_SECRET=una_clave_secreta
```

### 4. Iniciar Servidor
```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3000`

---

## 📁 Estructura del Proyecto
```
backend/
├── controllers/         # Lógica de negocio
│   ├── coursesController.js
│   ├── coursesUserController.js
│   └── lessonsController.js
├── models/              # Modelos de datos
│   ├── coursesModel.js
│   ├── coursesUsersModel.js
│   └── lessonsModel.js
├── routes/              # Rutas API
│   ├── auth.js
│   ├── coursesRoutes.js
│   ├── coursesUsersRoutes.js
│   └── index.js
├── middleware/          # Middleware personalizado
│   └── authentication.js
├── db/                  # Configuración de BD
│   └── index.js
├── public/              # Archivos estáticos
│   ├── css/
│   ├── img/
│   └── script/
├── server.js            # Punto de entrada
├── package.json
└── README.md
├── 📁 controllers/
│   ├── CourseController.js
│   ├── LessonController.js
│   └── UserController.js
├── 📁 routes/
│   ├── index.js
│   ├── courseRoutes.js
│   ├── lessonRoutes.js
│   └── userRoutes.js
├── 📁 views/
│   ├── 📁 partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── 📁 courses/
│   │   ├── index.ejs
│   │   └── show.ejs
│   └── index.ejs
├── 📁 public/
│   ├── 📁 css/
│   │   └── style.css
│   └── 📁 js/
│       └── main.js
├── 📁 middleware/
│   └── auth.js
├── server.js
└── package.json
```

## 🔌 Main Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| 📚 **COURSES** |
| 👀 GET | `/courses` | Browse all courses | 🙋 |
| 🔍 GET | `/courses/:id` | Course details | 🙋 |
| 🎯 GET | `/courses/level/:level` | Filter by level | 🙋 |
| 🗂️ GET | `/courses/category/:category` | Filter by category | 🙋 |
| 🔎 GET | `/courses/search?q=` | Search courses | 🙋 |
| 📝 POST | `/courses/:id/enroll` | Enroll in course | 🔐 |
| ⭐ POST | `/courses/:id/save` | Save for later | 🔐 |
| 🗑️ DELETE | `/courses/:id/drop` | Drop course | 🔐 |
| 📋 GET | `/my-courses` | My enrolled courses | 🔐 |
| 💾 GET | `/saved-courses` | My saved courses | 🔐 |
| | | |
| ✏️ **LESSONS** |
| 📖 GET | `/lessons/:id` | View lesson | 🙋 |
| ⏩ GET | `/lessons/:id/next` | Next lesson | 🙋 |
| ⏪ GET | `/lessons/:id/prev` | Previous lesson | 🙋 |
| ✅ POST | `/lessons/:id/complete` | Complete lesson & upload | 🔐 |
| 📚 GET | `/courses/:courseId/lessons` | All course lessons | 🙋 |
| | | |
| 👤 **AUTH & USERS** |
| 📝 GET | `/register` | Registration form | 🙋 |
| ✍️ POST | `/register` | Create account | 🙋 |
| 🔑 GET | `/login` | Login form | 🙋 |
| 🚪 POST | `/login` | Authenticate | 🙋 |
| 🚶 GET | `/logout` | Logout | 🔐 |
| 📊 GET | `/dashboard` | User dashboard | 🔐 |
| 👤 GET | `/profile` | View profile | 🔐 |
| ✏️ PUT | `/profile` | Update profile | 🔐 |
| 🖼️ POST | `/profile/avatar` | Upload avatar | 🔐 |
| | | |
| 🖼️ **GALLERY & COMMUNITY** |
| 🎨 GET | `/gallery` | My personal gallery | 🔐 |
| 🖼️ GET | `/gallery/:id` | View single drawing | 🔐 |
| 🗑️ DELETE | `/gallery/:id` | Delete drawing | 🔐 |
| 🌍 GET | `/community` | Community feed | 🙋 |
| 💬 POST | `/drawings/:id/comments` | Add comment | 🔐 |
| ❤️ POST | `/drawings/:id/like` | Like drawing | 🔐 |

**Legend:**
- 🙋 = Public (no authentication required)
- 🔐 = Private (login required)
