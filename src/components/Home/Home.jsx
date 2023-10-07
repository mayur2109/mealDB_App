import React, { useState, useCallback, useContext, } from 'react';
import { myContext } from '../../context/context';

import './Home.scss';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState(false);
  const { fetchHomeMeals, meals } = useContext(myContext);

  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 20;

  const fetchMealsHandler = useCallback(() => {
    fetchHomeMeals(searchTerm);
    setCurrentPage(1);
    setSearched(true);
  }, [searchTerm, fetchHomeMeals]);

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals ? meals.slice(indexOfFirstMeal, indexOfLastMeal) : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          searched && <h2>No such meal was found</h2>
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
