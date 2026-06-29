import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const apiService = {
  // Cursos
  getAllCourses: () => api.get('/courses'),
  getCourseById: (courseId) => api.get(`/courses/${courseId}`),
  enrollCourse: (courseId) => api.post('/courses/enroll', { courseId }),

  // Mis cursos
  getMyCourses: () => api.get('/my-courses'),
  
  // Lecciones
  getLessons: (courseId) => api.get(`/my-courses/${courseId}/lessons`),
  getLessonById: (lessonId) => api.get(`/lessons/${lessonId}`),
  markLessonComplete: (lessonId) => api.post(`/lessons/${lessonId}/complete`),

  // Autenticación
  logout: () => api.post('/logout')
};

export default api;
