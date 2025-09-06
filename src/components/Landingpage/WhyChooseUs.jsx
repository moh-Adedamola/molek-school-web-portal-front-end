import {
    AcademicCapIcon,
    CheckCircleIcon,
    UserGroupIcon,
    BookOpenIcon,
    BeakerIcon,
    CalculatorIcon,
    SparklesIcon,
    TrophyIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';

const features = [
    {
        title: "WAEC Excellence",
        description: "Consistent 95%+ pass rates in WAEC and NECO examinations with dedicated preparation programs.",
        icon: CheckCircleIcon,
        color: "text-blue-900",
    },
    {
        title: "Qualified Educators",
        description: "Experienced teachers with Nigerian Teaching Council certification and subject expertise.",
        icon: UserGroupIcon,
        color: "text-green-700",
    },
    {
        title: "Nigerian Curriculum",
        description: "Comprehensive JSS and SSS programs aligned with Federal Ministry of Education standards.",
        icon: BookOpenIcon,
        color: "text-orange-600",
    },
    {
        title: "Science Excellence",
        description: "Well-equipped laboratories for Physics, Chemistry, and Biology practical sessions.",
        icon: BeakerIcon,
        color: "text-blue-900",
    },
    {
        title: "Mathematics Focus",
        description: "Strong foundation in mathematics with additional support for further mathematics students.",
        icon: CalculatorIcon,
        color: "text-green-700",
    },
    {
        title: "Holistic Development",
        description: "Character building, leadership training, and extracurricular activities for well-rounded education.",
        icon: SparklesIcon,
        color: "text-orange-600",
    },
    {
        title: "Academic Competitions",
        description: "Regular participation in inter-school competitions, quiz competitions, and academic olympiads.",
        icon: TrophyIcon,
        color: "text-blue-900",
    },
    {
        title: "Pastoral Care",
        description: "Dedicated guidance counselors and pastoral care system for student wellbeing.",
        icon: HeartIcon,
        color: "text-green-700",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="px-6 md:px-12 lg:px-24 py-16 bg-white">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 animate-fade-in">
                    Building Tomorrow's Leaders
                </h2>
                <p className="text-gray-700 mt-4 max-w-2xl mx-auto animate-fade-in">
                    We provide comprehensive secondary education that prepares students for academic success and lifelong learning in the 21st century.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map(({ title, description, icon: Icon, color }, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition duration-300 transform hover:-translate-y-1 animate-fade-in"
                    >
                        <div className={`mb-4 ${color}`}>
                            <Icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                        <p className="text-gray-600">{description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
