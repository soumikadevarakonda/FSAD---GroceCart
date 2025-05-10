import React, { useState } from 'react';
import '../css/FoodPreferences.css';

const FoodPreferences = () => {
  const [preferences, setPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    halal: false,
    keto: false,
    paleo: false,
  });

  const [saved, setSaved] = useState(false);

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: checked,
    });
    setSaved(false);
  };

  const savePreferences = () => {
    // In a real app, you would save to backend here
    console.log('Saved preferences:', preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="preferences-container">
      <div className="preferences-header">
        <h2 className="section-title">Food Preferences</h2>
        <p className="section-subtitle">Customize your shopping experience based on your dietary needs</p>
      </div>

      <div className="preferences-grid">
        <div className="preference-card">
          <input
            type="checkbox"
            id="vegetarian"
            name="vegetarian"
            checked={preferences.vegetarian}
            onChange={handlePreferenceChange}
          />
          <label htmlFor="vegetarian">
            <div className="preference-content">
              <span className="preference-icon">🌱</span>
              <h3>Vegetarian</h3>
              <p>Plant-based diet excluding meat and fish</p>
            </div>
          </label>
        </div>

        <div className="preference-card">
          <input
            type="checkbox"
            id="vegan"
            name="vegan"
            checked={preferences.vegan}
            onChange={handlePreferenceChange}
          />
          <label htmlFor="vegan">
            <div className="preference-content">
              <span className="preference-icon">🌿</span>
              <h3>Vegan</h3>
              <p>No animal products including dairy and eggs</p>
            </div>
          </label>
        </div>

        <div className="preference-card">
          <input
            type="checkbox"
            id="glutenFree"
            name="glutenFree"
            checked={preferences.glutenFree}
            onChange={handlePreferenceChange}
          />
          <label htmlFor="glutenFree">
            <div className="preference-content">
              <span className="preference-icon">🚫🌾</span>
              <h3>Gluten-Free</h3>
              <p>No wheat, barley, rye or derivatives</p>
            </div>
          </label>
        </div>

        <div className="preference-card">
          <input
            type="checkbox"
            id="dairyFree"
            name="dairyFree"
            checked={preferences.dairyFree}
            onChange={handlePreferenceChange}
          />
          <label htmlFor="dairyFree">
            <div className="preference-content">
              <span className="preference-icon">🚫🥛</span>
              <h3>Dairy-Free</h3>
              <p>No milk, cheese, butter or dairy products</p>
            </div>
          </label>
        </div>

        <div className="preference-card">
          <input
            type="checkbox"
            id="nutFree"
            name="nutFree"
            checked={preferences.nutFree}
            onChange={handlePreferenceChange}
          />
          <label htmlFor="nutFree">
            <div className="preference-content">
              <span className="preference-icon">🚫🥜</span>
              <h3>Nut-Free</h3>
              <p>No peanuts or tree nuts</p>
            </div>
          </label>
        </div>

        <div className="preference-card">
          <input
            type="checkbox"
            id="halal"
            name="halal"
            checked={preferences.halal}
            onChange={handlePreferenceChange}
          />
          <label htmlFor="halal">
            <div className="preference-content">
              <span className="preference-icon">☪️</span>
              <h3>Halal</h3>
              <p>Food prepared according to Islamic law</p>
            </div>
          </label>
        </div>

        <div className="preference-card">
          <input
            type="checkbox"
            id="keto"
            name="keto"
            checked={preferences.keto}
            onChange={handlePreferenceChange}
          />
          <label htmlFor="keto">
            <div className="preference-content">
              <span className="preference-icon">🥑</span>
              <h3>Keto</h3>
              <p>High-fat, low-carb diet</p>
            </div>
          </label>
        </div>

        <div className="preference-card">
          <input
            type="checkbox"
            id="paleo"
            name="paleo"
            checked={preferences.paleo}
            onChange={handlePreferenceChange}
          />
          <label htmlFor="paleo">
            <div className="preference-content">
              <span className="preference-icon">🍖</span>
              <h3>Paleo</h3>
              <p>Whole foods similar to what hunter-gatherers ate</p>
            </div>
          </label>
        </div>
      </div>

      <div className="preferences-actions">
        <button 
          onClick={savePreferences}
          className="save-button"
          disabled={saved}
        >
          {saved ? (
            <>
              <svg className="check-icon" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
              Preferences Saved!
            </>
          ) : (
            'Save Preferences'
          )}
        </button>
        {saved && (
          <div className="save-message">
            Your preferences have been saved. We'll filter products accordingly.
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodPreferences;