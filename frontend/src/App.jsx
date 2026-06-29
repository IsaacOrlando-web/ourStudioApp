import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import MyCourses from './pages/MyCourses';
import Lessons from './pages/Lessons';
import ShowLesson from './pages/ShowLesson';
import Navigation from './components/Navigation';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/user`, {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <Router>
      {user && <Navigation user={user} />}
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Courses /> : <Navigate to="/login" />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/my-courses" element={user ? <MyCourses /> : <Navigate to="/login" />} />
        <Route path="/my-courses/:courseId/lessons" element={user ? <Lessons /> : <Navigate to="/login" />} />
        <Route path="/my-courses/courses/lessons/:lessonId" element={user ? <ShowLesson /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
