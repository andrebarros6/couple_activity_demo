const Anthropic = require('@anthropic-ai/sdk');

class ClaudeService {
  constructor() {
    // Initialize Anthropic client with API key from environment
    this.anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });

    // Configuration from environment variables
    this.model = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514';
    this.maxTokens = parseInt(process.env.CLAUDE_MAX_TOKENS) || 1500;
    this.timeout = parseInt(process.env.CLAUDE_TIMEOUT) || 30000;
  }

  /**
   * System prompt that defines Claude's role and response format
   */
  getSystemPrompt() {
    return `You are a helpful assistant that recommends romantic and fun activities for couples. You have access to web search to find real, current activities and venues. Always provide exactly 5 recommendations that are realistic, accessible, and well-suited for couples.

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
- Vary the types of activities (dining, entertainment, outdoor, cultural, etc.)`;
  }

  /**
   * Constructs the user prompt with search criteria
   */
  buildUserPrompt(criteria) {
    const { city, availability, additionalPreferences } = criteria;

    // Handle additional preferences
    const additionalStr = additionalPreferences && additionalPreferences.trim()
      ? additionalPreferences
      : 'No specific preferences mentioned';

    return `Please find 5 couple activity recommendations for:

**Location**: ${city}
**When**: ${availability}
**What they're looking for**: ${additionalStr}

Use web search to find real, current activities and venues in ${city}. Ensure all recommendations are:
- Actually available during the time period: ${availability}
- Located in or near ${city}
- Suitable for couples
- Realistic and bookable
- Take into account their preferences: ${additionalStr}

Focus on providing a diverse mix of romantic and fun activities with engaging descriptions that help the couple understand what makes each activity special and why it's perfect for their situation.`;
  }

  /**
   * Calls Claude API with search criteria and returns activity recommendations
   */
  async getActivityRecommendations(criteria) {
    try {
      console.log(`🤖 Calling Claude API for activities in ${criteria.city}`);
      console.log(`📍 Search criteria:`, criteria);

      const userPrompt = this.buildUserPrompt(criteria);

      // Create message request with timeout
      const message = await Promise.race([
        this.anthropic.messages.create({
          model: this.model,
          max_tokens: this.maxTokens,
          system: this.getSystemPrompt(),
          messages: [
            {
              role: 'user',
              content: userPrompt
            }
          ],
          tools: [
            {
              name: 'web_search',
              description: 'Search the web for current information about activities and venues',
              input_schema: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    description: 'Search query for finding activities'
                  }
                },
                required: ['query']
              }
            }
          ]
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Claude API timeout')), this.timeout)
        )
      ]);

      console.log(`✅ Claude API response received`);

      // Extract the text content from the response
      const responseText = message.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('');

      console.log(`📝 Raw response:`, responseText.substring(0, 200) + '...');

      // Parse the JSON response
      const recommendations = this.parseRecommendations(responseText);

      console.log(`🎯 Successfully parsed ${recommendations.length} recommendations`);
      return recommendations;

    } catch (error) {
      console.error('❌ Claude API error:', error);

      // Provide more specific error messages
      if (error.message === 'Claude API timeout') {
        throw new Error('The AI service is taking too long to respond. Please try again.');
      } else if (error.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      } else if (error.status === 401) {
        throw new Error('Authentication failed. API key may be invalid.');
      } else if (error.name === 'SyntaxError') {
        throw new Error('Unable to parse AI response. Please try again.');
      } else {
        throw new Error(`AI service error: ${error.message}`);
      }
    }
  }

  /**
   * Parses Claude's response and extracts recommendations
   */
  parseRecommendations(responseText) {
    try {
      // Try to find JSON in the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const jsonStr = jsonMatch[0];
      const parsed = JSON.parse(jsonStr);

      // Validate the response structure
      if (!parsed.recommendations || !Array.isArray(parsed.recommendations)) {
        throw new Error('Invalid response format: missing recommendations array');
      }

      // Ensure we have exactly 5 recommendations
      const recommendations = parsed.recommendations.slice(0, 5);

      // Validate each recommendation
      recommendations.forEach((rec, index) => {
        if (!rec.title || !rec.emoji || !rec.description) {
          throw new Error(`Invalid recommendation ${index + 1}: missing required fields`);
        }

        // Ensure description length is reasonable
        if (rec.description.length < 50) {
          throw new Error(`Invalid recommendation ${index + 1}: description too short`);
        }
      });

      return recommendations;

    } catch (error) {
      console.error('❌ JSON parsing error:', error);
      throw new SyntaxError('Failed to parse AI response');
    }
  }

  /**
   * Test the Claude API connection
   */
  async testConnection() {
    try {
      const testCriteria = {
        city: 'Paris',
        availability: 'evening',
        additionalPreferences: 'Test connection - romantic dinner'
      };

      await this.getActivityRecommendations(testCriteria);
      return { success: true, message: 'Claude API connection successful' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = ClaudeService;