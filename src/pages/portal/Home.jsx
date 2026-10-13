import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isSameDay, parseISO, isValid } from 'date-fns';
import { FileText, MapPin } from 'lucide-react';
import { useStudentAuth } from '../../context/StudentAuthContext';
import { getStudentGrades, getUpcomingEvents } from '../../service/studentApi';
import useCachedRequest from '../../hooks/useCachedRequest.js';
import { latestTermWithResults, termSummary, fullName } from '../../lib/portalData.js';
import { Card, EmptyState, ErrorState, PageTitle, PromotionStamp, Skeleton } from '../../components/Portal/ui.jsx';
import { buttonClass } from '../../components/Portal/styles.js';

const toDate = (v) => { const d = typeof v === 'string' ? parseISO(v) : new Date(v); return isValid(d) ? d : null; };

const Home = () => {
    const { student } = useStudentAuth();
    const grades = useCachedRequest('grades', getStudentGrades);
    const events = useCachedRequest('events', getUpcomingEvents);
    const latest = useMemo(() => latestTermWithResults(grades.data?.grades), [grades.data]);
    const summary = latest ? termSummary(latest.rows) : null;
    const eventList = useMemo(() => (events.data?.results || [])
        .map((e) => ({ ...e, when: toDate(e.event_date) })).filter((e) => e.when), [events.data]);
    const [day, setDay] = useState(new Date());
    const dayEvents = eventList.filter((e) => isSameDay(e.when, day));
    const first = (student?.first_name || fullName(student).split(' ')[0]);

    return (
        <>
            <PageTitle title={`Welcome, ${first}`} subtitle="Here is the latest from school." />

            <div className="space-y-6">
                <Card>
                    <h2 className="text-xl font-bold text-[#1F3B6B]">Latest results</h2>
                    {grades.loading && <div className="mt-4"><Skeleton /></div>}
                    {grades.error && <ErrorState onRetry={grades.reload} />}
                    {!grades.loading && !grades.error && !latest && (
                        <EmptyState title="No results yet">Results appear here once the school publishes them.</EmptyState>
                    )}
                    {latest && summary && (
                        <>
                            <p className="mt-1 text-gray-600">{latest.termName}, {latest.sessionName}{latest.className ? ` · ${latest.className}` : ''}</p>
                            <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="rounded-xl bg-[#FAFAFA] p-4">
                                    <dt className="text-gray-600">Term average</dt>
                                    <dd className="text-4xl font-bold text-[#1F3B6B] tabular-nums">{summary.average ?? '—'}<span className="text-xl font-semibold">%</span></dd>
                                </div>
                                <div className="rounded-xl bg-[#FAFAFA] p-4">
                                    <dt className="text-gray-600">Subjects passed (pass mark {summary.passMark}%)</dt>
                                    <dd className="text-4xl font-bold text-[#1F3B6B] tabular-nums">{summary.passed} <span className="text-xl font-semibold text-gray-600">of {summary.total}</span></dd>
                                </div>
                            </dl>
                            {grades.data?.promotion && <div className="mt-4"><PromotionStamp promotion={grades.data.promotion} /></div>}
                            <div className="mt-5 flex flex-col sm:flex-row gap-3">
                                <Link to={`/student/results?session=${latest.sessionId}&term=${latest.termId}&view=report`} className={buttonClass.primary}>
                                    <FileText aria-hidden="true" className="h-5 w-5" /> View report card
                                </Link>
                                <Link to="/student/results" className={buttonClass.secondary}>See all results</Link>
                            </div>
                        </>
                    )}
                </Card>

                <Card>
                    <h2 className="text-xl font-bold text-[#1F3B6B]">School calendar</h2>
                    {events.error && <ErrorState onRetry={events.reload} />}
                    {!events.error && (
                        <div className="mt-4 grid lg:grid-cols-2 gap-6">
                            <Calendar
                                className="molek-calendar !w-full !border-gray-200 rounded-xl !font-[inherit]"
                                value={day}
                                onChange={setDay}
                                tileClassName={({ date, view }) => (view === 'month' && eventList.some((e) => isSameDay(e.when, date)) ? 'has-event' : null)}
                                tileContent={({ date, view }) => (view === 'month' && eventList.some((e) => isSameDay(e.when, date))
                                    ? <span className="sr-only">, has a school event</span> : null)}
                            />
                            <div>
                                <h3 className="font-semibold">{format(day, 'EEEE d MMMM yyyy')}</h3>
                                {dayEvents.length ? (
                                    <ul className="mt-2 space-y-3">{dayEvents.map((e) => (
                                        <li key={e.id} className="rounded-xl border border-gray-200 p-3">
                                            <p className="font-semibold">{e.title}</p>
                                            <p className="text-gray-600">{format(e.when, 'h:mm a')}</p>
                                            {e.location && <p className="text-gray-600 flex items-center gap-1"><MapPin aria-hidden="true" className="h-4 w-4" /> {e.location}</p>}
                                        </li>))}
                                    </ul>
                                ) : <p className="mt-2 text-gray-600">No school events on this day.</p>}
                                <h3 className="mt-6 font-semibold">Coming up</h3>
                                {events.loading ? <Skeleton lines={2} /> : eventList.length ? (
                                    <ul className="mt-2 space-y-2">{eventList.slice(0, 4).map((e) => (
                                        <li key={e.id}>
                                            <button type="button" onClick={() => setDay(e.when)} className="text-left text-[#2563EB] underline underline-offset-2">
                                                {format(e.when, 'd MMM')}: {e.title}
                                            </button>
                                        </li>))}
                                    </ul>
                                ) : <p className="mt-2 text-gray-600">No upcoming events yet.</p>}
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </>
    );
};

export default Home;
