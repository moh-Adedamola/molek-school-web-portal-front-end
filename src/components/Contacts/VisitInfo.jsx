import { FaClock } from "react-icons/fa";

const VisitInfo = () => {
    return (
        <section className="bg-white px-6 md:px-12 lg:px-24 py-16">
            <header className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-6 text-[#3B82F6]">Visit During School Hours</h2>
                <p className="text-lg text-[#2D2D2D] max-w-3xl mx-auto">
                    We welcome visitors during our office hours. For the safety and security of our students, 
                    all visitors must report to the main office upon arrival.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <article className="bg-[#cbdaf4]/10 p-8 rounded-2xl border-2 border-[#1F3B6B] text-center hover:shadow-lg transition-shadow">
                    <FaClock className="text-[#3B82F6] text-4xl mx-auto mb-4" />
                    <p className="font-bold text-[#3B82F6] text-xl mb-2">Weekdays</p>
                    <p className="text-[#2D2D2D] font-medium text-lg">9:00 AM – 3:00 PM</p>
                </article>

                <article className="bg-[#c0d5f6]/10 p-8 rounded-2xl border-2 border-[#3B82F6] text-center hover:shadow-lg transition-shadow">
                    <FaClock className="text-[#3B82F6] text-4xl mx-auto mb-4" />
                    <p className="font-bold text-[#3B82F6] text-xl mb-2">Saturdays</p>
                    <p className="text-[#2D2D2D] font-medium text-lg">9:00 AM – 1:00 PM</p>
                </article>
            </div>

            <aside className="mt-12 max-w-3xl mx-auto bg-[#F9D89C]/40 p-6 rounded-2xl text-center">
                <p className="text-[#3B82F6] font-medium text-lg">
                    <strong>Note:</strong> Please bring a valid ID and inform the security at the gate about your visit purpose.
                </p>
            </aside>
        </section>
    );
};

export default VisitInfo;