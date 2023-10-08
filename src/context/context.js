import React, { createContext, useCallback, useState, useEffect } from 'react';
import axios from 'axios';

export const myContext = createContext();

export const AppContext = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHomeMeals = useCallback((searchTerm) => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => {
        setMeals(res.data.meals);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fetchIngredients = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
      );
      const ingredientData = response.data.meals;
      setIngredients(ingredientData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecipesByIngredient = useCallback(async (ingredient) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const recipeData = response.data.meals;
      setRecipes(recipeData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    axios.get("https://www.themealdb.com/api/json/v1/1/categories.php").then((res)=>{
      console.log(res.data.categories)
      setCategories(res.data.categories)
    })
  },[])


  useEffect(() => {
    fetchIngredients();
  },[fetchIngredients]);

  return (
    <myContext.Provider
      value={{
        fetchHomeMeals,
        meals,
        fetchIngredients,
        ingredients,
        fetchRecipesByIngredient,
        recipes,
        fetchCategories,
        categories,
        loading,
        error,
      }}
    >
      {children}
    </myContext.Provider>
  );
};
