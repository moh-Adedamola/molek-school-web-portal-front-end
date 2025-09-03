// File: src/pages/website/academics/AcademicCalendar.jsx
import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Award, Users, AlertCircle } from 'lucide-react';

const AcademicCalendar = () => {
  const [selectedTerm, setSelectedTerm] = useState('first');

  const academicYear = '2024/2025';
  
  const terms = {
    first: {
      name: 'First Term',
      period: 'September - December 2024',
      totalWeeks: 13,
      events: [
        {
          date: 'September 9, 2024',
          title: 'Resumption of Classes',
          type: 'academic',
          description: 'All students return for First Term'
        },
        {
          date: 'September 23, 2024',
          title: 'Inter-House Sports',
          type: 'sports',
          description: 'Annual inter-house sports competition'
        },
        {
          date: 'October 1, 2024',
          title: 'National Day Holiday',
          type: 'holiday',
          description: 'Nigeria Independence Day - No classes'
        },
        {
          date: 'October 15-18, 2024',
          title: 'Mid-Term Break',
          type: 'break',
          description: '4-day mid-term break'
        },
        {
          date: 'November 5-15, 2024',
          title: 'First Term Examinations',
          type: 'exam',
          description: 'End of First Term examinations'
        },
        {
          date: 'November 20, 2024',
          title: 'Parent-Teacher Conference',
          type: 'meeting',
          description: 'Discussion of students\' academic progress'
        },
        {
          date: 'December 20, 2024',
          title: 'End of First Term',
          type: 'academic',
          description: 'School closes for Christmas holidays'
        }
      ]
    },
    second: {
      name: 'Second Term',
      period: 'January - April 2025',
      totalWeeks: 13,
      events: [
        {
          date: 'January 8, 2025',
          title: 'Resumption of Classes',
          type: 'academic',
          description: 'All students return for Second Term'
        },
        {
          date: 'February 14, 2025',
          title: 'Cultural Day',
          type: 'cultural',
          description: 'Celebration of Nigerian culture and traditions'
        },
        {
          date: 'February 24-28, 2025',
          title: 'Mid-Term Break',
          type: 'break',
          description: '5-day mid-term break'
        },
        {
          date: 'March 10-20, 2025',
          title: 'Second Term Examinations',
          type: 'exam',
          description: 'End of Second Term examinations'
        },
        {
          date: 'March 25, 2025',
          title: 'Science Fair',
          type: 'academic',
          description: 'Annual science exhibition and competition'
        },
        {
          date: 'April 10, 2025',
          title: 'Parent-Teacher Conference',
          type: 'meeting',
          description: 'Discussion of students\' academic progress'
        },
        {
          date: 'April 18, 2025',
          title: 'End of Second Term',
          type: 'academic',
          description: 'School closes for Easter holidays'
        }
      ]
    },
    third: {
      name: 'Third Term',
      period: 'May - July 2025',
      totalWeeks: 10,
      events: [
        {
          date: 'May 5, 2025',
          title: 'Resumption of Classes',
          type: 'academic',
          description: 'All students return for Third Term'
        },
        {
          date: 'May 12-June 6, 2025',
          title: 'WAEC Examinations (SSS 3)',
          type: 'exam',
          description: 'West African Examinations Council examinations'
        },
        {
          date: 'May 29, 2025',
          title: 'Democracy Day Holiday',
          type: 'holiday',
          description: 'Nigeria Democracy Day - No classes'
        },
        {
          date: 'June 9-20, 2025',
          title: 'NECO Examinations (SSS 3)',
          type: 'exam',
          description: 'National Examinations Council examinations'
        },
        {
          date: 'June 23-July 3, 2025',
          title: 'Third Term Examinations',
          type: 'exam',
          description: 'End of Third Term examinations (JSS & SSS 1-2)'
        },
        {
          date: 'July 10, 2025',
          title: 'Graduation Ceremony',
          type: 'graduation',
          description: 'SSS 3 graduation and prize giving'
        },
        {
          date: 'July 18, 2025',
          title: 'End of Academic Year',
          type: 'academic',
          description: 'School closes for long vacation'
        }
      ]
    }
  };

  const eventTypeStyles = {
    academic: { bg: 'bg-primary-100', text: 'text-primary-700', icon: <BookOpen className="w-4 h-4" /> },
    exam: { bg: 'bg-accent-100', text: 'text-accent-700', icon: <Award className="w-4 h-4" /> },
    holiday: { bg: 'bg-secondary-100', text: 'text-secondary-700', icon: <Calendar className="w-4 h-4" /> },
    break: { bg: 'bg-neutral-100', text: 'text-neutral-700', icon: <Clock className="w-4 h-4" /> },
    meeting: { bg: 'bg-purple-100', text: 'text-purple-700', icon: <Users className="w-4 h-4" /> },
    sports: { bg: 'bg-orange-100', text: 'text-orange-700', icon: <Award className="w-4 h-4" /> },
    cultural: { bg: 'bg-pink-100', text: 'text-pink-700', icon: <Users className="w-4 h-4" /> },
    graduation: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: <Award className="w-4 h-4" /> }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container-max py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Academic Calendar {academicYear}
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto text-balance">
              Important dates and events for the current academic year
            </p>
          </div>

          {/* Term Selector */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-2xl mx-auto">
            {Object.entries(terms).map(([key, term]) => (
              <button
                key={key}
                onClick={() => setSelectedTerm(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  selectedTerm === key
                    ? 'btn-primary text-white'
                    : 'btn-outline text-primary-600'
                }`}
              >
                {term.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            
            {/* Term Overview */}
            <div className="card-base mb-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                  {terms[selectedTerm].name}
                </h2>
                <p className="text-lg text-neutral-600 mb-4">
                  {terms[selectedTerm].period}
                </p>
                <div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-primary-600" />
                  <span className="text-primary-700 font-medium">
                    {terms[selectedTerm].totalWeeks} Teaching Weeks
                  </span>
                </div>
              </div>
            </div>

            {/* Events Timeline */}
            <div className="card-base">
              <h3 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                Term Events & Important Dates
              </h3>
              
              <div className="space-y-4">
                {terms[selectedTerm].events.map((event, index) => {
                  const style = eventTypeStyles[event.type] || eventTypeStyles.academic;
                  
                  return (
                    <div key={index} className="flex gap-4 items-start p-4 rounded-lg border border-neutral-200 hover:shadow-sm transition-shadow duration-200">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${style.bg} ${style.text}`}>
                        {style.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h4 className="font-semibold text-neutral-800">
                            {event.title}
                          </h4>
                          <span className="text-sm font-medium text-neutral-600">
                            {event.date}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Important Notes */}
            <div className="card-base mt-8">
              <h3 className="text-xl font-bold text-neutral-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent-600" />
                Important Notes
              </h3>
              
              <div className="space-y-4 text-sm text-neutral-700">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    All examination dates are provisional and subject to change based on 
                    WAEC and NECO official timetables.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    Students are expected to resume punctually on the specified dates. 
                    Late resumption may affect academic performance.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    Parent-Teacher conferences are mandatory for all parents/guardians. 
                    Individual appointments can be scheduled if needed.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    School fees must be paid within the first two weeks of each term 
                    resumption to avoid disruption of studies.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="card-base text-center">
                <BookOpen className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                <h4 className="font-semibold text-neutral-800 mb-2">Academic Sessions</h4>
                <p className="text-sm text-neutral-600">
                  Classes run Monday to Friday, 7:30 AM - 3:00 PM
                </p>
              </div>
              
              <div className="card-base text-center">
                <Award className="w-12 h-12 text-accent-600 mx-auto mb-3" />
                <h4 className="font-semibold text-neutral-800 mb-2">Examinations</h4>
                <p className="text-sm text-neutral-600">
                  Mid-term tests and end-of-term examinations each term
                </p>
              </div>
              
              <div className="card-base text-center">
                <Users className="w-12 h-12 text-secondary-600 mx-auto mb-3" />
                <h4 className="font-semibold text-neutral-800 mb-2">Parent Engagement</h4>
                <p className="text-sm text-neutral-600">
                  Regular meetings and progress updates throughout the year
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;