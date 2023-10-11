import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMeals } from '../../actions';
import Loader from '../../utils/Loader/Loader';
import ErrorPage from '../../utils/Error/ErrorPage';

import './Home.scss';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {meals,loading,error} = useSelector((state) => state.meals);
  const dispatch = useDispatch()

  const fetchMealsHandler = useCallback(() => {
    dispatch(fetchMeals(searchTerm));
  },[dispatch,searchTerm])

  //PageChange related
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 20;

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals ? meals.slice(indexOfFirstMeal, indexOfLastMeal) : [];

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
        errorMessage={`Error loading meals: ${error}`}
        onRetryClick={() => fetchMealsHandler()}
      />
    );
  }

  return (
    <div id="home-container" className="home">
      <div className="home-search">
        <input
          type="text"
          placeholder="Type a Meal Name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button onClick={fetchMealsHandler}>Search</button>
      </div>
      <div className="home-grid">
        {currentMeals.length > 0 ? (
          currentMeals.map((meal) => (
            <div className="home-meal" key={meal.idMeal}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h4>{meal.strMeal}</h4>
            </div>
          ))
        ) : (
           (searchTerm !=='' && loading)? null :  <h2>No such meal was found</h2>
        )}
      </div>
      {meals && meals.length > mealsPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(meals.length / mealsPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
