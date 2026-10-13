import { Printer, FileDown } from 'lucide-react';
import { isPass } from '../../lib/grading.js';
import { buttonClass } from './styles.js';
import logo from '/logo.webp';

/*
 * The one MOLEK report card. Fed only by the report-card endpoint, laid out
 * like the school's broadsheet: CA1 (15), CA2 (15), Exam (70), Total (100).
 * The same markup is shown on screen, printed (index.css prints only
 * .report-print-area on A4) and saved as PDF through the browser.
 */

const fmt = (v, dp = 0) => (v === null || v === undefined || Number.isNaN(Number(v)) ? '—' : Number(v).toFixed(dp));
const TRAITS = [
    ['punctuality', 'Punctuality'], ['attendance', 'Attendance'], ['carrying_out_assignment', 'Carrying out assignments'],
    ['neatness', 'Neatness'], ['politeness', 'Politeness'], ['honesty', 'Honesty'], ['self_control', 'Self-control'],
    ['relationship_others', 'Relationship with others'], ['sense_responsibility', 'Sense of responsibility'],
    ['obedience', 'Obedience'], ['organizational_ability', 'Organisational ability'],
];
const KEY = 'A 75–100 Excellent · B 70–74 Very good · C 60–69 Good · D 50–59 Pass · E 45–49 Fair · F 0–44 Fail';

const Info = ({ label, value }) => (
    <div><dt className="text-sm text-gray-600">{label}</dt><dd className="font-semibold">{value || '—'}</dd></div>
);

const Cell = ({ children, className = '' }) => <td className={`border border-gray-300 px-2 py-1.5 ${className}`}>{children}</td>;
const Head = ({ children, className = '' }) => (
    <th scope="col" className={`border border-gray-300 bg-[#1F3B6B] px-2 py-1.5 text-white font-semibold ${className}`}>{children}</th>
);

