// Dummy activity data for Milestone 1
const activities = [
  // Paris Activities
  {
    id: 1,
    title: "Romantic Seine River Cruise",
    emoji: "🛥️",
    description: "Glide along the Seine with stunning views of Notre-Dame and the Eiffel Tower. This 2-hour evening cruise includes wine and cheese, creating the perfect romantic atmosphere. Departures every hour from 6-10 PM with live accordion music.",
    city: "Paris",
    categories: ["entertainment", "relaxation"],
    distanceFromCenter: 2,
    availability: ["evening", "all day"]
  },
  {
    id: 2,
    title: "Montmartre Art Walk & Wine Tasting",
    emoji: "🎨",
    description: "Explore the artistic heart of Paris through cobblestone streets and visit local art studios. End with a wine tasting session at a charming bistro overlooking the city. Perfect for culture-loving couples seeking authentic Parisian experiences.",
    city: "Paris",
    categories: ["cultural", "dining"],
    distanceFromCenter: 4,
    availability: ["afternoon", "evening"]
  },
  {
    id: 3,
    title: "Private Cooking Class in Le Marais",
    emoji: "👨‍🍳",
    description: "Learn to prepare classic French dishes together in an intimate cooking studio. Includes market shopping, hands-on cooking, and enjoying your 3-course meal with wine. Classes run for 4 hours and accommodate couples only.",
    city: "Paris",
    categories: ["dining", "cultural"],
    distanceFromCenter: 3,
    availability: ["morning", "afternoon"]
  },
  {
    id: 4,
    title: "Picnic in Luxembourg Gardens",
    emoji: "🌸",
    description: "Create your own romantic picnic with fresh ingredients from local markets. The gardens offer beautiful tree-lined paths, fountains, and peaceful spots perfect for couples. Best enjoyed during spring and summer months.",
    city: "Paris",
    categories: ["outdoor", "relaxation"],
    distanceFromCenter: 1,
    availability: ["morning", "afternoon", "all day"]
  },
  {
    id: 5,
    title: "Jazz Club at Le Caveau de la Huchette",
    emoji: "🎷",
    description: "Dance to live jazz in this historic underground club that's been swinging since 1946. The intimate atmosphere and authentic music create an unforgettable date night. Shows start at 9:30 PM and continue until late.",
    city: "Paris",
    categories: ["nightlife", "entertainment"],
    distanceFromCenter: 2,
    availability: ["evening"]
  },

  // New York Activities
  {
    id: 6,
    title: "Brooklyn Bridge Sunset Walk",
    emoji: "🌅",
    description: "Stroll across the iconic Brooklyn Bridge as the sun sets over Manhattan's skyline. Stop at Brooklyn Bridge Park for stunning photo opportunities and perhaps grab dinner at a waterfront restaurant. The walk takes about 30 minutes each way.",
    city: "New York",
    categories: ["outdoor", "entertainment"],
    distanceFromCenter: 3,
    availability: ["evening", "all day"]
  },
  {
    id: 7,
    title: "Broadway Show & Times Square Dinner",
    emoji: "🎭",
    description: "Experience the magic of Broadway with a romantic dinner before or after the show. Many restaurants offer pre-theater menus, and the energy of Times Square adds excitement to your evening. Book tickets and reservations in advance.",
    city: "New York",
    categories: ["entertainment", "dining"],
    distanceFromCenter: 2,
    availability: ["evening"]
  },
  {
    id: 8,
    title: "Central Park Rowboat & Picnic",
    emoji: "🚣",
    description: "Rent a rowboat at the Loeb Boathouse and paddle around the lake together. Follow with a picnic on the Great Lawn or Sheep Meadow. The boathouse also offers upscale dining if you prefer a restaurant experience.",
    city: "New York",
    categories: ["outdoor", "adventure"],
    distanceFromCenter: 1,
    availability: ["morning", "afternoon", "all day"]
  },
  {
    id: 9,
    title: "High Line Art Walk & Chelsea Market",
    emoji: "🖼️",
    description: "Walk the elevated High Line park while enjoying public art installations and city views. End at Chelsea Market for artisanal food tastings and unique shopping. The entire experience takes 2-3 hours at a leisurely pace.",
    city: "New York",
    categories: ["cultural", "shopping"],
    distanceFromCenter: 4,
    availability: ["morning", "afternoon", "all day"]
  },
  {
    id: 10,
    title: "Rooftop Bar with Empire State Views",
    emoji: "🍸",
    description: "Sip cocktails while taking in panoramic views of the Empire State Building and Manhattan skyline. Many rooftop bars offer couple's seating and romantic ambiance. Reservations recommended, especially for sunset timing.",
    city: "New York",
    categories: ["nightlife", "relaxation"],
    distanceFromCenter: 2,
    availability: ["evening"]
  },

  // Barcelona Activities
  {
    id: 11,
    title: "Sagrada Familia & Gaudí Architecture Tour",
    emoji: "🏛️",
    description: "Explore Gaudí's masterpieces including the iconic Sagrada Familia and Park Güell. The unique architecture provides endless photo opportunities and fascinating history. Tours include skip-the-line access and take about 4 hours total.",
    city: "Barcelona",
    categories: ["cultural", "outdoor"],
    distanceFromCenter: 3,
    availability: ["morning", "afternoon", "all day"]
  },
  {
    id: 12,
    title: "Flamenco Show with Tapas Dinner",
    emoji: "💃",
    description: "Experience authentic flamenco dancing while enjoying traditional Spanish tapas and wine. The passionate performances and intimate settings create an unforgettable romantic evening. Shows typically start at 8 PM and run for 2 hours.",
    city: "Barcelona",
    categories: ["cultural", "dining", "entertainment"],
    distanceFromCenter: 2,
    availability: ["evening"]
  },
  {
    id: 13,
    title: "Beach Day at Barceloneta",
    emoji: "🏖️",
    description: "Relax on Barcelona's main beach with golden sand and Mediterranean views. Rent a beach cabana, enjoy fresh seafood at beachfront restaurants, or try water sports together. The beach is easily accessible by metro.",
    city: "Barcelona",
    categories: ["outdoor", "relaxation"],
    distanceFromCenter: 4,
    availability: ["morning", "afternoon", "all day"]
  },
  {
    id: 14,
    title: "Gothic Quarter Food Tour",
    emoji: "🍤",
    description: "Discover Barcelona's culinary secrets while wandering through medieval streets. Sample jamón, manchego, and local wines at traditional taverns. The 3-hour guided tour includes 5-6 stops and plenty of romantic cobblestone alleyways.",
    city: "Barcelona",
    categories: ["dining", "cultural"],
    distanceFromCenter: 1,
    availability: ["evening", "afternoon"]
  },
  {
    id: 15,
    title: "Cable Car to Montjuïc Castle",
    emoji: "🚡",
    description: "Take a scenic cable car ride to Montjuïc Castle for panoramic city and sea views. The hilltop location offers perfect sunset viewing and beautiful gardens to explore. The castle also houses interesting exhibitions about Barcelona's history.",
    city: "Barcelona",
    categories: ["adventure", "cultural"],
    distanceFromCenter: 5,
    availability: ["afternoon", "evening"]
  },

  // Tokyo Activities
  {
    id: 16,
    title: "Cherry Blossom Viewing in Ueno Park",
    emoji: "🌸",
    description: "Experience the traditional Japanese hanami (flower viewing) in one of Tokyo's most beautiful parks. Bring a picnic blanket and enjoy sakura season together. The park also features museums and traditional architecture.",
    city: "Tokyo",
    categories: ["outdoor", "cultural"],
    distanceFromCenter: 6,
    availability: ["morning", "afternoon", "all day"]
  },
  {
    id: 17,
    title: "Sushi Making Class in Tsukiji",
    emoji: "🍣",
    description: "Learn the art of sushi making from a master chef in the famous Tsukiji area. The hands-on class includes knife skills, rice preparation, and presentation techniques. End by enjoying your creations with sake pairings.",
    city: "Tokyo",
    categories: ["dining", "cultural"],
    distanceFromCenter: 4,
    availability: ["morning", "afternoon"]
  },
  {
    id: 18,
    title: "Robot Restaurant & Shibuya Exploration",
    emoji: "🤖",
    description: "Experience Tokyo's quirky side with a robot show featuring neon lights, music, and dancing robots. Follow with exploring the bustling Shibuya crossing and nearby entertainment districts. Shows run hourly from 6-10 PM.",
    city: "Tokyo",
    categories: ["entertainment", "nightlife"],
    distanceFromCenter: 3,
    availability: ["evening"]
  },
  {
    id: 19,
    title: "Traditional Tea Ceremony in Asakusa",
    emoji: "🍵",
    description: "Participate in an authentic Japanese tea ceremony in the historic Asakusa district. Learn about the spiritual aspects of tea preparation while wearing traditional kimono. The serene experience lasts about 90 minutes.",
    city: "Tokyo",
    categories: ["cultural", "relaxation"],
    distanceFromCenter: 7,
    availability: ["morning", "afternoon"]
  },
  {
    id: 20,
    title: "Tokyo Skytree Night Views",
    emoji: "🌃",
    description: "Ascend to the observation decks of Tokyo Skytree for breathtaking night views of the world's largest metropolitan area. The tower offers romantic dining options and special couple's packages. Best visited after sunset for magical city lights.",
    city: "Tokyo",
    categories: ["entertainment", "relaxation"],
    distanceFromCenter: 8,
    availability: ["evening"]
  },

  // London Activities
  {
    id: 21,
    title: "Thames River Afternoon Tea Cruise",
    emoji: "🫖",
    description: "Enjoy traditional British afternoon tea while cruising past London's iconic landmarks including Big Ben, Tower Bridge, and the London Eye. The elegant experience includes finger sandwiches, scones, and champagne options.",
    city: "London",
    categories: ["dining", "entertainment"],
    distanceFromCenter: 2,
    availability: ["afternoon"]
  },
  {
    id: 22,
    title: "Camden Market & Regent's Canal Walk",
    emoji: "🛍️",
    description: "Browse unique vendors at Camden Market then stroll along the picturesque Regent's Canal. Stop at canal-side pubs and enjoy the colorful houseboats and street art. Perfect for couples who love alternative culture and shopping.",
    city: "London",
    categories: ["shopping", "outdoor"],
    distanceFromCenter: 4,
    availability: ["morning", "afternoon", "all day"]
  },
  {
    id: 23,
    title: "West End Theatre & Covent Garden Dinner",
    emoji: "🎭",
    description: "Experience world-class theatre in London's West End followed by dinner in atmospheric Covent Garden. The area offers numerous restaurants and street performers add to the romantic ambiance. Book shows and dinner reservations together.",
    city: "London",
    categories: ["entertainment", "dining"],
    distanceFromCenter: 1,
    availability: ["evening"]
  },
  {
    id: 24,
    title: "Hyde Park & Kensington Palace Gardens",
    emoji: "🦢",
    description: "Rent a pedal boat on the Serpentine Lake or visit the beautiful Kensington Palace Gardens together. The park offers peaceful walks, wildlife watching, and multiple cafes for romantic breaks. Diana Memorial playground nearby adds historical significance.",
    city: "London",
    categories: ["outdoor", "cultural"],
    distanceFromCenter: 2,
    availability: ["morning", "afternoon", "all day"]
  },
  {
    id: 25,
    title: "London Eye & South Bank Evening",
    emoji: "🎡",
    description: "Take a romantic ride on the London Eye at sunset, followed by a stroll along the South Bank. The area features restaurants, bars, and beautiful views of the Thames. Book a champagne experience for extra romance.",
    city: "London",
    categories: ["entertainment", "relaxation"],
    distanceFromCenter: 2,
    availability: ["evening"]
  }
];

