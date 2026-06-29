import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import '../styles/lessons.css';

function Lessons() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        const response = await apiService.getLessons(courseId);
        setLessons(response.data || []);
      } catch (err) {
        setError('Error fetching lessons');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchLessons();
  }, [courseId]);

  const completedCount = lessons.filter(l => l.completed).length;

  if (loading) return <div className="main-container"><p>Cargando...</p></div>;
  if (error) return <div className="main-container"><p className="error">{error}</p></div>;

  return (
    <div className="main-container">
      <div className="breadcrumb">
        <Link to="/dashboard">Inicio</Link>
        <i className="fas fa-chevron-right"></i>
        <Link to="/my-courses">Mis Cursos</Link>
        <i className="fas fa-chevron-right"></i>
        <span style={{ color: '#6c584c', fontWeight: '500' }}>Lecciones</span>
      </div>

      <div className="page-header">
        <h1>
          <i className="fas fa-book" style={{ color: '#adc178' }}></i> 
          Lecciones del Curso
        </h1>
        <div className="subtitle">
          <span>Continúa tu aprendizaje paso a paso</span>
          {lessons.length > 0 && (
            <>
              <span className="stats-badge">
                <i className="fas fa-list-check"></i>
                {lessons.length} lecciones totales
              </span>
              <span className="stats-badge">
                <i className="fas fa-check-circle"></i>
                {completedCount} completadas
              </span>
            </>
          )}
        </div>
      </div>

      <div className="lessons-back-button-container">
        <button onClick={() => navigate(-1)} className="lessons-go-back-btn">
          <i className="fas fa-arrow-left"></i>
          Volver atrás
        </button>
      </div>

      {lessons.length > 0 ? (
        <div className="lessons-grid">
          {lessons.map((lesson, index) => (
            <div key={lesson._id} className="lesson-card">
              <div className="lesson-content">
                <div className="lesson-info">
                  <div className="lesson-number">
                    {lesson.stepNumber || index + 1}
                  </div>
                  <div className="lesson-title-section">
                    <div className="lesson-title">
                      {lesson.title}
                    </div>
                    <div className="lesson-meta">
                      <span>
                        <i className="far fa-calendar-alt"></i> {new Date(lesson.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lesson-actions">
                  {lesson.completed && (
                    <div className="completed-badge">
                      <i className="fas fa-check-circle"></i>
                      <span>Completada</span>
                    </div>
                  )}
                  <Link 
                    to={`/my-courses/courses/lessons/${lesson._id}`}
                    className="go-to-lesson-btn"
                  >
                    <i className="fas fa-play"></i>
                    Ir a lección
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fas fa-book-open"></i>
          <h3>No hay lecciones disponibles</h3>
          <p>Este curso aún no tiene lecciones o no se pudieron cargar.</p>
          <button onClick={() => navigate(-1)} className="go-back-btn" style={{ marginTop: '1rem' }}>
            <i className="fas fa-arrow-left"></i>
            Volver atrás
          </button>
        </div>
      )}
    </div>
  );
}

export default Lessons;
