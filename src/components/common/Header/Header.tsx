import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../useUser';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Hamburger from '../Hamburger/Hamburger';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); 
  const { isLoggedIn, logout } = useUser(); 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const location = useLocation();
  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <div className="header">
      <Hamburger isOpen={isMenuOpen} onClick={toggleMenu} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      {isMenuOpen && <div className="overlay" onClick={toggleMenu} />}
      <div className="header-top-row">
        <Logo />
        <Navigation />
        <div className="login-container">
          {isLoggedIn ? (
            // if logged in, display a "Logout" link
            <Link to="/" className="loginLink" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" className="loginLink">
                Log in
              </Link>
              {location.pathname !== '/signup' && (
                <Link to="/signup" className="signupLink">
                  Sign up
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
