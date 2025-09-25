import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar/Header (Fixed Left) */}
            <DashboardHeader />

            {/* Main Content - Avoids sidebar overlap */}
            <main className="flex-1 w-full min-w-0 transition-all duration-300 ease-in-out">
                {/* Mobile: Spacer. Desktop: Push content right */}
                <div className="md:ml-60 lg:ml-64 pt-16 md:pt-20 pb-10 px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
