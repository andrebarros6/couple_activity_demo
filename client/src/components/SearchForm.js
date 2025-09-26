import React, { useState, useEffect } from 'react';
import { getCategories, getCities } from '../services/api';

const SearchForm = ({ onSearch, isLoading }) => {
  // Form state
  const [formData, setFormData] = useState({
    city: '',
    availability: 'all day',
    distance: 25,
    preferences: [],
    additionalPreferences: ''
  });

  // Options from API
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Load cities and categories on component mount
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [citiesResponse, categoriesResponse] = await Promise.all([
          getCities(),
          getCategories()
        ]);
        setCities(citiesResponse.cities || []);
        setCategories(categoriesResponse.categories || []);
      } catch (error) {
        console.error('Failed to load form options:', error);
      } finally {
        setLoadingOptions(false);
      }
    };

    loadOptions();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle preference checkbox changes
  const handlePreferenceChange = (category) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(category)
        ? prev.preferences.filter(p => p !== category)
        : [...prev.preferences, category]
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.city.trim()) {
      alert('Please select a city');
      return;
    }
    onSearch(formData);
  };

  const formStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    background: 'white'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '18px',
    fontWeight: '600',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    opacity: isLoading ? 0.7 : 1,
    width: '100%'
  };

  if (loadingOptions) {
    return (
      <div style={formStyle}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '18px', color: '#667eea' }}>Loading form options...</div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{
        color: '#2d3748',
        marginBottom: '1.5rem',
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '700'
      }}>
        Find Your Perfect Date 💕
      </h2>

      {/* City Selection */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
          📍 City
        </label>
        <select
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          style={inputStyle}
          required
        >
          <option value="">Select a city...</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
          ⏰ When are you free?
        </label>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleInputChange}
          style={inputStyle}
        >
          <option value="all day">Anytime</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </div>

      {/* Distance */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
          🚗 Maximum distance: {formData.distance} km
        </label>
        <input
          type="range"
          name="distance"
          min="1"
          max="50"
          value={formData.distance}
          onChange={handleInputChange}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '5px',
            background: '#e2e8f0',
            outline: 'none'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#718096', marginTop: '4px' }}>
          <span>1 km</span>
          <span>50 km</span>
        </div>
      </div>

      {/* Preferences */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#2d3748' }}>
          ❤️ What kind of activities do you enjoy?
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          {categories.map(category => (
            <label
              key={category}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                background: formData.preferences.includes(category) ? '#667eea' : 'white',
                color: formData.preferences.includes(category) ? 'white' : '#2d3748',
                borderRadius: '8px',
                border: '2px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <input
                type="checkbox"
                checked={formData.preferences.includes(category)}
                onChange={() => handlePreferenceChange(category)}
                style={{ marginRight: '8px' }}
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Additional Preferences */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
          💭 Anything else? (Optional)
        </label>
        <textarea
          name="additionalPreferences"
          value={formData.additionalPreferences}
          onChange={handleInputChange}
          placeholder="Tell us more about what you're looking for..."
          style={{
            ...inputStyle,
            height: '80px',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        style={buttonStyle}
        onMouseOver={(e) => {
          if (!isLoading) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 24px rgba(102, 126, 234, 0.3)';
          }
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        {isLoading ? '🔍 Searching...' : '🔍 Find Activities'}
      </button>
    </form>
  );
};

export default SearchForm;