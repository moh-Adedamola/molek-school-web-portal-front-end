# MOLEK Schools: website and student portal

The public website for MOLEK Schools, Ofatedo (molekschools.com), and the student portal where students and parents see results and print report cards. Built with React 19, Vite and Tailwind CSS v4, and served by the Django backend (`molek-school-backend`).

## Getting started

```bash
cp .env.example .env      # set VITE_API_BASE_URL if you use a local backend
npm ci
npm run dev               # http://localhost:5173
```

You need Node 20 or newer.

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build into `dist/` (console messages are stripped) |
| `npm run preview` | Serve the production build locally |
| `npm test` | Unit tests for grading, portal data and sign-in messages (`src/lib/*.test.js`) |
| `npm run lint` | ESLint (should report no problems) |

## Settings

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Backend address. On Vercel, set it in the project's environment variables. If it is missing, pages still load and only the data requests fail. |

## How the code is organised

| Folder | Contents |
|---|---|
| `src/pages/` | Public pages (Home, About, Admissions, Academics, News, Gallery, Contact, Privacy, Terms, Accessibility, 404) and `StudentLogin` |
| `src/pages/portal/` | Portal pages: Home, Results, My details |
| `src/components/Landingpage/` | Header, footer, shared `PublicLayout` and homepage sections |
| `src/components/Portal/` | Portal layout, report card, results table, term picker, progress chart |
| `src/lib/` | Pure logic with unit tests: `grading.js` (pass mark), `portalData.js`, `loginErrors.js` |
| `src/service/` | API calls (`apiBase.js` holds the backend address; `tokenAuth.js` handles student sign-in tokens) |

Routes are in `src/routes.jsx`. Only the homepage loads up front; every other page, and the whole portal, loads when it is opened.

## Rules this project follows
- **Content:** the school's wording and information do not change without the school's say-so; changes are layout, accessibility and speed.
- **Colours:** only the existing palette: navy `#1F3B6B`, blue `#3B82F6` (icons and large text only), link blue `#2563EB`, cream `#F9D89C`, coral `#E85D5D` (decoration only), body text `#2D2D2D`.
- **Use what's installed:** Headless UI for dialogs, tabs, menus and pickers; react-hook-form + yup for forms; react-calendar; recharts; Swiper (no autoplay); lucide-react for every icon.
- **Grading:** the pass mark always comes from the backend (`pass_mark` on each result). Never hard-code 40, 45 or 50 anywhere except the fallback in `src/lib/grading.js`.
- **Students never see class position.**
- **Accessibility:** every page has one `h1` and a title, every form field has a linked label, nothing moves on its own, and text meets WCAG AA contrast.

## Deploying and installers
Pushing to `main` deploys to Vercel. Changes are delivered as installers (`molek-pN-*.sh`), which patch files in place and back up every changed file to `.molek-backup/<timestamp>-<installer>/` with a `rollback.sh`. They also run the tests and build, then commit and push their own files. `.molek-backup/` is git-ignored locally.
