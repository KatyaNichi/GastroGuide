import { useContext } from 'react';
import { RecipesContextType } from './RecipesProvider';
import { RecipesContext } from './RecipesProvider';

export function useRecipes(): RecipesContextType {
  const context = useContext(RecipesContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return context;
}
