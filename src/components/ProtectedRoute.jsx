import { Navigate } from 'react-router-dom';
import { useStudentAuth } from '../context/StudentAuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useStudentAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/student/login" replace />;
    }

    return children;
};

export default ProtectedRoute;