import { useEffect, useMemo } from 'react';
import Card from '../Card/Card';
import { useRecipes } from '../../useRecipes';
import './CategoriesGrid.css';

interface CategoriesGridProps {
  category: string;
  visibleRecipes: number;
  setTotalRecipes: (total: number) => void;
  selectedDiets?: string[];
  selectedCuisine?: string;
}

function CategoriesGrid({
  category,
  visibleRecipes,
  setTotalRecipes,
  selectedDiets = [],
  selectedCuisine = '',
}: CategoriesGridProps) {
  const { recipes: allRecipes, loading } = useRecipes();

  const filteredRecipes = useMemo(() => {
    let filtered = allRecipes;
    //time filter
    if (category === 'Quick') {
      filtered = filtered.filter((recipe) => recipe.readyInMinutes < 30);
    } else if (category === 'Moderate') {
      filtered = filtered.filter(
        (recipe) => recipe.readyInMinutes >= 30 && recipe.readyInMinutes <= 60
      );
    } else if (category === 'Time-Consuming') {
      filtered = filtered.filter((recipe) => recipe.readyInMinutes > 60);
    }
      //diet filter
      if (selectedDiets && selectedDiets.length > 0) {
        filtered = filtered.filter((recipe) =>
          selectedDiets.every((diet) => recipe.diets.includes(diet))
        );
      }

    // cuisine filter
    if (selectedCuisine !== '') {
      filtered = filtered.filter((recipe) =>
        recipe.cuisines.includes(selectedCuisine)
      );
    }
    return filtered;
  }, [category, selectedDiets, selectedCuisine, allRecipes]); 

  useEffect(() => {
    setTotalRecipes(filteredRecipes.length);
  }, [filteredRecipes, setTotalRecipes]);
  const visibleFilteredRecipes = filteredRecipes.slice(0, visibleRecipes);

  return (
    <div className="categories-grid">
      {loading ? (
        <p>Loading...</p>
      ) : visibleFilteredRecipes.length === 0 ? (
        <p>Sorry, no results found.</p>
      ) : (
        <>
          {visibleFilteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              recipeId={recipe.id}
              image={recipe.image}
              title={recipe.title}
              readyInMinutes={recipe.readyInMinutes}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default CategoriesGrid;
