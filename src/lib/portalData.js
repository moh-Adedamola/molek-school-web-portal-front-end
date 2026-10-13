/**
 * Portal data helpers: pure functions (unit-tested) plus a small per-visit
 * cache so Home, Results and My details share one fetch instead of each
 * page asking the server again.
 */
import { countPassed, passMarkOf, DEFAULT_PASS_MARK } from './grading.js';

export const TERM_ORDER = { 'First Term': 1, 'Second Term': 2, 'Third Term': 3 };

/**
 * Group grade rows into terms, newest first. The backend sends rows newest
 * session first, so a session's first appearance gives its order; within a
 * session, Third Term comes before Second before First.
 */
export function groupGradesByTerm(grades) {
    const sessionRank = new Map();
    const groups = new Map();
    for (const row of grades || []) {
        if (!sessionRank.has(row.session)) sessionRank.set(row.session, sessionRank.size);
        const key = `${row.session}:${row.term}`;
        if (!groups.has(key)) {
            groups.set(key, {
                key,
                sessionId: row.session,
                sessionName: row.session_name,
                termId: row.term,
                termName: row.term_name,
                className: row.class_name || null,
                passMark: passMarkOf(row),
                rows: [],
            });
        }
        groups.get(key).rows.push(row);
    }
    return [...groups.values()].sort((a, b) =>
        (sessionRank.get(a.sessionId) - sessionRank.get(b.sessionId))
        || ((TERM_ORDER[b.termName] || 0) - (TERM_ORDER[a.termName] || 0)));
}

/** The term a parent most likely wants: the newest one that has results. */
export function latestTermWithResults(grades) {
    return groupGradesByTerm(grades)[0] || null;
}

export function findTerm(groups, sessionId, termId) {
    return (groups || []).find((g) => String(g.sessionId) === String(sessionId)
        && String(g.termId) === String(termId)) || null;
}

/** Average, subjects passed and pass mark for one term's rows. */
export function termSummary(rows) {
    const list = rows || [];
    const scores = list.map((r) => Number.parseFloat(r.total_score)).filter(Number.isFinite);
    const average = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
    return {
        average: average === null ? null : Math.round(average * 10) / 10,
        passed: countPassed(list),
        total: list.length,
        passMark: list.length ? passMarkOf(list[0]) : DEFAULT_PASS_MARK,
    };
}

/** One subject's totals across every term the student has, oldest first. */
export function subjectHistory(grades, subjectName) {
    return groupGradesByTerm(grades)
        .slice()
        .reverse()
        .map((g) => {
            const row = g.rows.find((r) => r.subject_name === subjectName);
            return row ? {
                label: `${(g.termName || '').replace(' Term', '')} ${g.sessionName || ''}`.trim(),
                total: Number.parseFloat(row.total_score),
                passMark: g.passMark,
            } : null;
        })
        .filter(Boolean);
}

export function subjectNames(grades) {
    return [...new Set((grades || []).map((r) => r.subject_name).filter(Boolean))].sort();
}

export const fullName = (s) => s?.full_name || [s?.first_name, s?.last_name].filter(Boolean).join(' ') || 'Student';

export function initials(name) {
    const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '?';
    const first = parts[0][0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
}

// ---- Per-visit cache (cleared on sign-out) ----
const cache = new Map();

export function cached(key, loader) {
    if (!cache.has(key)) {
        const p = Promise.resolve().then(loader);
        cache.set(key, p);
        p.catch(() => cache.delete(key)); // failures are retried next time
    }
    return cache.get(key);
}

export function clearPortalCache(prefix = '') {
    for (const key of [...cache.keys()]) {
        if (key.startsWith(prefix)) cache.delete(key);
    }
}
