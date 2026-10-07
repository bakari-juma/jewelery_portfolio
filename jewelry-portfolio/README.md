# Product Portfolio

A responsive jewelry and accessories product portfolio built with React 18, Vite, and hand-written CSS.
## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.
```sh
npm install
npm run dev
```
Create a production build with `npm run build`; preview it locally with `npm run preview`.
## Edit the portfolio

Update portfolio copy, trend prompts, project details, and contact links in `src/data/content.js`. Replace `[YOUR NAME]` and `[ADD ...]` placeholders only with accurate, candidate-approved information. Keep unverified results out of the case studies.
Add project images and documents under `public/assets/`, then update their paths in `content.js`. Project and process images use lazy loading. The spec sheet and CV links are intentional placeholders until those files exist. The contact form validates in the browser and opens a prefilled email through the mailto fallback once `contact.emailHref` contains a real email address.

The visual product artwork is CSS-generated placeholder artwork, not a representation of completed client work. Replace it with properly described images when available.
## Deploy

- **Netlify:** Connect the repository; `netlify.toml` sets `npm run build` and `dist`.
- **Vercel:** Import the project; `vercel.json` provides the single-page fallback. Build command: `npm run build`; output directory: `dist`.
- **GitHub Pages:** Set the repository subpath before building, for example in PowerShell: `$env:VITE_BASE_PATH = '/repository-name/'; npm run build`. Publish `dist/` with GitHub Pages. Use `/` for a custom-domain root site. For CI, set `VITE_BASE_PATH` in the build job environment.
For subpath deployments, update absolute document and asset URLs in `index.html` and `src/data/content.js` to include the repository base path, or change them to relative paths.

## Candidate content and asset checklist

- [ ] Name, short introduction, availability, and accurate bio.
- [ ] Four personally observed trends with source links and dates, rationale, and productization ideas.
- [ ] Three to five real product case studies, category, original idea/source, production constraints, and verified outcome (or clearly label a concept).
- [ ] Project images or sketches with descriptive alt text; label AI-generated imagery as a concept render.
- [ ] Dimensions, materials, plating, finish, weight, and packaging details for featured products.
- [ ] Downloadable spec sheet PDF and CV PDF; update both paths in `src/data/content.js`.
- [ ] AI/render tools and a true sketch-to-final visual sequence.
- [ ] A real sample revision example, Shopify experience or honest learning case, and weekly async update.
- [ ] Email, WhatsApp, LinkedIn, response window, and `contact.emailHref`.
- [ ] Optional Formspree endpoint if you want server-side form delivery instead of the mailto fallback.
- [ ] Replace the Open Graph preview in `public/assets/og-image.svg` with a candidate-branded share image if desired.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
