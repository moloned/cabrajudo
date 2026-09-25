# Cabra Judo Club Website - Technical Specification

## 1. Project Overview
The Cabra Judo Club website is a static, multi-page web application designed to serve current and prospective club members. It provides essential club information, syllabus materials, and a dynamically updated schedule of national judo events.

## 2. Architecture & Tech Stack
- **Frontend Framework**: Vanilla HTML, CSS, JavaScript.
- **Build Tool**: Vite (`vite.config.js`). Vite handles the bundling of assets, CSS minification, and multi-page HTML routing.
- **Data Automation**: Python 3 (`urllib`, `re`).
- **PDF Engine**: `html2pdf.js` (utilizing html2canvas and jsPDF).

## 3. Core Pages & Functionality
### 3.1. Homepage (`index.html`)
- Landing page with hero banner, club introduction, and primary navigation.

### 3.2. Staff / Coaches (`staff.html`, `alonzo.html`)
- Profiles of the coaching team (Nevenka, Alonzo, David, Mary, Ari, Aga).
- Highlights coaching badges, competitive history, and club roles.

### 3.3. Events & PDF Export (`events.html`)
- Displays an aggregated table of upcoming official Irish Judo Association (IJA) events.
- Columns include: Date, Event Name, and Age Categories (Minors, Pre-Cadets, Juniors, Seniors, Veterans).
- **PDF Export**: A client-side JavaScript function that injects specific print styles (reducing margins, adjusting fonts for A4 portrait layout), attaches high-resolution base64 encoded logos (Cabra and IJA), and utilizes `html2pdf.js` to generate a downloadable document without triggering CORS security blocks.

### 3.4. Syllabus & Grading (`gradings.html`, `mon-study-guide.html`, `kyu-study-guide.html`)
- Interactive digital references for student syllabus and grading requirements.

### 3.5. Operations (`shop.html`, `payments.html`, `policies.html`, `safeguarding.html`)
- Handles merchandising, fee structures, and strict adherence to IJA safeguarding and child protection policies.

## 4. Automation & Workflows
### 4.1. Event Scraper (`scripts/update_events.py`)
A Python script designed to scrape the IJA events page.
- **Parsing**: Uses regex and `urllib` to extract event names and dates.
- **Categorization**: Analyzes event names to automatically append checkmarks for relevant age bands.
- **Injection**: Directly modifies the DOM string of `events.html` to inject the new `<tbody>`.

### 4.2. Monthly CI/CD Cron (`.github/workflows/update-events.yml`)
- Trigger: Runs at `00:00` on the 1st of every month via GitHub Actions schedule.
- Environment: Ubuntu-latest, Node 20, Python 3.12.
- Execution: Runs the scraper, runs `npm run build`, and automatically commits and pushes the updated assets to the repository.
