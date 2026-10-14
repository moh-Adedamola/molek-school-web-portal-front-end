// A fake MOLEK backend for browser tests. Shapes match the real Django responses.
export const RIGHT_PASSWORD = 'right-pass';
export const FEES_MESSAGE = 'Outstanding fees. Please contact the bursary to clear your fees before accessing your account.';

export const STUDENT = {
    id: 7, admission_number: 'MOL/2024/015', first_name: 'Aisha', last_name: 'Bello', full_name: 'Aisha Bello',
    class_level_name: 'JSS2', date_of_birth: '2012-05-04', gender: 'F', email: 'aisha@example.com',
    phone_number: '08031234567', address: '10 Haliru Street, Ofatedo', state_of_origin: 'Osun', local_govt_area: 'Olorunda',
    parent_name: 'Mrs Bello', parent_phone: '08030000000', parent_email: '', passport_url: null, is_active: true,
};

const grade = (id, session, sessionName, term, termName, subject, ca1, ca2, exam, cls) => {
    const total = ca1 + ca2 + exam;
    const letter = total >= 75 ? 'A' : total >= 70 ? 'B' : total >= 60 ? 'C' : total >= 50 ? 'D' : total >= 45 ? 'E' : 'F';
    return { id, subject_name: subject, session, session_name: sessionName, term, term_name: termName, ca1_score: ca1,
        ca2_score: ca2, obj_score: exam / 2, theory_score: exam / 2, total_ca: ca1 + ca2, exam_total: exam,
        total_score: total, grade: letter, remark: 'Good', class_name: cls, pass_mark: 50 };
};

export const GRADES = {
    grades: [
        grade(1, 2, '2025/2026', 21, 'First Term', 'Mathematics', 12, 13, 50, 'JSS2'),
        grade(2, 2, '2025/2026', 21, 'First Term', 'English Language', 10, 9, 28, 'JSS2'),
        grade(3, 2, '2025/2026', 21, 'First Term', 'Basic Science', 14, 12, 40, 'JSS2'),
        grade(4, 1, '2024/2025', 11, 'First Term', 'Mathematics', 10, 10, 35, 'JSS1'),
        grade(5, 1, '2024/2025', 12, 'Second Term', 'Mathematics', 11, 11, 38, 'JSS1'),
        grade(6, 1, '2024/2025', 13, 'Third Term', 'Mathematics', 12, 12, 42, 'JSS1'),
    ],
    promotion: { status: 'promoted', from_class: 'JSS1', to_class: 'JSS2', session: '2025/2026' },
};

const TERM_REPORT = {
    student: { full_name: 'Aisha Bello', admission_number: 'MOL/2024/015' },
    session: { id: 2, name: '2025/2026' }, term: { id: 21, name: 'First Term', school_resumes: '2026-01-12' },
    subjects: GRADES.grades.slice(0, 3).map((g) => ({ subjectName: g.subject_name, ca1Score: g.ca1_score, ca2Score: g.ca2_score,
        totalCA: g.total_ca, examTotal: g.exam_total, totalScore: g.total_score, grade: g.grade, remark: 'Good', classAverage: 58.4 })),
    behavioral: { punctuality: 4, attendance: 5, neatness: 4, class_teacher_comment: '', times_school_opened: 60, times_present: 57 },
    principal_remark: 'A steady term. Keep working on English.', class_name: 'JSS2', pass_mark: 50,
    summary: { totalSubjects: 3, averageScore: 67.7, grade: 'C', passedSubjects: 2, failedSubjects: 1 },
};

const SESSION_REPORT = {
    student: TERM_REPORT.student, session: { id: 1, name: '2024/2025' },
    terms: [{ id: 11, name: 'First Term' }, { id: 12, name: 'Second Term' }, { id: 13, name: 'Third Term' }],
    subjects: [{ subjectName: 'Mathematics', termScores: { 'First Term': { total: 55 }, 'Second Term': { total: 60 }, 'Third Term': { total: 66 } },
        cumulativeAverage: 60.3, cumulativeGrade: 'C', cumulativeRemark: 'Good', classAverage: 55.1 }],
    class_name: 'JSS1', pass_mark: 50, cumulative: { totalSubjects: 1, averageScore: 60.3, grade: 'C', passedSubjects: 1 },
};

