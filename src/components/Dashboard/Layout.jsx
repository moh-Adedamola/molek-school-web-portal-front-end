import { Outlet } from 'react-router-dom';
import DashboardHeader from "./DashboardHeader.js";


const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />
            <main className="pt-14 md:pt-18 pb-10">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;