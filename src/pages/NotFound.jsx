import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
    usePageTitle('Page not found', { noindex: true });

    return (
        <>
            <div className="bg-white">
                <section className="max-w-2xl mx-auto px-4 py-20 text-center text-[17px] text-gray-800">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#1F3B6B]">We can't find that page</h1>
                    <p className="mt-4">The link may be old or mistyped. These will get you back on track:</p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/" className="px-6 py-3 rounded-full bg-[#1F3B6B] text-white font-semibold">Go to the homepage</Link>
                        <Link to="/student/login" className="px-6 py-3 rounded-full border-2 border-[#1F3B6B] text-[#1F3B6B] font-semibold">Check results</Link>
                        <Link to="/contact" className="px-6 py-3 rounded-full border-2 border-[#1F3B6B] text-[#1F3B6B] font-semibold">Contact the school</Link>
                    </div>
                </section>
            </div>
        </>
    );
};

export default NotFound;
