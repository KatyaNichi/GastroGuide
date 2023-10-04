import { useState, useEffect } from 'react';
import './SideNavigation.css';

interface SideNavigationProps {
    category: string;
    onSelectCategory: (category: string) => void;
  }

function SideNavigation({ category, onSelectCategory }: SideNavigationProps)  {
  const [activeCategory, setActiveCategory] = useState<string | null>(category);
   const handleCategorySelect = (selectedCategory: string) => {
    if (selectedCategory === activeCategory) {
      setActiveCategory(null);
      onSelectCategory('');
    } else {
      setActiveCategory(selectedCategory);
      onSelectCategory(selectedCategory);
    }
  };

  useEffect(() => {
    setActiveCategory(category);
  }, [category]);

  return (
    <ul className="side-nav">
      <li
          onClick={() => handleCategorySelect('Quick')}
          className={category === 'Quick' ? 'active' : ''}
        >
          Quick
        </li>
        <li
          onClick={() => handleCategorySelect('Moderate')}
          className={category === 'Moderate' ? 'active' : ''}
        >
          Moderate
        </li>
        <li
          onClick={() => handleCategorySelect('Time-Consuming')}
          className={category === 'Time-Consuming' ? 'active' : ''}
        >
          Time-Consuming
        </li>
  </ul>
  );
}

export default SideNavigation;
