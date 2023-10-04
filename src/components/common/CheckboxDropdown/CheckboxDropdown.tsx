import { useState } from 'react';
import './CheckboxDropdown.css';

interface CheckboxDropdownProps {
    options: string[];
    selectedOptions: string[];
    onOptionChange: (options: string[]) => void;
  }

  const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({
    options,
    selectedOptions,
    onOptionChange,
  }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];
    onOptionChange(updatedOptions);
  };

  return (
    <div className="checkbox-dropdown">
      <div className={`dropdown-input ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        <input
          type="text"
          value="Choose here"
          readOnly 
        />
      </div>
      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
