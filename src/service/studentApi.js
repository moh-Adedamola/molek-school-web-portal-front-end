const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not defined in .env');
}

// Helper to get stored admission number
const getAdmissionNumber = () => {
    const admissionNumber = localStorage.getItem('studentAdmissionNumber');
    if (!admissionNumber) {
        throw new Error('No admission number found. Please log in again.');
    }
    return admissionNumber;
};

// Handle API errors
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
};

// ============================================
// 🎓 STUDENT AUTHENTICATION
// ============================================
export const studentLogin = async (admission_number, password) => {
    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admission_number, password }),
    });
    const data = await handleResponse(response);

    // Store admission number for future requests
    if (data.student && data.student.admission_number) {
        localStorage.setItem('studentAdmissionNumber', data.student.admission_number);
    }

    return data;
};

export const getStudentProfile = async () => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(
        `${API_BASE_URL}/api/users/student-portal/profile/?admission_number=${admissionNumber}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return handleResponse(response);
};

export const updateStudentProfile = async (formData) => {
    const admissionNumber = getAdmissionNumber();

    // Add admission number to formData
    if (formData instanceof FormData) {
        formData.append('admission_number', admissionNumber);
    } else {
        formData.admission_number = admissionNumber;
    }

    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/profile/`, {
        method: 'PUT',
        headers: formData instanceof FormData ? {} : {
            'Content-Type': 'application/json',
        },
        body: formData instanceof FormData ? formData : JSON.stringify(formData),
    });
    return handleResponse(response);
};

export const changeStudentPassword = async (old_password, new_password) => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/change-password/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            admission_number: admissionNumber,
            old_password,
            new_password
        }),
    });
    return handleResponse(response);
};

// ============================================
// 📊 ACADEMIC RECORDS
// ============================================
export const getStudentGrades = async () => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(
        `${API_BASE_URL}/api/users/student-portal/grades/?admission_number=${admissionNumber}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return handleResponse(response);
};

export const getCAScores = async (session_id = null, term_id = null) => {
    const admissionNumber = getAdmissionNumber();
    let url = `${API_BASE_URL}/api/users/student-portal/ca-scores/?admission_number=${admissionNumber}`;

    if (session_id) url += `&session=${session_id}`;
    if (term_id) url += `&term=${term_id}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse(response);
};

export const getExamResults = async (session_id = null, term_id = null) => {
    const admissionNumber = getAdmissionNumber();
    let url = `${API_BASE_URL}/api/users/student-portal/exam-results/?admission_number=${admissionNumber}`;

    if (session_id) url += `&session=${session_id}`;
    if (term_id) url += `&term=${term_id}`;

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse(response);
};

export const getReportCard = async (session_id, term_id) => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(
        `${API_BASE_URL}/api/users/student-portal/report-card/?admission_number=${admissionNumber}&session=${session_id}&term=${term_id}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return handleResponse(response);
};

// ============================================
// 📅 ACADEMIC SESSIONS & TERMS
// ============================================
export const getAcademicSessions = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/sessions/`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse(response);
};

export const getTerms = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/terms/`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse(response);
};

// ============================================
// 💰 PAYMENTS (Future Feature)
// ============================================
export const getPaymentHistory = async () => {
    // Placeholder for future payment integration
    return [];
};

export const getPayableItems = async () => {
    // Placeholder for future payment integration
    return [];
};

// ============================================
// 📰 SCHOOL CONTENT (Public - No Auth Required)
// ============================================
export const getSchoolNews = async () => {
    const response = await fetch(`${API_BASE_URL}/api/content/public/?content_type=news`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse(response);
};

export const getSchoolEvents = async () => {
    const response = await fetch(`${API_BASE_URL}/api/content/public/`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return handleResponse(response);
};

// ============================================
// 💾 EXPORT DATA
// ============================================
export const exportStudentData = async () => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(
        `${API_BASE_URL}/api/users/student-portal/profile/?admission_number=${admissionNumber}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response.ok) {
        throw new Error('Failed to export data');
    }

    // Download as JSON file
    const data = await response.json();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `student_data_${admissionNumber}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return data;
};