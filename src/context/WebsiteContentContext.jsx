import { createContext, useState, useContext } from "react";

// Website content data
const websiteContent = {
  school: {
    name: "Molek School",
    tagline: "Excellence in Nigerian Secondary Education",
    location: "Lagos, Nigeria",
    established: "2010",
    motto: "Knowledge, Integrity, Excellence",
  },

  about: {
    overview:
      "Molek School is a premier Nigerian secondary school committed to providing quality education through our comprehensive JSS and SSS programs. We prepare students for WAEC, NECO, and future academic success.",
    vision:
      "To be Nigeria's leading secondary school, nurturing globally competitive students rooted in African values.",
    mission:
      "To provide excellent secondary education through innovative teaching methods, character development, and academic excellence in JSS and SSS programs.",
    coreValues: [
      {
        title: "Academic Excellence",
        description: "Commitment to outstanding educational achievement",
      },
      {
        title: "Integrity",
        description: "Honesty and moral uprightness in all our dealings",
      },
      {
        title: "Innovation",
        description: "Modern teaching methods and educational technology",
      },
      {
        title: "Respect",
        description: "Valuing diversity and treating everyone with dignity",
      },
    ],
  },

  history: {
    milestones: [
      {
        year: "2010",
        event: "School Establishment",
        description: "Founded with 50 students and 8 teachers",
      },
      {
        year: "2013",
        event: "First WAEC Results",
        description: "95% pass rate in our first WAEC examination",
      },
      {
        year: "2016",
        event: "Infrastructure Expansion",
        description: "New science laboratories and computer center",
      },
      {
        year: "2020",
        event: "Digital Learning",
        description: "Launched online learning platform during COVID-19",
      },
      {
        year: "2024",
        event: "Excellence Award",
        description: "Recognized as top performing school in Lagos State",
      },
    ],
  },

  leadership: [
    {
      name: "Dr. Adebayo Johnson",
      position: "Principal",
      qualification: "Ph.D. in Educational Administration",
      experience: "15 years",
      image: "/images/principal.jpg",
    },
    {
      name: "Mrs. Folake Adeyemi",
      position: "Vice Principal (Academics)",
      qualification: "M.Ed. in Curriculum Development",
      experience: "12 years",
      image: "/images/vp-academics.jpg",
    },
    {
      name: "Mr. Chukwudi Okafor",
      position: "Vice Principal (Administration)",
      qualification: "MBA in Management",
      experience: "10 years",
      image: "/images/vp-admin.jpg",
    },
  ],

  stats: [
    { label: "Students Enrolled", value: "850+", color: "primary" },
    { label: "Teaching Staff", value: "65", color: "secondary" },
    { label: "WAEC Pass Rate", value: "98%", color: "accent" },
    { label: "Years of Excellence", value: "14", color: "primary" },
  ],

  testimonials: [
    {
      name: "Mrs. Blessing Okonkwo",
      role: "Parent",
      content:
        "Molek School has transformed my daughter's academic journey. The teachers are dedicated and the facilities are excellent.",
      rating: 5,
    },
    {
      name: "David Adebayo",
      role: "Alumni (Class of 2022)",
      content:
        "The education I received at Molek School prepared me well for university. I'm proud to be an alumnus.",
      rating: 5,
    },
    {
      name: "Mr. Ibrahim Hassan",
      role: "Parent",
      content:
        "Outstanding school with a commitment to both academic excellence and character development.",
      rating: 5,
    },
  ],
};

// Create context
const WebsiteContentContext = createContext();

// Provider component
export const WebsiteContentProvider = ({ children }) => {
  const [content, setContent] = useState(websiteContent);
  const [loading, setLoading] = useState(false);

  // Update a section
  const updateContent = (section, newData) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...newData,
      },
    }));
  };

  // Get a section
  const getContent = (section) => content[section];

  return (
    <WebsiteContentContext.Provider
      value={{ content, loading, updateContent, getContent }}
    >
      {children}
    </WebsiteContentContext.Provider>
  );
};

// Custom hook for consuming context
export const useWebsiteContent = () => {
  const context = useContext(WebsiteContentContext);
  if (!context) {
    throw new Error(
      "useWebsiteContent must be used within a WebsiteContentProvider"
    );
  }
  return context;
};