const NEWS_PAGE_1 = { count: 30, next: 'page2', results: Array.from({ length: 27 }, (_, i) => {
    const kinds = [['news', null], ['image', '/excel.webp'], ['video', 'https://res.cloudinary.com/x/video/upload/v1/clip.mp4']];
    const [type, media] = kinds[i % 3];
    return { id: i + 1, title: `School news item ${i + 1}`, description: '<p>Something happened at school.</p>',
        content_type: type, media_url: media, publish_date: '2026-10-01T09:00:00Z' };
}) };
const NEWS_PAGE_2 = { count: 30, next: null, results: [0, 1, 2].map((i) => ({ id: 100 + i, title: `Older news ${i}`,
    description: 'x', content_type: 'news', publish_date: '2025-01-01T09:00:00Z' })) };
const GALLERIES = { results: [{ id: 1, title: 'Sports day', description: 'Inter-house sports',
    media_urls: ['/excel.webp', '/logo.webp'], created_at: '2026-05-01T00:00:00Z' }] };
const EVENTS = { results: [{ id: 1, title: 'Inter-house sports', event_date: '2026-10-23T09:00:00', location: 'School field' }] };

const HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': '*' };

/** Answer every request to the fake API. `opts.feesBlocked` simulates a student marked unpaid. */
export async function mockApi(context, opts = {}) {
    await context.route('https://wa.me/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<p>WhatsApp</p>' }));
    await context.route('http://api.test/**', async (route) => {
        const req = route.request(); const url = req.url();
        const json = (body, status = 200) => route.fulfill({ status, contentType: 'application/json', headers: HEADERS, body: JSON.stringify(body) });
        if (req.method() === 'OPTIONS') return route.fulfill({ status: 200, headers: HEADERS, body: '' });
        if (url.includes('/student-portal/token/refresh/')) {
            return opts.feesBlocked ? json({ error: FEES_MESSAGE, reason: 'fees' }, 403) : json({ access: 'a.b.c' });
        }
        if (url.includes('/student-portal/') && opts.feesBlocked) return json({ error: 'Authentication required' }, 401);
        if (url.includes('/student-portal/login/')) {
            const body = JSON.parse(req.postData() || '{}');
            return body.password === RIGHT_PASSWORD
                ? json({ student: STUDENT, access: 'a.b.c', refresh: 'r.r.r' })
                : json({ error: 'Invalid admission number or password' }, 401);
        }
        if (url.includes('/student-portal/change-password/')) {
            const body = JSON.parse(req.postData() || '{}');
            return body.old_password === RIGHT_PASSWORD ? json({ message: 'ok' }) : json({ error: 'Current password is incorrect' }, 400);
        }
        if (url.includes('/student-portal/profile/')) return json({ student: STUDENT });
        if (url.includes('/student-portal/grades/')) return json(GRADES);
        if (url.includes('/student-portal/report-card/')) return json(url.includes('term=') ? TERM_REPORT : SESSION_REPORT);
        if (url.includes('/events/upcoming/')) return json(EVENTS);
        if (url.includes('content_type=news')) return json({ results: NEWS_PAGE_1.results.slice(0, 3) });
        if (url.includes('/api/content/public/')) return json(url.includes('page=2') ? NEWS_PAGE_2 : NEWS_PAGE_1);
        if (url.includes('public-detail')) return json(NEWS_PAGE_1.results[4]);
        if (url.includes('/api/galleries')) return json(GALLERIES);
        return json({ results: [] });
    });
}

/** Start already signed in (as the portal stores it after a real sign-in). */
export async function signIn(page) {
    await page.goto('/');
    await page.evaluate((s) => {
        localStorage.setItem('studentAdmissionNumber', s.admission_number);
        localStorage.setItem('studentData', JSON.stringify(s));
        localStorage.setItem('studentAccessToken', 'a.b.c');
        localStorage.setItem('studentRefreshToken', 'r.r.r');
    }, STUDENT);
}
