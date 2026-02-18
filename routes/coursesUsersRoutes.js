// routes/coursesUserRoutes.js
const express = require('express');
const router = express.Router();
const {
  enrollInCourse,
  completeLesson,
  getCourseProgress,
  getAllUserCourses
} = require('../controllers/coursesUserController');

// Inscribir usuario a un curso
router.post('/enroll', enrollInCourse);

// Obtener todos los cursos de un usuario con su progreso
router.get('/:username/courses', getAllUserCourses);

// Obtener progreso de un curso específico
router.get('/:username/courses/:courseId/progress', getCourseProgress);

// Marcar/desmarcar lección como completada
router.put('/:username/lessons/:lessonId', completeLesson);

module.exports = router;