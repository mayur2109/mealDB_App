import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMeals,searchTerm } from '../../actions';
import { SearchInput,Card,Pagination,Loader,ErrorPage } from '../../utils';

import './Home.scss';
import { Link } from 'react-router-dom';


const Home = () => {

  const {meals,loading,error,searchTerm:search} = useSelector((state) => state.meals);
  const dispatch = useDispatch()

  const fetchMealsHandler = useCallback(() => {
    dispatch(fetchMeals(search));
  },[dispatch,search])

  useEffect(()=>{
    return()=>{
      dispatch(searchTerm(''))
    }
  },[dispatch])

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

  const handleSearchTermChange = (e) => {
    dispatch(searchTerm(e.target.value));
  }

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
  console.log(meals)
  return (
    <div id="home-container" className="home">
      <SearchInput
        placeholder={"Enter meal name"}
        value={search}
        onChange={handleSearchTermChange}
        onClick={fetchMealsHandler}
      />
      <div className="home-grid">
        {meals && meals.length > 0 ? (
          currentMeals.map((meal) => (
            <Link
              to={`/recipe/${meal.idMeal}`}
              key={meal.idMeal}
              className="custom-link"
            >
              <Card
                key={meal.idMeal}
                image={meal.strMealThumb}
                name={meal.strMeal}
              />
            </Link>
          ))
        ) : (
           (searchTerm !=='' && loading)? null :  <h2>No such meal was found</h2>
        )}
      </div>
      {meals && meals.length > mealsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(meals.length / mealsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
