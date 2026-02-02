/**
 * MOLEK Student Portal API Service
 * Handles all API calls for the student portal
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('VITE_API_BASE_URL is not defined in .env');
}

// ============================================
// 🔧 HELPERS
// ============================================

/**
 * Get stored admission number from localStorage
 * @throws {Error} If no admission number found
 */
const getAdmissionNumber = () => {
    const admissionNumber = localStorage.getItem('studentAdmissionNumber');
    if (!admissionNumber) {
        throw new Error('No admission number found. Please log in again.');
    }
    return admissionNumber;
};

/**
 * Handle API response and extract JSON
 * @param {Response} response - Fetch response object
 * @throws {Error} If response is not ok
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
};

/**
 * Build URL with query parameters
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 */
const buildUrl = (endpoint, params = {}) => {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            url.searchParams.append(key, value);
        }
    });
    return url.toString();
};

// ============================================
// 🎓 STUDENT AUTHENTICATION
// ============================================

/**
 * Login student with admission number and password
 * @param {string} admission_number
 * @param {string} password
 * @returns {Promise<Object>} Student data and token
 */
export const studentLogin = async (admission_number, password) => {
    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admission_number, password }),
    });

    const data = await handleResponse(response);

    // Store admission number for future requests
    if (data.student?.admission_number) {
        localStorage.setItem('studentAdmissionNumber', data.student.admission_number);
    }

    return data;
};

/**
 * Logout student - clear stored data
 */
export const studentLogout = () => {
    localStorage.removeItem('studentAdmissionNumber');
    localStorage.removeItem('studentData');
};

// ============================================
// 👤 STUDENT PROFILE
// ============================================

/**
 * Get current student's profile
 * @returns {Promise<Object>} Student profile data
 */
export const getStudentProfile = async () => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(
        buildUrl('/api/users/student-portal/profile/', { admission_number: admissionNumber }),
        { headers: { 'Content-Type': 'application/json' } }
    );

    const data = await handleResponse(response);
    return data.student || data;
};

/**
 * Update student profile (supports FormData for file uploads)
 * @param {Object|FormData} formData - Profile data to update
 * @returns {Promise<Object>} Updated student profile
 */
