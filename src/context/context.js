import React,{createContext,useCallback,useState} from "react";
import axios from "axios";

export const myContext = createContext();

export const AppContext=({children})=>{
    const [meals,setMeals]=useState([]);
    const [ingredients,setIngredients]=useState([]);
    const [categories,setCategories]=useState([]);

    const fetchHomeMeals=useCallback((searchTerm)=>{
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(res=>{
            console.log(res.data.meals);
            setMeals(res.data.meals);
        })
    },[])

    const fetchIngredients = async () => {
        try {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
          );
          const ingredientData = response.data.meals;
          setIngredients(ingredientData);
        } catch (error) {
          console.error('Error fetching ingredients:', error);
        }
      };
    return(
        <myContext.Provider value={{fetchHomeMeals,meals,fetchIngredients,ingredients}}>
            {children}
        </myContext.Provider>
    )
}
