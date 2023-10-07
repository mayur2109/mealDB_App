import React from 'react';

import{BrowserRouter,Route,Routes} from 'react-router-dom'

import{Navbar, Home, Categories, Footer,Ingredients} from './components'

import './App.scss';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/ingredients" element={<Ingredients/>}/>
          <Route path="/categories" element={<Categories/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
