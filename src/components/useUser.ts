import { useContext } from 'react';
import { UserContextType, UserContext } from './UserContext';


export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return context;
}