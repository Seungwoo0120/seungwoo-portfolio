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

- `src/content/profile.json`: introduction, education, experience, skills, and contact links. LinkedIn is the user-supplied URL; Resume is absent until a real file or URL is supplied.
- `src/content/projects.json`: ordered case-study content. Each project separates the complete team product, individual contributions, current implementation, verification, and limits.
- `public/images/<project>/`: selected optimized screenshots. Keep factual captions and team attribution.
- `src/content/types.ts`: the shared content shape.
- `src/styles.css`: theme tokens, responsive layout, and print styles.

To add a project, copy one JSON entry with a unique `id`, add verified content and images, and run the tests and build. The build adds its static route automatically. Keep `sourceVisibility` accurate and omit GitHub links for private projects. A private source repository must not be made public by copying its raw files into this site.

`dist/portfolio-content.json` exports the same structured content for future integrated or project-specific PDFs. It is content data, not a finished PDF.

## Deployment

Vercel settings: framework **Vite**, build command **npm run build**, output directory **dist**. `vercel.json` sets the static output and trailing-slash behavior. Set `SITE_URL` to the final HTTPS site URL when generating an absolute sitemap. These settings follow [Vite’s deployment guide](https://vite.dev/guide/static-deploy) and [Vercel’s Vite documentation](https://vercel.com/docs/frameworks/frontend/vite).

Public GitHub repository creation and external deployment are pending the user's explicit review of the completed release candidate. No deployment is authorized merely by running a local build.

## Content boundaries

Only curated descriptions and selected UI images belong here. Raw source clones, investigation reports, commit-history exports, local sessions, company catalogs, and company screenshots are not included. Some team UI images originate from private projects and require final publication review. The site contains no invented robot photographs or unverified Patrol Pro capabilities. Test counts describe the reviewed snapshot, not current production performance or sole authorship of every test.
