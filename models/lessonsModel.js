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

getLessonsByCourseId('65a1b2c3d4e5f6a7b8c9d001');