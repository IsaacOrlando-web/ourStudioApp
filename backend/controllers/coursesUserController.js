// controllers/coursesUserController.js
const createCoursesUser = require('../models/coursesUsersModel');
const Course = require('../models/coursesModel');
const Lesson = require('../models/lessonsModel'); 
const { ObjectId } = require('mongodb');

// Inscribir usuario a un curso
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user?._id?.toString();
    const username = req.user?.username;
    
    // Validaciones básicas
    if (!userId || !courseId) {
      return res.status(400).json({ message: 'UserId y courseId son requeridos' });
    }
    
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'ID de curso inválido' });
    }
    
    // Verificar que el curso existe
    const course = await Course.getCourseById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    
    // Crear instancia para este usuario usando userId
    const userCourses = createCoursesUser(userId);
    
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
    
    
    res.redirect('/my-courses/courses');
    
  } catch (error) {
    console.error('Error en enrollInCourse:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

// Marcar lección como completada
const completeLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { completed } = req.body; // true o false
    const userId = req.user?._id?.toString();
    const username = req.user?.username;
    
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    
    if (!ObjectId.isValid(lessonId)) {
      return res.status(400).json({ message: 'ID de lección inválido' });
    }
    
    const userCourses = createCoursesUser(userId);
    
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
    const { courseId } = req.params;
    const userId = req.user?._id?.toString();
    const username = req.user?.username;
    
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    
    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'ID de curso inválido' });
    }
    
    const userCourses = createCoursesUser(userId);
    
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
    const course = await Course.getCourseById(courseId);
    
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
    const userId = req.user?._id?.toString();
    const username = req.user?.username;
    
    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    
    console.log(username);
    
    const userCourses = createCoursesUser(userId);
    
    //Verificar que el usuario tiene lecciones
    const exists = await userCourses.collectionExists();
    
    
    // Obtener todas las lecciones
    const allLessons = await userCourses.getAllLessons();
    
    //// Agrupar por courseId
    const courseMap = new Map();
    //
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

    //// Obtener información de los cursos
    const courseIds = Array.from(courseMap.keys()).map(id => new ObjectId(id));
    console.log(`${courseIds}: ${typeof(courseIds)}`); //funciona, extrae los Ids de los cursos.
    //pasan a ser de tipo object todos los ids

    courses = [];
    for(let i = 0; i < courseIds.length; i++){//obtiene cada curso dentro de el arreglo courses
      courses.push(await Course.getCourseById(courseIds[i]));
    }
    console.log(courses);


    //// Combinar información
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
    
    const viewUsername = req.user?.username || req.session?.username || username || 'Invitado';

    //res.json({
    //  username: username,
    //  totalCourses: result.length,
    //  courses: result
    //});
    res.render('./pages/myCourses', {
      title: 'Mis Cursos',
      username: viewUsername,
      totalCourses: result.length,
      courses: result,
      layout: './layouts/mainLayout',
      currentPage: 'my-courses'
    })
    
  } catch (error) {
    console.error('Error en getAllUserCourses:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

const getLessonsByCourseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?._id?.toString();
    const username = req.user?.username;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    const userCourses = createCoursesUser(userId);
    const lessons = await userCourses.getLessonsByCourse(courseId);

    res.render('./pages/showLessons', {
      title: 'Lecciones del Curso',
      username: username,
      lessons: lessons,
      layout: './layouts/mainLayout',
      currentPage: 'my-courses'
    });
  } catch (error) {
    console.error('Error en getLessonsByCourseId:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

const updatedLessonAsCompleted = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user?._id?.toString();
    const username = req.user?.username;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Usuario no autenticado' });
    }

    console.log(`updatedLessonAsCompleted: ${lessonId}, ${username}`);
    const userCourses = createCoursesUser(userId);
    await userCourses.updateLessonAsCompleted(lessonId);
    console.log(`Lección ${lessonId} marcada como completada para el usuario ${username}`);

    res.json({ success: true, message: '¡Lección completada con éxito!' });
  } catch (error) {
    console.error('Error en updatedLessonAsCompleted:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor', error: error.message });
  }
};

module.exports = {
  enrollInCourse,
  completeLesson,
  getCourseProgress,
  getAllUserCourses,
  getLessonsByCourseId,
  updatedLessonAsCompleted
};