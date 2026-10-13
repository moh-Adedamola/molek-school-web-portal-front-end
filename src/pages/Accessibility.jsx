import PolicyPage from '../components/Policy/PolicyPage.jsx';

// Keep "Known problems today" honest: remove each item as the redesign fixes it.
const sections = [
    {
        heading: 'Our goal',
        paragraphs: ['We are working towards the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA.'],
    },
    {
        heading: 'What we are improving',
        paragraphs: ['Our current redesign brings:'],
        bullets: [
            'larger, easier-to-read text and stronger colour contrast;',
            'a clear label on every form field, so screen readers announce it;',
            'every button and link reachable with a keyboard, with a visible outline showing where you are;',
            'no text that moves or changes on its own;',
            'pages that fit small phone screens without scrolling sideways;',
            'results in a plain table that prints cleanly.',
        ],
    },
    {
        heading: 'Known problems today',
        paragraphs: ['We know about these and are fixing them:'],
        bullets: [
            'Some buttons and labels have low colour contrast.',
            'Most form fields are not announced properly by screen readers.',
            'The About and News pages scroll sideways on small phones.',
            'The address banner scrolls and the news headline changes every 5 seconds; neither can be paused on a touch screen.',
            'Some news cards cannot be opened with a keyboard, and the photo viewer does not hold keyboard focus.',
            'The results chart uses very small text.',
            'Two pages have no main heading, which makes them harder to move around with a screen reader.',
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
