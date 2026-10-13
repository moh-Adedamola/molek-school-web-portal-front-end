import PolicyPage from '../components/Policy/PolicyPage.jsx';

const sections = [
    {
        heading: 'Portal accounts',
        bullets: [
            'The school gives each student an admission number and a starting password. Change the password after your first sign-in and keep it private.',
            'Only the student and their parents or guardians should use the account. Anything done while signed in is treated as done by the account holder.',
            'If you think someone else knows your password, change it at once and tell the school office.',
            'Always sign out on a shared phone or computer.',
            'Forgotten your password? Contact the school office to have it reset.',
        ],
    },
    {
        heading: 'Fees and access',
        paragraphs: [
            'The portal opens only for students whose fees for the current term are recorded as paid. If you see an outstanding-fees message when signing in, contact the bursary.',
        ],
    },
    {
        heading: 'Results and report cards',
        bullets: [
            "The portal shows the scores, grades and remarks recorded by the school. If something looks wrong, contact the school; the school's own records decide.",
            "The portal does not show a student's position in class.",
            'A report card printed from the portal is an official school document.',
        ],
    },
    {
        heading: 'Online payments',
        paragraphs: [
            "Online fee payment through Paystack is coming soon. The payment page in the portal is a preview: no money is taken there, and any receipt it shows is marked SAMPLE and is not proof of payment. Until online payment goes live, pay fees as the school's bursary directs.",
        ],
    },
    {
        heading: 'Acceptable use',
        paragraphs: ['You must not:'],
        bullets: [
            "try to view or change another student's record;",
            'share your account or sign in as someone else;',
            'upload an offensive or misleading photograph;',
            'try to disrupt, overload or get around the security of the website or portal.',
        ],
        after: ['The school may suspend an account that breaks these rules.'],
    },
    {
        heading: 'Website content',
        paragraphs: [
            "The MOLEK name, logo, text and photographs on this website belong to MOLEK Schools; do not copy or reuse them without the school's permission. News, admission requirements and dates are published in good faith and may change, so confirm anything important with the school office.",
        ],
    },
    {
        heading: 'Other services',
        paragraphs: ['The contact form opens WhatsApp, and some pages link to social media. Those services have their own terms.'],
    },
    {
        heading: 'Availability',
        paragraphs: ['We aim to keep the website and portal running, but they may be unavailable during maintenance or for reasons outside our control.'],
    },
    {
        heading: 'Changes and governing law',
        paragraphs: [
            'We may update these terms; the date at the top will change when we do. These terms are governed by the laws of the Federal Republic of Nigeria.',
        ],
    },
];

const Terms = () => (
    <PolicyPage
        title="Terms of use"
        updated="October 2026"
        intro={['These terms apply to everyone who uses molekschools.com and the MOLEK student portal. By using them, you agree to these terms.']}
        sections={sections}
    />
);

export default Terms;
