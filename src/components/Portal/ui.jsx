import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react';
import { initials } from '../../lib/portalData.js';

// Existing MOLEK colours only: navy #1F3B6B, link #2563EB, blue #3B82F6
// (icons/large text), body #2D2D2D, page #FAFAFA, cream #F9D89C.

export const PageTitle = ({ title, subtitle }) => (
    <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F3B6B]">{title}</h1>
        {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
    </header>
);

export const Card = ({ children, className = '' }) => (
    <section className={`rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 ${className}`}>{children}</section>
);

export const Skeleton = ({ lines = 3 }) => (
    <div role="status" aria-label="Loading" className="space-y-3 animate-pulse motion-reduce:animate-none">
        {Array.from({ length: lines }, (_, i) => (
            <div key={i} className="h-5 rounded bg-gray-200" style={{ width: `${90 - i * 12}%` }} />
        ))}
    </div>
);

export const EmptyState = ({ title, children }) => (
    <div className="flex flex-col items-center text-center py-10 text-[#2D2D2D]">
        <Inbox aria-hidden="true" className="h-10 w-10 text-[#3B82F6]" />
        <p className="mt-3 font-semibold">{title}</p>
        {children && <div className="mt-1 text-gray-600 max-w-md">{children}</div>}
    </div>
);

export const ErrorState = ({ onRetry, children }) => (
    <div role="alert" className="flex flex-col items-center text-center py-10 text-[#2D2D2D]">
        <AlertTriangle aria-hidden="true" className="h-10 w-10 text-red-700" />
        <p className="mt-3 font-semibold">We couldn't load this.</p>
        <p className="mt-1 text-gray-600 max-w-md">
            {children || 'Check your internet connection, then try again. If it keeps happening, call the school office.'}
        </p>
        {onRetry && (
            <button type="button" onClick={onRetry}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1F3B6B] px-5 py-3 font-semibold text-white focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1F3B6B]">
                <RefreshCw aria-hidden="true" className="h-4 w-4" /> Try again
            </button>
        )}
    </div>
);

/** Student photo, or initials when there is no photo or it fails to load. */
export const Avatar = ({ src, name, size = 48 }) => {
    const style = { width: size, height: size };
    const fallback = (
        <span style={style} aria-hidden="true"
            className="inline-flex items-center justify-center rounded-full bg-[#F9D89C] font-bold text-[#1F3B6B]">
            {initials(name)}
        </span>
    );
    if (!src) return fallback;
    return (
        <img src={src} alt="" style={style} className="rounded-full object-cover bg-gray-100"
            onError={(e) => {
                const span = document.createElement('span');
                span.textContent = initials(name);
                span.setAttribute('aria-hidden', 'true');
                span.className = 'inline-flex items-center justify-center rounded-full bg-[#F9D89C] font-bold text-[#1F3B6B]';
                span.style.width = `${size}px`;
                span.style.height = `${size}px`;
                e.currentTarget.replaceWith(span);
            }} />
    );
};

/* ----------------------------------------------------------------
   Promotion outcome stamp. Wording is the SCHOOL'S to set; change it
   here and nowhere else. Amber (not red) for repeating is deliberate.
   No stamp when no decision is recorded: guessing would be wrong.
   ---------------------------------------------------------------- */
const OUTCOME_STAMPS = {
    promoted: {
        label: 'PROMOTED', wrap: 'border-green-300 bg-green-50', chip: 'bg-green-700', text: 'text-green-900',
        message: (s) => (<>Congratulations! You have been promoted to <strong>{s.to_class}</strong>
            {s.session ? <> for <strong>{s.session}</strong></> : null}. Your results below are from {s.from_class}.</>),
    },
    repeating: {
        label: 'REPEATING', wrap: 'border-amber-300 bg-amber-50', chip: 'bg-amber-700', text: 'text-amber-900',
        message: (s) => (<>You will be repeating <strong>{s.from_class}</strong>
            {s.session ? <> for <strong>{s.session}</strong></> : null}. Please speak with your class teacher if you have any questions.</>),
    },
    graduated: {
        label: 'GRADUATED', wrap: 'border-blue-300 bg-blue-50', chip: 'bg-[#1F3B6B]', text: 'text-blue-900',
        message: (s) => (<>Congratulations! You have completed <strong>{s.from_class}</strong> and graduated
            {s.session ? <> in <strong>{s.session}</strong></> : null}.</>),
    },
};

export const PromotionStamp = ({ promotion }) => {
    if (!promotion) return null;
    const key = promotion.status || (promotion.promoted ? 'promoted' : null);
    const stamp = key ? OUTCOME_STAMPS[key] : null;
    if (!stamp) return null;
    return (
        <div className={`flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border px-4 py-3 ${stamp.wrap}`}>
            <span className={`self-start inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-white tracking-wide ${stamp.chip}`}>
                {stamp.label}
            </span>
            <p className={stamp.text}>{stamp.message(promotion)}</p>
        </div>
    );
};
