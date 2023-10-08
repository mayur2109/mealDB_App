import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { myContext } from '../../context/context';
import './Ingredients.scss';
import Loader from '../../utils/Loader/Loader';

const IngredientSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchIngredients, ingredients, loading, error } = useContext(myContext);
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);
  const [currentPage, setCurrentPage] = useState(1);
  const ingredientsPerPage = 20;

  const filterIngredients = (searchTerm) => {
    if (!searchTerm) {
      return ingredients;
    }
    return ingredients.filter((ingredient) =>
      ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

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

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>Error loading ingredients: {error}</p>;
  }

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
      <div className="ingredient-search-list">
        <ul>
          {currentIngredients.map((ingredient) => (
            <Link
              to={`/recipes/${ingredient.strIngredient}`}
              key={ingredient.idIngredient}
              className="custom-link"
            >
              <li>{ingredient.strIngredient}</li>
            </Link>
          ))}
        </ul>
      </div>
      {filteredIngredients.length > ingredientsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredIngredients.length / ingredientsPerPage)}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      )}
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default IngredientSearchForm;
