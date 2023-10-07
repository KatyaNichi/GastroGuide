import { useEffect, useContext, useState, useCallback } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { useRecipes } from '../../components/useRecipes';
import Header from '../../components/common/Header/Header';
import Stopwatch from '../../components/common/Stopwatch/Stopwatch';
import { UserContext } from '../../components/UserContext';
import { UserContextType } from '../../components/UserContext';
import { getBaseUrl } from '../../services/api';
import './RecipePage.css';


function RecipePage() {
  const { recipeId } = useParams(); 
  const { recipes } = useRecipes(); 
  const navigate = useNavigate(); 
  const userContext = useContext(UserContext) as UserContextType;
  const [isFavorite, setIsFavorite] = useState(false); 
  const fallbackImage = '../../../../../assets/images/secret-dish.jpg';


  

  // useEffect(() => {
  //   const fetchUserFavorites = async () => {
  //     try {
  //       const response = await fetch(getBaseUrl(`/api/favorites/user/${userContext.userId}`));
        
  //       if (response.ok) {
  //         const favoritesData = await response.json();
          
  //         const isRecipeInFavorites = favoritesData.favorites.includes(recipeId);
  //         console.log(favoritesData)
  //         console.log(recipeId)
  //         console.log(isRecipeInFavorites)
  //         setIsFavorite(isRecipeInFavorites);
  //       } else {
  //         console.error('Failed to fetch user favorites');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user favorites:', error);
  //     }
  //   };
  //   if (userContext.isLoggedIn) {
  //     fetchUserFavorites();
  //   }
  // }, [userContext.isLoggedIn, userContext.userId, recipeId, isFavorite]);

  const fetchUserFavorites = useCallback(async () => {
    try {
      const response = await fetch(getBaseUrl(`/api/favorites/user/${userContext.userId}`));

      if (response.ok) {
        const favoritesData = await response.json();

        const isRecipeInFavorites = favoritesData.favorites.includes(recipeId);
        setIsFavorite(isRecipeInFavorites);
      } else {
        console.error('Failed to fetch user favorites');
      }
    } catch (error) {
      console.error('Error fetching user favorites:', error);
    }
  }, [userContext.userId, recipeId]);

  useEffect(() => {
    if (userContext.isLoggedIn) {
      fetchUserFavorites();
    }
  }, [userContext.isLoggedIn, fetchUserFavorites]);
  useEffect(() => {
    fetchUserFavorites(); // Fetch user favorites whenever recipeId changes
  }, [recipeId, fetchUserFavorites]);

const toggleFavorite = useCallback(async () => {
  if (userContext.isLoggedIn) {
    try {
      let response;
      if (isFavorite) {
        response = await fetch(getBaseUrl('/api/favorites/remove'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userContext.userId,
            recipeId: recipeId?.toString() ,
          }),
        });
      } else {
        response = await fetch(getBaseUrl('/api/favorites/add'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userContext.userId,
            recipeId: recipeId?.toString(),
          }),
        });
      }
      if (response.ok) {
        console.log(isFavorite ? 'Removed from favorites' : 'Added to favorites');
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    
        if (isFavorite) {
          navigate(-1);
        }
      } else {
        console.error('Failed to toggle favorites');
      }
    } catch (error) {
      console.error('Error toggling favorites:', error);
    }
  } else {
    console.log('User is not logged in');
  }
}, [userContext.isLoggedIn, userContext.userId, recipeId, isFavorite, navigate]);

  const currentRecipe = recipes.find((recipe) => recipe.id === Number(recipeId));
  if (!currentRecipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div className='recipePage'>
      <Header />
      <div className='button-container'>
        <button className='back-button view-recipe-button' onClick={() => navigate(-1)}>Go Back</button>
      </div>
      <div className='recipe-container'>
        <h2>{currentRecipe.title}</h2>
        <img src={currentRecipe.image || fallbackImage} alt={currentRecipe.title} />
        {userContext.isLoggedIn && (
          <button onClick={toggleFavorite} className='custom-button' id="favorite-button">
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        )}
        <section className='boxes'>
          <div className='serverings box'>
            <h3> Servings: </h3>
            <p>{currentRecipe.servings} </p>
          </div>
          <div className='cooking-time box'>
            <h3>Cooking time: </h3>
            <p>{currentRecipe.readyInMinutes} minutes</p>
          </div>
          {currentRecipe.cuisines.length > 0 && (
            <div className="cuisines box">
              <h3>Cuisines:</h3>
              <ul>
                {currentRecipe.cuisines.map((cuisine) => (
                  <li key={cuisine}>{cuisine}</li>
                ))}
              </ul>
            </div>
          )}
          {currentRecipe.diets.length > 0 && (
            <div className="diets box">
              <h3>Diets:</h3>
              <ul>
                {currentRecipe.diets.map((diet) => (
                  <li key={diet}>{diet}</li>
                ))}
              </ul>
            </div>
          )}
      </section>
      <Stopwatch/>
      <section className='recipe-details'>
        <div className='ingridients'>
          <h3>Ingredients</h3>
          { <ul className='ingridients-list'>
            {currentRecipe.extendedIngredients.map((ingredient, index) => (
            <li key={`${ingredient.id}-${index}`}>
            {ingredient.name} {ingredient.measures.metric.amount}
            {ingredient.measures.metric.unitLong && ` ${ingredient.measures.metric.unitLong}`}
          </li>
            ))}
          </ul> }
            </div>
            <div className='instractions'> 
            <h3>Instructions</h3>
            <ol>
            {currentRecipe.analyzedInstructions[0].steps.map((step, index) => (
              <li key={step.number}>
                {index + 1}. {step.step}
              </li>
            ))}
          </ol>
          </div>
      </section>
         </div>
       </div>
  );
}


export default RecipePage;
