const { get } = require('http');
const createCoursesUser = require('../models/coursesUsersModel');

async function getLessonById(req, res) {
    try{
        const { lessonId } = req.params;
        const userId = req.user?._id?.toString();
        const username = req.user?.username;
        
        if (!userId) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }
        
        console.log(`Fetching lesson with ID: ${lessonId} for user: ${userId}`);
        
        // Buscar en la colección personal del usuario
        const userCourses = createCoursesUser(userId);
        console.log('UserCourses instance created successfully', userCourses);
        const lessons = await userCourses.getAllLessons();
        console.log('Lessons fetched successfully:', lessons);
        
        // Buscar la lección específica
        const lesson = await userCourses.getLessonById(lessonId);
        
        console.log(lesson);

        if (!lesson) {
            return res.status(404).json({ error: 'Lección no encontrada' });
        }

        // Buscar lección anterior y siguiente por stepNumber Y courseId
        const currentStep = lesson.stepNumber;
        const courseId = lesson.courseId;
        
        const prevLesson = lessons.find(l => 
            l.stepNumber === currentStep - 1 && 
            l.courseId.toString() === courseId.toString()
        );
        const nextLesson = lessons.find(l => 
            l.stepNumber === currentStep + 1 && 
            l.courseId.toString() === courseId.toString()
        );

        // Convertir courseId a string para evitar problemas en la vista
        const courseIdString = lesson.courseId ? lesson.courseId.toString() : null;

        res.json({
            lesson: lesson,
            prevLesson: prevLesson || null,
            nextLesson: nextLesson || null,
            courseId: courseIdString
        })
    } catch (error) {
        console.error('Error fetching lesson:', error);
        res.status(500).json({ error: 'Error fetching lesson' });
    }
}

module.exports = {
    getLessonById
};