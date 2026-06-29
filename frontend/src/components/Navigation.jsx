import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import '../styles/navigation.css';

function Navigation({ user }) {
  const navigate = useNavigate();
  const displayName = user?.username || 'Invitado';
  const initials = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await apiService.logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="user-card">
          <div className="avatar-placeholder">
            {initials}
          </div>
          <span className="user-name">
            {displayName} <i className="fas fa-chevron-down" style={{ fontSize: '0.7rem' }}></i>
          </span>
        </div>

        <Link to="/my-courses" className="nav-item">
          <i className="fas fa-graduation-cap"></i>
          <span>tus cursos</span>
        </Link>

        <Link to="/courses" className="nav-item">
          <i className="fas fa-graduation-cap"></i>
          <span>más cursos</span>
        </Link>

        <Link to="/community" className="nav-item">
          <i className="fas fa-users"></i>
          <span>Community</span>
        </Link>

        <Link to="/galeria" className="nav-item">
          <i className="fas fa-images"></i>
          <span>Galeria</span>
        </Link>
      </div>

      <div className="logout-area">
        <button onClick={handleLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
