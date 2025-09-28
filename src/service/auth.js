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