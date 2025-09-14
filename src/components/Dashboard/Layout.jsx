import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="pt-16 md:pt-20 pb-12">
                <Outlet /> {/* Now this works! */}
            </main>
        </div>
    );
};

export default Layout;