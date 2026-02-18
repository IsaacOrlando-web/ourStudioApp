// controllers/coursesUserController.js
const createCoursesUser = require('../models/coursesUsersModel');
const Course = require('../models/coursesModel'); // Asumo que tienes este modelo
const Lesson = require('../models/lessonsModel'); // Asumo que tienes este modelo
const { ObjectId } = require('mongodb');

// Inscribir usuario a un curso
const enrollInCourse = async (req, res) => {
  try {
    const { username, courseId } = req.body;
    
    // Validaciones básicas
    if (!username || !courseId) {
      return res.status(400).json({ message: 'Username y courseId son requeridos' });
    }
    
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'ID de curso inválido' });
    }
    
    // Verificar que el curso existe
    const course = await Course.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    
    // Crear instancia para este usuario
    const userCourses = createCoursesUser(username);
    
    // Verificar si ya está inscrito
    const alreadyEnrolled = await userCourses.isEnrolled(courseId);
    if (alreadyEnrolled) {
      const progress = await userCourses.getCourseProgress(courseId);
      return res.status(400).json({
        message: 'El usuario ya está inscrito en este curso',
        progress: progress
      });
    }
    
    // Obtener las lecciones del curso
    const lessons = await Lesson.getLessonsByCourseId(courseId);
    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ message: 'El curso no tiene lecciones' });
    }
    
    // Crear las lecciones para el usuario
    await userCourses.createLessonsFromCourse(courseId, lessons);
    
    // Obtener el progreso inicial
    const progress = await userCourses.getCourseProgress(courseId);
    
    res.status(201).json({
      message: 'Inscripción exitosa',
      username: username,
      course: {
        id: course._id,
        title: course.title,
        level: course.level
      },
      progress: progress
    });
    
  } catch (error) {
    console.error('Error en enrollInCourse:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Marcar lección como completada
const completeLesson = async (req, res) => {
  try {
    const { username, lessonId } = req.params;
    const { completed } = req.body; // true o false
    
    if (!ObjectId.isValid(lessonId)) {
      return res.status(400).json({ message: 'ID de lección inválido' });
    }
    
    const userCourses = createCoursesUser(username);
    
    // Verificar que el usuario tiene lecciones
    const exists = await userCourses.collectionExists();
    if (!exists) {
      return res.status(404).json({ message: 'Usuario no encontrado o sin cursos' });
    }
    
    // Actualizar la lección
    const updated = await userCourses.toggleLessonCompleted(lessonId, completed);
    if (!updated) {
      return res.status(404).json({ message: 'Lección no encontrada' });
    }
    
    // Obtener la lección actualizada
    const lessons = await userCourses.getAllLessons();
    const updatedLesson = lessons.find(l => l._id.toString() === lessonId);
    
    res.json({
      message: `Lección ${completed ? 'completada' : 'marcada como pendiente'}`,
      lesson: updatedLesson
    });
    
  } catch (error) {
    console.error('Error en completeLesson:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Obtener progreso de un curso específico
const getCourseProgress = async (req, res) => {
  try {
    const { username, courseId } = req.params;
    
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'ID de curso inválido' });
    }
    
    const userCourses = createCoursesUser(username);
    
    // Verificar que el usuario tiene lecciones
    const exists = await userCourses.collectionExists();
    if (!exists) {
      return res.status(404).json({ message: 'Usuario no encontrado o sin cursos' });
    }
    
    // Obtener progreso
    const progress = await userCourses.getCourseProgress(courseId);
    
    if (progress.totalLessons === 0) {
      return res.status(404).json({ message: 'El usuario no está inscrito en este curso' });
    }
    
    // Obtener información del curso
    const course = await Course.findById(courseId);
    
    res.json({
      username: username,
      course: {
        id: courseId,
        title: course?.title || 'Curso',
        ...progress
      }
    });
    
  } catch (error) {
    console.error('Error en getCourseProgress:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Obtener todos los cursos del usuario con su progreso
const getAllUserCourses = async (req, res) => {
  try {
    const { username } = req.params;
    
    const userCourses = createCoursesUser(username);
    
    // Verificar que el usuario tiene lecciones
    const exists = await userCourses.collectionExists();
    if (!exists) {
      return res.json({
        username: username,
        courses: [],
        message: 'El usuario no tiene cursos inscritos'
      });
    }
    
    // Obtener todas las lecciones
    const allLessons = await userCourses.getAllLessons();
    
    // Agrupar por courseId
    const courseMap = new Map();
    
    allLessons.forEach(lesson => {
      const courseId = lesson.courseId.toString();
      if (!courseMap.has(courseId)) {
        courseMap.set(courseId, {
          total: 0,
          completed: 0,
          courseId: courseId
        });
      }
      const course = courseMap.get(courseId);
      course.total++;
      if (lesson.completed) {
        course.completed++;
      }
    });
    
    // Obtener información de los cursos
    const courseIds = Array.from(courseMap.keys()).map(id => new ObjectId(id));
    const courses = await Course.find({ _id: { $in: courseIds } });
    
    // Combinar información
    const result = courses.map(course => {
      const progress = courseMap.get(course._id.toString());
      return {
        id: course._id,
        title: course.title,
        level: course.level,
        category: course.category,
        coverUrl: course.coverUrl,
        progress: {
          total: progress.total,
          completed: progress.completed,
          percentage: Math.round((progress.completed / progress.total) * 100)
        }
      };
    });
    
    res.json({
      username: username,
      totalCourses: result.length,
      courses: result
    });
    
  } catch (error) {
    console.error('Error en getAllUserCourses:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

module.exports = {
  enrollInCourse,
  completeLesson,
  getCourseProgress,
  getAllUserCourses
};