# Cabra Judo Club Website

The official website for Cabra Judo Club, a local Judo club affiliated with the Irish Judo Association. This static website provides information about the club's staff, events, gradings, study guides, policies, and safeguarding.

## Features
- **Static Multi-page Architecture**: Optimized, fast-loading static HTML structure built with Vite.
- **Dynamic Event Scraping**: Automated integration with the Irish Judo Association's event calendar. A Python scraper (`scripts/update_events.py`) checks for new events, formats them into the `events.html` page, and assigns age categories (Minors, Pre-Cadets, Juniors, Seniors, Veterans).
- **PDF Export Engine**: Built-in client-side PDF generation on the Events page utilizing `html2pdf.js` to create print-ready A4 portrait event schedules.
- **Study Guides & Syllabuses**: Digital guides for Mon and Kyu gradings.
- **Automated Workflow**: A GitHub Actions CI/CD pipeline (`.github/workflows/update-events.yml`) automatically pulls new IJA events on the 1st of every month and rebuilds the site.

## Tech Stack
- HTML5 / Vanilla CSS / JavaScript
- **Bundler**: Vite
- **PDF Generation**: `html2pdf.js` (html2canvas, jsPDF)
- **Scraper**: Python 3 (urllib, regex)
- **CI/CD**: GitHub Actions

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Updating Events Manually
To manually update the events list from the IJA website:
```bash
python3 scripts/update_events.py
npm run build
```
