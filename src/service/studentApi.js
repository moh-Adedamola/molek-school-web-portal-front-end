/**
 * MOLEK Student Portal API Service
 * Handles all API calls for the student portal
 */

import { API_BASE_URL } from './apiBase.js';

import { authFetch, storeStudentTokens } from './tokenAuth';

// Phase B: route every request in this module through the token-aware
// wrapper. It attaches Authorization: Bearer <access> on student-portal
// URLs, transparently refreshes once on 401 (redirecting to login when the
// session is truly over), and passes public endpoints through untouched.
const fetch = authFetch;

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

    // Phase B: persist the student JWTs issued by the backend (Phase A).
    if (data.access && data.refresh) {
        storeStudentTokens({ access: data.access, refresh: data.refresh });
    }

    return data;
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

    // FIX: Send admission_number in URL query params, NOT in body
    // Django endpoint reads from request.query_params, not request.data
    const url = buildUrl('/api/users/student-portal/profile/', { 
        admission_number: admissionNumber 
    });

    const response = await fetch(url, {
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

// ============================================
// 📊 DASHBOARD STATS
// ============================================

// ============================================
// 📰 SCHOOL CONTENT (Public)
// ============================================

// ============================================
// 💾 DATA EXPORT
// ============================================

// ============================================
// 💰 PAYMENTS (Future Feature)
// ============================================

// Get student report card
// ============================================
// 📅 EVENTS (public — no auth needed)
// ============================================

/**
 * Get upcoming school events (public endpoint - no auth required).
 * Returns events where event_date >= now, published, ordered by date.
 */
export const getUpcomingEvents = async () => {
    const response = await fetch(`${API_BASE_URL}/api/events/upcoming/`, {
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        return { results: [], count: 0 };
    }
    return response.json();
};
