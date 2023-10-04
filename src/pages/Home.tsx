import { useState } from "react";
import Header from "../components/common/Header/Header";
import Banner from "../components/common/Banner/Banner";
import RecipeGrid from "../components/common/RecipeGrid/RecipeGrid";

function Home() {
  const [visibleRecipes, setVisibleRecipes] = useState<number>(12);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const loadMore = () => {
    setVisibleRecipes((prevVisibleRecipes) => prevVisibleRecipes + 12);
  };
  
    return ( 
    <div className='container'>
      <Header />
      <Banner />
      <RecipeGrid visibleRecipes={visibleRecipes}
      setTotalRecipes={setTotalRecipes}
       />
        <div className="btnWrapper ">
        {visibleRecipes < totalRecipes && (
          <button onClick={loadMore} className="custom-button">
            Load More
          </button>
        )}
      </div>
    </div>
    
    );
  }
  
  export default Home;