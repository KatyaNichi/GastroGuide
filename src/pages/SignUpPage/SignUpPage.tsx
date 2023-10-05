import  { useState, ChangeEvent, FormEvent } from 'react';
import Header from '../../components/common/Header/Header';
import Popup from '../../components/common/Popup/Popup';
import './SignUpPage.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [isRegistrationSuccessVisible, setRegistrationSuccessVisible] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('User signed up successfully');
        setRegistrationSuccessVisible(true);
      } else {
        console.error('Error signing up:', response.statusText);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='signUp-page-container'>
      <Header />
      <h2>Join GastroGuide today to save your favorite recipes and elevate your culinary experience!</h2>
      <div className='main-signUp'>
        <div className='signUp-form-container'>

          <form onSubmit={handleSubmit} className="centered-form">
            <div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="custom-button" type="submit">Sign Up</button>
          </form>
        </div>
        <div className='image-container'>
          <img src='../../../../public/assets/images/undraw_diet_ghvw.svg' alt='diet-image' />
        </div>
        {isRegistrationSuccessVisible && (
        <Popup
          onClose={() => setRegistrationSuccessVisible(false)}
          header='Congratulations!'
          message="You have successfully registered with GastroGuide."
        />
      )}
      </div>
    </div>
  );
}

export default SignUp;
