const coursesRoutes = require('./coursesRoutes');
const express = require('express');
const router = express.Router();

router.use('/courses', coursesRoutes);
router.use('/',  (req, res) => res.send('Hello from the root route'));

module.exports = router;