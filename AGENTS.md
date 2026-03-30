# Repository Guidelines

## Project Structure & Module Organization
This repository is a small static site. `index.html` defines the page structure and content. Visual styles live in `assets/css/styles.css`, and interactive behavior lives in `assets/js/main.js`. Reusable visual assets belong in `assets/icons/`; large page-specific images stay at the repository root only when directly referenced by the page.

## Build, Test, and Development Commands
There is no package-based build step in this project. Use a lightweight local server to preview changes instead of opening the HTML file directly.

`python -m http.server 8000`
Serves the site locally at `http://localhost:8000`.

`npx serve .`
Alternative static server if Node.js is available.

`git diff`
Review HTML, CSS, and JS changes before committing.

## Coding Style & Naming Conventions
Use 2-space indentation in HTML, CSS, and JavaScript, matching the existing files. Prefer semantic HTML sections and descriptive class names such as `hero-copy`, `browser-grid`, and `copy-btn`. Keep CSS custom properties in `:root` for shared colors and spacing. In JavaScript, use `const` by default, camelCase for functions, and keep DOM helpers small and focused.

## Testing Guidelines
This repo does not include an automated test suite. Validate changes manually in at least one modern desktop browser and confirm there are no console errors. When editing layout or interactions, check:

- navigation links and anchor scrolling
- copy button behavior in code blocks
- responsive layout around header, cards, and grids

If you add tooling later, place tests in a dedicated `tests/` folder or alongside the feature they cover.

## Commit & Pull Request Guidelines
Recent commits use short imperative subjects, for example: `Refactor page structure and extract styles and scripts` and `Add icon cards for browsers and project apps`. Follow the same pattern: start with a verb, keep the subject concise, and group related edits in one commit.

Pull requests should include a brief summary, list of affected areas, and screenshots for visible UI changes. Link the related issue or task when applicable, and note any manual browser checks performed.
