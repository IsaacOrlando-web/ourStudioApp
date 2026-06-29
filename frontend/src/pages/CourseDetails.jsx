import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import '../styles/courseDetails.css';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await apiService.getCourseById(id);
        setCourse(response.data);
      } catch (err) {
        setError('Error fetching course details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      await apiService.enrollCourse(id);
      navigate('/my-courses');
    } catch (err) {
      setError('Error enrolling in course');
      console.error('Error:', err);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="main-container"><p>Cargando...</p></div>;
  if (error) return <div className="main-container"><p className="error">{error}</p></div>;
  if (!course) return <div className="main-container"><p>Curso no encontrado</p></div>;

  const placeholderImage = `https://placehold.co/1200x400/f0ead2/6c584c?text=${encodeURIComponent(course.title)}`;

  return (
    <div className="main-container">
      <div className="breadcrumb">
        <Link to="/courses">Cursos</Link>
        <i className="fas fa-chevron-right"></i>
        <span style={{ color: '#6c584c', fontWeight: '500' }}>{course.title}</span>
      </div>

      <div className="course-container">
        <div className="course-header">
          <img 
            src={course.coverUrl || placeholderImage}
            alt={course.title}
            className="course-cover"
            onError={(e) => e.target.src = placeholderImage}
          />
          <div className="course-overlay">
            <span className="course-badge">
              <i className="fas fa-star"></i> Destacado
            </span>
            <h1>{course.title}</h1>
            <div className="course-author">
              <i className="fas fa-user"></i>
              <span>Por {course.author}</span>
            </div>
          </div>
        </div>

        <div className="course-body">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-signal"></i>
              </div>
              <div className="stat-info">
                <h4>Nivel</h4>
                <p>{course.level.charAt(0).toUpperCase() + course.level.slice(1)}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-tag"></i>
              </div>
              <div className="stat-info">
                <h4>Categoría</h4>
                <p>{course.category.charAt(0).toUpperCase() + course.category.slice(1)}</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <div className="stat-info">
                <h4>Lecciones</h4>
                <p>{course.lessonsCount || 0} lecciones</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-info">
                <h4>Estudiantes</h4>
                <p>{(course.enrolledStudents || 0).toLocaleString()} inscritos</p>
              </div>
            </div>
          </div>

          <div className="description-section">
            <h2>
              <i className="fas fa-align-left"></i>
              Sobre este curso
            </h2>
            <div className="description-text">
              <p>{course.description}</p>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <i className="fas fa-calendar-alt"></i>
              <span>
                <strong>Fecha de creación</strong>
                {new Date(course.createdAt).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <span>
                <strong>Duración estimada</strong>
                {course.estimatedDuration || 'No especificada'}
              </span>
            </div>
          </div>

          <div className="enrollment-section">
            <button 
              onClick={handleEnroll}
              disabled={enrolling}
              className="enroll-btn"
            >
              <i className="fas fa-check-circle"></i>
              {enrolling ? 'Inscribiendo...' : 'Inscribirse al curso'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