// Utility functions for filtering activities
const filterActivitiesByCity = (activities, city) => {
  return activities.filter(activity =>
    activity.city.toLowerCase() === city.toLowerCase()
  );
};

const filterActivitiesByPreferences = (activities, preferences) => {
  if (!preferences || preferences.length === 0) return activities;

  return activities.filter(activity =>
    activity.categories.some(category =>
      preferences.map(p => p.toLowerCase()).includes(category.toLowerCase())
    )
  );
};

const filterActivitiesByDistance = (activities, maxDistance) => {
  return activities.filter(activity =>
    activity.distanceFromCenter <= maxDistance
  );
};

const filterActivitiesByAvailability = (activities, availability) => {
  if (!availability || availability === 'all day') return activities;

  return activities.filter(activity =>
    activity.availability.includes(availability.toLowerCase()) ||
    activity.availability.includes('all day')
  );
};

// Main search function that applies all filters
const searchActivities = (criteria) => {
  let filteredActivities = [...activities];

  // Apply filters in sequence
  if (criteria.city) {
    filteredActivities = filterActivitiesByCity(filteredActivities, criteria.city);
  }

  if (criteria.preferences && criteria.preferences.length > 0) {
    filteredActivities = filterActivitiesByPreferences(filteredActivities, criteria.preferences);
  }

  if (criteria.distance) {
    filteredActivities = filterActivitiesByDistance(filteredActivities, criteria.distance);
  }

  if (criteria.availability) {
    filteredActivities = filterActivitiesByAvailability(filteredActivities, criteria.availability);
  }

  // Shuffle and return exactly 5 results
  const shuffled = filteredActivities.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

module.exports = {
  activities,
  searchActivities,
  filterActivitiesByCity,
  filterActivitiesByPreferences,
  filterActivitiesByDistance,
  filterActivitiesByAvailability
};