import PolicyPage from '../components/Policy/PolicyPage.jsx';

// Keep "Known problems today" honest: list any problem we know about, and re-check after each change.
const sections = [
    {
        heading: 'Our goal',
        paragraphs: ['We are working towards the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.'],
    },
    {
        heading: 'What we have improved',
        paragraphs: ['Recent changes to the website and student portal include:'],
        bullets: [
            'larger, easier-to-read text and stronger colour contrast;',
            'a clear label on every form field, so screen readers announce it;',
            'every button and link reachable with a keyboard, with a visible outline showing where you are;',
            'no text that moves or changes on its own;',
            'pages that fit small phone screens without scrolling sideways;',
            'results in a plain table, and a report card that prints on one page.',
        ],
    },
    {
        heading: 'Known problems today',
        paragraphs: [
            'In our latest check (October 2026), every page passed an automated accessibility test with no serious problems. Automated tests cannot catch everything, so if any part of the site is hard for you to use, please tell us.',
        ],
    },
    {
        heading: 'If something does not work for you',
        paragraphs: ['Call the school office on +234 706 627 7945 or email info@molekschools.com and we will help you another way.'],
    },
    {
        heading: 'Tell us about a problem',
        paragraphs: [
            'Tell us which page you were on and what went wrong, by phone, email or the WhatsApp form on the Contact page. We aim to reply within 3 to 5 working days.',
        ],
    },
    {
        heading: 'Review',
        paragraphs: ['We will review this statement each time part of the redesign goes live.'],
    },
];

const Accessibility = () => (
    <PolicyPage
        title="Accessibility statement"
        updated="October 2026"
        intro={[
            'We want everyone to be able to use this website and the student portal: parents and grandparents who rarely use apps, people using a screen reader or a keyboard instead of a mouse, and anyone on a small phone or a slow connection.',
        ]}
        sections={sections}
        contact={false}
    />
);

export default Accessibility;
