const { get } = require('http');
const coursesModel = require('../models/coursesModel');

async function getAllCourses(req, res) {
    try {
        const courses = await coursesModel.getAllCourses();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Error fetching courses' });
    }
}

async function getCourseById(req, res) {
    try {
        const courseId = req.params.id;
        const course = await coursesModel.getCourseById(courseId);
        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Error fetching course' });
    }
}

module.exports = {
    getAllCourses,
    getCourseById
};