import { useMemo, useState } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Field, Label, Select } from '@headlessui/react';
import { subjectHistory, subjectNames } from '../../lib/portalData.js';
import { EmptyState } from './ui.jsx';

/** One subject's total across every term, with the pass mark marked. */
const SubjectTrendChart = ({ grades }) => {
    const names = useMemo(() => subjectNames(grades), [grades]);
    // Open on the subject with the most terms of results, so there is a line to see.
    const [subject, setSubject] = useState(() => [...names].sort((a, b) =>
        subjectHistory(grades, b).length - subjectHistory(grades, a).length)[0] || '');
    const points = useMemo(() => subjectHistory(grades, subject), [grades, subject]);
    const passMark = points.length ? points[points.length - 1].passMark : 50;

    if (!names.length) return <EmptyState title="No results yet" />;
    return (
        <div>
            <Field className="w-full sm:w-80">
                <Label className="block font-semibold text-[#1F3B6B] mb-1">Subject</Label>
                <Select value={subject} onChange={(e) => setSubject(e.target.value)}
                    className="w-full min-h-12 rounded-xl border-2 border-gray-300 bg-white px-4 py-2.5 focus-visible:outline focus-visible:outline-3 focus-visible:outline-[#1F3B6B]">
                    {names.map((n) => <option key={n} value={n}>{n}</option>)}
                </Select>
            </Field>
            {points.length < 2 ? (
                <p className="mt-6 text-gray-600">This chart fills in once there are results from more than one term.</p>
            ) : (
                <figure className="mt-6">
                    <div className="h-72 w-full">
                        <ResponsiveContainer>
                            <LineChart data={points} margin={{ top: 10, right: 16, bottom: 10, left: 0 }}>
                                <CartesianGrid stroke="#e5e7eb" />
                                <XAxis dataKey="label" tick={{ fontSize: 14, fill: '#2D2D2D' }} interval={0} angle={-20} textAnchor="end" height={60} />
                                <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 14, fill: '#2D2D2D' }} width={40} />
                                <Tooltip formatter={(v) => [`${v}/100`, 'Total']} />
                                <ReferenceLine y={passMark} stroke="#2D2D2D" strokeDasharray="6 4"
                                    label={{ value: `Pass mark ${passMark}`, position: 'insideBottomRight', fontSize: 13, fill: '#2D2D2D' }} />
                                <Line type="monotone" dataKey="total" stroke="#1F3B6B" strokeWidth={3} dot={{ r: 5, fill: '#1F3B6B' }}
                                    isAnimationActive={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <figcaption className="mt-2 text-gray-600">
                        {subject}: {points.map((p) => `${p.label} ${p.total}`).join(', ')}.
                    </figcaption>
                </figure>
            )}
        </div>
    );
};

export default SubjectTrendChart;
