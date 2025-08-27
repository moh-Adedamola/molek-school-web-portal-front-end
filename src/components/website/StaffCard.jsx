const StaffCard = ({ 
  staff,
  variant = "default", // "default", "compact", "detailed"
  showContact = false,
  showBio = false,
  className = ""
}) => {
  
  const defaultStaff = {
    id: 1,
    name: "Dr. Samuel Oladele",
    position: "Principal",
    department: "Administration",
    image: "/api/placeholder/300/300",
    email: "principal@molekschool.edu.ng",
    phone: "+234 803 123 4567",
    qualifications: ["PhD in Educational Administration", "M.Ed in Curriculum Development", "B.Ed in Mathematics"],
    specializations: ["School Management", "Educational Leadership", "Curriculum Development"],
    experience: "15 years",
    bio: "Dr. Samuel Oladele brings over 15 years of educational leadership experience to Molek School. He is passionate about transforming Nigerian secondary education through innovative teaching methods and comprehensive student development programs.",
    socialLinks: {
      linkedin: "#",
      twitter: "#"
    },
    achievements: [
      "Best Principal Award - Lagos State 2023",
      "Educational Excellence Recognition",
      "WAEC Outstanding School Leadership"
    ],
    subjects: ["Mathematics", "Further Mathematics"], // for teachers
    classes: ["SSS 1A", "SSS 2B"], // for teachers
    officeHours: "Monday - Friday: 8:00 AM - 4:00 PM",
    joinedDate: "2020-01-15"
  };

  const staffData = staff || defaultStaff;

  const getPositionColor = (position) => {
    const colors = {
      'Principal': 'bg-primary-600 text-white',
      'Vice Principal': 'bg-primary-500 text-white',
      'Head of Department': 'bg-secondary-600 text-white',
      'Senior Teacher': 'bg-secondary-500 text-white',
      'Teacher': 'bg-accent-600 text-white',
      'Administrator': 'bg-purple-600 text-white',
      'Librarian': 'bg-emerald-600 text-white',
      'Counselor': 'bg-indigo-600 text-white'
    };
    return colors[position] || 'bg-neutral-600 text-white';
  };

  const getDepartmentIcon = (department) => {
    const icons = {
      'Administration': '⚙️',
      'Mathematics': '🧮',
      'Science': '🔬',
      'English': '📝',
      'Social Studies': '🌍',
      'Arts': '🎨',
      'Physical Education': '⚽',
      'Library': '📚',
      'Guidance': '💡'
    };
    return icons[department] || '👨‍🏫';
  };

  if (variant === "compact") {
    return (
      <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-neutral-100 ${className}`}>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={staffData.image} 
              alt={staffData.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center text-white text-xs">
              {getDepartmentIcon(staffData.department)}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-primary-800 truncate">{staffData.name}</h3>
            <p className="text-sm text-secondary-600 truncate">{staffData.position}</p>
            <p className="text-xs text-neutral-500 truncate">{staffData.department}</p>
          </div>
          
          <div className="flex flex-col space-y-1">
            {showContact && (
              <>
                <a href={`mailto:${staffData.email}`} className="text-primary-600 hover:text-primary-800 text-xs">
                  📧
                </a>
                <a href={`tel:${staffData.phone}`} className="text-secondary-600 hover:text-secondary-800 text-xs">
                  📞
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100 ${className}`}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 p-6">
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPositionColor(staffData.position)}`}>
              {staffData.position}
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img 
                src={staffData.image} 
                alt={staffData.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                {getDepartmentIcon(staffData.department)}
              </div>
            </div>
            
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-1">{staffData.name}</h2>
              <p className="text-primary-100 font-medium">{staffData.position}</p>
              <p className="text-primary-200 text-sm">{staffData.department}</p>
              <div className="flex items-center mt-2 text-sm">
                <span className="bg-white/20 px-2 py-1 rounded-full">
                  {staffData.experience} experience
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Bio */}
          {showBio && staffData.bio && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary-800 mb-2">About</h3>
              <p className="text-neutral-700 leading-relaxed text-sm">{staffData.bio}</p>
            </div>
          )}

          {/* Qualifications */}
          <div className="mb-6">
            <h3 className="font-semibold text-primary-800 mb-3">Qualifications</h3>
            <div className="space-y-2">
              {staffData.qualifications?.map((qual, index) => (
                <div key={index} className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mr-3"></span>
                  <span className="text-neutral-700">{qual}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specializations */}
          {staffData.specializations && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary-800 mb-3">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {staffData.specializations.map((spec, index) => (
                  <span key={index} className="px-3 py-1 bg-secondary-50 text-secondary-700 rounded-full text-xs font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Teaching Details (for teachers) */}
          {staffData.subjects && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary-800 mb-3">Subjects & Classes</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-600 mb-2">Subjects</h4>
                  {staffData.subjects.map((subject, index) => (
                    <div key={index} className="text-sm text-neutral-700 mb-1">• {subject}</div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-neutral-600 mb-2">Classes</h4>
                  {staffData.classes?.map((cls, index) => (
                    <div key={index} className="text-sm text-neutral-700 mb-1">• {cls}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Achievements */}
          {staffData.achievements && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary-800 mb-3">Achievements</h3>
              <div className="space-y-2">
                {staffData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className="text-accent-500 mr-2">🏆</span>
                    <span className="text-neutral-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          {showContact && (
            <div className="mb-6">
              <h3 className="font-semibold text-primary-800 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <span className="text-primary-600 mr-3">📧</span>
                  <a href={`mailto:${staffData.email}`} className="text-primary-600 hover:text-primary-800">
                    {staffData.email}
                  </a>
                </div>
                <div className="flex items-center text-sm">
                  <span className="text-secondary-600 mr-3">📞</span>
                  <a href={`tel:${staffData.phone}`} className="text-secondary-600 hover:text-secondary-800">
                    {staffData.phone}
                  </a>
                </div>
                {staffData.officeHours && (
                  <div className="flex items-center text-sm">
                    <span className="text-accent-600 mr-3">🕒</span>
                    <span className="text-neutral-700">{staffData.officeHours}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social Links */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
            <div className="flex space-x-3">
              {staffData.socialLinks?.linkedin && (
                <a href={staffData.socialLinks.linkedin} className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center hover:bg-primary-200 transition-colors duration-300">
                  <span className="text-sm">in</span>
                </a>
              )}
              {staffData.socialLinks?.twitter && (
                <a href={staffData.socialLinks.twitter} className="w-8 h-8 bg-secondary-100 text-secondary-600 rounded-full flex items-center justify-center hover:bg-secondary-200 transition-colors duration-300">
                  <span className="text-sm">𝕏</span>
                </a>
              )}
            </div>
            
            <div className="text-xs text-neutral-500">
              Joined {new Date(staffData.joinedDate).getFullYear()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-primary-100 ${className}`}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={staffData.image} 
          alt={staffData.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Position badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPositionColor(staffData.position)}`}>
            {staffData.position}
          </span>
        </div>
        
        {/* Department icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-lg">
          {getDepartmentIcon(staffData.department)}
        </div>
        
        {/* Contact overlay */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-center space-x-4">
            <a href={`mailto:${staffData.email}`} className="w-10 h-10 bg-white/90 backdrop-blur-sm text-primary-600 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300">
              <span className="text-sm">📧</span>
            </a>
            <a href={`tel:${staffData.phone}`} className="w-10 h-10 bg-white/90 backdrop-blur-sm text-secondary-600 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-300">
              <span className="text-sm">📞</span>
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-primary-800 group-hover:text-primary-600 transition-colors duration-300">
            {staffData.name}
          </h3>
          <p className="text-secondary-600 font-medium">{staffData.position}</p>
          <p className="text-sm text-neutral-500">{staffData.department}</p>
        </div>

        {/* Experience badge */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 bg-accent-50 text-accent-700 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-accent-500 rounded-full mr-2"></span>
            {staffData.experience} experience
          </span>
        </div>

        {/* Qualifications preview */}
        <div className="mb-4">
          <h4 className="font-medium text-neutral-800 mb-2 text-sm">Key Qualifications</h4>
          <div className="space-y-1">
            {staffData.qualifications?.slice(0, 2).map((qual, index) => (
              <div key={index} className="flex items-center text-xs text-neutral-600">
                <span className="w-1.5 h-1.5 bg-secondary-400 rounded-full mr-2"></span>
                <span>{qual}</span>
              </div>
            ))}
            {staffData.qualifications?.length > 2 && (
              <div className="text-xs text-neutral-500 italic">
                +{staffData.qualifications.length - 2} more
              </div>
            )}
          </div>
        </div>

        {/* Subjects (for teachers) */}
        {staffData.subjects && (
          <div className="mb-4">
            <h4 className="font-medium text-neutral-800 mb-2 text-sm">Subjects</h4>
            <div className="flex flex-wrap gap-1">
              {staffData.subjects.slice(0, 2).map((subject, index) => (
                <span key={index} className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs">
                  {subject}
                </span>
              ))}
              {staffData.subjects.length > 2 && (
                <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">
                  +{staffData.subjects.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <div className="text-xs text-neutral-500">
            Since {new Date(staffData.joinedDate).getFullYear()}
          </div>
          <button className="text-primary-600 hover:text-primary-800 font-medium text-sm transition-colors duration-300 flex items-center">
            View Profile
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffCard;