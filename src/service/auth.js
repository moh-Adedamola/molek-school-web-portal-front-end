const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in .env');
}

export const loginByAdmission = async (admissionNumber, password) => {
    const response = await fetch(`${API_BASE_URL}/molek/users/login/admission/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            admission_number: admissionNumber,
            password,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
    }

    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('access_token', data.access);
    return data;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
};

export const getUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    window.location.href = '/';
};

export const getAccessToken = () => {
    return localStorage.getItem('access_token');
};