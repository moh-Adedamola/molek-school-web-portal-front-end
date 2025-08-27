// Mock News Data - Nigerian School Context
export const mockNews = [
  {
    id: 'news_001',
    title: 'Molek School Emerges Champion in Lagos State WAEC Results',
    slug: 'molek-school-waec-results-2024',
    excerpt: 'Our SSS 3 students achieve remarkable 95% pass rate in WAEC examinations, with 78% obtaining five credits and above including English and Mathematics.',
    content: `
      Molek School is proud to announce outstanding results in the 2024 West African Senior School Certificate Examination (WAEC). 
      
      Our SSS 3 students demonstrated exceptional academic excellence with a 95% overall pass rate. More impressively, 78% of our students obtained five credits and above, including English Language and Mathematics - a requirement for university admission in Nigeria.
      
      The Principal, Mrs. Adebisi Ogundimu, attributed this success to the dedication of our teaching staff, the supportive learning environment, and the hard work of our students.
      
      Special recognition goes to our Science students who recorded 100% pass rate in Physics, Chemistry, and Biology, positioning them well for medical and engineering programs in Nigerian universities.
    `,
    category: 'Academic Excellence',
    author: 'School Communications Team',
    publishedAt: '2024-08-15T09:00:00Z',
    featuredImage: '/images/news/waec-results-celebration.jpg',
    tags: ['WAEC', 'Academic Results', 'Excellence', 'University Admission'],
    isPublished: true,
    isPinned: true,
    views: 1250
  },
  {
    id: 'news_002',
    title: 'Inter-House Sports Competition: Blue House Takes the Trophy',
    slug: 'inter-house-sports-2024-results',
    excerpt: 'An exciting week of athletic competition concludes with Blue House emerging victorious in the annual inter-house sports championship.',
    content: `
      The annual Molek School Inter-House Sports Competition has concluded with Blue House claiming the overall championship trophy after a week of thrilling competitions.
      
      The four houses - Red, Blue, Green, and Yellow - competed across various track and field events, football, basketball, and traditional Nigerian games including Ayo and local wrestling.
      
      Final Standings:
      1. Blue House - 245 points
      2. Green House - 232 points  
      3. Red House - 218 points
      4. Yellow House - 205 points
      
      Outstanding performances included Kemi Adeleke (SSS 2) breaking the school record in 100m sprint, and the Blue House football team's undefeated streak throughout the tournament.
    `,
    category: 'Sports',
    author: 'Mr. Tunde Adeyemi - Sports Coordinator',
    publishedAt: '2024-08-10T14:30:00Z',
    featuredImage: '/images/news/inter-house-sports-2024.jpg',
    tags: ['Sports', 'Inter-House', 'Competition', 'Athletics'],
    isPublished: true,
    isPinned: false,
    views: 890
  },
  {
    id: 'news_003',
    title: 'New Computer Laboratory Inaugurated with 50 Modern Systems',
    slug: 'new-computer-lab-inauguration',
    excerpt: 'Molek School enhances its ICT infrastructure with a state-of-the-art computer laboratory to prepare students for the digital age.',
    content: `
      Molek School has officially inaugurated its new Computer Science Laboratory, equipped with 50 modern desktop computers and high-speed internet connectivity.
      
      The laboratory features:
      - 50 HP desktop computers with Windows 11
      - Interactive smart board for demonstrations
      - High-speed fiber internet connection
      - Air conditioning for optimal learning environment
      - Backup power supply system
      
      This investment aligns with our commitment to preparing students for JAMB Computer-Based Tests (CBT) and providing practical skills in programming, digital literacy, and computer applications.
      
      The laboratory will benefit all students from JSS 1 to SSS 3, with dedicated periods for Computer Studies and practical sessions for WAEC Computer Science candidates.
    `,
    category: 'Infrastructure',
    author: 'Dr. Olumide Fashola - ICT Director',
    publishedAt: '2024-08-05T11:00:00Z',
    featuredImage: '/images/news/computer-lab-inauguration.jpg',
    tags: ['ICT', 'Infrastructure', 'Technology', 'Education'],
    isPublished: true,
    isPinned: false,
    views: 650
  },
  {
    id: 'news_004',
    title: 'Mid-Term Break: School Resumes October 7th, 2024',
    slug: 'mid-term-break-october-2024',
    excerpt: 'Students and staff will enjoy a well-deserved mid-term break. Academic activities resume on October 7th with exciting programs planned.',
    content: `
      Following the completion of our first term examinations, Molek School will observe the mid-term break from September 30th to October 6th, 2024.
      
      Important Reminders:
      - School resumes Monday, October 7th, 2024 at 7:30 AM
      - All students should return in complete school uniform
      - Outstanding fees should be paid before resumption
      - JSS 3 and SSS 3 students have mandatory extra classes starting October 9th
      
      Parents are encouraged to use this break to support their children's academic progress by encouraging reading and completing holiday assignments.
      
      We wish all our students and families a restful and productive break!
    `,
    category: 'Announcements',
    author: 'School Administration',
    publishedAt: '2024-08-25T08:00:00Z',
    featuredImage: '/images/news/mid-term-break.jpg',
    tags: ['Break', 'Academic Calendar', 'Resumption', 'Parents'],
    isPublished: true,
    isPinned: true,
    views: 2100
  },
  {
    id: 'news_005',
    title: 'Parent-Teacher Conference: Strengthening Educational Partnership',
    slug: 'parent-teacher-conference-2024',
    excerpt: 'Join us for our quarterly Parent-Teacher Conference to discuss student progress and strengthen the home-school partnership.',
    content: `
      Molek School invites all parents and guardians to our quarterly Parent-Teacher Conference scheduled for Saturday, September 14th, 2024.
      
      Conference Schedule:
      - JSS Students: 9:00 AM - 12:00 PM
      - SSS Students: 1:00 PM - 4:00 PM
      
      Parents will have the opportunity to:
      - Review their child's academic progress
      - Discuss areas for improvement
      - Meet subject teachers individually
      - Learn about upcoming school programs
      - Address any concerns or questions
      
      This conference is crucial for maintaining open communication between home and school, ensuring the best educational outcomes for our students.
      
      Please confirm your attendance by calling the school office or sending a message via our parent portal.
    `,
    category: 'Events',
    author: 'Mrs. Funmi Adebayo - Student Affairs',
    publishedAt: '2024-08-20T10:15:00Z',
    featuredImage: '/images/news/parent-teacher-conference.jpg',
    tags: ['Parents', 'Teachers', 'Conference', 'Academic Progress'],
    isPublished: true,
    isPinned: false,
    views: 1450
  }
];

// Helper functions for news management
export const getPublishedNews = () => {
  return mockNews.filter(article => article.isPublished);
};

export const getPinnedNews = () => {
  return mockNews.filter(article => article.isPinned && article.isPublished);
};

export const getNewsByCategory = (category) => {
  return mockNews.filter(article => 
    article.category === category && article.isPublished
  );
};

export const getNewsById = (id) => {
  return mockNews.find(article => article.id === id);
};

export const getRecentNews = (limit = 5) => {
  return mockNews
    .filter(article => article.isPublished)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
};

export const searchNews = (query) => {
  const searchTerm = query.toLowerCase();
  return mockNews.filter(article => 
    article.isPublished && (
      article.title.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  );
};

export default mockNews;