const coursesRoutes = require('./coursesRoutes');
const authRoutes = require('./auth');
const myCoursesRoutes = require('./coursesUsersRoutes');
const express = require('express');
const router = express.Router();

router.use('/', authRoutes);
router.use('/courses', coursesRoutes);
router.use('/my-courses', myCoursesRoutes);
router.use('/',  (req, res) => res.send('Hello from the root route'));

module.exports = router;