const coursesController = require('../controllers/coursesController');
const express = require('express');
const router = express.Router();

router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);

module.exports = router;