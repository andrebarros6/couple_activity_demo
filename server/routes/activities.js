const express = require('express');
const router = express.Router();
const { searchActivities } = require('../data/activities');

// POST /api/activities/search - Search for activities based on criteria
router.post('/search', (req, res) => {
  try {
    const { city, availability, distance, preferences, additionalPreferences } = req.body;

    // Validate required fields
    if (!city) {
      return res.status(400).json({
        error: 'City is required',
        message: 'Please provide a city to search for activities'
      });
    }

    // Create search criteria object
    const searchCriteria = {
      city: city.trim(),
      availability: availability || 'all day',
      distance: distance || 50, // Default to 50km if not specified
      preferences: preferences || []
    };

    // Log search for debugging (remove in production)
    console.log('Activity search criteria:', searchCriteria);

    // Search for activities
    const results = searchActivities(searchCriteria);

    // Return results
    res.json({
      success: true,
      criteria: searchCriteria,
      results: results,
      count: results.length,
      additionalPreferences: additionalPreferences || null
    });

  } catch (error) {
    console.error('Error searching activities:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong while searching for activities'
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

module.exports = router;