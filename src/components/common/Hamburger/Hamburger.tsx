import { Link } from 'react-router-dom';
import './Hamburger.css';

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const Hamburger = ({ isOpen, onClick }: HamburgerProps) => {
  return (
    <div className="hamburger">
      <div className={`menu-button ${isOpen ? 'open' : ''}`} onClick={onClick}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {isOpen && <div className="menu-overlay" onClick={onClick} />}
      {isOpen && (
        <div className="menu-items">
        <button onClick={onClick} className='closeBtn'><svg width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
    fill="#000"
  />
</svg>
</button>
          <ul>
          <li><Link to='/'>Discover</Link></li>
            <li><Link to='/categories'>Categories</Link></li>
            <li><Link to='/favorites'>Favorites</Link></li>
            <li><Link to='/login'>Log in</Link></li>
            <li><Link to='/signup'>Sign up</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
