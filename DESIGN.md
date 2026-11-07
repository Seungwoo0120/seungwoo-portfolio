# Portfolio design and implementation brief

Audience: software, backend, platform and FinTech internship recruiters.

The site is an English, editorial portfolio. A clear personal introduction leads to selected product work, a complete project index, technical case studies, internship experience, and verified contact links. The alternatives were a CV-first single page (less room for technical evidence) and a dashboard-style portfolio (more interaction than the reading task needs). Use an editorial home plus dedicated case studies.

Use restrained near-black / warm-white surfaces, system sans-serif typography, monospaced section labels, subtle borders, generous spacing, and actual project screenshots. Default to dark mode with persistent light-mode switching. No external fonts, decorative stock photos, fake robot photography, animated counters, or made-up performance results. Mobile navigation, filters and image dialogs must support keyboard input and reduced motion.

React + TypeScript + Vite + Tailwind. Generate static HTML for home, project index, eight case studies and an explicitly incomplete Patrol Pro page. The same sanitized JSON content supports a future PDF. No database or application backend.

The research folder is reference-only. Copy selected images explicitly, never its complete directory or JSON. Private Git URLs, source text, logs, local paths, raw commit history and company screenshots are excluded from this repository. Selected private-team UI screenshots and high-level summaries form a local release candidate; publication requires the user's explicit final review.

Implement in this order: validated content boundary and tests; reusable site shell and pages; local production build and static rendering; browser checks at mobile/tablet/desktop widths and in both themes; release-content review; public GitHub repository and Vercel deployment only after approval. Missing LinkedIn/Resume links stay absent until supplied, rather than using placeholder links.
