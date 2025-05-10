import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import NutritionSearch from './components/NutritionSearch.jsx'
import MealSearch from './components/MealSearch.jsx'
import ProjectHomePageWrapper from './components/ProjectHomePageWrapper.jsx'
import Offers from './components/offers.jsx'
import FoodPreferences from './components/FoodPreferences.jsx'
import Categories from './components/Categories.jsx'
import Cart from './components/Cart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/'element={<ProjectHomePageWrapper/>}/>
      <Route path="/nutrition" element={<NutritionSearch/>} />
      <Route path="/mealsearch" element={<MealSearch />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/foodpreferences" element={<FoodPreferences />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </BrowserRouter>

  </StrictMode>
)