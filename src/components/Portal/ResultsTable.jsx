import { isPass, passMarkOf } from '../../lib/grading.js';

const num = (v) => (v === null || v === undefined || v === '' ? '—' : Number(v).toFixed(Number(v) % 1 ? 1 : 0));

/**
 * One term's results. A real table on wider screens; stacked rows on phones,
 * same data, at a readable size. Pass/fail uses the backend's pass mark.
 */
const ResultsTable = ({ rows }) => {
    const sorted = [...rows].sort((a, b) => String(a.subject_name).localeCompare(String(b.subject_name)));
    const status = (r) => (isPass(r.total_score, passMarkOf(r))
        ? <span className="font-semibold text-green-800">Passed</span>
        : <span className="font-semibold text-red-700">Below pass mark</span>);
    return (
        <>
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left">
                    <caption className="sr-only">Results by subject</caption>
                    <thead>
                        <tr className="border-b-2 border-[#1F3B6B] text-[#1F3B6B]">
                            <th scope="col" className="py-3 pr-3">Subject</th>
                            <th scope="col" className="py-3 px-2 text-right">CA1 <span className="font-normal text-gray-600">/15</span></th>
                            <th scope="col" className="py-3 px-2 text-right">CA2 <span className="font-normal text-gray-600">/15</span></th>
                            <th scope="col" className="py-3 px-2 text-right">Exam <span className="font-normal text-gray-600">/70</span></th>
                            <th scope="col" className="py-3 px-2 text-right">Total <span className="font-normal text-gray-600">/100</span></th>
                            <th scope="col" className="py-3 px-2 text-center">Grade</th>
                            <th scope="col" className="py-3 pl-2">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((r) => (
                            <tr key={r.id} className="border-b border-gray-200">
                                <th scope="row" className="py-3 pr-3 font-semibold">{r.subject_name}</th>
                                <td className="py-3 px-2 text-right tabular-nums">{num(r.ca1_score)}</td>
                                <td className="py-3 px-2 text-right tabular-nums">{num(r.ca2_score)}</td>
                                <td className="py-3 px-2 text-right tabular-nums">{num(r.exam_total)}</td>
                                <td className="py-3 px-2 text-right tabular-nums font-bold">{num(r.total_score)}</td>
                                <td className="py-3 px-2 text-center font-bold">{r.grade || '—'}</td>
                                <td className="py-3 pl-2">{status(r)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ul className="sm:hidden divide-y divide-gray-200">
                {sorted.map((r) => (
                    <li key={r.id} className="py-4">
                        <div className="flex items-baseline justify-between gap-3">
                            <p className="font-semibold">{r.subject_name}</p>
                            <p className="text-xl font-bold tabular-nums">{num(r.total_score)}<span className="text-base font-normal text-gray-600">/100</span> <span className="ml-1">{r.grade}</span></p>
                        </div>
                        <p className="mt-1 text-gray-600 tabular-nums">CA1 {num(r.ca1_score)}/15 · CA2 {num(r.ca2_score)}/15 · Exam {num(r.exam_total)}/70</p>
                        <p className="mt-1">{status(r)}</p>
                    </li>
                ))}
            </ul>
            <p className="mt-4 text-gray-600">CA1 and CA2 are class tests (15 marks each). Exam is objective plus theory, 70 marks together.</p>
        </>
    );
};

export default ResultsTable;
