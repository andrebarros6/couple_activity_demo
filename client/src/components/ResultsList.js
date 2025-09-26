import React from 'react';
import ActivityCard from './ActivityCard';

const ResultsList = ({ results, isLoading, error, searchCriteria }) => {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: 'white'
  };

  const errorStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    color: '#e53e3e',
    border: '2px solid #fed7d7'
  };

  const noResultsStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    color: '#2d3748'
  };

  const loadingStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center',
    color: '#667eea'
  };

  // Loading state
  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            animation: 'pulse 2s infinite'
          }}>
            🔍
          </div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>
            Searching for perfect activities...
          </h3>
          <p style={{ color: '#718096' }}>
            Finding the best couple activities in {searchCriteria?.city}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={containerStyle}>
        <div style={errorStyle}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😞</div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
            Oops! Something went wrong
          </h3>
          <p style={{ marginBottom: '1rem' }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#e53e3e',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No results state
  if (results && results.length === 0) {
    return (
      <div style={containerStyle}>
        <div style={noResultsStyle}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤷‍♀️</div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
            No activities found
          </h3>
          <p style={{ marginBottom: '1rem', color: '#718096' }}>
            We couldn't find any activities matching your criteria in {searchCriteria?.city}.
            Try adjusting your preferences or distance range.
          </p>
          <div style={{
            background: '#f7fafc',
            padding: '1rem',
            borderRadius: '8px',
            marginTop: '1rem',
            textAlign: 'left'
          }}>
            <strong>Your search criteria:</strong>
            <ul style={{ marginTop: '0.5rem', marginLeft: '1rem' }}>
              <li>City: {searchCriteria?.city}</li>
              <li>Time: {searchCriteria?.availability}</li>
              <li>Distance: {searchCriteria?.distance} km</li>
              {searchCriteria?.preferences?.length > 0 && (
                <li>Preferences: {searchCriteria.preferences.join(', ')}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Results found
  if (results && results.length > 0) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Perfect Activities for You! 🎉
          </h2>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
          }}>
            {results.length} romantic activities in {searchCriteria?.city}
          </p>
        </div>

        {/* Warning message for fallback mode */}
        {searchCriteria?.warning && (
          <div style={{
            background: 'rgba(255, 165, 0, 0.9)',
            color: 'white',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            textAlign: 'center',
            border: '2px solid rgba(255, 165, 0, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: '500' }}>
              {searchCriteria.warning}
            </p>
          </div>
        )}

        <div>
          {results.map((activity, index) => (
            <ActivityCard
              key={activity.id || index}
              activity={activity}
              index={index}
            />
          ))}
        </div>

        {/* Search again prompt */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          marginTop: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
            Want to try different criteria? Scroll up to search again! 👆
          </p>
        </div>
      </div>
    );
  }

  // Default state (no search yet)
  return (
    <div style={containerStyle}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '3rem',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💕</div>
        <h2 style={{
          color: '#2d3748',
          marginBottom: '1rem',
          fontSize: '2rem'
        }}>
          Ready to Find Amazing Activities?
        </h2>
        <p style={{
          color: '#718096',
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}>
          Fill out the form above to discover romantic activities perfect for you and your partner.
          We'll find 5 amazing experiences based on your preferences!
        </p>
      </div>
    </div>
  );
};

export default ResultsList;