const ReportCard = ({ report, student, mode = 'term' }) => {
    const s = report?.student || {};
    const name = s.full_name || student?.full_name || [student?.first_name, student?.last_name].filter(Boolean).join(' ');
    const passMark = report?.pass_mark ?? 50;
    const isTerm = mode === 'term';
    const summary = isTerm ? report?.summary : report?.cumulative;
    const behavioral = report?.behavioral || null;
    const termNames = (report?.terms || []).map((t) => t.name);

    const print = () => window.print();

    return (
        <article className="report-print-area rounded-2xl border border-gray-200 bg-white p-4 sm:p-8 text-[#2D2D2D]" aria-label="Report card">
            <div className="no-print mb-6 flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={print} className={buttonClass.primary}>
                    <Printer aria-hidden="true" className="h-5 w-5" /> Print report card
                </button>
                <button type="button" onClick={print} className={buttonClass.secondary}>
                    <FileDown aria-hidden="true" className="h-5 w-5" /> Download PDF
                </button>
                <p className="text-gray-600 sm:self-center text-base">For a PDF, choose "Save as PDF" as the printer.</p>
            </div>

            <header className="flex items-center gap-4 border-b-2 border-[#1F3B6B] pb-4">
                <img src={logo} alt="MOLEK Schools logo" className="h-20 w-auto object-contain" />
                <div>
                    <p className="text-2xl font-bold text-[#1F3B6B]">MOLEK SCHOOLS</p>
                    <p className="text-gray-600">Ofatedo, Osun State · Excellence in Islamic Education</p>
                    <p className="mt-1 font-semibold">{isTerm ? 'Terminal Report Card' : 'Session Report (all terms)'}</p>
                </div>
            </header>

            <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                <Info label="Name" value={name} />
                <Info label="Admission number" value={s.admission_number || student?.admission_number} />
                <Info label="Class" value={report?.class_name} />
                <Info label="Session" value={report?.session?.name} />
                {isTerm && <Info label="Term" value={report?.term?.name} />}
                <Info label="Pass mark" value={`${fmt(passMark)}%`} />
            </dl>

            <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse text-left text-[15px]">
                    <caption className="sr-only">Subject results</caption>
                    <thead>
                        {isTerm ? (
                            <tr>
                                <Head>Subject</Head><Head className="text-right">CA1 (15)</Head><Head className="text-right">CA2 (15)</Head>
                                <Head className="text-right">Exam (70)</Head><Head className="text-right">Total (100)</Head>
                                <Head className="text-center">Grade</Head><Head>Remark</Head><Head className="text-right">Class avg.</Head>
                            </tr>
                        ) : (
                            <tr>
                                <Head>Subject</Head>
                                {termNames.map((t) => <Head key={t} className="text-right">{t.replace(' Term', '')}</Head>)}
                                <Head className="text-right">Average</Head><Head className="text-center">Grade</Head><Head>Remark</Head><Head className="text-right">Class avg.</Head>
                            </tr>
                        )}
                    </thead>
                    <tbody>
                        {(report?.subjects || []).map((sub) => (isTerm ? (
                            <tr key={sub.subjectName}>
                                <th scope="row" className="border border-gray-300 px-2 py-1.5 font-semibold">{sub.subjectName}</th>
                                <Cell className="text-right tabular-nums">{fmt(sub.ca1Score, 1)}</Cell>
                                <Cell className="text-right tabular-nums">{fmt(sub.ca2Score, 1)}</Cell>
                                <Cell className="text-right tabular-nums">{fmt(sub.examTotal, 1)}</Cell>
                                <Cell className={`text-right tabular-nums font-bold ${isPass(sub.totalScore, passMark) ? '' : 'text-red-700'}`}>{fmt(sub.totalScore, 1)}</Cell>
                                <Cell className="text-center font-bold">{sub.grade || '—'}</Cell>
                                <Cell>{sub.remark || '—'}</Cell>
                                <Cell className="text-right tabular-nums">{fmt(sub.classAverage, 1)}</Cell>
                            </tr>
                        ) : (
                            <tr key={sub.subjectName}>
                                <th scope="row" className="border border-gray-300 px-2 py-1.5 font-semibold">{sub.subjectName}</th>
                                {termNames.map((t) => (
                                    <Cell key={t} className="text-right tabular-nums">{sub.termScores?.[t] ? fmt(sub.termScores[t].total, 1) : '—'}</Cell>
                                ))}
                                <Cell className={`text-right tabular-nums font-bold ${isPass(sub.cumulativeAverage, passMark) ? '' : 'text-red-700'}`}>{fmt(sub.cumulativeAverage, 1)}</Cell>
                                <Cell className="text-center font-bold">{sub.cumulativeGrade || '—'}</Cell>
                                <Cell>{sub.cumulativeRemark || '—'}</Cell>
                                <Cell className="text-right tabular-nums">{fmt(sub.classAverage, 1)}</Cell>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>

            {summary && (
                <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl bg-[#FAFAFA] p-4">
                    <Info label="Subjects" value={summary.totalSubjects} />
                    <Info label="Average" value={`${fmt(summary.averageScore, 1)}%`} />
                    <Info label="Overall grade" value={summary.grade} />
                    <Info label="Subjects passed" value={`${summary.passedSubjects ?? 0} of ${summary.totalSubjects ?? 0}`} />
                </dl>
            )}

            {isTerm && behavioral && (
                <div className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3 print:mt-3">
                    <table className="w-full border-collapse text-[15px] sm:col-span-2 print:col-span-2">
                        <caption className="text-left font-semibold text-[#1F3B6B] mb-1">Conduct (5 is best)</caption>
                        <tbody>
                            {Array.from({ length: Math.ceil(TRAITS.length / 2) }, (_, i) => TRAITS.slice(i * 2, i * 2 + 2)).map((pair) => (
                                <tr key={pair[0][0]}>
                                    {pair.map(([k, label]) => [
                                        <th key={`${k}-l`} scope="row" className="border border-gray-300 px-2 py-1 text-left font-normal">{label}</th>,
                                        <Cell key={`${k}-v`} className="text-center font-semibold w-12">{behavioral[k] ?? '—'}</Cell>,
                                    ])}
                                    {pair.length < 2 && <><td className="border border-gray-300" /><td className="border border-gray-300" /></>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="sm:col-span-2 print:col-span-2">
                        <span className="font-semibold text-[#1F3B6B]">Attendance: </span>
                        present <strong>{behavioral.times_present ?? '—'}</strong> of <strong>{behavioral.times_school_opened ?? '—'}</strong> times school opened
                        {report?.term?.school_resumes && <> · Next term begins <strong>{new Date(report.term.school_resumes).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></>}
                    </p>
                </div>
            )}

            {isTerm && (
                <div className="mt-6 grid sm:grid-cols-2 print:grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold text-[#1F3B6B]">Class teacher's comment</p>
                        <p>{behavioral?.class_teacher_comment || 'Not yet available.'}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-[#1F3B6B]">Principal's remark</p>
                        <p>{report?.principal_remark || 'Not yet available.'}</p>
                    </div>
                </div>
            )}

            <p className="mt-6 text-sm text-gray-600">Grades: {KEY}. CA1 + CA2 = 30 marks; Exam (objective + theory) = 70 marks.</p>
            <div className="mt-8 grid grid-cols-2 gap-8 text-sm">
                <p className="border-t border-gray-400 pt-1">Class teacher's signature</p>
                <p className="border-t border-gray-400 pt-1">Principal's signature</p>
            </div>
        </article>
    );
};

export default ReportCard;
