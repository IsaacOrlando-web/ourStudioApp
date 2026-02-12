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

ourstudio/
├── config/          # Database connection
├── models/          # Mongoose schemas
├── controllers/     # Business logic
├── routes/          # API endpoints
├── views/           # EJS templates
├── public/          # CSS, JS, uploads
├── middleware/      # Auth, upload, validation
├── utils/           # Helper functions
├── server.js        # Entry point
└── package.json     # Dependencies

##🔌 Main Routes
Method	Endpoint	Description
GET	/courses	Browse all courses
GET	/courses/:id	Course details
POST	/courses/:id/enroll	Enroll in course
GET	/my-courses	Your progress
GET	/lessons/:id	View lesson
POST	/lessons/:id/complete	Complete & upload
POST	/register	Create account
POST	/login	Sign in
GET	/dashboard	User dashboard
