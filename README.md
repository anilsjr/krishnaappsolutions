# KRISHH APPS SOLUTIONS

Official website for **KRISHH APPS SOLUTIONS** — an Indore-based mobile app publisher building utility-driven Android applications.

**Live site:** [anilsjr.github.io/krishnaappsolutions](https://anilsjr.github.io/krishnaappsolutions/)

**Google Play:** [KRISHH APPS SOLUTIONS Developer Page](https://play.google.com/store/apps/developer?id=KRISHH+APPS+SOLUTIONS&hl=en)

---

## About

KRISHH APPS SOLUTIONS develops user-centric mobile apps for productivity, utilities, health, and everyday tasks. This repository contains the company landing page, privacy policy, and deployment configuration for GitHub Pages.

## Tech Stack

- HTML5
- [Tailwind CSS](https://tailwindcss.com) (CLI build — no runtime CDN)
- Vanilla JavaScript
- GitHub Pages + GitHub Actions

## Project Structure

```
krishnaappsolutions/
├── .github/workflows/static.yml   # CI/CD — build CSS and deploy to Pages
├── assets/images/                 # Logo, favicon, apple-touch-icon
├── css/main.css                   # Compiled Tailwind output (committed)
├── data/apps.json                 # Featured app metadata
├── js/main.js                     # Mobile nav and app card renderer
├── src/input.css                  # Tailwind source styles
├── index.html                     # Homepage
├── privacy.html                   # Full privacy policy
├── robots.txt
├── sitemap.xml
├── app-ads.txt                    # Google AdMob verification
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20 recommended)

### Setup

```bash
# Install dependencies
npm install

# Watch Tailwind CSS during development
npm run watch
```

In a second terminal, serve the site locally:

```bash
npx serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:3000` (serve) or `http://localhost:8080` (Python).

### Production Build

```bash
npm run build
```

This compiles and minifies `src/input.css` into `css/main.css`.

## Deployment

Pushing to the `main` branch triggers the GitHub Actions workflow:

1. Installs npm dependencies
2. Runs `npm run build`
3. Deploys the repository to GitHub Pages

No manual deploy steps are required after merging to `main`.

## Updating Featured Apps

Edit [`data/apps.json`](data/apps.json) to add or change featured apps. Each entry supports:

| Field | Description |
|-------|-------------|
| `name` | App display name |
| `description` | Short description for the card |
| `playStoreUrl` | Google Play listing URL |
| `iconUrl` | App icon image URL |
| `category` | Category label |
| `status` | e.g. `"published"` |

After editing, commit and push. No build step is needed for JSON changes.

## Contact

- **Email:** [satish.vishwakarma.it@gmail.com](mailto:satish.vishwakarma.it@gmail.com)
- **Location:** Indore, Madhya Pradesh, India
- **Play Store:** [Developer Page](https://play.google.com/store/apps/developer?id=KRISHH+APPS+SOLUTIONS&hl=en)

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE).
