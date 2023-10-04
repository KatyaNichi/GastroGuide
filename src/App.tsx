import '../styles/global.css';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Categories from './pages/Categories/Categories';
import Home from './pages/Home';
import Favorites from './pages/Favorites/Favorites';
import RecipePage from './pages/RecipePage/RecipePage';
import { RecipesProvider } from './components/RecipesProvider';
import SignUp from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { UserProvider } from './components/UserContext';

function App() {

  return (
    <RecipesProvider>
      <BrowserRouter>
        <UserProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/logIn" element={<LoginPage />} />
                <Route path="/recipes/:recipeId" element={<RecipePage />} />
              </Routes>
            </UserProvider>
      </BrowserRouter>
    </RecipesProvider>
  )
}

export default App
