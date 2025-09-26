import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import { searchActivities, checkHealth } from './services/api';

function App() {
  // State management
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking');

  // Check server health on app load
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        await checkHealth();
        setServerStatus('connected');
      } catch (error) {
        console.error('Server health check failed:', error);
        setServerStatus('disconnected');
      }
    };

    checkServerHealth();
  }, []);

  // Handle search form submission
  const handleSearch = async (criteria) => {
    setIsLoading(true);
    setError(null);
    setSearchCriteria(criteria);

    try {
      console.log('Searching with criteria:', criteria);
      const response = await searchActivities(criteria);

      if (response.success && response.results) {
        setSearchResults(response.results);

        // Scroll to results
        setTimeout(() => {
          const resultsElement = document.getElementById('results-section');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        throw new Error(response.message || 'Invalid response format');
      }
    } catch (error) {
      console.error('Search failed:', error);
      setError(error.message || 'Failed to search for activities. Please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const appStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
  };

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    color: 'white',
    marginBottom: '3rem'
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    lineHeight: '1.1'
  };

  const subtitleStyle = {
    fontSize: '1.3rem',
    opacity: 0.9,
    fontWeight: '400',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  };

  const statusIndicatorStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    zIndex: 1000,
    background: serverStatus === 'connected' ? '#48bb78' :
                serverStatus === 'disconnected' ? '#f56565' : '#ed8936',
    color: 'white',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'connected': return '✅ Connected';
      case 'disconnected': return '❌ Server Offline';
      default: return '⏳ Connecting...';
    }
  };

  return (
    <div style={appStyle}>
      {/* Server Status Indicator */}
      <div style={statusIndicatorStyle}>
        {getStatusText()}
      </div>

      <div style={containerStyle}>
        {/* Header */}
        <header style={headerStyle}>
          <h1 style={titleStyle}>
            💕 Couple Activities Finder
          </h1>
          <p style={subtitleStyle}>
            Discover romantic experiences perfect for you and your partner
          </p>
        </header>

        {/* Search Form */}
        <SearchForm
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* Results Section */}
        <section id="results-section">
          <ResultsList
            results={searchResults}
            isLoading={isLoading}
            error={error}
            searchCriteria={searchCriteria}
          />
        </section>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: '2rem',
          color: 'rgba(255, 255, 255, 0.8)',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ marginBottom: '1rem' }}>
            Built with ❤️ for couples who love exploring together
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            {serverStatus === 'connected'
              ? `✨ Ready to find amazing activities`
              : `⚠️ Server connection issue - please refresh the page`
            }
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;