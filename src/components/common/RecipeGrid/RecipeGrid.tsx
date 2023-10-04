import { useEffect } from 'react';
import { useRecipes } from '../../useRecipes';
import Card from '../Card/Card';
import './RecipeGrid.css';

interface RecipeGridProps {
  visibleRecipes: number; 
  setTotalRecipes: (total: number) => void; 
}

function RecipeGrid({visibleRecipes, setTotalRecipes }: RecipeGridProps)  {
  const { recipes } = useRecipes();
  useEffect(() => {
    setTotalRecipes(recipes.length);
  }, [recipes, setTotalRecipes]);
  const visibleFilteredRecipes = recipes.slice(0, visibleRecipes);
  
  return (
    <div className="recipeGridSection">
      <h2>Try these recipes</h2>
      <ul className="recipeGrid">
        {visibleFilteredRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            recipeId={recipe.id}
            image={recipe.image}
            title={recipe.title}
            readyInMinutes={recipe.readyInMinutes} 
          />
        ))}
      </ul>
    </div>
  );
}

export default RecipeGrid;