export const updateStudentProfile = async (formData) => {
    const admissionNumber = getAdmissionNumber();

    // Add admission number to request body
    if (formData instanceof FormData) {
        formData.append('admission_number', admissionNumber);
    } else {
        formData = { ...formData, admission_number: admissionNumber };
    }

    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/profile/`, {
        method: 'PUT',
        // Don't set Content-Type for FormData - browser sets it with boundary
        headers: formData instanceof FormData ? {} : { 'Content-Type': 'application/json' },
        body: formData instanceof FormData ? formData : JSON.stringify(formData),
    });

    const data = await handleResponse(response);
    return data.student || data;
};

/**
 * Change student password
 * @param {string} old_password
 * @param {string} new_password
 * @returns {Promise<Object>} Success message
 */
export const changeStudentPassword = async (old_password, new_password) => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/change-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

/**
 * Get all grades for the student
 * @returns {Promise<Object>} Grades data with array
 */
export const getStudentGrades = async () => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(
        buildUrl('/api/users/student-portal/grades/', { admission_number: admissionNumber }),
        { headers: { 'Content-Type': 'application/json' } }
    );
    return handleResponse(response);
};

/**
 * Get CA scores with optional filtering
 * @param {number|null} session_id - Filter by session
 * @param {number|null} term_id - Filter by term
 * @returns {Promise<Object>} CA scores data
 */
export const getCAScores = async (session_id = null, term_id = null) => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(
        buildUrl('/api/users/student-portal/ca-scores/', {
            admission_number: admissionNumber,
            session: session_id,
            term: term_id
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
    return handleResponse(response);
};

/**
 * Get exam results with optional filtering
 * @param {number|null} session_id - Filter by session
 * @param {number|null} term_id - Filter by term
 * @returns {Promise<Object>} Exam results data
 */
export const getExamResults = async (session_id = null, term_id = null) => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(
        buildUrl('/api/users/student-portal/exam-results/', {
            admission_number: admissionNumber,
            session: session_id,
            term: term_id
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
    return handleResponse(response);
};

/**
 * Get comprehensive report card for a specific term
 * @param {number} session_id - Academic session ID
 * @param {number} term_id - Term ID
 * @returns {Promise<Object>} Complete report card data
 */
export const getReportCard = async (session_id, term_id) => {
    const admissionNumber = getAdmissionNumber();
    const response = await fetch(
        buildUrl('/api/users/student-portal/report-card/', {
            admission_number: admissionNumber,
            session: session_id,
            term: term_id
        }),
        { headers: { 'Content-Type': 'application/json' } }
    );
    return handleResponse(response);
};

// ============================================
// 📅 ACADEMIC SESSIONS & TERMS
// ============================================

/**
 * Get all academic sessions
 * @returns {Promise<Object>} Sessions data
 */
export const getAcademicSessions = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/sessions/`, {
        headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
};

/**
 * Get all terms
 * @returns {Promise<Object>} Terms data
 */
export const getTerms = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/terms/`, {
        headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(response);
};

// ============================================
// 📊 DASHBOARD STATS
// ============================================

/**
 * Get dashboard statistics for the student
 * @returns {Promise<Object>} Dashboard stats
 */
export const getDashboardStats = async () => {
    const admissionNumber = getAdmissionNumber();

    try {
        // Fetch grades and CA scores in parallel
        const [gradesRes, caRes] = await Promise.all([
            fetch(buildUrl('/api/users/student-portal/grades/', { admission_number: admissionNumber })),
            fetch(buildUrl('/api/users/student-portal/ca-scores/', { admission_number: admissionNumber }))
        ]);

        const gradesData = await gradesRes.json();
        const caData = await caRes.json();

        const grades = gradesData.grades || [];
        const caScores = caData.ca_scores || [];

        // Calculate statistics
        const totalSubjects = new Set(grades.map(g => g.subject_name)).size;
        const averageScore = grades.length > 0
            ? Math.round(grades.reduce((sum, g) => sum + (g.total_score || 0), 0) / grades.length)
            : 0;
        const highestScore = grades.length > 0
            ? Math.max(...grades.map(g => g.total_score || 0))
            : 0;
        const passedSubjects = grades.filter(g => (g.total_score || 0) >= 40).length;
        const totalExams = grades.length;

        return {
            totalSubjects,
            averageScore,
            highestScore,
            passedSubjects,
            totalExams,
            totalCAScores: caScores.length,
            grades,
            caScores
        };
    } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        return {
            totalSubjects: 0,
            averageScore: 0,
            highestScore: 0,
            passedSubjects: 0,
            totalExams: 0,
            totalCAScores: 0,
            grades: [],
            caScores: []
        };
    }
};

// ============================================
// 📰 SCHOOL CONTENT (Public)
// ============================================

/**
 * Get school news
 * @returns {Promise<Array>} News items
 */
export const getSchoolNews = async () => {
    const response = await fetch(`${API_BASE_URL}/api/content/public/?content_type=news`, {
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await handleResponse(response);
    return data.results || data || [];
};

/**
 * Get school events/content
 * @returns {Promise<Array>} Events/content items
 */
export const getSchoolEvents = async () => {
    const response = await fetch(`${API_BASE_URL}/api/content/public/`, {
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await handleResponse(response);
    return data.results || data || [];
};

// ============================================
// 💾 DATA EXPORT
// ============================================

/**
 * Export student data as JSON file download
 * @returns {Promise<Object>} Exported data
 */
export const exportStudentData = async () => {
    const admissionNumber = getAdmissionNumber();

    // Fetch profile
    const response = await fetch(
        buildUrl('/api/users/student-portal/profile/', { admission_number: admissionNumber }),
        { headers: { 'Content-Type': 'application/json' } }
    );

    if (!response.ok) {
        throw new Error('Failed to export data');
    }

    const responseData = await response.json();
    const data = responseData.student || responseData;

    // Create and download JSON file
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

/**
 * Export comprehensive academic report
 * @returns {Promise<Object>} Report data
 */
export const exportAcademicReport = async () => {
    const admissionNumber = getAdmissionNumber();

    const [profileRes, gradesRes, caRes] = await Promise.all([
        fetch(buildUrl('/api/users/student-portal/profile/', { admission_number: admissionNumber })),
        fetch(buildUrl('/api/users/student-portal/grades/', { admission_number: admissionNumber })),
        fetch(buildUrl('/api/users/student-portal/ca-scores/', { admission_number: admissionNumber }))
    ]);

    const profileData = await profileRes.json();
    const gradesData = await gradesRes.json();
    const caData = await caRes.json();

    return {
        student: profileData.student || profileData,
        grades: gradesData.grades || [],
        caScores: caData.ca_scores || []
    };
};

// ============================================
// 💰 PAYMENTS (Future Feature)
// ============================================

export const getPaymentHistory = async () => [];
export const getPayableItems = async () => [];

// Get student report card
export const getStudentReportCard = async (params = {}) => {
    const admissionNumber = getAdmissionNumber();
    
    const queryParams = new URLSearchParams({
        admission_number: admissionNumber,
        ...params
    });
    
    const response = await fetch(`${API_BASE_URL}/api/users/student-portal/report-card/?${queryParams}`, {
        headers: { 'Content-Type': 'application/json' },
    });
    
    return handleResponse(response);
};