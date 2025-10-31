const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in .env');
}

// Fallback news item for when API fetch fails
const fallbackNews = {
    id: 1,
    title: 'MOLEK Schools Resumes for 2025/2026 Academic Session',
    description:
        'Alhamdulillah! MOLEK Schools officially resumes for the new academic session on Monday, September 22, 2025. All students from Nursery to Senior Secondary are expected to report to the school on this day. We look forward to another year of academic excellence and character development.',
    media_url: '/excel.webp',
    content_type: 'image',
    publish_date: '2025-09-15',
};

// export const fetchAllNews = async () => {
//     try {
//         const response = await fetch('http://127.0.0.1:8000/molek/content/public/?t=' + new Date().getTime());
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`HTTP ${response.status}: ${errorData.detail || 'Unknown error'}`);
//         }
//         const data = await response.json();
//         console.log('Fetched news:', data.results);
//         return data.results;
//     } catch (error) {
//         console.error('Error fetching all news:', error.message);
//         throw error;
//     }
// };

// export const fetchLatestNews = async () => {
//     try {
//         const response = await fetch('http://127.0.0.1:8000/molek/content/public/?limit=1&t=' + new Date().getTime());
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(`HTTP ${response.status}: ${errorData.detail || 'Unknown error'}`);
//         }
//         const data = await response.json();
//         console.log('Fetched latest news:', data.results);
//         return data.results[0] || null;
//     } catch (error) {
//         console.error('Error fetching latest news:', error.message);
//         throw error;
//     }
// };

export const fetchAllNews = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/molek/content/public/`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP ${response.status}: ${errorData.detail || 'Unknown error'}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching all news:', error.message);
        throw error;
    }
};

export const fetchLatestNews = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/molek/content/public/?limit=1`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP ${response.status}: ${errorData.detail || 'Unknown error'}`);
        }
        const data = await response.json();
        return data.results[0] || null;
    } catch (error) {
        console.error('Error fetching latest news:', error.message);
        throw error;
    }
};

export const fetchAllGalleries = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/molek/galleries/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching galleries:', error);
        throw error;
    }
};

export const loginByAdmission = async (admission_number, last_name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/molek/users/login/student/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ admission_number, last_name }),
        });
        const data = await response.json();
        if (!response.ok) {
            // Extract meaningful error
            let errorMessage = 'Login failed';
            if (data.detail) {
                errorMessage = data.detail;
            } else if (data.admission_number) {
                errorMessage = Array.isArray(data.admission_number)
                    ? data.admission_number[0]
                    : data.admission_number;
            } else if (data.last_name) {
                errorMessage = Array.isArray(data.last_name)
                    ? data.last_name[0]
                    : data.last_name;
            }

            console.error('🔥 Backend validation error:', errorMessage);
            throw new Error(errorMessage);
        }

        // Success
        const accessToken = data.token?.access || data.access;
        const refreshToken = data.token?.refresh || data.refresh;
        const userData = data.user;

        if (!accessToken || !userData) {
            throw new Error('Invalid response structure from server');
        }

        return { ...data, access: accessToken, refresh: refreshToken };
    } catch (error) {
        console.error('💥 Final error thrown from loginByAdmission:', error);
        throw error;
    }
};

export const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
};

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};

export const updateProfile = async (formData) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/molek/users/profile/update/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
    }

    return await response.json();
};

export const exportStudentData = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/molek/users/profile/export/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) throw new Error("Could not download data");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student_${getUser()?.admission_number}_data.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
};

export const changePassword = async (oldPassword, newPassword) => {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_BASE_URL}/molek/users/change-password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to change password');
    }

    return await response.json();
};
