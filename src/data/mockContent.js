// File Location: src/data/mockContent.js
// Website content manageable by admin users

export const websiteContent = {
  // Homepage content sections
  homepage: {
    hero: {
      title: "Excellence in Nigerian Secondary Education",
      subtitle: "Empowering Students for Academic Success and Character Development",
      ctaText: "Apply for Admission",
      ctaLink: "/admissions",
      backgroundImage: "/images/hero-banner.jpg",
      lastUpdated: "2024-12-05T10:30:00Z",
      updatedBy: "A001"
    },
    features: [
      {
        id: "feature_001",
        icon: "GraduationCap",
        title: "Academic Excellence",
        description: "Comprehensive JSS and SSS programs aligned with Nigerian curriculum standards",
        isActive: true
      },
      {
        id: "feature_002", 
        icon: "Users",
        title: "Qualified Teachers",
        description: "Experienced educators committed to student success and character building",
        isActive: true
      },
      {
        id: "feature_003",
        icon: "Trophy",
        title: "WAEC Success",
        description: "Outstanding WAEC and NECO results with 95% pass rate over 5 years",
        isActive: true
      }
    ],
    stats: {
      students: 847,
      teachers: 42,
      years: 25,
      waecPass: 95,
      lastUpdated: "2024-12-01T09:00:00Z"
    }
  },

  // About Us content
  about: {
    mission: {
      title: "Our Mission",
      content: "To provide quality secondary education that develops intellectual, moral, and social competencies in students, preparing them for tertiary education and responsible citizenship.",
      lastUpdated: "2024-11-20T14:15:00Z",
      updatedBy: "A001"
    },
    vision: {
      title: "Our Vision", 
      content: "To be the leading secondary school in Nigeria, recognized for academic excellence, character development, and innovative teaching methodologies.",
      lastUpdated: "2024-11-20T14:15:00Z",
      updatedBy: "A001"
    },
    history: {
      title: "Our History",
      content: "Established in 1999, our school has grown from humble beginnings with 50 students to becoming one of Nigeria's premier secondary institutions with over 800 students and a track record of academic excellence.",
      milestones: [
        { year: 1999, event: "School established with 50 students" },
        { year: 2005, event: "First WAEC batch achieves 100% pass rate" },
        { year: 2010, event: "Expanded to accommodate 500 students" },
        { year: 2015, event: "Introduced computer laboratory and science equipment" },
        { year: 2020, event: "Launched digital learning platform during COVID-19" },
        { year: 2024, event: "Achieved 25 years of educational excellence" }
      ],
      lastUpdated: "2024-11-25T11:30:00Z",
      updatedBy: "A001"
    }
  },

  // Academic content
  academics: {
    programs: {
      jss: {
        title: "Junior Secondary School (JSS 1-3)",
        description: "Foundation years focusing on broad-based education covering all core subjects as required by the Nigerian Educational Research and Development Council (NERDC).",
        subjects: "English, Mathematics, Basic Science, Basic Technology, Social Studies, Creative Arts, Physical Education, Agricultural Science, and Religious Studies",
        duration: "3 years",
        ageRange: "10-13 years"
      },
      sss: {
        title: "Senior Secondary School (SSS 1-3)", 
        description: "Specialized education in three streams: Sciences, Arts/Humanities, and Commercial subjects, preparing students for WAEC, NECO, and JAMB examinations.",
        streams: ["Sciences", "Arts/Humanities", "Commercial"],
        duration: "3 years", 
        ageRange: "13-16 years"
      }
    },
    calendar: {
      currentYear: "2024/2025",
      terms: [
        {
          name: "First Term",
          startDate: "2024-09-02",
          endDate: "2024-12-13",
          holidays: ["2024-10-01", "2024-12-25", "2024-12-26"]
        },
        {
          name: "Second Term", 
          startDate: "2025-01-13",
          endDate: "2025-04-04",
          holidays: ["2025-01-01", "2025-04-18", "2025-04-21"]
        },
        {
          name: "Third Term",
          startDate: "2025-04-28", 
          endDate: "2025-07-18",
          holidays: ["2025-05-01", "2025-06-12", "2025-10-01"]
        }
      ],
      lastUpdated: "2024-08-15T10:00:00Z",
      updatedBy: "A001"
    }
  },

  // News and events
  news: [
    {
      id: "news_001",
      title: "First Term Examination Results Released",
      excerpt: "Congratulations to all students on outstanding performance in first term examinations.",
      content: "We are pleased to announce the release of first term examination results. Students and parents can access results through the school portal. Overall class performance shows significant improvement across all levels.",
      category: "Academic",
      publishedAt: "2024-12-10T09:00:00Z",
      publishedBy: "A001",
      isPublished: true,
      featured: true,
      image: "/images/news/exam-results.jpg"
    },
    {
      id: "news_002",
      title: "Inter-House Sports Competition 2024",
      excerpt: "Annual inter-house sports competition scheduled for December 20-22, 2024.",
      content: "All students are invited to participate in the annual inter-house sports competition. Events include athletics, football, basketball, and traditional games. Registration closes December 15th.",
      category: "Sports",
      publishedAt: "2024-12-08T14:30:00Z", 
      publishedBy: "A001",
      isPublished: true,
      featured: false,
      image: "/images/news/sports-day.jpg"
    }
  ],

  // Events
  events: [
    {
      id: "event_001",
      title: "Parent-Teacher Conference",
      description: "First term parent-teacher conference to discuss student progress.",
      date: "2024-12-18T09:00:00Z",
      endDate: "2024-12-18T15:00:00Z", 
      location: "School Main Hall",
      category: "Academic",
      isPublic: true,
      createdBy: "A001",
      lastUpdated: "2024-12-05T11:00:00Z"
    },
    {
      id: "event_002",
      title: "Cultural Day Celebration",
      description: "Celebrating Nigerian cultural diversity with traditional dances, food, and exhibitions.",
      date: "2024-12-20T10:00:00Z",
      endDate: "2024-12-20T16:00:00Z",
      location: "School Compound",
      category: "Cultural", 
      isPublic: true,
      createdBy: "A001",
      lastUpdated: "2024-12-03T08:45:00Z"
    }
  ],

  // Contact information
  contact: {
    address: {
      street: "No. 15, Education Avenue",
      city: "Jos",
      state: "Plateau State", 
      country: "Nigeria",
      postalCode: "930001"
    },
    phone: {
      primary: "+234 73 123 4567",
      secondary: "+234 73 123 4568"
    },
    email: {
      general: "info@schoolname.edu.ng",
      admissions: "admissions@schoolname.edu.ng",
      principal: "principal@schoolname.edu.ng"
    },
    socialMedia: {
      facebook: "https://facebook.com/schoolname",
      twitter: "https://twitter.com/schoolname",
      instagram: "https://instagram.com/schoolname"
    },
    lastUpdated: "2024-11-30T16:20:00Z",
    updatedBy: "A001"
  },

  // Gallery content
  gallery: {
    categories: [
      {
        id: "academic",
        name: "Academic Activities",
        description: "Classroom learning and academic events",
        imageCount: 24
      },
      {
        id: "sports", 
        name: "Sports & Recreation",
        description: "Sports activities and competitions",
        imageCount: 18
      },
      {
        id: "cultural",
        name: "Cultural Events",
        description: "Cultural celebrations and traditional activities",
        imageCount: 15
      },
      {
        id: "graduation",
        name: "Graduation Ceremonies",
        description: "Student graduation and prize-giving ceremonies",
        imageCount: 12
      }
    ],
    featured: [
      {
        id: "img_001",
        title: "Science Laboratory Session",
        category: "academic",
        image: "/images/gallery/science-lab.jpg",
        uploadedAt: "2024-12-01T10:00:00Z"
      },
      {
        id: "img_002",
        title: "Inter-House Football Match",
        category: "sports",
        image: "/images/gallery/football-match.jpg", 
        uploadedAt: "2024-11-28T15:30:00Z"
      }
    ]
  },

  // Footer content
  footer: {
    description: "Committed to providing quality secondary education in Nigeria since 1999.",
    quickLinks: [
      { title: "About Us", url: "/about" },
      { title: "Academics", url: "/academics" },
      { title: "Admissions", url: "/admissions" },
      { title: "News & Events", url: "/news-events" },
      { title: "Contact", url: "/contact" }
    ],
    copyright: "© 2024 Nigerian Secondary School. All rights reserved.",
    lastUpdated: "2024-12-01T12:00:00Z",
    updatedBy: "A001"
  }
};

// Content management settings
export const contentSettings = {
  allowedImageTypes: ['jpg', 'jpeg', 'png', 'gif'],
  maxImageSize: 5242880, // 5MB
  maxNewsLength: 5000,
  maxEventDescription: 1000,
  autoPublish: false,
  requireApproval: true,
  seoEnabled: true
};

// Content editing permissions by role
export const contentPermissions = {
  super_admin: {
    canEdit: true,
    canPublish: true,
    canDelete: true,
    canManageUsers: true,
    sections: ['all']
  },
  admin: {
    canEdit: true,
    canPublish: true,
    canDelete: false,
    canManageUsers: false,
    sections: ['homepage', 'about', 'academics', 'news', 'events', 'gallery', 'contact']
  },
  teacher: {
    canEdit: false,
    canPublish: false,
    canDelete: false,
    canManageUsers: false,
    sections: []
  },
  parent: {
    canEdit: false,
    canPublish: false, 
    canDelete: false,
    canManageUsers: false,
    sections: []
  }
};

export default websiteContent;