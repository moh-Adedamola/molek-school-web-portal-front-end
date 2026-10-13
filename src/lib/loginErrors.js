/** Turn sign-in failures into plain messages a parent can act on. */
export const friendlyLoginError = (err) => {
    const msg = String(err?.message || '');
    if (/fee/i.test(msg)) return msg; // the school's own fees message, shown as written
    if (/invalid admission number or password/i.test(msg)) {
        return 'The admission number or password is wrong. Check both and try again.';
    }
    if (/failed to fetch|network|load failed/i.test(msg) || err instanceof TypeError) {
        return "We can't reach the school's server. Check your internet connection and try again.";
    }
    return msg || 'Sign-in did not work. Please try again.';
};
