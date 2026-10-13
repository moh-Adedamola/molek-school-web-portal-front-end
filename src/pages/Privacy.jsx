import PolicyPage from '../components/Policy/PolicyPage.jsx';

const sections = [
    {
        heading: 'What we hold',
        bullets: [
            'Identity: full name, admission number, date of birth, gender and passport photograph.',
            'Contact details: email address, phone number, home address, state of origin and local government area.',
            'Parent or guardian: name, phone number and email address.',
            "School record: class and session, continuous assessment and examination scores, grades and remarks, attendance, behaviour ratings, the class teacher's comment, the principal's remark, promotion decisions, and whether this term's fees are recorded as paid.",
        ],
        after: ["Most of this comes from the school's own records. Students and parents can update some of it in the portal (see below)."],
    },
    {
        heading: 'Why we hold it',
        bullets: [
            'To run the school: teaching, assessment, promotion and keeping in touch with parents.',
            'To let each student and their parents see results and report cards online.',
            'To confirm fees before the portal opens: an account whose fees for the current term are not recorded as paid cannot sign in.',
        ],
        after: ['We do not sell this information or share it with advertisers.'],
    },
    {
        heading: 'Who can see it',
        bullets: [
            "The student and their parents, by signing in with that student's admission number and password. Each sign-in shows one student's record only.",
            "Authorised school staff, who manage records through the school's administration system.",
            'Companies that host the service for us: Vercel (the website), Railway (the server and database) and Cloudinary (photographs). They store information on our behalf and may not use it for anything else.',
        ],
    },
    {
        heading: 'What you can change yourself',
        paragraphs: [
            "In the portal you can update the student's email address, phone number, home address and passport photograph, and change the password. For anything else, such as a misspelt name or a parent's new number, contact the school office.",
        ],
    },
    {
        heading: 'What we store on your device',
        paragraphs: [
            'When you sign in, the portal keeps your sign-in session and basic profile in your browser so you stay signed in between pages. Signing out removes them; please always sign out on a shared phone or computer. The homepage also keeps the latest news headline for up to an hour so it loads faster. The website does not use advertising or analytics trackers.',
        ],
    },
    {
        heading: 'Messages and photos',
        bullets: [
            "Contact form: the form on the Contact page opens WhatsApp with your message. The message is sent through WhatsApp, under WhatsApp's own privacy terms; it is not stored on this website.",
            'News and gallery: these pages may show photographs of students at school events. A parent can ask the school office at any time to take down a photograph of their child.',
        ],
    },
    {
        heading: 'How long we keep it',
        paragraphs: [
            "We keep academic records (results, report cards and promotion decisions) permanently, because former students need them for transcripts and testimonials long after they leave. Other personal details, such as contact details, parents' details and passport photographs, are deleted 10 years after the student leaves.",
        ],
    },
    {
        heading: 'Your rights',
        paragraphs: [
            "Under the Nigeria Data Protection Act 2023, you can ask to see the information we hold about you or your child, ask us to correct it, and in some cases ask us to delete it or stop using it. You can also ask at any time for the student's portal profile to be removed. Most of our students are under 18, so a parent or guardian can make these requests on their behalf. Send requests to the school office by phone, email or in person; we reply within 3 to 5 working days.",
        ],
    },
    {
        heading: 'Changes to this policy',
        paragraphs: ['If we change how we use information, we will update this page and the date at the top.'],
    },
];

const Privacy = () => (
    <PolicyPage
        title="Privacy policy"
        updated="October 2026"
        intro={[
            'MOLEK Schools, Ofatedo ("the school", "we") runs this website and the student portal. This page explains what information we hold about students, why we hold it, who can see it, and what you can ask us to do about it.',
        ]}
        sections={sections}
    />
);

export default Privacy;
