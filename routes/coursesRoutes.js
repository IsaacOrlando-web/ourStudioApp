const coursesController = require('../controllers/coursesController');
const express = require('express');
const router = express.Router();

router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);
router.get('/level/:level', coursesController.getCoursesByLevel);
router.get('/category/:category', coursesController.getCoursesByCategory);

module.exports = router;