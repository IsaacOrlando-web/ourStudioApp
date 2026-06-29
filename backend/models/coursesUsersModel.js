// models/coursesUser.js
const { connectDB, getDB } = require('../db/index');
const { ObjectId } = require('mongodb');

class CoursesUser {
  constructor(userId) {
    if (!ObjectId.isValid(userId)) {
      throw new Error('Invalid userId: must be a valid MongoDB ObjectId');
    }
    this.userId = userId.toString();
    this.collectionName = `lessons_${this.userId}`;
  }

  async getCollection() {
    await connectDB();
    const db = getDB();
    return db.collection(this.collectionName);
  }

  // Verificar si la colección del usuario existe
  async collectionExists() {
    try {
      await connectDB();
      const db = getDB();
      const collections = await db.listCollections({ name: this.collectionName }).toArray();
      return collections.length > 0;
    } catch (error) {
      console.error('Error checking collection existence:', error);
      return false;
    }
  }

  // Obtener todas las lecciones del usuario
  async getAllLessons() {
    try {
      const collection = await this.getCollection(); // ✅ Primero obtener colección
      return await collection.find({}).toArray();    // ✅ Luego hacer la operación
    } catch (error) {
      console.error('Error getting all lessons:', error);
      return [];
    }
  }

  // Obtener lecciones de un curso específico
  async getLessonsByCourse(courseId) {
    try {
      if (!ObjectId.isValid(courseId)) return [];
      const collection = await this.getCollection(); // ✅ Primero obtener colección
      return await collection
        .find({ courseId: new ObjectId(courseId) })
        .sort({ stepNumber: 1 })
        .toArray();                                   // ✅ Luego hacer la operación
    } catch (error) {
      console.error('Error getting lessons by course:', error);
      return [];
    }
  }

  async getLessonById(lessonId) {
    try {
      if (!ObjectId.isValid(lessonId)) return null;
      const collection = await this.getCollection(); // ✅ Primero obtener colección
      return await collection.findOne({ _id: new ObjectId(lessonId) }); // ✅ Luego hacer la operación
    } catch (error) {
      console.error('Error getting lesson by ID:', error);
      return null;
    }
  }

  async updateLessonAsCompleted(lessonId) {
    try {
      if (!ObjectId.isValid(lessonId)) return false;
      const collection = await this.getCollection(); // ✅ Primero obtener colección
      const result = await collection.updateOne({ _id: new ObjectId(lessonId) }, { $set: { completed: true } });
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error updating lesson as completed:', error);
      return false;
    }
  }

  // Crear lecciones para un nuevo curso (CORREGIDO)
  async createLessonsFromCourse(courseId, originalLessons) {
    try {
      console.log('📝 Creando lecciones para el curso:', courseId);
      
      const collection = await this.getCollection(); // ✅ Primero obtener colección
      
      const userLessons = originalLessons.map(lesson => ({
        originalLessonId: lesson._id,
        courseId: new ObjectId(courseId),
        stepNumber: lesson.stepNumber,
        title: lesson.title,
        description: lesson.description,
        images: lesson.images || [],
        nextStepId: lesson.nextStepId,
        prevStepId: lesson.prevStepId,
        createdAt: lesson.createdAt || new Date(),
        completed: false,
        enrolledAt: new Date(),
        updatedAt: new Date()
      }));

      console.log(`📚 Insertando ${userLessons.length} lecciones`);
      
      const result = await collection.insertMany(userLessons); // ✅ Luego insertar
      console.log('✅ Lecciones insertadas:', Object.keys(result.insertedIds).length);
      
      return Object.values(result.insertedIds);
    } catch (error) {
      console.error('Error creating lessons from course:', error);
      throw error;
    }
  }

