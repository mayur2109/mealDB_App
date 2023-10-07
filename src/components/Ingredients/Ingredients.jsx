import React, { useState, useEffect, useContext } from 'react';

import { myContext } from '../../context/context';
import './Ingredients.scss';

const IngredientSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchIngredients, ingredients } = useContext(myContext);

  const filterIngredients = (searchTerm) => {
    if (!searchTerm) {
      return ingredients;
    }
    return ingredients.filter((ingredient) =>
      ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);
  const ingredientsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    const filtered = filterIngredients(searchTerm);
    setFilteredIngredients(filtered);
    setCurrentPage(1);
  };

  const indexOfLastIngredient = currentPage * ingredientsPerPage;
  const indexOfFirstIngredient = indexOfLastIngredient - ingredientsPerPage;
  const currentIngredients = filteredIngredients.slice(
    indexOfFirstIngredient,
    indexOfLastIngredient
  );

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return (
    <div className="ingredient-search">
      <h2>Ingredient Search</h2>
      <div className="ingredient-search-search">
        <input
          type="text"
          placeholder="Enter ingredient name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {!ingredients.length ? (
        <p>Loading ingredients...</p>
      ) : (
        <div className="ingredient-search-list">
          <ul>
            {currentIngredients.map((ingredient) => (
              <li key={ingredient.idIngredient}>
                {ingredient.strIngredient}
              </li>
            ))}
          </ul>
          {filteredIngredients.length > ingredientsPerPage && (
            <div className="pagination">
              {Array.from({
                length: Math.ceil(
                  filteredIngredients.length / ingredientsPerPage
                ),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IngredientSearchForm;
