// Mock Website Content Data - Nigerian School Context
export const mockContent = {
  // About Us Content
  about: {
    overview: {
      title: "About Molek School",
      subtitle: "Excellence in Nigerian Secondary Education",
      content: `
        Established in 1985, Molek School has been a beacon of academic excellence in Lagos State, Nigeria. 
        We are committed to providing comprehensive secondary education that prepares students for success 
        in higher education and life beyond the classroom.
        
        Our school serves students from JSS 1 through SSS 3, offering both Junior and Senior Secondary 
        programs aligned with the Nigerian National Curriculum. We pride ourselves on our holistic approach 
        to education, combining academic rigor with character development and practical skills.
      `,
      achievements: [
        "95% WAEC pass rate in 2024",
        "Over 3,000 successful graduates since 1985",
        "State recognition for academic excellence",
        "Modern facilities and qualified teachers",
        "Strong alumni network across various professions"
      ]
    },
    
    visionMission: {
      vision: "To be the leading secondary school in Nigeria, known for academic excellence, character development, and producing well-rounded graduates who contribute meaningfully to society.",
      
      mission: "To provide quality, affordable, and accessible secondary education that nurtures intellectual growth, moral values, and practical skills necessary for success in the 21st century.",
      
      coreValues: [
        {
          title: "Excellence",
          description: "We strive for the highest standards in all our endeavors, encouraging students to reach their full potential."
        },
        {
          title: "Integrity",
          description: "We uphold honesty, transparency, and ethical behavior in all our interactions and decisions."
        },
        {
          title: "Innovation",
          description: "We embrace modern teaching methods and technology to enhance the learning experience."
        },
        {
          title: "Inclusivity",
          description: "We welcome students from all backgrounds and provide equal opportunities for success."
        },
        {
          title: "Community",
          description: "We foster a sense of belonging and encourage active participation in school and community life."
        }
      ]
    },

    history: {
      title: "Our Rich Heritage",
      founding: {
        year: 1985,
        story: `Molek School was founded in 1985 by Chief Dr. Adebayo Molek, a visionary educator who believed 
                in the transformative power of quality education. Starting with just 45 students and 8 teachers, 
                the school has grown to become one of Lagos State's most respected secondary institutions.`
      },
      
      milestones: [
        {
          year: 1985,
          event: "School establishment with 45 students",
          description: "Molek School opens its doors with a vision for educational excellence"
        },
        {
          year: 1990,
          event: "First graduating class achieves 100% WAEC pass rate",
          description: "Early demonstration of academic excellence sets the standard"
        },
        {
          year: 1995,
          event: "Introduction of computer studies program",
          description: "Pioneer in ICT education in Lagos State secondary schools"
        },
        {
          year: 2000,
          event: "Construction of modern science laboratories",
          description: "Investment in STEM education infrastructure"
        },
        {
          year: 2010,
          event: "Recognition as Lagos State Model School",
          description: "Official recognition for outstanding educational standards"
        },
        {
          year: 2020,
          event: "Launch of digital learning platform",
          description: "Adaptation to modern educational technologies"
        },
        {
          year: 2024,
          event: "New computer laboratory with 50 systems",
          description: "Continued investment in ICT infrastructure"
        }
      ]
    }
  },

  // Academics Content
  academics: {
    overview: {
      title: "Academic Excellence",
      subtitle: "Comprehensive Nigerian Secondary Education",
      content: `
        Our academic program is designed to meet the highest standards of Nigerian secondary education, 
        preparing students for WAEC, NECO, and JAMB examinations while fostering critical thinking and 
        practical skills development.
      `,
      
      levels: [
        {
          name: "Junior Secondary School (JSS)",
          grades: "JSS 1 - JSS 3",
          ageRange: "10-13 years",
          description: "Foundation years focusing on core subjects and skill development",
          subjects: [
            "Mathematics", "English Language", "Basic Science", "Social Studies",
            "Computer Studies", "Religious Studies", "Physical Education",
            "Fine Arts", "Music", "French Language"
          ]
        },
        {
          name: "Senior Secondary School (SSS)",
          grades: "SSS 1 - SSS 3",
          ageRange: "13-16 years",
          description: "Specialized education with focus on chosen career paths",
          streams: [
            {
              name: "Science",
              subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Further Mathematics", "Computer Science"]
            },
            {
              name: "Arts/Humanities",
              subjects: ["Literature", "History", "Government", "Economics", "Geography", "Fine Arts"]
            },
            {
              name: "Commercial",
              subjects: ["Accounting", "Economics", "Commerce", "Business Studies", "Marketing", "Office Practice"]
            }
          ]
        }
      ]
    },

    curriculum: {
      title: "Nigerian National Curriculum",
      description: "Our curriculum is fully aligned with the Nigerian Educational Research and Development Council (NERDC) standards",
      
      features: [
        "WAEC and NECO examination preparation",
        "JAMB-focused teaching methodologies",
        "Practical and laboratory work",
        "Continuous assessment system",
        "Co-curricular activities integration"
      ],

      assessmentSystem: {
        title: "Assessment and Grading",
        description: "We use a comprehensive assessment system that includes:",
        components: [
          "Continuous Assessment (40%)",
          "Mid-term Examinations (20%)",
          "End-term Examinations (40%)"
        ],
        
        gradingScale: [
          { grade: "A", range: "80-100", performance: "Excellent", color: "green" },
          { grade: "B", range: "70-79", performance: "Very Good", color: "blue" },
          { grade: "C", range: "60-69", performance: "Good", color: "yellow" },
          { grade: "D", range: "50-59", performance: "Pass", color: "orange" },
          { grade: "F", range: "0-49", performance: "Fail", color: "red" }
        ]
      }
    }
  },

  // Admissions Content
  admissions: {
    overview: {
      title: "Join the Molek Family",
      subtitle: "Start Your Journey to Excellence",
      content: `
        We welcome students who are ready to embrace academic challenges and personal growth. 
        Our admission process is designed to identify students who will thrive in our learning environment.
      `
    },

    requirements: {
      jss: {
        title: "JSS 1 Admission Requirements",
        documents: [
          "Completed admission form",
          "Birth certificate or age declaration",
          "Primary school leaving certificate",
          "Common entrance examination result",
          "Two recent passport photographs",
          "Medical certificate",
          "Letter of good conduct from previous school"
        ]
      },
      
      sss: {
        title: "SSS 1 Admission Requirements", 
        documents: [
          "Completed admission form",
          "JSS 3 certificate",
          "Junior WAEC (BECE) result",
          "Two recent passport photographs",
          "Medical certificate",
          "Letter of good conduct from previous school",
          "Stream selection form (Science/Arts/Commercial)"
        ]
      }
    },

    process: {
      title: "Admission Process",
      steps: [
        {
          step: 1,
          title: "Application Submission",
          description: "Complete and submit admission form with required documents"
        },
        {
          step: 2,
          title: "Entrance Examination",
          description: "Sit for school entrance examination (Mathematics, English, General Knowledge)"
        },
        {
          step: 3,
          title: "Interview Session",
          description: "Attend interview with parents/guardians"
        },
        {
          step: 4,
          title: "Admission Decision",
          description: "Receive admission decision within 2 weeks"
        },
        {
          step: 5,
          title: "Registration",
          description: "Complete registration and fee payment upon acceptance"
        }
      ]
    },

    fees: {
      title: "Fee Structure (2024/2025 Academic Year)",
      terms: "Fees are payable termly (3 terms per academic year)",
      
      structure: [
        {
          level: "JSS 1",
          tuition: 45000,
          development: 5000,
          books: 8000,
          uniform: 12000,
          total: 70000
        },
        {
          level: "JSS 2",
          tuition: 48000,
          development: 5000,
          books: 8000,
          uniform: 0,
          total: 61000
        },
        {
          level: "JSS 3",
          tuition: 50000,
          development: 5000,
          books: 8000,
          uniform: 0,
          total: 63000
        },
        {
          level: "SSS 1",
          tuition: 65000,
          development: 8000,
          books: 12000,
          uniform: 15000,
          total: 100000
        },
        {
          level: "SSS 2",
          tuition: 68000,
          development: 8000,
          books: 12000,
          uniform: 0,
          total: 88000
        },
        {
          level: "SSS 3",
          tuition: 70000,
          development: 8000,
          books: 12000,
          uniform: 0,
          total: 90000
        }
      ]
    }
  },

  // Contact Information
  contact: {
    main: {
      schoolName: "Molek School",
      address: {
        street: "15 Education Drive, Ikeja",
        city: "Lagos",
        state: "Lagos State",
        country: "Nigeria",
        postalCode: "100001"
      },
      
      phone: {
        main: "+234-801-234-5678",
        office: "+234-809-876-5432",
        admissions: "+234-807-123-4567"
      },
      
      email: {
        main: "info@molekschool.edu.ng",
        admissions: "admissions@molekschool.edu.ng",
        principal: "principal@molekschool.edu.ng"
      },
      
      website: "www.molekschool.edu.ng",
      
      workingHours: {
        weekdays: "7:30 AM - 4:00 PM",
        saturday: "8:00 AM - 2:00 PM",
        sunday: "Closed"
      }
    },

    departments: [
      {
        name: "Principal's Office",
        head: "Mrs. Adebisi Ogundimu",
        phone: "+234-801-234-5678",
        email: "principal@molekschool.edu.ng"
      },
      {
        name: "Academic Office",
        head: "Mr. Tunde Adeyemi",
        phone: "+234-809-876-5432",
        email: "academics@molekschool.edu.ng"
      },
      {
        name: "Admissions Office", 
        head: "Mrs. Funmi Adebayo",
        phone: "+234-807-123-4567",
        email: "admissions@molekschool.edu.ng"
      },
      {
        name: "Bursary Department",
        head: "Mr. Kunle Ogundimu",
        phone: "+234-805-987-6543",
        email: "bursary@molekschool.edu.ng"
      }
    ]
  }
};

// Content helper functions
export const getContentBySection = (section) => {
  return mockContent[section] || null;
};

export const getAboutContent = () => {
  return mockContent.about;
};

export const getAcademicsContent = () => {
  return mockContent.academics;
};

export const getAdmissionsContent = () => {
  return mockContent.admissions;
};

export const getContactInfo = () => {
  return mockContent.contact;
};

export default mockContent;