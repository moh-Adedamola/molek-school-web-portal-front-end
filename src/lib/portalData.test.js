import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    groupGradesByTerm, latestTermWithResults, termSummary, subjectHistory,
    initials, cached, clearPortalCache, findTerm,
} from './portalData.js';

const row = (session, sessionName, term, termName, subject, total, extra = {}) => ({
    session, session_name: sessionName, term, term_name: termName,
    subject_name: subject, total_score: total, ...extra,
});
// Backend order: newest session first, terms alphabetical (First, Second, Third)
const grades = [
    row(2, '2025/2026', 21, 'First Term', 'Maths', 70, { class_name: 'JSS2', pass_mark: 50 }),
    row(2, '2025/2026', 21, 'First Term', 'English', 40, { class_name: 'JSS2', pass_mark: 50 }),
    row(1, '2024/2025', 11, 'First Term', 'Maths', 55, { class_name: 'JSS1' }),
    row(1, '2024/2025', 12, 'Second Term', 'Maths', 60, { class_name: 'JSS1' }),
    row(1, '2024/2025', 13, 'Third Term', 'Maths', 65, { class_name: 'JSS1' }),
];

test('groups newest session first, newest term first', () => {
    const groups = groupGradesByTerm(grades);
    assert.deepEqual(groups.map((g) => g.key), ['2:21', '1:13', '1:12', '1:11']);
    assert.equal(groups[0].className, 'JSS2');
    assert.equal(groups[1].className, 'JSS1');
});

test('opens on the latest term that has results, not an empty new term', () => {
    const latest = latestTermWithResults(grades);
    assert.equal(latest.termName, 'First Term');
    assert.equal(latest.sessionName, '2025/2026');
    assert.equal(latestTermWithResults([]), null);
});

test('term summary uses the pass mark and rounds the average', () => {
    const s = termSummary(groupGradesByTerm(grades)[0].rows);
    assert.deepEqual(s, { average: 55, passed: 1, total: 2, passMark: 50 });
    assert.deepEqual(termSummary([]), { average: null, passed: 0, total: 0, passMark: 50 });
});

test('subject history runs oldest to newest', () => {
    assert.deepEqual(subjectHistory(grades, 'Maths').map((p) => p.total), [55, 60, 65, 70]);
    assert.equal(subjectHistory(grades, 'Maths')[0].label, 'First 2024/2025');
});

test('finds a term by ids and makes initials', () => {
    assert.equal(findTerm(groupGradesByTerm(grades), '1', 12).termName, 'Second Term');
    assert.equal(initials('Aisha Bello'), 'AB');
    assert.equal(initials('Aisha'), 'A');
    assert.equal(initials(''), '?');
});

test('cache shares one request and retries after a failure', async () => {
    let calls = 0;
    const load = () => { calls += 1; return calls; };
    assert.equal(await cached('k', load), 1);
    assert.equal(await cached('k', load), 1);
    clearPortalCache();
    assert.equal(await cached('k', load), 2);
    let fails = 0;
    await assert.rejects(cached('bad', () => { fails += 1; throw new Error('x'); }));
    await assert.rejects(cached('bad', () => { fails += 1; throw new Error('x'); }));
    assert.equal(fails, 2);
});
