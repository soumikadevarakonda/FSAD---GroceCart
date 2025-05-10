import React, { useState } from 'react';
import '../css/Nutrition.css';

const NutritionSearch = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNutrition = async () => {
    if (!query.trim()) {
      setError('Please enter a food item to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': import.meta.env.VITE_NUTRITIONIX_APP_ID,
          'x-app-key': import.meta.env.VITE_NUTRITIONIX_API_KEY,
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (data.foods && data.foods.length > 0) {
        setResult(data);
      } else {
        setError('No nutrition data found. Try a different food item.');
      }
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      setError('Failed to fetch nutrition data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchNutrition();
    }
  };

  return (
    <div className="nutrition-container">
      <div className="nutrition-header">
        <h2 className="section-title">Nutrition Calculator</h2>
        <p className="section-subtitle">Analyze the nutritional content of your meals</p>
      </div>

      <div className="search-controls">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g. 2 eggs and toast with orange juice"
            className="nutrition-input"
          />
          <button 
            onClick={fetchNutrition} 
            className="nutrition-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <svg className="calculate-icon" viewBox="0 0 24 24">
                  <path d="M9 7h6v2h-2v8h-2V9H9V7zm-4 4h2v4h2v-4h2V9H5v2zm14-2h-2V9h-2v6h2v-2h2v2h2v-2h-2v-2zm0 0V9h2v2h-2z"/>
                </svg>
                Analyze
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

      {result ? (
        <div className="nutrition-results">
          <h3 className="results-title">Nutritional Information</h3>
          <div className="food-cards">
            {result.foods.map((food, idx) => (
              <div key={idx} className="food-card">
                <div className="food-header">
                  <h4 className="food-name">{food.food_name}</h4>
                  <span className="serving-size">{food.serving_qty} {food.serving_unit}</span>
                </div>
                
                <div className="nutrition-grid">
                  <div className="nutrition-macro calories">
                    <span className="macro-value">{Math.round(food.nf_calories)}</span>
                    <span className="macro-label">Calories</span>
                  </div>
                  
                  <div className="nutrition-macro protein">
                    <span className="macro-value">{Math.round(food.nf_protein)}g</span>
                    <span className="macro-label">Protein</span>
                  </div>
                  
                  <div className="nutrition-macro carbs">
                    <span className="macro-value">{Math.round(food.nf_total_carbohydrate)}g</span>
                    <span className="macro-label">Carbs</span>
                  </div>
                  
                  <div className="nutrition-macro fat">
                    <span className="macro-value">{Math.round(food.nf_total_fat)}g</span>
                    <span className="macro-label">Fat</span>
                  </div>
                </div>
                
                <div className="additional-info">
                  <div className="info-item">
                    <span className="info-label">Fiber</span>
                    <span className="info-value">{Math.round(food.nf_dietary_fiber || 0)}g</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Sugar</span>
                    <span className="info-value">{Math.round(food.nf_sugars || 0)}g</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Sodium</span>
                    <span className="info-value">{Math.round(food.nf_sodium || 0)}mg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !error && !isLoading && (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24">
              <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 9h-2V7h2v5zm0 2h-2v2h2v-2z"/>
            </svg>
            <p>Enter a food item to see its nutritional breakdown</p>
          </div>
        )
      )}
    </div>
  );
};

export default NutritionSearch;