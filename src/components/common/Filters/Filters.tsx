import { useState } from 'react';
import './Filters.css';

interface FiltersProps {
  selectedDiets: string[];
  selectedCuisine: string;
  onFilterChange: (diets: string[], cuisine: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedDiets,
  selectedCuisine,
  onFilterChange,
}) => {
  const [diets, setDiets] = useState<string[]>(selectedDiets);
  const [cuisine, setCuisine] = useState<string>(selectedCuisine);

  const handleDietsChange = (diet: string) => {
    let updatedDiets;
    if (diets.includes(diet)) {
      updatedDiets = diets.filter((d) => d !== diet);
    } else {
      updatedDiets = [...diets, diet];
    }
    setDiets(updatedDiets);
    onFilterChange(updatedDiets, cuisine);
  };
  
  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCuisine = e.target.value;
    setCuisine(newCuisine);
    onFilterChange(diets, newCuisine);
  };

  return (
    <div className="filters">
      <div>
        <h4>Diets:</h4>
        <div className='listOfDiets'>
        <label
          onClick={() => handleDietsChange('dairy free')}
          className={diets.includes('dairy free') ? 'active' : ''}
        >
          Dairy Free
        </label>
        <label
          onClick={() => handleDietsChange('gluten free')}
          className={diets.includes('gluten free') ? 'active' : ''}
        >
          Gluten Free
        </label>
        <label
          onClick={() => handleDietsChange('lacto ovo vegetarian')}
          className={diets.includes('lacto ovo vegetarian') ? 'active' : ''}
        >
          Lacto-Ovo-Vegetarian
        </label>
        <label
          onClick={() => handleDietsChange('primal')}
          className={diets.includes('primal') ? 'active' : ''}
        >
          Primal
        </label>
        <label
          onClick={() => handleDietsChange('paleolithic')}
          className={diets.includes('paleolithic') ? 'active' : ''}
        >
          Paleolithic
        </label>
        <label
          onClick={() => handleDietsChange('vegan')}
          className={diets.includes('vegan') ? 'active' : ''}
        >
          Vegan
        </label>
        <label
          onClick={() => handleDietsChange('ketogenic')}
          className={diets.includes('ketogenic') ? 'active' : ''}
        >
          Ketogenic
        </label>
        </div>
      </div>
      <div>
        <h4>Cuisine:</h4>
        <select value={cuisine} onChange={handleCuisineChange}>
          <option value="" >Any</option>
          <option value="Mexican">Mexican</option>
          <option value="Japanese">Japanese</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="European">European</option>
          <option value="Southern">Southern</option>
          <option value="American">American</option>
          <option value="Chinese">Chinese</option>
          <option value="Asian">Asian</option>
          <option value="British">British</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
