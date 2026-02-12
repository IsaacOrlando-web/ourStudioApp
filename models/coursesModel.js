require('dotenv').config();
const { get } = require('http');
const { connectDB, getDB } = require('../db/index');
const { ObjectId } = require('mongodb');

async function getAllCourses() {
    try {
        await connectDB();
        const db = getDB();
        const coursesCollection = db.collection('courses');
        const courses = await coursesCollection.find({}).toArray();
        await db.client.close();
        return courses;
    } catch(error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
}

async function getCourseById(courseId) {
    try {
        await connectDB();
        const db = getDB();
        const coursesCollection = db.collection('courses');
        const objectId = new ObjectId(courseId);
        const course = await coursesCollection.findOne({ _id: objectId });
        if(course != null) {
            console.log('Course fetched successfully:', course);
            await db.client.close();
            return course;
        } else{
            console.log('Course not found with ID:', courseId);
            await db.client.close();
            return null;
        }
    } catch(error) {
        console.error('Error fetching course:', error);
        throw error;    
    }
}

//filter by levels
async function getCoursesByLevel(level) {
    try {
        await connectDB();
        const db = getDB();
        const coursesCollection = db.collection('courses');
        const courses = await coursesCollection.find({ level: level }).toArray();
        await db.client.close();
        return courses;
    } catch(error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
}

module.exports = { getAllCourses, getCourseById, getCoursesByLevel };