import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import '../styles/showLesson.css';

function ShowLesson() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const response = await apiService.getLessonById(lessonId);
        setLesson(response.data);
        setCompleted(response.data.completed || false);
      } catch (err) {
        setError('Error fetching lesson');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) fetchLesson();
  }, [lessonId]);

  const handleMarkComplete = async () => {
    try {
      await apiService.markLessonComplete(lessonId);
      setCompleted(true);
    } catch (err) {
      console.error('Error marking lesson complete:', err);
    }
  };

  if (loading) return <div className="main-container"><p>Cargando...</p></div>;
  if (error) return <div className="main-container"><p className="error">{error}</p></div>;
  if (!lesson) return <div className="main-container"><p>Lección no encontrada</p></div>;

  return (
    <div className="main-container">
      <div className="breadcrumb">
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#6c584c', cursor: 'pointer' }}>
          Volver
        </button>
      </div>

      <div className="lesson-header">
        <h1>{lesson.title}</h1>
        <div className="lesson-meta-info">
          <span className="lesson-date">
            <i className="far fa-calendar-alt"></i> {new Date(lesson.createdAt).toLocaleDateString()}
          </span>
          {completed && (
            <span className="completed-status">
              <i className="fas fa-check-circle"></i> Completada
            </span>
          )}
        </div>
      </div>

      <div className="lesson-body">
        <div className="lesson-description">
          <h2>Descripción</h2>
          <p>{lesson.description}</p>
        </div>

        {lesson.content && (
          <div className="lesson-content-section">
            <h2>Contenido</h2>
            <div className="lesson-content-text">
              {lesson.content}
            </div>
          </div>
        )}

        {lesson.materials && (
          <div className="lesson-materials">
            <h2>Materiales</h2>
            <ul>
              {Array.isArray(lesson.materials) && lesson.materials.map((material, index) => (
                <li key={index}>
                  <a href={material.url} target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-download"></i> {material.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="lesson-actions">
          {!completed && (
            <button onClick={handleMarkComplete} className="complete-btn">
              <i className="fas fa-check"></i> Marcar como completada
            </button>
          )}
          <button onClick={() => navigate(-1)} className="back-btn">
            <i className="fas fa-arrow-left"></i> Volver a lecciones
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowLesson;
