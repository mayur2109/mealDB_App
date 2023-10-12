import React, { useEffect,/*useContext*/ } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import { fetchCategories, } from '../../actions/index';
import { Card,Loader,ErrorPage } from '../../utils';

import './Categories.scss';

const Categories = () => {
  const {categories,loading,error} = useSelector(state=>state.categories)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
          // <div className="categories-item" key={category.idCategory}>
          //   <div className="categories-item-image">
          //     <img src={category.strCategoryThumb} alt={category.strCategory} />
          //   </div>
          //   <div className="categories-item-name">{category.strCategory}</div>
          // </div>
          <Card
            key={category.idCategory}
            image={category.strCategoryThumb}
            name={category.strCategory}
          />
        );
      })}
    </div>
  );
};

export default Categories;
