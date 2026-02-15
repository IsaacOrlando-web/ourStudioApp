require('dotenv').config();
const { connectDB, getDB } = require('../db/index');
const { ObjectId } = require('mongodb');

async function getAllLessons() {
    try {
        await connectDB();
        const db = getDB();
        const lessonsCollection = db.collection('lessons');
        const lessons = await lessonsCollection.find({}).toArray();
        console.log('Lessons fetched successfully:', lessons);
        await db.client.close();
        return lessons; 
    } catch(error) {
        console.error('Error fetching lessons:', error);
        throw error;
    }   
}

async function getLessonsByCourseId(courseId) {
    try {
        await connectDB();
        const db = getDB();
        const lessonsCollection = db.collection('lessons');
        const objectId = new ObjectId(courseId);
        const lessons = await lessonsCollection.find({ courseId: objectId }).toArray();
        console.log('Lessons fetched successfully:', lessons);
        await db.client.close();
        return lessons; 
    } catch(error) {
        console.error('Error fetching lessons:', error);
        throw error;
    }   
}

async function getNextLesson(lessonId) {
    try {
         await connectDB();
        const db = getDB();
        const lessonsCollection = db.collection('lessons');
        const currentCourse = await lessonsCollection.findOne({ _id: new ObjectId(lessonId) });
        const nextLesson = await lessonsCollection.findOne({ _id: new ObjectId(currentCourse.nextStepId) });
        console.log('Next lesson fetched successfully:', nextLesson);
        await db.client.close();
        return nextLesson;
    } catch(error) {
        console.error('Error fetching lessons:', error);
        throw error;
    }
}

async function getPrevLesson(lessonId) {
    try {
         await connectDB();
        const db = getDB();
        const lessonsCollection = db.collection('lessons');
        const currentCourse = await lessonsCollection.findOne({ _id: new ObjectId(lessonId) });
        const prevLesson = await lessonsCollection.findOne({ _id: new ObjectId(currentCourse.prevStepId) });
        console.log('prev:', prevLesson);
        await db.client.close();
        return prevLesson;
    } catch(error) {
        console.error('Error fetching lessons:', error);
        throw error;
    }
}

getPrevLesson('65a1b2c3d4e5f6a7b8c9d103');