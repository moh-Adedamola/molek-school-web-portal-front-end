import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { studentLogin as apiStudentLogin, getStudentProfile } from '../service/studentApi';

const StudentAuthContext = createContext(null);

export const StudentAuthProvider = ({ children }) => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if student is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const admissionNumber = localStorage.getItem('studentAdmissionNumber');
                const storedStudent = localStorage.getItem('studentData');

                if (admissionNumber && storedStudent) {
                    // Parse stored student data
                    const parsedStudent = JSON.parse(storedStudent);
                    setStudent(parsedStudent);
                    setIsAuthenticated(true);

                    // Optionally refresh profile from server
                    try {
                        const freshStudent = await getStudentProfile();
                        setStudent(freshStudent);
                        localStorage.setItem('studentData', JSON.stringify(freshStudent));
                    } catch (err) {
                        console.error('Failed to refresh profile:', err);
                        // Keep using cached data if refresh fails
                    }
                }
            } catch (error) {
                console.error('Auth check error:', error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (admission_number, password) => {
        try {
            const response = await apiStudentLogin(admission_number, password);

            if (response.student) {
                setStudent(response.student);
                setIsAuthenticated(true);

                // Store data
                localStorage.setItem('studentAdmissionNumber', response.student.admission_number);
                localStorage.setItem('studentData', JSON.stringify(response.student));

                return response;
            } else {
                throw new Error('Invalid login response');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        setStudent(null);
        setIsAuthenticated(false);
        localStorage.removeItem('studentAdmissionNumber');
        localStorage.removeItem('studentData');
    };

    const updateStudent = (updatedData) => {
        setStudent(prev => {
            const updated = { ...prev, ...updatedData };
            localStorage.setItem('studentData', JSON.stringify(updated));
            return updated;
        });
    };

    // ✅ NEW: Refresh student data from server (used after profile updates)
    const refreshStudent = useCallback(async () => {
        const admissionNumber = localStorage.getItem('studentAdmissionNumber');

        if (!admissionNumber) {
            console.warn('No admission number found, cannot refresh');
            return null;
        }

        try {
            const freshStudent = await getStudentProfile();
            setStudent(freshStudent);
            localStorage.setItem('studentData', JSON.stringify(freshStudent));
            return freshStudent;
        } catch (err) {
            console.error('Failed to refresh student data:', err);
            throw err;
        }
    }, []);

    const value = {
        student,
        loading,
        isAuthenticated,
        login,
        logout,
        updateStudent,
        refreshStudent, // ✅ NEW: Added to context value
    };

    return (
        <StudentAuthContext.Provider value={value}>
            {children}
        </StudentAuthContext.Provider>
    );
};

export const useStudentAuth = () => {
    const context = useContext(StudentAuthContext);
    if (!context) {
        throw new Error('useStudentAuth must be used within StudentAuthProvider');
    }
    return context;
};