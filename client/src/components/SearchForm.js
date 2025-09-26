import React, { useState } from 'react';

const SearchForm = ({ onSearch, isLoading }) => {
  // Form state - simplified to just text inputs
  const [formData, setFormData] = useState({
    city: '',
    availability: '',
    additionalPreferences: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.city.trim()) {
      alert('Please enter a city');
      return;
    }
    if (!formData.availability.trim()) {
      alert('Please enter when you\'re available');
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

      {/* City Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
          📍 City
        </label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="Enter a city (e.g., Paris, New York, Barcelona...)"
          style={inputStyle}
          required
        />
      </div>

      {/* Availability Input */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
          ⏰ When are you available?
        </label>
        <input
          type="text"
          name="availability"
          value={formData.availability}
          onChange={handleInputChange}
          placeholder="Enter when you're free (e.g., Saturday evening, weekday afternoon, this weekend...)"
          style={inputStyle}
          required
        />
      </div>

      {/* Additional Preferences */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2d3748' }}>
          💭 What are you looking for? (Optional)
        </label>
        <textarea
          name="additionalPreferences"
          value={formData.additionalPreferences}
          onChange={handleInputChange}
          placeholder="Tell us what you enjoy... (e.g., romantic dinner, outdoor activities, cultural experiences, live music, wine tasting...)"
          style={{
            ...inputStyle,
            height: '100px',
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