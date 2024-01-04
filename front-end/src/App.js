import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './components/products/product'; 
import Home from './components/Home/home';
import Login from './components/Login/login'
import Signup from './components/Signup/signup'
import ViewProduct from './components/view-product/view-product';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path='/view-product' element={<ViewProduct/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};
export default App;
