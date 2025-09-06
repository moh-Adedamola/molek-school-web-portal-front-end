import { Link } from "react-router-dom"
const Excellence = () => {
    return (
        <section className="mt-[120px] px-6 md:px-12 lg:px-24 py-12 bg-gray-50">
            {/* Hero Section */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image Placeholder */}
                <div className="w-full lg:w-1/2">
                    <img
                        src="/excel.webp"
                        alt="Excellence in Education"
                        className="rounded-lg shadow-md w-full h-auto object-cover"
                    />
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                        Excellence in Secondary Education
                    </h2>
                    <p className="text-gray-700 mb-6">
                        Preparing students for WAEC, NECO, and university success with quality education rooted in Nigerian values and global standards.
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        <button className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 transition">
                            Apply for Admission
                        </button>
                        <Link to="/about">
                            <button className="border border-blue-900 text-blue-900 px-6 py-2 rounded hover:bg-blue-100 transition">
                                Learn More About Us
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 text-center mt-12">
                <div>
                    <h3 className="text-3xl font-bold text-blue-900">15+</h3>
                    <p className="text-gray-600">Years of Excellence</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-blue-900">500+</h3>
                    <p className="text-gray-600">Active Students</p>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-blue-900">95%</h3>
                    <p className="text-gray-600">WAEC Pass Rate</p>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h4 className="text-xl font-semibold text-blue-900 mb-2">WAEC Excellence</h4>
                    <p className="text-gray-600">
                        Consistent high performance in WAEC and NECO examinations with dedicated preparation programs.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h4 className="text-xl font-semibold text-blue-900 mb-2">Qualified Teachers</h4>
                    <p className="text-gray-600">
                        Highly qualified teaching staff committed to academic excellence and character development.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <h4 className="text-xl font-semibold text-blue-900 mb-2">Modern Curriculum</h4>
                    <p className="text-gray-600">
                        Comprehensive curriculum aligned with Nigerian educational standards and global best practices.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Excellence;
