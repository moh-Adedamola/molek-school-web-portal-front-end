// pages/website/academics/Subjects.jsx

const Subjects = () => {
  const jssSubjects = [
    { name: "Mathematics", code: "MTH", color: "blue", required: true },
    { name: "English Language", code: "ENG", color: "green", required: true },
    { name: "Basic Science", code: "BSC", color: "purple", required: true },
    { name: "Basic Technology", code: "BTC", color: "orange", required: true },
    { name: "Social Studies", code: "SOS", color: "red", required: true },
    { name: "Physical Health Education", code: "PHE", color: "teal", required: true },
    { name: "Creative Arts", code: "CCA", color: "pink", required: false },
    { name: "Computer Studies", code: "CMP", color: "indigo", required: false },
    { name: "French Language", code: "FRE", color: "yellow", required: false },
    { name: "Religious Studies", code: "CRS", color: "gray", required: false }
  ];

  const sssStreams = {
    sciences: [
      { name: "Mathematics", code: "MTH", color: "blue", required: true },
      { name: "English Language", code: "ENG", color: "green", required: true },
      { name: "Physics", code: "PHY", color: "purple", required: true },
      { name: "Chemistry", code: "CHE", color: "red", required: true },
      { name: "Biology", code: "BIO", color: "teal", required: true },
      { name: "Further Mathematics", code: "FMT", color: "indigo", required: false },
      { name: "Geography", code: "GEO", color: "orange", required: false },
      { name: "Agricultural Science", code: "AGR", color: "green", required: false }
    ],
    arts: [
      { name: "English Language", code: "ENG", color: "green", required: true },
      { name: "Mathematics", code: "MTH", color: "blue", required: true },
      { name: "Literature in English", code: "LIT", color: "purple", required: true },
      { name: "History", code: "HIS", color: "red", required: true },
      { name: "Government", code: "GOV", color: "orange", required: true },
      { name: "Geography", code: "GEO", color: "teal", required: false },
      { name: "CRS/IRS", code: "CRS", color: "gray", required: false },
      { name: "French", code: "FRE", color: "yellow", required: false }
    ],
    commercial: [
      { name: "English Language", code: "ENG", color: "green", required: true },
      { name: "Mathematics", code: "MTH", color: "blue", required: true },
      { name: "Accounting", code: "ACC", color: "purple", required: true },
      { name: "Economics", code: "ECO", color: "red", required: true },
      { name: "Commerce", code: "COM", color: "orange", required: true },
      { name: "Marketing", code: "MKT", color: "teal", required: false },
      { name: "Office Practice", code: "OFP", color: "pink", required: false },
      { name: "Government", code: "GOV", color: "indigo", required: false }
    ]
  };

  const SubjectCard = ({ subject }) => (
    <div className={`bg-gradient-to-br from-${subject.color}-50 to-${subject.color}-100 p-4 rounded-lg border-l-4 border-${subject.color}-500 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-semibold text-${subject.color}-800`}>{subject.name}</h4>
        <span className={`px-2 py-1 text-xs font-medium bg-${subject.color}-200 text-${subject.color}-700 rounded`}>
          {subject.code}
        </span>
      </div>
      {subject.required && (
        <span className="inline-block px-2 py-1 text-xs bg-red-100 text-red-700 rounded font-medium">
          Required
        </span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero */}
      <div className="bg-primary-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Subject Offerings</h1>
          <p className="text-xl text-primary-200">Comprehensive curriculum aligned with Nigerian educational standards</p>
        </div>
      </div>

      {/* JSS Subjects */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 mb-8">Junior Secondary School (JSS 1-3)</h2>
          <p className="text-neutral-600 mb-8">Foundation subjects that prepare students for specialized learning in senior classes.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jssSubjects.map((subject, index) => (
              <SubjectCard key={index} subject={subject} />
            ))}
          </div>
        </div>
      </div>

      {/* SSS Streams */}
      <div className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-800 mb-12 text-center">Senior Secondary School (SSS 1-3) Streams</h2>
          
          {/* Sciences Stream */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">🔬</span>
              <h3 className="text-2xl font-bold text-blue-600">Science Stream</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sssStreams.sciences.map((subject, index) => (
                <SubjectCard key={index} subject={subject} />
              ))}
            </div>
          </div>

          {/* Arts Stream */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">📚</span>
              <h3 className="text-2xl font-bold text-green-600">Arts Stream</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sssStreams.arts.map((subject, index) => (
                <SubjectCard key={index} subject={subject} />
              ))}
            </div>
          </div>

          {/* Commercial Stream */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-3xl mr-3">💼</span>
              <h3 className="text-2xl font-bold text-orange-600">Commercial Stream</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sssStreams.commercial.map((subject, index) => (
                <SubjectCard key={index} subject={subject} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Exam Info */}
      <div className="py-16 bg-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Examination Preparation</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">WAEC</h3>
              <p className="text-primary-200">West African Senior School Certificate Examination</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">NECO</h3>
              <p className="text-primary-200">National Examinations Council</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">JAMB</h3>
              <p className="text-primary-200">Joint Admissions and Matriculation Board</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;