// pages/website/academics/AcademicCalendar.jsx
import { Calendar, Clock, BookOpen, Trophy } from 'lucide-react';

const AcademicCalendar = () => {
  const terms = [
    { name: "First Term", period: "Sep - Dec 2024", status: "completed", color: "green" },
    { name: "Second Term", period: "Jan - Apr 2025", status: "current", color: "blue" },
    { name: "Third Term", period: "Apr - Jul 2025", status: "upcoming", color: "orange" }
  ];

  const events = [
    { title: "Resumption", date: "Jan 8", type: "academic", color: "blue" },
    { title: "Mid-Term Break", date: "Feb 15-19", type: "break", color: "green" },
    { title: "Inter-House Sports", date: "Mar 12-14", type: "sports", color: "orange" },
    { title: "Parent Meeting", date: "Mar 20", type: "meeting", color: "purple" },
    { title: "Terminal Exams", date: "Apr 1-10", type: "exam", color: "red" }
  ];

  const holidays = [
    { name: "New Year", date: "Jan 1", color: "green" },
    { name: "Good Friday", date: "Mar 29", color: "purple" },
    { name: "Workers' Day", date: "May 1", color: "orange" },
    { name: "Children's Day", date: "May 27", color: "blue" },
    { name: "Independence Day", date: "Oct 1", color: "green" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero */}
      <div className="bg-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Academic Calendar</h1>
          <p className="text-xl text-primary-200">2024/2025 Academic Session</p>
        </div>
      </div>

      {/* Terms */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Academic Terms</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {terms.map((term, i) => (
              <div key={i} className={`bg-${term.color}-50 p-6 rounded-2xl shadow-lg border-l-4 border-${term.color}-500`}>
                <h3 className={`text-xl font-bold text-${term.color}-800 mb-2`}>{term.name}</h3>
                <p className="text-neutral-600 mb-4">{term.period}</p>
                <span className={`px-3 py-1 text-xs bg-${term.color}-200 text-${term.color}-700 rounded-full capitalize`}>
                  {term.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <div key={i} className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${event.color}-500`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`font-bold text-${event.color}-800 mb-2`}>{event.title}</h4>
                    <p className="text-neutral-600">{event.date}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs bg-${event.color}-100 text-${event.color}-700 rounded capitalize`}>
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holidays */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">Public Holidays</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {holidays.map((holiday, i) => (
              <div key={i} className={`bg-${holiday.color}-50 p-4 rounded-lg text-center shadow-sm`}>
                <h4 className={`font-bold text-${holiday.color}-800 mb-1`}>{holiday.name}</h4>
                <p className="text-neutral-600 text-sm">{holiday.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;