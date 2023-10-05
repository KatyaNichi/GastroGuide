import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';

export type UserContextType = {
  isLoggedIn: boolean;
  userId: string | null;
  toggleLoginStatus: () => void;
  logout: () => void;
  favorites: string[];
  setFavorites: (favorites: string[]) => void;
  setUserId: (userId: string | null) => void;
  login: () => void;
  setTotalRecipes: (total: number) => void;
};
export const UserContext = createContext<UserContextType>({
  isLoggedIn: false,
  userId: null,
  toggleLoginStatus: () => {},
  logout: () => {},
  favorites: [],
  setFavorites: () => {},
  setUserId: () => {},
  login: () => {},
  setTotalRecipes: () => {},
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);

  const login = () => {
    setIsLoggedIn(true);
  };
  console.log(totalRecipes)

  //toggle login status
  const toggleLoginStatus = (): void => {
    setIsLoggedIn(!isLoggedIn);
    console.log(isLoggedIn);
  };

  const logout = (): void => {
    setIsLoggedIn(false);
    setUserId(null);
    setFavorites([]);
    localStorage.removeItem('userId');
  };

  const fetchUserFavorites = useCallback(async () => {
    if (isLoggedIn && userId) {
      try {
        const response = await fetch(`/api/favorites/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`,
          },
        });
        if (response.ok) {
          const favoritesData = await response.json();
          setFavorites(favoritesData.favorites);
        } else {
          console.error('Failed to fetch user favorites');
        }
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    }
  }, [isLoggedIn, userId]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
      fetchUserFavorites();
    }
    setIsLoading(false); 
  }, [fetchUserFavorites]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserFavorites();
    }
  }, [isLoggedIn, fetchUserFavorites]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        logout,
        userId,
        toggleLoginStatus,
        favorites,
        setUserId,
        setFavorites,
        login,
        setTotalRecipes, 
      }}
    >
      {isLoading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};
