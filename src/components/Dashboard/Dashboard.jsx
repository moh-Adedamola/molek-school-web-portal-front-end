import { useState } from 'react';
import logo from '/logo.webp';

const Sidebar = ({ setView }) => (
    <aside className="bg-blue-900 text-white w-64 h-screen p-6 rounded-r-xl">
        <h2 className="text-2xl font-bold mb-6">Molek Schools</h2>
        <nav className="space-y-4">
            <button onClick={() => setView('profile')} className="block w-full text-left">Student Profile</button>
            <button onClick={() => setView('payments')} className="block w-full text-left">Payments</button>
            <button onClick={() => setView('results')} className="block w-full text-left">View Results</button>
        </nav>
    </aside>
);

const MainContent = ({ view }) => {
    return (
        <main className="flex-1 p-8 bg-white rounded-l-xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-blue-900">Welcome back, John Doe</h1>
                </div>
                <img src={logo} alt="School Logo" className="h-12" />
            </div>

            {view === 'profile' && (
                <section>
                    <h2 className="text-xl font-semibold mb-4">Student Profile</h2>
                    <div className="bg-blue-50 p-4 rounded shadow">
                        <img src="/student.jpg" alt="Student" className="h-24 rounded-full mb-2" />
                        <p>Name: John Doe</p>
                        <p>Age: 14</p>
                        <p>Parent: Jane Doe</p>
                        <p>Contact: 08012345678</p>
                    </div>
                </section>
            )}

            {view === 'payments' && (
                <section>
                    <h2 className="text-xl font-semibold mb-4">Payments</h2>
                    <ul className="space-y-2">
                        <li className="bg-blue-50 p-4 rounded shadow">School Fee - ₦50,000</li>
                        <li className="bg-blue-50 p-4 rounded shadow">Summer Coaching - ₦15,000</li>
                    </ul>
                </section>
            )}

            {view === 'results' && (
                <section>
                    <h2 className="text-xl font-semibold mb-4">Results</h2>
                    <button className="bg-blue-900 text-white px-4 py-2 rounded mb-4">Download Results</button>
                    <ul className="space-y-2">
                        <li className="bg-blue-50 p-4 rounded shadow">Term 1 - 2023: 85%</li>
                        <li className="bg-blue-50 p-4 rounded shadow">Term 2 - 2023: 88%</li>
                    </ul>
                </section>
            )}

            {/* Calendar Placeholder */}
            <section className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Calendar</h2>
                <div className="bg-blue-50 p-4 rounded shadow">[Calendar Widget Here]</div>
            </section>
        </main>
    );
};

const Dashboard = () => {
    const [view, setView] = useState('profile');

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar setView={setView} />
            <MainContent view={view} />
        </div>
    );
};

export default Dashboard;
