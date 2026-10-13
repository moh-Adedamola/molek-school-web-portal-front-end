import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tab, TabGroup, TabList, TabPanel, TabPanels, Radio, RadioGroup, Label, Field } from '@headlessui/react';
import { getReportCard, getStudentGrades } from '../../service/studentApi';
import { useStudentAuth } from '../../context/StudentAuthContext';
import useCachedRequest from '../../hooks/useCachedRequest.js';
import { findTerm, groupGradesByTerm, termSummary } from '../../lib/portalData.js';
import { Card, EmptyState, ErrorState, PageTitle, PromotionStamp, Skeleton } from '../../components/Portal/ui.jsx';
import TermPicker from '../../components/Portal/TermPicker.jsx';
import ResultsTable from '../../components/Portal/ResultsTable.jsx';
import ReportCard from '../../components/Portal/ReportCard.jsx';
import SubjectTrendChart from '../../components/Portal/SubjectTrendChart.jsx';

const VIEWS = ['results', 'report', 'progress'];
const tabClass = ({ selected }) => `min-h-12 rounded-full px-5 py-2.5 font-semibold focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B] ${selected ? 'bg-[#1F3B6B] text-white' : 'bg-white text-[#1F3B6B] border-2 border-gray-300'}`;

const ReportPanel = ({ term, student, scope }) => {
    const termId = scope === 'session' ? null : term.termId;
    const key = `report:${term.sessionId}:${termId ?? 'session'}`;
    const report = useCachedRequest(key, () => getReportCard(term.sessionId, termId));
    if (report.loading) return <Card><Skeleton lines={6} /></Card>;
    if (report.error) return <Card><ErrorState onRetry={report.reload} /></Card>;
    return <ReportCard report={report.data} student={student} mode={scope === 'session' ? 'session' : 'term'} />;
};

const Results = () => {
    const { student } = useStudentAuth();
    const [params, setParams] = useSearchParams();
    const grades = useCachedRequest('grades', getStudentGrades);
    const groups = useMemo(() => groupGradesByTerm(grades.data?.grades), [grades.data]);
    const selected = findTerm(groups, params.get('session'), params.get('term')) || groups[0] || null;
    const view = Math.max(0, VIEWS.indexOf(params.get('view') || 'results'));
    const scope = params.get('scope') === 'session' ? 'session' : 'term';

    const update = (next) => {
        const merged = new URLSearchParams(params);
        Object.entries(next).forEach(([k, v]) => merged.set(k, v));
        setParams(merged, { replace: true });
    };
    const summary = selected ? termSummary(selected.rows) : null;

    return (
        <>
            <PageTitle title="Results" subtitle="Scores, report cards and progress for every term." />
            {grades.loading && <Card><Skeleton lines={5} /></Card>}
            {grades.error && <Card><ErrorState onRetry={grades.reload} /></Card>}
            {!grades.loading && !grades.error && !selected && (
                <Card><EmptyState title="No results yet">Results appear here once the school publishes them.</EmptyState></Card>
            )}
            {selected && (
                <div className="space-y-6">
                    {grades.data?.promotion && <PromotionStamp promotion={grades.data.promotion} />}
                    <TermPicker groups={groups} value={selected}
                        onChange={(g) => update({ session: g.sessionId, term: g.termId })} />

                    <TabGroup selectedIndex={view} onChange={(i) => update({ view: VIEWS[i] })}>
                        <TabList aria-label="Results views" className="flex flex-wrap gap-2">
                            <Tab className={tabClass}>Results</Tab>
                            <Tab className={tabClass}>Report card</Tab>
                            <Tab className={tabClass}>Progress</Tab>
                        </TabList>
                        <TabPanels className="mt-5">
                            <TabPanel>
                                <Card>
                                    <h2 className="text-xl font-bold text-[#1F3B6B]">{selected.termName}, {selected.sessionName}</h2>
                                    {summary && (
                                        <p className="mt-1 text-gray-600">
                                            Average <strong className="text-[#2D2D2D]">{summary.average ?? '—'}%</strong> · passed{' '}
                                            <strong className="text-[#2D2D2D]">{summary.passed} of {summary.total}</strong> subjects (pass mark {summary.passMark}%)
                                        </p>
                                    )}
                                    <div className="mt-4"><ResultsTable rows={selected.rows} /></div>
                                </Card>
                            </TabPanel>
                            <TabPanel>
                                <Field className="mb-4">
                                    <Label className="block font-semibold text-[#1F3B6B] mb-2">Which report?</Label>
                                    <RadioGroup value={scope} onChange={(v) => update({ scope: v })} className="flex flex-wrap gap-2">
                                        {[['term', `${selected.termName} only`], ['session', `Whole ${selected.sessionName} session`]].map(([v, label]) => (
                                            <Radio key={v} value={v} className={({ checked }) => tabClass({ selected: checked })}>{label}</Radio>
                                        ))}
                                    </RadioGroup>
                                </Field>
                                <ReportPanel term={selected} student={student} scope={scope} />
                            </TabPanel>
                            <TabPanel>
                                <Card><SubjectTrendChart grades={grades.data?.grades || []} /></Card>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            )}
        </>
    );
};

export default Results;
