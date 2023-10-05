import React, { createContext, useEffect, useState } from 'react';
import { Recipe } from '../../types/recipe';

const API_URL = 'https://orca-app-lg9qz.ondigitalocean.app/recipes';
export interface RecipesContextType {
  recipes: Recipe[];
  loading: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  export const RecipesContext = createContext<RecipesContextType | undefined>(undefined);


// Create a provider component
export function RecipesProvider({ children }: { children: React.ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        const data: { recipes: Recipe[] } = await response.json(); 

        const shuffledRecipes = shuffleArray(data.recipes);

        setRecipes(shuffledRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <RecipesContext.Provider value={{ recipes, loading }}>
      {children}
    </RecipesContext.Provider>
  );
}


  
