import { useContext, useState,  useEffect} from 'react';
import { UserContext, UserContextType } from '../../components/UserContext';
import Card from '../../components/common/Card/Card';
import Header from '../../components/common/Header/Header';
import { useRecipes } from '../../components/useRecipes';
import { Recipe } from '../../../types/recipe';
import { getBaseUrl } from '../../services/api';
import './Favorite.css';

const FavoritesPage = () => {
  const userContext = useContext<UserContextType>(UserContext);
  const { recipes: allRecipes } = useRecipes(); 
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  // useEffect(() => {
  //   if (!userContext.isLoggedIn) {
  //     return;
  //   }
  //   const favoriteRecipeIds = userContext.favorites;
  //   const filteredRecipes = allRecipes.filter((recipe) =>
  //     favoriteRecipeIds.includes(String(recipe.id))
  //   );
  //   setFavoriteRecipes(filteredRecipes);
  // }, [userContext.isLoggedIn, userContext.favorites, allRecipes]);
  
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      if (userContext.isLoggedIn) {
        try {
          const response = await fetch(
            getBaseUrl(`/api/favorites/user/${userContext.userId}`)
          );

          if (response.ok) {
            const favoritesData = await response.json();
            const favoriteRecipeIds = favoritesData.favorites;
            const filteredRecipes = allRecipes.filter((recipe) =>
              favoriteRecipeIds.includes(String(recipe.id))
            );
            setFavoriteRecipes(filteredRecipes);
          } else {
            console.error('Failed to fetch user favorites');
          }
        } catch (error) {
          console.error('Error fetching user favorites:', error);
        }
      }
    };

    // Call the fetch function when the component mounts or when userContext.favorites changes
    fetchFavoriteRecipes();
  }, [userContext.isLoggedIn, userContext.userId, userContext.favorites, allRecipes]);

  if (!userContext.isLoggedIn) {
    return (
      <div className="favorites-page">
        <Header />
        <p>Please log in to view your favorite recipes.</p>
        {/* <button  className='custom-button' onClick={() => {
          userContext.login();
          navigate('/login'); 
        }}>Log In</button> */}
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <Header />
      <h2>Your Favorite Recipes</h2>
      <div className="favorites-grid">
        {favoriteRecipes.length === 0 ? (
          <p>You haven't added any recipes to your favorites yet.</p>
        ) : (
          favoriteRecipes.map((recipe) => (
            <Card
              key={recipe.id} 
              recipeId={recipe.id}
              image={recipe.image}
              title={recipe.title}
              readyInMinutes={recipe.readyInMinutes}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
