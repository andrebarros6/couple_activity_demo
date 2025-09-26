# Couple Activities Finder - Technical Specification

## Project Overview
A simple app that helps couples find activities in their city based on availability, distance preferences, and interests.

## Requirements

### Functional Requirements
- **City Input**: Text input or dropdown for city selection
- **Availability**: Date/time picker for when they're free
- **Distance**: Slider for maximum travel distance (km)
- **Preferences**: Checkboxes for activity types (dining, outdoor, entertainment, cultural, etc.)
- **Output**: Display exactly 5 recommendations with:
  - Bold title with emoji
  - 2-4 sentence description
  - Clean, readable format

### Non-Functional Requirements
- Simple, intuitive interface
- Fast response time (<5 seconds)
- Mobile-friendly design
- Minimal setup/dependencies

## Tech Stack

### Milestone 1: MVP with Dummy Data
- **Frontend**: React (JavaScript)
- **Backend**: Express.js (Node.js)
- **Data**: Hardcoded activities in JSON/JavaScript objects
- **Development**: npm, concurrent dev servers

### Milestone 2: Claude API Integration
- **API**: Claude Messages API with web search tool
- **Data Source**: Real-time web search results
- **Enhanced**: AI-generated personalized descriptions

## Design Guidelines

### UI Principles
- Clean, minimal interface
- Single page application
- Clear visual hierarchy
- Consistent spacing and typography
- Mobile-first responsive design

### User Flow
1. User enters city, availability, distance, preferences
2. Click "Find Activities" button
3. System processes inputs
4. Display 5 recommendations
5. Optional: Allow filtering/refresh

### Output Format
```
🍽️ **Romantic Rooftop Dinner**
Experience fine dining with stunning city views at this intimate restaurant. Perfect for couples seeking a memorable evening with excellent cuisine and atmosphere. Reservations recommended for sunset seating.

🎨 **Art Gallery Walking Tour**
Explore contemporary art together in the trendy arts district. This self-guided tour takes 2-3 hours and includes stops at 5 galleries. Great for culture-loving couples who enjoy discovering new artists.
```

## Milestones

### Milestone 1: UI + Dummy Data (Est: 6-8 hours)
**Goal**: Functional interface with sample recommendations

**Tasks**:
- Set up React + Express project structure
- Create React components for input form (city, date/time, distance, preferences)
- Build Express API endpoints for activity data
- Create dummy activity database (20-30 activities across 3-5 cities)
- Implement filtering logic in backend
- Design React components for output display with emojis and formatting
- Set up development environment with concurrent servers

**Deliverables**:
- Working React frontend + Express backend
- REST API endpoints
- Sample data covering major cities
- Clean, responsive React interface

### Milestone 2: Claude API Integration (Est: 8-12 hours)
**Goal**: Live recommendations using Claude API with web search

**Tasks**:
- Set up Claude API credentials in Express backend
- Implement Claude Messages API integration with web search tool
- Integrate prompt design from `prompt.md` for activity recommendations
- Replace dummy data with Claude API calls using structured prompts
- Add JSON response parsing and validation
- Add error handling and fallbacks in API routes
- Optimize API usage and response times
- Update React frontend to handle loading states
- Implement caching for repeated searches

**Deliverables**:
- Real-time activity recommendations via Claude API
- AI-generated descriptions with personality using web search
- Robust error handling across frontend and backend
- Structured prompt system as defined in `prompt.md`

**Reference**: See `prompt.md` for detailed Claude API prompt design, input field mapping, and expected response format.

### Milestone 3: Polish & Deploy (Optional)
**Goal**: Production-ready application

**Tasks**:
- Improve UI/UX based on testing
- Add loading states and better error messages
- Implement caching for common searches
- Deploy frontend to Vercel/Netlify and backend to Railway/Render
- Add analytics and user feedback

## File Structure
```
couple-act-planner/
├── spec.md                 # This file
├── client/                 # React frontend
│   ├── package.json
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API calls to backend
│   │   └── App.js          # Main React app
│   └── public/
├── server/                 # Express backend
│   ├── package.json
│   ├── routes/
│   │   └── activities.js   # API routes
│   ├── data/
│   │   └── activities.js   # Dummy data (Milestone 1)
│   ├── services/
│   │   └── claude.js       # Claude API integration (Milestone 2)
│   └── server.js           # Express server
└── package.json            # Root package.json for scripts
```

## Success Criteria
- User can find relevant activities in under 30 seconds
- Recommendations feel personalized and useful
- Interface is intuitive without instructions
- App handles edge cases gracefully (no results, API failures)
- Code is clean and maintainable