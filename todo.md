# Milestone 1: UI + Dummy Data - Task List

## Project Setup (1-2 hours)

### 1. Initialize Project Structure
- [ ] Create root `package.json` with scripts for concurrent development
- [ ] Set up `client/` folder for React frontend
- [ ] Set up `server/` folder for Express backend
- [ ] Initialize npm in both client and server directories
- [ ] Install dependencies:
  - Client: `react`, `react-dom`, `axios`, `react-scripts`
  - Server: `express`, `cors`, `nodemon`, `dotenv`
- [ ] Set up development scripts in root package.json

### 2. Express Backend Setup (1-2 hours)

#### Server Infrastructure
- [ ] Create `server/server.js` with basic Express setup
- [ ] Configure CORS for client-server communication
- [ ] Set up JSON middleware
- [ ] Create basic health check endpoint (`GET /api/health`)
- [ ] Test server starts and responds

#### Data Layer
- [ ] Create `server/data/activities.js` with dummy activity data
  - [ ] 20-30 activities across 3-5 cities (Paris, New York, Barcelona, Tokyo, London)
  - [ ] Each activity: title, emoji, description, city, category, distance from center
- [ ] Create utility functions for filtering activities by criteria

#### API Routes
- [ ] Create `server/routes/activities.js`
- [ ] Implement `POST /api/activities/search` endpoint
- [ ] Add filtering logic:
  - [ ] Filter by city
  - [ ] Filter by preferences (activity categories)
  - [ ] Filter by distance from city center
  - [ ] Return exactly 5 recommendations
- [ ] Test API endpoints with Postman/curl

## React Frontend (2-3 hours)

### 3. React App Setup
- [ ] Create React app structure in `client/`
- [ ] Set up proxy in `package.json` to connect to Express server
- [ ] Create basic `App.js` with routing structure
- [ ] Add CSS framework (Tailwind CSS or styled-components)

### 4. Input Components
- [ ] Create `components/SearchForm.js`
  - [ ] City input field (text input)
  - [ ] Availability picker (dropdown: "Morning", "Afternoon", "Evening", "All day")
  - [ ] Distance slider (1-50 km range)
  - [ ] Preferences checkboxes (dining, outdoor, entertainment, cultural, nightlife, shopping, adventure, relaxation)
  - [ ] Additional preferences textarea (optional)
  - [ ] Submit button
- [ ] Add form validation (required fields)
- [ ] Handle form state with React hooks

### 5. Results Components
- [ ] Create `components/ActivityCard.js`
  - [ ] Display emoji, title, and description
  - [ ] Responsive card design
  - [ ] Proper typography and spacing
- [ ] Create `components/ResultsList.js`
  - [ ] Map through 5 recommendations
  - [ ] Handle loading state
  - [ ] Handle empty/error states
- [ ] Create `components/LoadingSpinner.js`

### 6. API Integration
- [ ] Create `services/api.js` for API calls
- [ ] Implement `searchActivities(criteria)` function
- [ ] Connect search form to API call
- [ ] Handle API responses and errors
- [ ] Update UI with results

## Development Environment (30 minutes)

### 7. Development Setup
- [ ] Create development scripts to run both client and server
- [ ] Test hot reloading works for both frontend and backend
- [ ] Verify client can communicate with server
- [ ] Test full user flow: form submission → API call → results display

## Testing & Polish (1 hour)

### 8. User Experience Testing
- [ ] Test form validation works correctly
- [ ] Test all preference combinations work
- [ ] Test responsive design on mobile and desktop
- [ ] Test error handling (server down, no results)
- [ ] Verify emoji and formatting display correctly

### 9. Code Quality
- [ ] Add comments to complex functions
- [ ] Ensure consistent code formatting
- [ ] Remove console.logs and debug code
- [ ] Test in different browsers

## Acceptance Criteria

### Functional Requirements
- [ ] User can enter city, availability, distance, and preferences
- [ ] System returns exactly 5 activity recommendations
- [ ] Each recommendation has emoji, bold title, and 2-4 sentence description
- [ ] Interface is responsive and works on mobile
- [ ] Form validation prevents invalid submissions

### Technical Requirements
- [ ] React frontend communicates with Express backend via REST API
- [ ] Dummy data covers at least 3 major cities
- [ ] API filtering works for all input criteria
- [ ] Development environment allows concurrent client/server development
- [ ] Code is clean, commented, and follows best practices

## Sample Dummy Data Structure

```javascript
{
  id: 1,
  title: "Romantic Seine River Cruise",
  emoji: "🛥️",
  description: "Glide along the Seine with stunning views of Notre-Dame and the Eiffel Tower. This 2-hour evening cruise includes wine and cheese, creating the perfect romantic atmosphere. Departures every hour from 6-10 PM.",
  city: "Paris",
  categories: ["entertainment", "relaxation"],
  distanceFromCenter: 2,
  availability: ["evening", "all day"]
}
```

## Estimated Timeline
- **Project Setup**: 1-2 hours
- **Backend Development**: 1-2 hours
- **Frontend Development**: 2-3 hours
- **Integration & Testing**: 1 hour
- **Total**: 6-8 hours

## Next Steps (Milestone 2)
After completing Milestone 1, the foundation will be ready for Claude API integration to replace dummy data with real, AI-generated recommendations.