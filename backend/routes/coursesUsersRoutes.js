// routes/coursesUserRoutes.js
const express = require('express');
const router = express.Router();
const {
  enrollInCourse,
  completeLesson,
  getCourseProgress,
  getAllUserCourses,
  getLessonsByCourseId,
  updatedLessonAsCompleted
} = require('../controllers/coursesUserController');
const { 
  getLessonById 
} = require('../controllers/lessonsController');

// Inscribir usuario a un curso
router.post('/enroll', enrollInCourse);

// Obtener todos los cursos del usuario autenticado
router.get('/courses', getAllUserCourses);

// Obtener progreso de un curso específico
router.get('/courses/:courseId/progress', getCourseProgress); 

router.get('/:courseId/lessons', getLessonsByCourseId);

// Marcar/desmarcar lección como completada
router.get('/courses/lessons/:lessonId', getLessonById); //my-courses/courses/lessons/69ec150029fb45f91fcbf452

router.post('/courses/lessons/:lessonId/complete', updatedLessonAsCompleted);

module.exports = router;