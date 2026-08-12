import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/login/federated/google';
  };

  return (
    <div className="login-container">
      <div className="bg-texture"></div>

      <div className="card">
        <div className="logo-placeholder">
          <img 
            src="/img/logo.png" 
            alt="Logo personalizado" 
            className="logo-img"
            style={{ borderRadius: '20px', background: '#dde5b6', padding: '10px 15px' }}
          />
        </div>

        <h1>¡Bienvenido!</h1>
        <div className="subheading">accede con tu cuenta Google</div>

        <button onClick={handleGoogleLogin} className="google-btn">
          <i className="fab fa-google"></i>
          <span>Ingresar con Google</span>
        </button>

        <div className="legal-note">
          🌿 <a href="#">términos y privacidad</a> · espacio para tu marca
        </div>
      </div>
    </div>
  );
}

export default Login;
