const express = require('express');
const router = express.Router();
const ClaudeService = require('../services/claudeService');
const { searchActivities: searchDummyActivities } = require('../data/activities');

// Initialize Claude service
const claudeService = new ClaudeService();

// POST /api/activities/search - Search for activities with Claude API fallback
router.post('/search', async (req, res) => {
  try {
    const { city, availability, additionalPreferences } = req.body;

    // Validate required fields
    if (!city) {
      return res.status(400).json({
        error: 'City is required',
        message: 'Please provide a city to search for activities'
      });
    }

    if (!availability) {
      return res.status(400).json({
        error: 'Availability is required',
        message: 'Please provide when you are available'
      });
    }

    // Create search criteria object
    const searchCriteria = {
      city: city.trim(),
      availability: availability.trim(),
      additionalPreferences: additionalPreferences || null
    };

    // Log search for debugging
    console.log('🔍 Activity search criteria:', searchCriteria);

    let recommendations;
    let source = 'claude-api';
    let warningMessage = null;

    try {
      // First, try to get AI-generated recommendations using Claude
      console.log('🤖 Attempting Claude API call...');
      recommendations = await claudeService.getActivityRecommendations(searchCriteria);
      console.log('✅ Claude API successful');
    } catch (claudeError) {
      console.log('⚠️  Claude API failed, falling back to dummy data:', claudeError.message);

      // Fall back to dummy data - add default values for the old system
      const fallbackCriteria = {
        ...searchCriteria,
        distance: 50, // Default distance for fallback
        preferences: [] // Default empty preferences for fallback
      };
      recommendations = searchDummyActivities(fallbackCriteria);
      source = 'dummy-data';

      // Set appropriate warning message based on error type
      if (claudeError.message.includes('credit balance')) {
        warningMessage = 'AI recommendations temporarily unavailable. Showing sample activities instead.';
      } else if (claudeError.message.includes('timeout')) {
        warningMessage = 'AI service is slow. Showing sample activities instead.';
      } else if (claudeError.message.includes('Too many requests')) {
        warningMessage = 'AI service is busy. Showing sample activities instead.';
      } else {
        warningMessage = 'AI recommendations unavailable. Showing sample activities instead.';
      }
    }

    // Return results in the expected format
    res.json({
      success: true,
      criteria: searchCriteria,
      results: recommendations,
      count: recommendations.length,
      source: source,
      warning: warningMessage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Critical error in search:', error);

    // Return appropriate error response for critical failures
    res.status(500).json({
      error: 'Search failed',
      message: 'Unable to search for activities. Please try again.',
      source: 'error'
    });
  }
});

// GET /api/activities/cities - Get list of available cities
router.get('/cities', (req, res) => {
  try {
    const cities = ['Paris', 'New York', 'Barcelona', 'Tokyo', 'London'];
    res.json({
      success: true,
      cities: cities
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Could not fetch available cities'
    });
  }
});

// GET /api/activities/categories - Get list of activity categories
router.get('/categories', (req, res) => {
  try {
    const categories = [
      'dining',
      'outdoor',
      'entertainment',
      'cultural',
      'nightlife',
      'shopping',
      'adventure',
      'relaxation'
    ];
    res.json({
      success: true,
      categories: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Could not fetch activity categories'
    });
  }
});

// GET /api/activities/test-claude - Test Claude API connection
router.get('/test-claude', async (req, res) => {
  try {
    console.log('🧪 Testing Claude API connection...');
    const result = await claudeService.testConnection();
    res.json(result);
  } catch (error) {
    console.error('❌ Claude test failed:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;