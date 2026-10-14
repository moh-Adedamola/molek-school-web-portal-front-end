/**
 * MOLEK Student Portal — token auth layer (Phase B)
 *
 * The backend (Phase A) issues student-scoped JWTs at login and accepts
 * `Authorization: Bearer <access>` on every student-portal endpoint. A valid
 * token WINS over any ?admission_number= in the URL, so the existing query
 * params in studentApi.js can stay as-is during the rollout.
 *
 * This module exports authFetch(), a drop-in replacement for fetch() that:
 *   - passes every non-student-portal URL straight through untouched
 *     (public content/news/events endpoints must NOT get a student Bearer);
 *   - attaches the stored access token on student-portal URLs;
 *   - on a 401 with a refresh token stored, refreshes ONCE (single-flight,
 *     so parallel dashboard requests share one refresh call) and retries
 *     the original request;
 *   - if the refresh fails (expired after 7 days / student deactivated),
 *     clears the session and hard-redirects to the login page.
 *
 * Storage keys:
 *   studentAccessToken / studentRefreshToken   (this module)
 *   studentAdmissionNumber / studentData       (existing keys, still used)
 */

const ACCESS_KEY = 'studentAccessToken';
const REFRESH_KEY = 'studentRefreshToken';
const PORTAL_PATH = '/api/users/student-portal/';
const REFRESH_ENDPOINT = PORTAL_PATH + 'token/refresh/';
const LOGIN_ROUTE = '/student/login';

export const storeStudentTokens = ({ access, refresh }) => {
    if (access) localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
};

export const clearStudentTokens = () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
};

export const getStudentAccessToken = () => localStorage.getItem(ACCESS_KEY);

const urlOf = (input) => {
    if (typeof input === 'string') return input;
    if (input && typeof input.url === 'string') return input.url; // Request object
    return String(input); // URL object and friends
};

const isPortalUrl = (url) => url.includes(PORTAL_PATH);
const isRefreshUrl = (url) => url.includes(REFRESH_ENDPOINT);

const withAuth = (init, access) => {
    const headers = new Headers(init && init.headers ? init.headers : undefined);
    headers.set('Authorization', `Bearer ${access}`);
    return { ...(init || {}), headers };
};

// Single-flight refresh: concurrent 401s await the same request.
let refreshInFlight = null;
// Why the last refresh failed, so the sign-in page can explain it (e.g. 'fees').
let endReason = null;

const refreshAccess = (origin) => {
    if (!refreshInFlight) {
        refreshInFlight = (async () => {
            const refresh = localStorage.getItem(REFRESH_KEY);
            if (!refresh) return null;
            try {
                const res = await globalThis.fetch(origin + REFRESH_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refresh }),
                });
                if (!res.ok) {
                    if (res.status === 403) {
                        const body = await res.json().catch(() => null);
                        if (body && body.reason === 'fees') endReason = 'fees';
                    }
                    return null;
                }
                const data = await res.json().catch(() => null);
                if (data && data.access) {
                    localStorage.setItem(ACCESS_KEY, data.access);
                    return data.access;
                }
                return null;
            } catch {
                return null;
            }
        })();
        refreshInFlight.finally(() => { refreshInFlight = null; });
    }
    return refreshInFlight;
};

const endSession = () => {
    clearStudentTokens();
    try {
        localStorage.removeItem('studentAdmissionNumber');
        localStorage.removeItem('studentData');
    } catch { /* storage unavailable */ }
    const reason = endReason;
    endReason = null;
    if (typeof window !== 'undefined' && window.location && typeof window.location.assign === 'function') {
        window.location.assign(reason ? `${LOGIN_ROUTE}?reason=${reason}` : LOGIN_ROUTE);
    }
};

/**
 * Drop-in fetch replacement (see module docblock).
 * Retrying is safe for this app's bodies: JSON strings and FormData
 * objects can both be sent again.
 */
export const authFetch = async (input, init) => {
    const url = urlOf(input);

    // Public endpoints and the refresh call itself go straight through.
    if (!isPortalUrl(url) || isRefreshUrl(url)) {
        return globalThis.fetch(input, init);
    }

    const access = localStorage.getItem(ACCESS_KEY);
    const first = await globalThis.fetch(input, access ? withAuth(init, access) : init);
    if (first.status !== 401) return first;

    // A pre-token legacy session has nothing to refresh with: surface the 401
    // (its message tells the student to log in again) without redirect loops.
    if (!localStorage.getItem(REFRESH_KEY)) return first;

    const origin = new URL(url).origin;
    const newAccess = await refreshAccess(origin);
    if (!newAccess) {
        endSession();
        return first;
    }
    return globalThis.fetch(input, withAuth(init, newAccess));
};
