import { Link } from "react-router-dom";
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  TrophyIcon,
  SparklesIcon,
  BookOpenIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const Excellence = () => {
    const stats = [
        { value: "17+", label: "Years of Excellence", color: "#1F3B6B", icon: SparklesIcon },
        { value: "900+", label: "Active Students", color: "#3B82F6", icon: UserGroupIcon },
        { value: "95%", label: "WAEC/NECO Pass Rate", color: "#E85D5D", icon: TrophyIcon },
    ];

    const features = [
        { title: "95% Exam Success", desc: "Consistent excellent pass rate in WAEC, NECO, and BECE examinations since our first students in 2013-2016.", color: "#1F3B6B", icon: TrophyIcon },
        { title: "Montessori-Inspired Learning", desc: "We identify young talents, develop and modify them through active participation and discovery-based learning.", color: "#3B82F6", icon: BookOpenIcon },
        { title: "Holistic Islamic Education", desc: "Complete curriculum including Arabic Studies, Islamic Studies, Tahafeez (Quran Memorization), and conventional subjects.", color: "#E85D5D", icon: HeartIcon },
    ];

    return (
        <section className="relative px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#3B82F6]/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E85D5D]/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <header className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
                    <figure className="relative order-2 lg:order-1">
                        <img src="/excel.webp" alt="MOLEK Schools Excellence" className="w-full rounded-3xl overflow-hidden shadow-2xl object-cover transition-transform duration-700 hover:scale-105" />
                        <figcaption className="absolute -top-4 -right-4 bg-gradient-to-br from-[#3B82F6] to-[#1F3B6B] text-white px-6 py-3 rounded-2xl shadow-xl">
                            <span className="text-sm font-semibold">Est. 2007</span>
                        </figcaption>
                    </figure>

                    <article className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 bg-[#3B82F6]/10 px-4 py-2 rounded-full mb-4">
                            <AcademicCapIcon className="w-5 h-5 text-[#3B82F6]" />
                            <span className="text-[#3B82F6] font-semibold text-sm uppercase tracking-wider">Our Mission</span>
                        </div>
                        
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F3B6B] mb-6 leading-tight">
                            Excellence in <span className="text-[#3B82F6]">Holistic Education</span>
                        </h1>
                        
                        <p className="text-gray-700 text-lg leading-relaxed mb-8">
                            Building <strong className="text-[#1F3B6B]">GOD-FEARING</strong> future leaders through quality education that combines Islamic values 
                            with modern academic excellence. From Creche to Senior Secondary, we nurture the <strong className="text-[#3B82F6]">TOTAL CHILD</strong> with Montessori Method of Teaching.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/admissions" className="text-center">
                                <button className="w-full sm:w-auto bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all shadow-lg font-semibold hover:scale-105 active:scale-95">
                                    Apply for Admission
                                </button>
                            </Link>
                            <Link to="/about" className="text-center">
                                <button className="w-full sm:w-auto border-2 border-[#3B82F6] text-[#3B82F6] px-8 py-4 rounded-full hover:bg-[#3B82F6] hover:text-white transition-all font-semibold hover:scale-105 active:scale-95">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </article>
                </header>

                {/* Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 lg:mb-24">
                    {stats.map((stat, index) => (
                        <article key={index} className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 hover:-translate-y-2"
                            style={{ borderTop: `4px solid ${stat.color}` }}>
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full" style={{ backgroundColor: `${stat.color}15` }}>
                                    <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                                </div>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</h2>
                            <p className="text-gray-600 font-medium">{stat.label}</p>
                        </article>
                    ))}
                </section>

                {/* Features */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                    {features.map((card, index) => (
                        <article key={index} className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-4"
                            style={{ borderTop: `4px solid ${card.color}` }}>
                            <div className="p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: `${card.color}15` }}>
                                <card.icon className="w-8 h-8" style={{ color: card.color }} />
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold mb-3" style={{ color: card.color }}>{card.title}</h3>
                            <p className="text-gray-700 leading-relaxed">{card.desc}</p>
                        </article>
                    ))}
                </section>

                {/* Recognition */}
                <aside className="relative bg-gradient-to-r from-[#F9D89C]/30 via-[#F9D89C]/20 to-[#F9D89C]/30 rounded-3xl p-8 lg:p-12 overflow-hidden">
                    <div className="relative text-center">
                        <div className="inline-block mb-4">
                            <div className="bg-gradient-to-r from-[#3B82F6] to-[#1F3B6B] text-white px-6 py-2 rounded-full text-sm font-bold">
                                Alhamdulillah - Glory be to Allah
                            </div>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-[#1F3B6B] mb-4">
                            From 19 Pupils to Nearly 900 Students
                        </h2>
                        <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                            Recognized and approved by <strong className="text-[#3B82F6]">Osun State Government</strong> across all three sections: 
                            Nursery (2008), Primary (2012), and Secondary (2013). A testament to our commitment to excellence in Islamic education.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Excellence;