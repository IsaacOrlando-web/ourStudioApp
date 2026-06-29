import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import '../styles/myCourses.css';

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setLoading(true);
        const response = await apiService.getMyCourses();
        setCourses(response.data.courses || []);
        setUser(response.data.user);
      } catch (err) {
        setError('Error fetching courses');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, []);

  const completedCourses = courses.filter(c => c.progress?.percentage === 100).length;

  const placeholderImage = 'https://placehold.co/600x400/f0ead2/6c584c?text=Curso';

  if (loading) return <div className="main-container"><p>Cargando...</p></div>;
  if (error) return <div className="main-container"><p className="error">{error}</p></div>;

  return (
    <div className="main-container">
      <div className="page-header">
        <h1>
          Mis Cursos
          <span className="stats-badge">
            <i className="fas fa-book"></i> {courses.length} cursos
          </span>
        </h1>
        <div className="subtitle">
          <i className="fas fa-user"></i>
          <span>Bienvenido de nuevo, <strong>{user?.username || 'Usuario'}</strong></span>
          <i className="fas fa-circle" style={{ fontSize: '0.3rem', color: '#adc178' }}></i>
          <span>{completedCourses} completados</span>
        </div>
      </div>

      {courses.length > 0 ? (
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course._id} className="course-card">
              <img 
                src={course.coverUrl || placeholderImage}
                alt={course.title}
                className="course-cover"
                onError={(e) => e.target.src = placeholderImage}
              />
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                
                <div className="course-meta">
                  <span className="badge level">
                    <i className="fas fa-signal"></i> {course.level}
                  </span>
                  <span className="badge category">
                    <i className="fas fa-tag"></i> {course.category}
                  </span>
                </div>

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Progreso</span>
                    <span>{course.progress?.percentage || 0}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${course.progress?.percentage || 0}%` }}
                    ></div>
                  </div>
                  <div className="progress-stats">
                    <span>
                      <i className="fas fa-check-circle"></i> {course.progress?.completed || 0}/{course.progress?.total || 0} lecciones
                    </span>
                    {course.progress?.percentage === 100 && (
                      <span style={{ color: '#adc178' }}>
                        <i className="fas fa-trophy"></i> Completado
                      </span>
                    )}
                  </div>
                </div>

                <Link 
                  to={`/my-courses/${course._id}/lessons`}
                  className="continue-btn"
                >
                  {course.progress?.percentage === 0 ? (
                    <>
                      <i className="fas fa-play"></i> Comenzar curso
                    </>
                  ) : course.progress?.percentage === 100 ? (
                    <>
                      <i className="fas fa-redo"></i> Repasar curso
                    </>
                  ) : (
                    <>
                      <i className="fas fa-arrow-right"></i> Continuar
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fas fa-books"></i>
          <h3>No tienes cursos inscritos</h3>
          <p>Explora nuestro catálogo y encuentra el curso perfecto para ti</p>
          <Link to="/courses" className="explore-btn">
            <i className="fas fa-search"></i> Explorar cursos
          </Link>
        </div>
      )}
    </div>
  );
}

export default MyCourses;
