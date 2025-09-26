# Claude API Prompt Design

## Prompt Template for Activity Recommendations

### System Prompt
```
You are a helpful assistant that recommends romantic and fun activities for couples. You have access to web search to find real, current activities and venues. Always provide exactly 5 recommendations that are realistic, accessible, and well-suited for couples.

Your responses should be formatted as JSON with this exact structure:
{
  "recommendations": [
    {
      "title": "Activity Name",
      "emoji": "🎭",
      "description": "2-4 sentence description that's engaging and informative. Include practical details like duration, what to expect, and why it's great for couples."
    }
  ]
}

Guidelines:
- Use relevant emojis that match the activity type
- Keep descriptions between 2-4 sentences
- Include practical information (duration, cost range, reservations needed)
- Focus on couple-friendly aspects
- Ensure activities are realistic, timely and currently available
- Vary the types of activities (dining, entertainment, outdoor, cultural, etc.)
```

### User Prompt Template
```
Please find 5 couple activity recommendations for:

**Location**: {city}
**When**: {availability}
**Distance**: Within {distance} km from city center
**Preferences**: {preferences}
**Additional Details**: {additionalPreferences}

Use web search to find real, current activities and venues in {city}. Ensure all recommendations are:
- Actually available during {availability}
- Within {distance} km of the city center
- Suitable for the preferences: {preferences}
- Realistic and bookable
- Perfect for couples

Focus on a good mix of activity types and provide engaging descriptions that help the couple understand what makes each activity special.
```

## Input Field Mapping

### Required Fields
- **city** (string): User-entered city name
  - Example: "Paris", "New York", "Tokyo"

- **availability** (string): When they're free
  - Format: Day of week + time preference
  - Example: "Saturday evening", "Sunday afternoon", "weekday evening"

- **distance** (number): Maximum travel distance in km
  - Range: 1-50 km
  - Example: 15

- **preferences** (array): Selected activity types
  - Options: ["dining", "outdoor", "entertainment", "cultural", "nightlife", "shopping", "adventure", "relaxation"]
  - Example: ["dining", "cultural"]

### Optional Fields
- **additionalPreferences** (string): Free text for specific requests
  - Example: "We love trying new cuisines", "Looking for Instagram-worthy spots", "Budget-friendly options preferred"

## Example API Call

### Input Data
```json
{
  "city": "Barcelona",
  "availability": "Saturday evening",
  "distance": 20,
  "preferences": ["dining", "cultural", "nightlife"],
  "additionalPreferences": "We enjoy wine and live music"
}
```

### Constructed Prompt
```
Please find 5 couple activity recommendations for:

**Location**: Barcelona
**When**: Saturday evening
**Distance**: Within 20 km from city center
**Preferences**: dining, cultural, nightlife
**Additional Details**: We enjoy wine and live music

Use web search to find real, current activities and venues in Barcelona. Ensure all recommendations are:
- Actually available during Saturday evening
- Within 20 km of the city center
- Suitable for the preferences: dining, cultural, nightlife
- Realistic and bookable
- Perfect for couples

Focus on a good mix of activity types and provide engaging descriptions that help the couple understand what makes each activity special.
```

### Expected Response Format
```json
{
  "recommendations": [
    {
      "title": "Flamenco Show at Tablao Cordobés",
      "emoji": "💃",
      "description": "Experience authentic flamenco in an intimate setting with dinner and drinks. This renowned tablao offers passionate performances by world-class dancers just steps from Las Ramblas. Perfect for couples seeking cultural immersion with romantic ambiance."
    },
    {
      "title": "Sunset Wine Tasting at La Vinya del Senyor",
      "emoji": "🍷",
      "description": "Enjoy exceptional wines with stunning views of the Basilica de Santa Maria del Mar. This cozy wine bar specializes in Spanish varietals and offers expert guidance. The terrace provides an intimate setting perfect for couples to unwind."
    },
    {
      "title": "Gothic Quarter Evening Food Tour",
      "emoji": "🍤",
      "description": "Discover Barcelona's culinary secrets on a guided walk through medieval streets. Sample tapas, jamón, and local wines while learning about the city's history. Tours run until 10 PM and include 4-5 authentic venues perfect for sharing."
    },
    {
      "title": "Live Jazz at Jamboree",
      "emoji": "🎷",
      "description": "Dance the night away at Barcelona's premier jazz club in Plaça Reial. Features live performances from international artists in an atmospheric underground venue. Shows start at 9 PM with cocktails and dancing until late."
    },
    {
      "title": "Rooftop Cocktails at Sky Bar",
      "emoji": "🌆",
      "description": "Sip creative cocktails with panoramic city views from the 26th floor of Grand Hotel Central. The sophisticated atmosphere and stunning vistas create an unforgettable romantic experience. Open until 2 AM on weekends."
    }
  ]
}
```

## Implementation Notes

### API Integration
- Use Claude's web search tool to get current, real information
- Parse the JSON response in the Express backend
- Handle cases where JSON parsing fails with fallback
- Validate that exactly 5 recommendations are returned

### Error Handling
- Invalid city names
- No activities found for criteria
- API rate limits or failures
- Malformed JSON responses

### Optimization
- Cache responses for identical search criteria (30 minutes)
- Implement retry logic for API failures
- Set reasonable timeout limits (30 seconds)
- Log successful searches for analytics