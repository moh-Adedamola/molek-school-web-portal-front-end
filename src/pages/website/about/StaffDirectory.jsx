// File: src/pages/website/about/StaffDirectory.jsx
import React, { useState } from 'react';
import { Search, Filter, Users } from 'lucide-react';
import StaffCard from '../../../components/website/StaffCard';

const StaffDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Mock staff data
  const staffMembers = [
    {
      id: 1,
      name: 'Mrs. Adunni Olatunji',
      position: 'Principal',
      department: 'Administration',
      qualification: 'M.Ed Educational Administration, B.Ed Mathematics',
      subjects: [],
      email: 'principal@school.edu.ng',
      phone: '+234 801 234 5678',
      experience: 20,
      bio: 'Passionate educator with over 20 years of experience in secondary education leadership.',
      image: null
    },
    {
      id: 2,
      name: 'Mr. Chike Okonkwo',
      position: 'Vice Principal (Academics)',
      department: 'Administration',
      qualification: 'M.Sc Physics, B.Ed Physics',
      subjects: ['Physics'],
      email: 'vp.academics@school.edu.ng',
      phone: '+234 802 345 6789',
      experience: 15,
      bio: 'Dedicated to academic excellence and student achievement in sciences.',
      image: null
    },
    {
      id: 3,
      name: 'Mrs. Fatima Ibrahim',
      position: 'Head of Mathematics Department',
      department: 'Mathematics',
      qualification: 'B.Sc Mathematics, PGDE',
      subjects: ['Mathematics', 'Further Mathematics'],
      email: 'f.ibrahim@school.edu.ng',
      phone: '+234 803 456 7890',
      experience: 12,
      bio: 'Mathematics specialist focused on making complex concepts accessible to all students.',
      image: null
    },
    {
      id: 4,
      name: 'Mr. Emmanuel Bassey',
      position: 'English Language Teacher',
      department: 'Languages',
      qualification: 'B.A English Language, PGDE',
      subjects: ['English Language', 'Literature'],
      email: 'e.bassey@school.edu.ng',
      phone: '+234 804 567 8901',
      experience: 8,
      bio: 'Passionate about developing students\' communication and literary skills.',
      image: null
    },
    {
      id: 5,
      name: 'Dr. Kemi Adebayo',
      position: 'Biology Teacher',
      department: 'Sciences',
      qualification: 'Ph.D Biology, B.Sc Biology',
      subjects: ['Biology', 'Agricultural Science'],
      email: 'k.adebayo@school.edu.ng',
      phone: '+234 805 678 9012',
      experience: 10,
      bio: 'Research-focused educator bringing practical science to the classroom.',
      image: null
    },
    {
      id: 6,
      name: 'Mrs. Grace Okoro',
      position: 'Chemistry Teacher',
      department: 'Sciences',
      qualification: 'M.Sc Chemistry, B.Ed Chemistry',
      subjects: ['Chemistry'],
      email: 'g.okoro@school.edu.ng',
      phone: '+234 806 789 0123',
      experience: 9,
      bio: 'Committed to making chemistry engaging and understandable for all students.',
      image: null
    },
    {
      id: 7,
      name: 'Mr. Biodun Ajayi',
      position: 'History Teacher',
      department: 'Social Sciences',
      qualification: 'B.A History, PGDE',
      subjects: ['History', 'Government'],
      email: 'b.ajayi@school.edu.ng',
      phone: '+234 807 890 1234',
      experience: 7,
      bio: 'Bringing Nigerian and world history to life for young minds.',
      image: null
    },
    {
      id: 8,
      name: 'Mrs. Hauwa Mohammed',
      position: 'Computer Science Teacher',
      department: 'Technology',
      qualification: 'B.Sc Computer Science, PGDE',
      subjects: ['Computer Science', 'Data Processing'],
      email: 'h.mohammed@school.edu.ng',
      phone: '+234 808 901 2345',
      experience: 6,
      bio: 'Technology enthusiast preparing students for the digital future.',
      image: null
    }
  ];

  const departments = [
    'all',
    'Administration',
    'Mathematics',
    'Sciences',
    'Languages',
    'Social Sciences',
    'Technology'
  ];

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.subjects.some(subject => 
                           subject.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesDepartment = filterDepartment === 'all' || 
                             staff.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-max py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Our Teaching Staff
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-balance">
              Meet our dedicated team of qualified educators committed to your child's success
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by name, position, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-base pl-10 w-full"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="input-base pl-10 pr-10 appearance-none bg-white min-w-[200px]"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="section-padding">
        <div className="container-max">
          {filteredStaff.length > 0 ? (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-neutral-600" />
                <span className="text-neutral-600">
                  Showing {filteredStaff.length} staff member{filteredStaff.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="grid gap-6">
                {filteredStaff.map(staff => (
                  <StaffCard key={staff.id} staff={staff} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-600 mb-2">
                No staff members found
              </h3>
              <p className="text-neutral-500">
                Try adjusting your search terms or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDirectory;