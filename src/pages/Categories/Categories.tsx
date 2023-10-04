import { useState } from "react";
import Header from "../../components/common/Header/Header";
import SideNavigation from "../../components/common/Sidenavigation/SideNavigation";
import CategoriesGrid from "../../components/common/CategoriesGrid/CategoriesGrid";
import Filters from "../../components/common/Filters/Filters";
import './Categories.css';

function Categories() {
  const [category, onSelectCategory] = useState('timeConsuming');
  const [visibleRecipes, setVisibleRecipes] = useState<number>(12);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]); 
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');

  const handleCategorySelect = (selectedCategory: string) => {
    onSelectCategory(selectedCategory);
  };
  
  const loadMore = () => {
    setVisibleRecipes((prevVisibleRecipes) => prevVisibleRecipes + 12);
  };

  const handleFiltersChange = (diets: string[], cuisine: string) => {
    setSelectedDiets(diets);
    setSelectedCuisine(cuisine);
  };

  return (
    <div className='container'>
      <Header />
      <Filters
        selectedDiets={selectedDiets}
        selectedCuisine={selectedCuisine}
        onFilterChange={handleFiltersChange}
      />
      <div className="main-categories">
        <SideNavigation category={category} onSelectCategory={handleCategorySelect}/>
        <CategoriesGrid
          category={category} 
          visibleRecipes={visibleRecipes}
          setTotalRecipes={setTotalRecipes}
          selectedDiets={selectedDiets} 
          selectedCuisine={selectedCuisine} 
        />
      </div>
      <div className="btnWrapper">
        {visibleRecipes < totalRecipes && ( 
          <button onClick={loadMore} className="custom-button">Load More</button>
        )}
      </div>
    </div>
  );
}

export default Categories;
