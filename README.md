# 🎨 OurStudio

**Learn to draw. Share your progress. Teach others.**

OurStudio is a web application where people of all skill levels learn to draw through structured courses, document their visual evolution, and connect with a supportive community. No scattered tutorials, no learning alone — just artists helping artists.

🔗 **Live Demo:** *Coming soon*
📦 **Version:** 1.0.0

---

## ✨ Features

- **📚 Structured Courses** — Organized by level and category (beginner to advanced)
- **📸 Progress Tracking** — Photograph your drawings after each lesson
- **📊 Visual Progress Bar** — See exactly how far you've come
- **🖼️ Personal Gallery** — Your artistic evolution in one timeline
- **💬 Community Feed** — Share work and receive constructive feedback
- **⭐ Saved Courses** — Bookmark what you want to learn next
- **🎓 Create & Teach** — *Coming soon*

---

## 🛠️ Tech Stack

| | |
|---|---|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Templating** | EJS |
| **Auth** | Session-based, bcrypt |
| **File Upload** | Multer |
| **Frontend** | Vanilla JavaScript, CSS3 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB 7+ (local or Atlas)
## 📁Project Structure
```
ourstudio/
├── 📁 config/
│   └── db.js
├── 📁 models/
│   ├── CourseModel.js
│   ├── LessonModel.js
│   └── UserModel.js
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
