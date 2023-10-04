import { Link } from 'react-router-dom';
import { useUser } from '../../useUser';
import './Banner.css'; 

function Banner() {
  //not display banner, if the user is logged in
  const { isLoggedIn } = useUser(); 
  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="banner">
      <div className="banner-content">
        <h2>Welcome to GastroGuide</h2>
        <p>Discover amazing recipes and save your favorites by registering today!</p>
        <Link to="/login" className="loginLink profileBtn">
          Log in
        </Link>
        <Link to="/signup" className="signupLink profileBtn">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Banner;
