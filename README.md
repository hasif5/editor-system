# Hasif's Test Project — Single‑Page PDF Editor

Create and download beautiful single‑page PDFs with live editable content.

This project provides a focused “what you see is what you export” editor built on Next.js. It uses in‑place editing with `contenteditable` and exports the preview area to a paged A4 PDF with proper margins.

## Why this exists

Most WYSIWYG editors are either too heavy or not 1:1 with PDFs. This project keeps it simple:

- Edit directly on the document (headings, questions, MCQ choices)
- Toggle Edit Mode to prevent accidental changes
- Export exactly what you see to a PDF sized to A4 with margins

## Key features

- Live inline editing powered by [`react-contenteditable`](https://www.npmjs.com/package/react-contenteditable)
- Reliable PDF export using [`html2canvas-pro`](https://www.npmjs.com/package/html2canvas-pro) + [`jspdf`](https://www.npmjs.com/package/jspdf)
- Edit Mode toggle (green/grey) to lock and unlock editing
- Floating formatting toolbar (Bold / Italic / Underline) shown near the caret when editing
- MCQ question blocks with choices (A/B/C/D) — add and remove questions
- Mobile‑friendly layout; exports consistently to A4
- Custom favicon and clean UI

## Screens & workflow

1. Turn Edit Mode ON and click any text to edit inline
2. Use the small floating bar to Bold/Italic/Underline selections
3. Turn Edit Mode OFF for a stable preview
4. Click “Download PDF” — the exported file matches the preview area with ~10mm page margins

## Use‑cases

- Exam/quiz paper generator (questions + MCQs)
- Worksheets, checklists, and one‑pagers
- Briefs, memos, proposals, or printable forms
- Classroom and training handouts

## Tech stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- react-contenteditable (inline editing)
- html2canvas-pro (modern CSS color support such as lab/oklch)
- jsPDF (client‑side PDF generation)

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Exporting to PDF

The “Download PDF” button captures the preview element and renders to A4 using `html2canvas-pro` and `jsPDF`.

Tips for best results:

- Switch Edit Mode OFF before exporting to avoid stray carets or selection highlights
- Prefer local images from `/public` to avoid CORS issues
- Avoid extremely large pages; the exporter paginates but very long documents may impact performance

## Project structure

```
src/
  app/
    components/
      PDFEditor.tsx          # Main editor with toolbar and export
    types/
      react-contenteditable.d.ts  # Narrow typings for mouse/focus handlers
    layout.tsx               # App shell + branding
    page.tsx                 # Renders the editor
docs/
  PDF_EDITOR_GUIDE.md       # Extended documentation
public/
  favicon.svg               # Custom favicon
```

## Deployment

This repo is ready for Vercel. After logging in with the Vercel CLI:

```bash
npx vercel --prod
```

## Known limitations

- html2canvas (and derivatives) don’t execute scripts within the captured area and support a subset of CSS. `html2canvas-pro` adds support for modern color spaces (lab/oklch), but complex effects (e.g., videos, heavy filters) may not render.
- Cross‑origin images require proper CORS headers; prefer local assets under `/public`.

## Credits

- [`react-contenteditable`](https://www.npmjs.com/package/react-contenteditable)
- [`html2canvas-pro`](https://www.npmjs.com/package/html2canvas-pro)
- [`jspdf`](https://www.npmjs.com/package/jspdf)

---

If you build on this, consider opening a PR to share templates (e.g., different exam layouts, branding headers, or bilingual sheets).
