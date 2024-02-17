import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import Login from './Login';
import Home from '../Home';
import Product from './ProductEntry'; 
import ProductList from './productList'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/product' element={<Product />} /> 
        <Route path='/productList' element={<ProductList/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
