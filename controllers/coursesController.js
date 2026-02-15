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

module.exports = {
    getAllCourses
};