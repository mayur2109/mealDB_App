import React from 'react';

import{BrowserRouter,Route,Routes} from 'react-router-dom'

import{Navbar, Home, Categories, Footer,Ingredients,RecipeList,RecipeDetail} from './components'
import NotFound from './utils/NotFound/NotFound';

import './App.scss';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/ingredients" element={<Ingredients/>}/>
          <Route path="/recipes/:ingredient" element={<RecipeList />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
          <Route path="/categories" element={<Categories/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
