import { useState } from 'react';
import Header from '../../components/common/Header/Header';
import { useUser } from '../../components/useUser';
import Popup from '../../components/common/Popup/Popup';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Access user state and login function from the global context
  const { toggleLoginStatus, setUserId } = useUser();
  const [isLoginSuccessVisible, setLoginSuccessVisible] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggingIn(true);
  
    try {
      const response = await fetch('/srv/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        toggleLoginStatus();
        setError('');
        setLoginSuccessVisible(true);
      
        setUserId(data.userId.toString());
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
    setIsLoggingIn(false);
  };
  

  return (
    <div>
      <div className='login-page-container'>
        <Header />
        <h2>Login to your account</h2>
        <div className='main-login'>
          <div className='login-form-container'>
            <form onSubmit={handleLogin} className='centered-form'>
              <div>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className='custom-button' type='submit' disabled={isLoggingIn}>
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </button>
              {error && <p className='error'>{error}</p>}
            </form>
          </div>
          <div className='image-container'>
            <img src='../../../../public/assets/images/undraw_login.svg' alt='login-image' />
          </div>
          {isLoginSuccessVisible && (
            <Popup
              onClose={() => setLoginSuccessVisible(false)}
              header='Loging in'
              message='You are successfully logged in.'
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
