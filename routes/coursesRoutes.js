const coursesController = require('../controllers/coursesController');
const express = require('express');
const router = express.Router();

router.get('/', coursesController.getAllCourses);

module.exports = router;