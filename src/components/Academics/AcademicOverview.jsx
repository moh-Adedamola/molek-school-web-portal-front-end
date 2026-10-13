import { Baby, BookOpen, ChartLine, Clock, FlaskConical, GraduationCap, PersonStanding, School, Sparkles, Trophy, Users, Wrench } from 'lucide-react';
// Accent colours stay on icons; text uses a readable version of each (existing colours only).
const textColour = (c) => ({ '#3B82F6': '#2563EB', '#E85D5D': '#B91C1C', '#F9D89C': '#1F3B6B' }[String(c).toUpperCase()] || c);


const AcademicOverview = () => {
    const stats = [
        { icon: GraduationCap, value: "95%", label: "WAEC Pass Rate", color: "#1F3B6B" },
        { icon: BookOpen, value: "18+", label: "Subjects Offered", color: "#3B82F6" },
        { icon: School, value: "20-25", label: "Class Size", color: "#E85D5D" },
        { icon: Clock, value: "40hrs", label: "Weekly Hours", color: "#F9D89C" },
    ];

    const programs = [
        {
            id: "kindergarten",
            icon: PersonStanding,
            title: "Kindergarten Programme",
            duration: "Ages 2-5",
            color: "#F9D89C",
            description: "Well-rounded programme integrating pupils into the MOLEK Schools tradition.",
            objectives: [
                "Integrate pupils into the school system",
                "Complete transition from home to school environment",
                "Create MOLEK Schools tradition of qualitative education",
                "Instill high moral and religious values",
                "Foster cooperation and positive academic competition"
            ]
        },
        {
            id: "nursery",
            icon: Baby,
            title: "Nursery Programme",
            duration: "Ages 2-4",
            color: "#E85D5D",
            description: "Quality early childhood care with foundational learning.",
            objectives: [
                "Create smooth transition from home to school environment",
                "Provide quality care for children with working parents",
                "Expose young pupils to other children and school environment",
                "Teach basic skills and foundational learning",
                "Introduce alphabet, numbers, and environmental awareness"
            ]
        },
        {
            id: "primary",
            icon: GraduationCap,
            title: "Primary School",
            duration: "Primary 1-5 | Ages 6-11",
            color: "#1F3B6B",
            description: "Five-year system with solid intellectual, Islamic and moral foundations.",
            objectives: [
                "Instill spirit of excellence and develop innate potential",
                "Create skills for social interaction and teamwork",
                "Prepare pupils for positive competition and cooperation",
                "Prepare for excellent performance in external examinations"
            ],
            features: [
                "Preparation for National Common Entrance Examination",
                "Academic work teams and sports integration",
                "Religious and moral consolidation",
                "Excellence in termly and sessional examinations"
            ]
        },
        {
            id: "jss",
            icon: School,
            title: "Junior Secondary School (JSS)",
            duration: "JSS 1-3 | Ages 10-13",
            color: "#3B82F6",
            description: "Foundation program covering basic subjects in sciences, arts, and vocational studies.",
            subjects: [
                "Mathematics", "English Language", "Basic Science", "Social Studies",
                "Nigerian Languages", "French", "Creative Arts", "Physical Education",
                "Computer Studies", "Agricultural Science"
            ]
        },
        {
            id: "sss",
            icon: GraduationCap,
            title: "Senior Secondary School (SSS)",
            duration: "SSS 1-3 | Ages 13-16",
            color: "#E85D5D",
            description: "WAEC and NECO approved specialized program with three main streams.",
            streams: [
                { name: "Science Stream", subjects: ["Physics", "Chemistry", "Biology", "Further Mathematics"], color: "#1F3B6B" },
                { name: "Arts/Humanity", subjects: ["Literature", "History", "Government", "Economics"], color: "#3B82F6" },
                { name: "Commercial", subjects: ["Accounting", "Commerce", "Economics", "Government"], color: "#F9D89C" }
            ],
            additional: ["Arabic", "Islamic Studies", "Tahafeez", "French", "Civic Education"],
            programs: ["Catering", "Dress Making", "Hair Dressing", "Soap Making"],
            goals: [
                "Produce self-reliant graduates",
                "Create future entrepreneurs",
                "Develop practical vocational skills",
                "Complement academic excellence with real-world abilities"
            ]
        }
    ];

    return (
        <section className="relative bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 bg-[#3B82F6]/10 px-6 py-2 rounded-full mb-4">
                        <GraduationCap className="w-5 h-5 text-[#2563EB]" />
                        <span className="text-[#2563EB] font-semibold text-sm uppercase tracking-wider">Academic Excellence</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#1F3B6B] mb-4">
                        Academic Programs Overview
                    </h1>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        From Crèche to Senior Secondary — a complete educational journey blending Islamic values with modern academic excellence.
                    </p>
                </header>

                <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <article key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center border-t-4 hover:-translate-y-2"
                                style={{ borderTopColor: stat.color }}>
                                <div className="p-3 rounded-full w-fit mx-auto mb-3" style={{ backgroundColor: `${stat.color}15` }}>
                                    <Icon className="w-8 h-8" style={{ color: stat.color }} />
                                </div>
                                <h3 className="text-3xl font-bold mb-1" style={{ color: textColour(stat.color) }}>{stat.value}</h3>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </article>
                        );
                    })}
                </section>

                <section className="space-y-12">
                    {programs.map((program) => {
                        const Icon = program.icon;
                        return (
                            <article key={program.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all">
                                <header className="bg-gradient-to-r from-[#1F3B6B] to-[#3B82F6] text-white p-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 rounded-2xl bg-white/20">
                                            <Icon className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl lg:text-3xl font-bold">{program.title}</h2>
                                            <p className="text-blue-100">{program.duration}</p>
                                        </div>
                                    </div>
                                </header>

                                <div className="p-8 space-y-8">
                                    <p className="text-gray-700 text-lg leading-relaxed">{program.description}</p>

                                    {program.objectives && (
                                        <div>
                                            <h4 className="font-bold text-[#1F3B6B] mb-4 flex items-center gap-2">
                                                <Sparkles className="w-6 h-6 text-[#2563EB]" />
                                                Key Objectives
                                            </h4>
                                            <ul className="space-y-3">
                                                {program.objectives.map((obj, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                                        <span className="text-[#2563EB] mt-1">✓</span>
                                                        <span>{obj}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {program.features && (
                                        <div className="bg-blue-50 rounded-2xl p-6 border-2 border-[#3B82F6]">
                                            <h4 className="font-bold text-[#2563EB] mb-4">Program Features</h4>
                                            <ul className="space-y-2">
                                                {program.features.map((feat, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                                        <Trophy className="w-5 h-5 text-[#2563EB]" />
                                                        <span>{feat}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {program.subjects && (
                                        <div>
                                            <h4 className="font-bold text-[#1F3B6B] mb-4">Core Subjects</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {program.subjects.map((subj, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-gray-700">
                                                        <FlaskConical className="w-5 h-5 text-[#2563EB]" />
                                                        <span>{subj}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {program.streams && (
                                        <div>
                                            <h4 className="font-bold text-[#1F3B6B] mb-6">Specialized Streams (SSS)</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {program.streams.map((stream, i) => (
                                                    <div key={i} className="bg-gray-50 rounded-2xl p-6 border-t-4" style={{ borderTopColor: stream.color }}>
                                                        <h5 className="font-bold text-lg mb-4" style={{ color: textColour(stream.color) }}>{stream.name}</h5>
                                                        <ul className="space-y-2">
                                                            {stream.subjects.map((subj, j) => (
                                                                <li key={j} className="flex items-center gap-2 text-gray-700 text-sm">
                                                                    <span style={{ color: textColour(stream.color) }}>•</span>
                                                                    <span>{subj}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {program.additional && (
                                        <div className="bg-blue-50 rounded-2xl p-6 border-2 border-[#3B82F6]">
                                            <h4 className="font-bold text-[#2563EB] mb-4">Additional Studies</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {program.additional.map((study, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                                                        <span className="text-[#2563EB]">•</span>
                                                        <span>{study}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {program.programs && program.goals && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-50 rounded-2xl p-6">
                                                <h4 className="font-bold text-[#1F3B6B] mb-4 flex items-center gap-2">
                                                    <Users className="text-[#2563EB]" />
                                                    Programme Goals
                                                </h4>
                                                <ul className="space-y-2">
                                                    {program.goals.map((goal, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                                            <span className="text-[#2563EB] mt-1">✓</span>
                                                            <span>{goal}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="bg-gray-50 rounded-2xl p-6">
                                                <h4 className="font-bold text-[#1F3B6B] mb-4 flex items-center gap-2">
                                                    <ChartLine className="text-[#2563EB]" />
                                                    Available Programs
                                                </h4>
                                                <ul className="space-y-2">
                                                    {program.programs.map((prog, i) => (
                                                        <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                                                            <span className="text-[#2563EB]">•</span>
                                                            <span>{prog}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </section>
            </div>
        </section>
    );
};

export default AcademicOverview;