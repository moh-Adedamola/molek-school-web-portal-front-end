// Mock Events Data - Nigerian School Calendar Context
export const mockEvents = [
  {
    id: 'event_001',
    title: 'Independence Day Celebration',
    description: 'Celebrating Nigeria\'s 64th Independence Day with cultural performances, patriotic songs, and flag hoisting ceremony.',
    startDate: '2024-10-01T08:00:00Z',
    endDate: '2024-10-01T12:00:00Z',
    location: 'School Assembly Hall',
    category: 'National Holiday',
    type: 'Celebration',
    organizer: 'Social Studies Department',
    isPublic: true,
    requiresRegistration: false,
    capacity: 500,
    attendees: 0,
    image: '/images/events/independence-day-2024.jpg',
    status: 'upcoming'
  },
  {
    id: 'event_002',
    title: 'WAEC Mock Examination',
    description: 'Practice examination for SSS 3 students to prepare for the actual WAEC examinations. All subjects included.',
    startDate: '2024-10-15T09:00:00Z',
    endDate: '2024-10-25T15:00:00Z',
    location: 'Examination Halls A, B, C',
    category: 'Academic',
    type: 'Examination',
    organizer: 'Academic Office',
    isPublic: false,
    requiresRegistration: true,
    capacity: 85,
    attendees: 78,
    image: '/images/events/waec-mock-exam.jpg',
    status: 'upcoming',
    participants: ['SSS 3 Students'],
    requirements: ['Examination Number', 'Writing Materials', 'School ID']
  },
  {
    id: 'event_003',
    title: 'Inter-House Debate Competition',
    description: 'Annual debate competition between the four houses on the topic: "Technology has done more harm than good to Nigerian education".',
    startDate: '2024-09-20T14:00:00Z',
    endDate: '2024-09-20T17:00:00Z',
    location: 'School Auditorium',
    category: 'Academic Competition',
    type: 'Competition',
    organizer: 'English Language Department',
    isPublic: true,
    requiresRegistration: true,
    capacity: 300,
    attendees: 125,
    image: '/images/events/debate-competition.jpg',
    status: 'completed',
    winner: 'Green House',
    participants: ['Representatives from all Houses']
  },
  {
    id: 'event_004',
    title: 'Career Guidance Workshop',
    description: 'Professional guidance session for SSS students on university admission, career choices, and JAMB preparation strategies.',
    startDate: '2024-11-08T10:00:00Z',
    endDate: '2024-11-08T15:00:00Z',
    location: 'Main Hall',
    category: 'Career Development',
    type: 'Workshop',
    organizer: 'Guidance & Counseling Unit',
    isPublic: false,
    requiresRegistration: true,
    capacity: 150,
    attendees: 89,
    image: '/images/events/career-guidance.jpg',
    status: 'upcoming',
    participants: ['SSS 1', 'SSS 2', 'SSS 3'],
    speakers: [
      'Prof. Adebayo Ogundimu - University of Lagos',
      'Dr. Kemi Adeleke - Medical Professional',
      'Eng. Tunde Adeyemi - Tech Industry'
    ]
  },
  {
    id: 'event_005',
    title: 'Cultural Day Celebration',
    description: 'Celebrating the rich Nigerian cultural heritage with traditional dances, foods, and costumes from different ethnic groups.',
    startDate: '2024-11-29T09:00:00Z',
    endDate: '2024-11-29T16:00:00Z',
    location: 'School Grounds',
    category: 'Cultural',
    type: 'Festival',
    organizer: 'Cultural Activities Committee',
    isPublic: true,
    requiresRegistration: false,
    capacity: 800,
    attendees: 0,
    image: '/images/events/cultural-day.jpg',
    status: 'upcoming',
    activities: [
      'Traditional Dance Performances',
      'Nigerian Food Festival',
      'Art & Craft Exhibition',
      'Traditional Music Competition',
      'Cultural Quiz Competition'
    ]
  },
  {
    id: 'event_006',
    title: 'End of Term Examination',
    description: 'First term examination for all students from JSS 1 to SSS 3. Examination timetable available at the notice board.',
    startDate: '2024-12-02T08:00:00Z',
    endDate: '2024-12-13T15:00:00Z',
    location: 'All Classrooms',
    category: 'Academic',
    type: 'Examination',
    organizer: 'Academic Office',
    isPublic: false,
    requiresRegistration: false,
    capacity: 400,
    attendees: 380,
    image: '/images/events/end-term-exam.jpg',
    status: 'upcoming',
    participants: ['All Students JSS 1 - SSS 3'],
    importantNotes: [
      'Arrive 30 minutes before exam time',
      'Bring only allowed materials',
      'Late arrival not permitted after 15 minutes',
      'Results available 2 weeks after completion'
    ]
  },
  {
    id: 'event_007',
    title: 'Christmas Carol Service',
    description: 'Annual Christmas carol service featuring the school choir, Bible readings, and festive celebrations.',
    startDate: '2024-12-20T18:00:00Z',
    endDate: '2024-12-20T20:30:00Z',
    location: 'School Chapel',
    category: 'Religious',
    type: 'Service',
    organizer: 'Christian Religious Studies Department',
    isPublic: true,
    requiresRegistration: false,
    capacity: 400,
    attendees: 0,
    image: '/images/events/christmas-carol.jpg',
    status: 'upcoming',
    performers: [
      'Molek School Choir',
      'Drama Club',
      'Student Soloists'
    ]
  },
  {
    id: 'event_008',
    title: 'Alumni Homecoming',
    description: 'Annual reunion for Molek School alumni featuring networking, career talks, and school development discussions.',
    startDate: '2024-12-28T10:00:00Z',
    endDate: '2024-12-28T17:00:00Z',
    location: 'School Premises',
    category: 'Alumni',
    type: 'Reunion',
    organizer: 'Alumni Association',
    isPublic: false,
    requiresRegistration: true,
    capacity: 200,
    attendees: 65,
    image: '/images/events/alumni-homecoming.jpg',
    status: 'upcoming',
    activities: [
      'Welcome Address by Principal',
      'Alumni Success Stories',
      'School Development Update',
      'Networking Lunch',
      'Career Mentorship Sessions'
    ]
  }
];

// Event helper functions
export const getUpcomingEvents = () => {
  const now = new Date();
  return mockEvents.filter(event => 
    new Date(event.startDate) >= now
  ).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
};

export const getPastEvents = () => {
  const now = new Date();
  return mockEvents.filter(event => 
    new Date(event.endDate) < now
  ).sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
};

export const getEventsByCategory = (category) => {
  return mockEvents.filter(event => event.category === category);
};

export const getEventById = (id) => {
  return mockEvents.find(event => event.id === id);
};

export const getPublicEvents = () => {
  return mockEvents.filter(event => event.isPublic);
};

export const getEventsThisMonth = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return mockEvents.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate >= startOfMonth && eventDate <= endOfMonth;
  });
};

export const getEventsByDateRange = (startDate, endDate) => {
  return mockEvents.filter(event => {
    const eventStart = new Date(event.startDate);
    return eventStart >= new Date(startDate) && eventStart <= new Date(endDate);
  });
};

// Event categories for filtering
export const eventCategories = [
  'Academic',
  'Academic Competition',
  'Sports',
  'Cultural',
  'Religious',
  'Career Development',
  'Alumni',
  'National Holiday',
  'Workshop',
  'Examination'
];

export default mockEvents;