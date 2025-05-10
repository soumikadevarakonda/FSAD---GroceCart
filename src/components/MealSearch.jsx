import React, { useState } from 'react';
import axios from 'axios';
import '../css/MealSearch.css';

const MealSearch = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchMeals = async () => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      
      if (response.data.meals) {
        setMeals(response.data.meals);
      } else {
        setError('No meals found. Try a different search.');
        setMeals([]);
      }
    } catch (err) {
      setError('Error fetching data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchMeals();
    }
  };

  return (
    <div className="meal-search-container">
      <div className="meal-search-header">
        <h2 className="section-title">Discover Delicious Meals</h2>
        <p className="section-subtitle">Search from thousands of recipes</p>
      </div>

      <div className="search-controls">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What are you craving today?"
            className="search-input"
          />
          <button 
            onClick={fetchMeals} 
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <svg className="search-icon" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <svg className="error-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          {error}
        </div>
      )}

      {meals.length > 0 ? (
        <div className="meal-results-grid">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <div className="meal-image-container">
                <img 
                  src={meal.strMealThumb} 
                  alt={meal.strMeal} 
                  className="meal-image"
                  loading="lazy"
                />
                <div className="meal-category">{meal.strCategory}</div>
              </div>
              <div className="meal-info">
                <h3 className="meal-title">{meal.strMeal}</h3>
                <p className="meal-area">{meal.strArea} Cuisine</p>
                <a 
                  href={meal.strSource} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="recipe-link"
                >
                  View Recipe
                  <svg className="link-icon" viewBox="0 0 24 24">
                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !error && !isLoading && (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-5-9h10v2H7z"/>
            </svg>
            <p>Search for meals to discover delicious recipes</p>
          </div>
        )
      )}
    </div>
  );
};

export default MealSearch;