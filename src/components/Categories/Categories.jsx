import React, { useEffect, useContext } from 'react';
import './Categories.scss';
import { myContext } from '../../context/context';
import Loader from "../../utils/Loader/Loader"
import ErrorPage from '../../utils/Error/ErrorPage';

const Categories = () => {
  const { fetchCategories, categories, loading, error } = useContext(myContext);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
        errorMessage={`Error loading categories: ${error}`}
        onRetryClick={() => fetchCategories()}
      />
    );
  }

  return (
    <div className="categories">
      {categories.map((category) => {
        return (
          <div className="categories-item" key={category.idCategory}>
            <div className="categories-item-image">
              <img src={category.strCategoryThumb} alt={category.strCategory} />
            </div>
            <div className="categories-item-name">{category.strCategory}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Categories;
