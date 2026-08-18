# Daorong Ye - Research Portfolio

An editable React and CSS version of Daorong Ye's academic portfolio, configured for automatic deployment with GitHub Pages.

## Edit the website

The main content is in:

- `src/App.tsx` - biography, research, publications, experience and links
- `src/index.css` - colours, typography, layout and mobile styles
- `index.html` - page title, description and browser metadata

You can edit these files directly on GitHub by opening a file and selecting the pencil icon. Commit the change to the `main` branch and GitHub Pages will rebuild the website automatically.

## Run it on your computer

Install [Node.js 22 or later](https://nodejs.org/), then run:

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

## Publish with GitHub Pages

The deployment workflow is already included in `.github/workflows/deploy.yml`.

For the first deployment, open **Settings > Pages** and select **GitHub Actions** under **Build and deployment**. Then open the **Actions** tab and wait for `Deploy portfolio to GitHub Pages` to finish.

Public website:

```text
https://daorong-y.github.io/portfolio/
```

Each later commit to `main` automatically rebuilds and republishes the website.

## Optional custom domain

Add a custom domain under **Settings > Pages > Custom domain**. GitHub will show the DNS records that must be added through your domain provider.

## Privacy note

The website includes the email address and LinkedIn profile already shown on the published portfolio. It does not include a phone number or a downloadable copy of the original CV.

<!-- Deployment refresh: 2026-08-18 -->