  // Marcar lección como completada (CORREGIDO)
  async toggleLessonCompleted(lessonId, completed) {
    try {
      if (!ObjectId.isValid(lessonId)) return null;
      
      const collection = await this.getCollection(); // ✅ Primero obtener colección
      
      const result = await collection.updateOne(     // ✅ Luego actualizar
        { _id: new ObjectId(lessonId) },
        { 
          $set: { 
            completed: completed,
            updatedAt: new Date(),
            ...(completed ? { completedAt: new Date() } : {})
          } 
        }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      console.error('Error toggling lesson completed:', error);
      return false;
    }
  }

  // Obtener progreso de un curso
  async getCourseProgress(courseId) {
    try {
      const lessons = await this.getLessonsByCourse(courseId);
      const total = lessons.length;
      const completed = lessons.filter(l => l.completed).length;
      
      return {
        courseId,
        totalLessons: total,
        completedLessons: completed,
        progress: total > 0 ? Math.round((completed / total) * 100) : 0,
        lessons: lessons.map(l => ({
          id: l._id,
          title: l.title,
          stepNumber: l.stepNumber,
          completed: l.completed
        }))
      };
    } catch (error) {
      console.error('Error getting course progress:', error);
      return null;
    }
  }

  // Verificar si ya está inscrito en un curso (CORREGIDO)
  async isEnrolled(courseId) {
    try {
      if (!ObjectId.isValid(courseId)) {
        return false;
      }

      await connectDB();
      
      const exists = await this.collectionExists();
      if (!exists) {
        return false;
      }

      const collection = await this.getCollection(); // ✅ Primero obtener colección
      const count = await collection.countDocuments({ // ✅ Luego contar
        courseId: new ObjectId(courseId) 
      });
      
      return count > 0;
    } catch (error) {
      console.error('Error checking enrollment:', error);
      return false;
    }
  }

  // Obtener todos los cursos del usuario con su progreso
  async getAllCoursesProgress() {
    try {
      const exists = await this.collectionExists();
      if (!exists) {
        return [];
      }

      const collection = await this.getCollection(); // ✅ Primero obtener colección
      const lessons = await collection.find({}).toArray(); // ✅ Luego buscar
      
      // Agrupar por courseId
      const courseMap = new Map();
      
      lessons.forEach(lesson => {
        const courseIdStr = lesson.courseId.toString();
        if (!courseMap.has(courseIdStr)) {
          courseMap.set(courseIdStr, {
            courseId: lesson.courseId,
            total: 0,
            completed: 0
          });
        }
        const course = courseMap.get(courseIdStr);
        course.total++;
        if (lesson.completed) {
          course.completed++;
        }
      });
      
      return Array.from(courseMap.values()).map(c => ({
        courseId: c.courseId,
        totalLessons: c.total,
        completedLessons: c.completed,
        progress: Math.round((c.completed / c.total) * 100)
      }));
    } catch (error) {
      console.error('Error getting all courses progress:', error);
      return [];
    }
  }

  // Obtener estadísticas del usuario
  async getStats() {
    try {
      const exists = await this.collectionExists();
      if (!exists) {
        return {
          username: this.username,
          totalCourses: 0,
          totalLessons: 0,
          completedLessons: 0,
          overallProgress: 0
        };
      }

      const collection = await this.getCollection(); // ✅ Primero obtener colección
      const lessons = await collection.find({}).toArray(); // ✅ Luego buscar
      const coursesProgress = await this.getAllCoursesProgress();
      
      const totalLessons = lessons.length;
      const completedLessons = lessons.filter(l => l.completed).length;
      
      return {
        username: this.username,
        totalCourses: coursesProgress.length,
        totalLessons,
        completedLessons,
        inProgressLessons: totalLessons - completedLessons,
        overallProgress: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        courses: coursesProgress
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      return null;
    }
  }
}

// Factory function para crear instancias
const createCoursesUser = (userId) => {
  if (!userId) {
    throw new Error('userId is required to create CoursesUser instance');
  }
  return new CoursesUser(userId);
};

module.exports = createCoursesUser;