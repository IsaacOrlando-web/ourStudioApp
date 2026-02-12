const { getAllCourses, getCourseById, getCoursesByLevel } = require('../models/coursesModel');

describe('Course Model', () => {
    test('getAllCourses should return an array of courses', async () => {
        const courses = await getAllCourses();
        expect(Array.isArray(courses)).toBe(true);
    });

    test('getCourseById should return a course object for a valid ID', async () => {
        const courseId = '65a1b2c3d4e5f6a7b8c9d002';
        const course = await getCourseById(courseId);
        expect(course).toBeDefined();
        expect(course._id.toString()).toBe(courseId);
    });

    test('getCoursesByLevel should return an array of courses for a given level', async () => {
        const level = 'beginner';
        const courses = await getCoursesByLevel(level);
        expect(Array.isArray(courses)).toBe(true);
        expect(courses.every(course => course.level === level)).toBe(true);
    });
});