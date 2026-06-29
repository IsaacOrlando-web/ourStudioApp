import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import '../styles/courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await apiService.getAllCourses();
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (err) {
        setError('Error fetching courses');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchTerm, currentCategory, courses]);

  const filterCourses = () => {
    let filtered = courses.filter(course => {
      const searchMatch = searchTerm === '' || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      const categoryMatch = currentCategory === 'all' || course.category === currentCategory;

      return searchMatch && categoryMatch;
    });

    setFilteredCourses(filtered);
  };

  const placeholderImage = 'https://placehold.co/600x400/f0ead2/6c584c?text=Curso+de+Dibujo';

  if (loading) return <div className="main-container"><p>Cargando cursos...</p></div>;
  if (error) return <div className="main-container"><p className="error">{error}</p></div>;

  return (
    <div className="main-container">
      <div className="page-header">
        <h1>
          Catálogo de Cursos
          <span className="stats-badge">
            <i className="fas fa-book"></i> {courses.length} cursos disponibles
          </span>
        </h1>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <div className="search-input-wrapper">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Buscar por título, autor o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="results-info">
          Mostrando <span id="visibleCount">{filteredCourses.length}</span> de <span id="totalCount">{courses.length}</span> cursos
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <Link 
              key={course._id} 
              to={`/courses/${course._id}`} 
              className="course-card"
            >
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

                <p className="course-description">{course.description.substring(0, 100)}...</p>

                <div className="course-footer">
                  <span className="author">
                    <i className="fas fa-user"></i> {course.author}
                  </span>
                  <span className="students">
                    <i className="fas fa-users"></i> {course.enrolledStudents} inscritos
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fas fa-search"></i>
          <h3>No se encontraron cursos</h3>
          <p>Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
}

export default Courses;
