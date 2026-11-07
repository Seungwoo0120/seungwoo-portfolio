# Seungwoo Noh — Portfolio

An editorial portfolio built with React, TypeScript, Vite, and Tailwind CSS. It is a static site: no database, authentication service, or application backend is needed.

## Run

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm test
npm run build
npm run preview
```

The build generates HTML for home, the project index, nine technical case studies, including Patrol Pro, and a 404 page. Individual case-study URLs work directly without relying on an SPA fallback. Vercel serves the generated `dist/` directory.

## Edit content

- `src/content/profile.json`: introduction, education, experience, skills, and contact links. Set the resume URL when a PDF is available.
- `src/content/projects.json`: ordered case-study content. Each project separates the complete team product, individual contributions, current implementation, verification, and limits.
- `public/images/<project>/`: selected optimized screenshots. Keep factual captions and team attribution.
- `src/content/types.ts`: the shared content shape.
- `src/styles.css`: theme tokens, responsive layout, and print styles.

To add a project, copy one JSON entry with a unique `id`, add verified content and images, and run the tests and build. The build adds its static route automatically. Keep `sourceVisibility` accurate and omit GitHub links for private projects. A private source repository must not be made public by copying its raw files into this site.

`dist/portfolio-content.json` exports the same structured content for future integrated or project-specific PDFs. It is content data, not a finished PDF.

## Deployment

Vercel settings: framework **Vite**, build command **npm run build**, output directory **dist**. `vercel.json` sets the static output and trailing-slash behavior. Set `SITE_URL` to the final HTTPS site URL when generating an absolute sitemap. These settings follow [Vite’s deployment guide](https://vite.dev/guide/static-deploy) and [Vercel’s Vite documentation](https://vercel.com/docs/frameworks/frontend/vite).

Production: [seungwoo-portfolio-flax.vercel.app](https://seungwoo-portfolio-flax.vercel.app). Vercel builds the site from this repository's `main` branch. Review changes locally before pushing to `main`.

## Content boundaries

Only curated descriptions and selected UI images belong here. Raw source clones, investigation reports, commit-history exports, local sessions, company catalogs, and company screenshots are not included. Team images are curated for this portfolio. Review publication permission before adding new project materials. Test counts describe the reviewed snapshot, not current production performance or sole authorship of every test.
