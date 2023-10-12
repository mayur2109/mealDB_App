import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

import { fetchIngredients,filterIngredients } from '../../actions';
import { SearchInput,Pagination,Loader,ErrorPage } from '../../utils';

import './Ingredients.scss';

const IngredientSearchForm = () => {
  const dispatch = useDispatch()

  const{ingredients,loading,error,filteredIngredients,searchTerm:search} = useSelector(state=>state.ingredients)

  const handleSearch = () => {
    dispatch(filterIngredients(search,ingredients))
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
    // return () => {
    //   dispatch(searchTerm(''))
    // }
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const ingredientsPerPage = 20;

  const indexOfLastIngredient = currentPage * ingredientsPerPage;
  const indexOfFirstIngredient = indexOfLastIngredient - ingredientsPerPage;
  const currentIngredients = filteredIngredients.slice(
    indexOfFirstIngredient,
    indexOfLastIngredient
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorPage
        errorMessage={`Error loading ingredients: ${error}`}
        onRetryClick={() => fetchIngredients()}
      />
    );
  }

  return (
    <div className="ingredient-search">
      <h2>Ingredient Search</h2>
      <SearchInput
        placeholder={"Enter ingredient name"}
        value={search}
        onChange={(e) => dispatch(filterIngredients(e.target.value,ingredients))}
        onClick={handleSearch}
      />
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
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default IngredientSearchForm;
