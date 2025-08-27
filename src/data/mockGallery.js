// Mock Gallery Data - School Photos and Videos
export const mockGallery = [
  {
    id: 'gallery_001',
    title: 'WAEC Results Celebration 2024',
    description: 'Celebrating our outstanding WAEC results with students, teachers, and proud parents.',
    type: 'photo',
    category: 'Academic Excellence',
    url: '/images/gallery/waec-celebration-2024.jpg',
    thumbnail: '/images/gallery/thumbs/waec-celebration-2024.jpg',
    dateTaken: '2024-08-15T12:00:00Z',
    photographer: 'Mr. Kunle Adeyemi',
    tags: ['WAEC', 'Celebration', 'Students', 'Achievement'],
    isPublic: true,
    featured: true,
    likes: 145,
    views: 890
  },
  {
    id: 'gallery_002',
    title: 'Inter-House Sports Competition Highlights',
    description: 'Action-packed moments from our annual inter-house sports competition featuring track and field events.',
    type: 'video',
    category: 'Sports',
    url: '/videos/gallery/inter-house-sports-2024.mp4',
    thumbnail: '/images/gallery/thumbs/inter-house-sports-2024.jpg',
    duration: '05:32',
    dateTaken: '2024-08-10T14:00:00Z',
    photographer: 'Sports Department',
    tags: ['Sports', 'Competition', 'Athletics', 'Houses'],
    isPublic: true,
    featured: true,
    likes: 98,
    views: 567
  },
  {
    id: 'gallery_003',
    title: 'New Computer Laboratory Opening',
    description: 'State-of-the-art computer laboratory with 50 modern systems for enhanced ICT education.',
    type: 'photo',
    category: 'Infrastructure',
    url: '/images/gallery/computer-lab-opening.jpg',
    thumbnail: '/images/gallery/thumbs/computer-lab-opening.jpg',
    dateTaken: '2024-08-05T11:30:00Z',
    photographer: 'School Administration',
    tags: ['Technology', 'Infrastructure', 'Computer Lab', 'ICT'],
    isPublic: true,
    featured: false,
    likes: 76,
    views: 445
  },
  {
    id: 'gallery_007',
    title: 'Graduation Ceremony 2024',
    description: 'Proud graduates from SSS 3 receiving their certificates in a memorable graduation ceremony.',
    type: 'photo',
    category: 'Graduation',
    url: '/images/gallery/graduation-ceremony-2024.jpg',
    thumbnail: '/images/gallery/thumbs/graduation-ceremony-2024.jpg',
    dateTaken: '2024-07-20T15:00:00Z',
    photographer: 'Event Photography Team',
    tags: ['Graduation', 'SSS3', 'Certificate', 'Achievement'],
    isPublic: true,
    featured: true,
    likes: 234,
    views: 1250
  },
  {
    id: 'gallery_008',
    title: 'Science Fair Exhibition',
    description: 'Students showcasing innovative science projects during the annual school science fair.',
    type: 'photo',
    category: 'Academic Activities',
    url: '/images/gallery/science-fair-2024.jpg',
    thumbnail: '/images/gallery/thumbs/science-fair-2024.jpg',
    dateTaken: '2024-06-15T13:00:00Z',
    photographer: 'Science Department',
    tags: ['Science Fair', 'Innovation', 'Projects', 'STEM'],
    isPublic: true,
    featured: false,
    likes: 89,
    views: 523
  },
  {
    id: 'gallery_009',
    title: 'Parent-Teacher Conference Session',
    description: 'Productive discussions between parents and teachers during our quarterly conference.',
    type: 'photo',
    category: 'School Events',
    url: '/images/gallery/parent-teacher-conference.jpg',
    thumbnail: '/images/gallery/thumbs/parent-teacher-conference.jpg',
    dateTaken: '2024-06-10T11:00:00Z',
    photographer: 'Administration Team',
    tags: ['Parents', 'Teachers', 'Conference', 'Collaboration'],
    isPublic: true,
    featured: false,
    likes: 45,
    views: 267
  },
  {
    id: 'gallery_010',
    title: 'Basketball Team Training',
    description: 'Our school basketball team during intensive training sessions preparing for inter-school competition.',
    type: 'video',
    category: 'Sports',
    url: '/videos/gallery/basketball-training.mp4',
    thumbnail: '/images/gallery/thumbs/basketball-training.jpg',
    duration: '04:18',
    dateTaken: '2024-05-28T16:00:00Z',
    photographer: 'Coach Adebayo',
    tags: ['Basketball', 'Training', 'Sports', 'Team'],
    isPublic: true,
    featured: false,
    likes: 62,
    views: 334
  },
  {
    id: 'gallery_011',
    title: 'Library Study Session',
    description: 'Students utilizing our well-stocked library for research and study sessions.',
    type: 'photo',
    category: 'Academic Activities',
    url: '/images/gallery/library-study-session.jpg',
    thumbnail: '/images/gallery/thumbs/library-study-session.jpg',
    dateTaken: '2024-05-20T14:30:00Z',
    photographer: 'Library Staff',
    tags: ['Library', 'Study', 'Research', 'Learning'],
    isPublic: true,
    featured: false,
    likes: 38,
    views: 198
  },
  {
    id: 'gallery_012',
    title: 'Cultural Dance Performance',
    description: 'Traditional Nigerian dance performances during our cultural week celebration.',
    type: 'video',
    category: 'Cultural Events',
    url: '/videos/gallery/cultural-dance-performance.mp4',
    thumbnail: '/images/gallery/thumbs/cultural-dance-performance.jpg',
    duration: '06:15',
    dateTaken: '2024-04-25T12:00:00Z',
    photographer: 'Cultural Committee',
    tags: ['Culture', 'Dance', 'Traditional', 'Performance'],
    isPublic: true,
    featured: true,
    likes: 156,
    views: 789
  }
];

// Gallery helper functions
export const getPhotosByCategory = (category) => {
  return mockGallery.filter(item => 
    item.category === category && item.type === 'photo'
  );
};

export const getVideosByCategory = (category) => {
  return mockGallery.filter(item => 
    item.category === category && item.type === 'video'
  );
};

export const getFeaturedMedia = () => {
  return mockGallery.filter(item => item.featured && item.isPublic);
};

export const getRecentMedia = (limit = 8) => {
  return mockGallery
    .filter(item => item.isPublic)
    .sort((a, b) => new Date(b.dateTaken) - new Date(a.dateTaken))
    .slice(0, limit);
};

export const searchGallery = (query) => {
  const searchTerm = query.toLowerCase();
  return mockGallery.filter(item =>
    item.isPublic && (
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  );
};

export const getMediaByType = (type) => {
  return mockGallery.filter(item => item.type === type && item.isPublic);
};

export const getMediaById = (id) => {
  return mockGallery.find(item => item.id === id);
};

// Gallery categories for filtering
export const galleryCategories = [
  'Academic Excellence',
  'Academic Activities',
  'Sports',
  'Cultural Events',
  'Music & Arts',
  'Infrastructure',
  'School Events',
  'Graduation',
  'Science & Technology'
];

export default mockGallery;
    