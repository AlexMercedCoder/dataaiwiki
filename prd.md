# PRD: Astro Static Wiki Mirror for `AlexMercedCoder/dataaiwiki`

## 1. Overview

Build an Astro static website that mirrors the GitHub Wiki for `AlexMercedCoder/dataaiwiki`.

The website should treat the GitHub Wiki as the source of truth. Contributors will add or edit content through the GitHub Wiki. When the Astro site builds, it will pull the latest wiki content, normalize the Markdown, generate static pages, and deploy the result through Netlify.

The project should produce a fast, searchable, content-focused static site with a minimalist editorial design inspired by the provided Refero style reference.

## 2. Project Repository

Primary repository:

```text
https://github.com/AlexMercedCoder/dataaiwiki
```

Expected GitHub Wiki repository:

```text
https://github.com/AlexMercedCoder/dataaiwiki.wiki.git
```

The Astro site may live in the main repository or in a dedicated website repository. The recommended approach is to place the Astro site in the main repo and pull the wiki repo during the Netlify build.

## 3. Goals

The site must:

1. Mirror the GitHub Wiki content as static web pages.
2. Pull the latest wiki content during each Netlify build.
3. Preserve a clean URL structure for wiki pages.
4. Convert GitHub Wiki Markdown conventions into website-friendly Markdown.
5. Generate navigation from wiki pages.
6. Include a footer with required external links.
7. Follow the provided minimalist visual style.
8. Deploy through Netlify.
9. Support a scheduled weekly rebuild through Netlify.
10. Remain simple enough to maintain without a backend database.

## 4. Non-Goals

The first version does not need to:

1. Provide real-time sync without a rebuild.
2. Allow editing wiki pages from the Astro website.
3. Replace GitHub Wiki permissions or workflows.
4. Store content in a CMS.
5. Support comments, accounts, authentication, or user profiles.
6. Support complex version history in the website UI.
7. Render every possible GitHub-flavored Markdown extension perfectly.

## 5. Target Users

### Primary users

People who want to read Data and AI Wiki content in a polished website experience.

### Contributors

People who add and edit content in the GitHub Wiki.

### Maintainer

Alex Merced or another maintainer who manages the repo, Netlify deployment, design, navigation, and content workflow.

## 6. User Stories

### Reader

As a reader, I want to browse wiki pages on a clean website so I can consume the content without using the GitHub Wiki interface.

As a reader, I want readable URLs so I can share pages easily.

As a reader, I want a clear navigation system so I can move between related pages.

As a reader, I want search so I can find a topic quickly.

### Contributor

As a contributor, I want to edit the GitHub Wiki normally so I do not need to learn a new CMS.

As a contributor, I want my updates reflected on the website after the next build.

### Maintainer

As a maintainer, I want the site to rebuild weekly even when no source commit happens so wiki updates are pulled into production.

As a maintainer, I want the build to fail clearly if the wiki cannot be cloned or normalized.

As a maintainer, I want a footer that links to Alex Merced’s related sites.

## 7. Core Concept

GitHub Wikis are Git repositories. The Astro site will clone the wiki repository at build time.

Build flow:

```text
Netlify build starts
  ↓
Install dependencies
  ↓
Clone https://github.com/AlexMercedCoder/dataaiwiki.wiki.git into ./wiki-raw
  ↓
Normalize wiki Markdown into ./src/content/wiki
  ↓
Astro reads ./src/content/wiki
  ↓
Astro generates static routes
  ↓
Netlify deploys the static site
```

## 8. Functional Requirements

### 8.1 Wiki Sync

The site must include a build step that clones the wiki repo before Astro builds.

Recommended command:

```bash
rm -rf ./wiki-raw ./src/content/wiki
git clone --depth=1 https://github.com/AlexMercedCoder/dataaiwiki.wiki.git ./wiki-raw
node ./scripts/normalize-wiki.mjs
astro build
```

The `--depth=1` flag keeps the build fast.

The build must fail if the wiki repository cannot be cloned.

### 8.2 Markdown Normalization

The project should include a script:

```text
scripts/normalize-wiki.mjs
```

The script should:

1. Read Markdown files from `./wiki-raw`.
2. Ignore non-content files unless explicitly supported.
3. Convert GitHub Wiki filenames into route-friendly slugs.
4. Add frontmatter when missing.
5. Convert GitHub Wiki links to Astro-compatible links.
6. Copy supported static assets into `public/wiki-assets` or `src/assets/wiki`.
7. Write normalized files into `./src/content/wiki`.

Example source file:

```text
wiki-raw/Semantic-Layer.md
```

Example normalized output:

```text
src/content/wiki/semantic-layer.md
```

Example generated route:

```text
/wiki/semantic-layer/
```

### 8.3 Frontmatter

Each normalized page should include frontmatter.

Minimum frontmatter:

```yaml
---
title: "Semantic Layer"
sourceFile: "Semantic-Layer.md"
slug: "semantic-layer"
updatedFromWiki: true
---
```

If a wiki page already contains frontmatter, preserve useful fields and fill in missing fields.

### 8.4 GitHub Wiki Link Support

The normalizer should support common GitHub Wiki links.

Input:

```md
[[Semantic Layer]]
[[Semantic Layer|semantic layer overview]]
[[Folder/Page]]
```

Output:

```md
[Semantic Layer](/wiki/semantic-layer/)
[semantic layer overview](/wiki/semantic-layer/)
[Folder/Page](/wiki/folder/page/)
```

The implementation should also preserve normal Markdown links.

### 8.5 Routing

Astro must generate static routes from the content collection.

Expected route pattern:

```text
/wiki/[...slug]
```

The home page should provide an overview and entry points into the wiki.

The `Home.md` wiki page should map to one of the following:

Preferred:

```text
/wiki/
```

Acceptable:

```text
/wiki/home/
```

The preferred option is `/wiki/`.

### 8.6 Navigation

The site should generate navigation from wiki pages.

Minimum navigation:

1. Homepage link.
2. Wiki index link.
3. Alphabetical list of all wiki pages.
4. Footer links.

Recommended navigation:

1. Left sidebar on desktop.
2. Collapsible navigation on mobile.
3. Current page indicator.
4. Optional topic grouping through frontmatter fields.

### 8.7 Search

The first version should include client-side search.

Recommended options:

1. Pagefind.
2. MiniSearch.
3. FlexSearch.

Preferred option:

```text
Pagefind
```

Reason:

Pagefind is well suited for static sites and can index the built HTML output.

Recommended package flow:

```bash
npm install pagefind
```

Recommended build flow:

```json
{
  "scripts": {
    "sync:wiki": "rm -rf ./wiki-raw ./src/content/wiki && git clone --depth=1 https://github.com/AlexMercedCoder/dataaiwiki.wiki.git ./wiki-raw",
    "normalize:wiki": "node ./scripts/normalize-wiki.mjs",
    "build": "npm run sync:wiki && npm run normalize:wiki && astro build && npx pagefind --site dist"
  }
}
```

### 8.8 Footer

Every page must include a footer with links to:

```text
alexmerced.com
alexmerceddata.com
datalakehousehub.com
semanticlakehouse.com
opendatalakehouse.com
agenticlakehouse.com
openlakehouse.help
```

Recommended footer labels:

```text
AlexMerced.com
AlexMercedData.com
DataLakehouseHub.com
SemanticLakehouse.com
OpenDataLakehouse.com
AgenticLakehouse.com
OpenLakehouse.help
```

Recommended URLs:

```text
https://alexmerced.com
https://alexmerceddata.com
https://datalakehousehub.com
https://semanticlakehouse.com
https://opendatalakehouse.com
https://agenticlakehouse.com
https://openlakehouse.help
```

Footer requirements:

1. Links must appear on every page.
2. Links must open normally in the same tab unless otherwise changed later.
3. Footer must be accessible by keyboard navigation.
4. Footer must have enough contrast against the background.

## 9. Design Requirements

Design reference:

```text
https://styles.refero.design/style/5a7ba5ff-0476-4f3f-99f9-0b920534dde5
```

The site should use a type-driven, high-contrast, editorial design.

### 9.1 Visual Direction

The design should feel:

1. Minimal.
2. Typographic.
3. Editorial.
4. Architectural.
5. High contrast.
6. Spacious.
7. Content-first.

### 9.2 Color Tokens

Use the following palette:

```css
:root {
  --color-canvas-parchment: #fdfaf3;
  --color-cocoa-ink: #472425;
  --color-pure-white: #ffffff;
  --color-absolute-black: #000000;
  --color-deep-charcoal: #121212;
  --color-alert-crimson: #e73737;
}
```

Usage:

1. `#fdfaf3` for the main page background.
2. `#472425` for primary text, headings, borders, and links.
3. `#ffffff` for content blocks where contrast helps.
4. `#000000` sparingly for dark sections.
5. `#121212` for secondary dark text.
6. `#e73737` only for subtle accents, alerts, tags, or focus states.

### 9.3 Typography

Use system font fallbacks unless licensed font files are already available in the project.

Recommended CSS:

```css
:root {
  --font-primary: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-display: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

Display headings should use:

```css
font-weight: 400;
letter-spacing: -0.025em;
line-height: 0.9;
```

Body copy should use:

```css
font-size: 1rem;
line-height: 1.6;
```

### 9.4 Layout

The layout should include:

1. Top navigation.
2. Large typographic hero on the home page.
3. Wiki index.
4. Article layout for each wiki page.
5. Sidebar navigation on wide screens.
6. Mobile-friendly menu.
7. Footer on every page.

Recommended maximum content width:

```css
--content-width: 760px;
--page-width: 1200px;
```

Use large whitespace between major sections.

### 9.5 Component Style

Components should use:

1. Flat surfaces.
2. No heavy shadows.
3. No rounded corners for primary elements.
4. Thin borders.
5. Dashed borders for subtle interaction states.
6. Text-based buttons and links.
7. Strong typographic hierarchy.

Avoid:

1. Decorative gradients.
2. Heavy card chrome.
3. Rounded SaaS-style components.
4. Dense blocks of text.
5. Bright colors outside the defined palette.

## 10. Technical Requirements

### 10.1 Framework

Use Astro.

Recommended packages:

```bash
npm install astro
npm install @astrojs/sitemap
npm install pagefind
```

Optional packages:

```bash
npm install gray-matter
npm install github-slugger
npm install markdown-it
```

### 10.2 Astro Content Collection

Create:

```text
src/content.config.ts
```

Example:

```ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const wiki = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/wiki"
  }),
  schema: z.object({
    title: z.string(),
    sourceFile: z.string().optional(),
    slug: z.string().optional(),
    updatedFromWiki: z.boolean().optional()
  })
});

export const collections = { wiki };
```

### 10.3 Dynamic Wiki Route

Create:

```text
src/pages/wiki/[...slug].astro
```

The page must:

1. Use `getCollection("wiki")`.
2. Generate static paths.
3. Render Markdown content.
4. Display title.
5. Display page navigation.
6. Include metadata.

### 10.4 Sitemap

Generate a sitemap for all static wiki pages.

Recommended config:

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://YOUR-NETLIFY-DOMAIN",
  integrations: [sitemap()]
});
```

Replace `YOUR-NETLIFY-DOMAIN` after the production URL is known.

### 10.5 Robots

Add:

```text
public/robots.txt
```

Recommended content:

```txt
User-agent: *
Allow: /

Sitemap: https://YOUR-NETLIFY-DOMAIN/sitemap-index.xml
```

### 10.6 Netlify Configuration

Create:

```text
netlify.toml
```

Recommended configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[functions]
  directory = "netlify/functions"
```

If Node 22 causes package compatibility issues, use Node 20.

## 11. Scheduled Weekly Build on Netlify

### 11.1 Recommended Netlify-Native Approach

Use a Netlify Build Hook plus a Netlify Scheduled Function.

Netlify Build Hooks are URLs that trigger a new build and deploy when they receive a POST request.

Netlify Scheduled Functions can run on a cron schedule. This allows the deployed site to call its own build hook weekly.

### 11.2 Netlify Setup Steps

1. Open the Netlify project.
2. Go to:

```text
Project configuration → Build & deploy → Continuous deployment → Build hooks
```

3. Create a build hook.
4. Select the production branch.
5. Copy the build hook URL.
6. Add the URL as an environment variable:

```text
NETLIFY_BUILD_HOOK_URL
```

7. Add a scheduled function that calls this URL weekly.

### 11.3 Scheduled Function

Create:

```text
netlify/functions/weekly-rebuild.mts
```

Example:

```ts
import type { Config } from "@netlify/functions";

export default async function handler() {
  const buildHookUrl = process.env.NETLIFY_BUILD_HOOK_URL;

  if (!buildHookUrl) {
    console.error("Missing NETLIFY_BUILD_HOOK_URL");
    return new Response("Missing NETLIFY_BUILD_HOOK_URL", { status: 500 });
  }

  const response = await fetch(buildHookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      reason: "Scheduled weekly wiki mirror rebuild"
    })
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Failed to trigger Netlify build hook", {
      status: response.status,
      body
    });

    return new Response("Failed to trigger build", { status: 500 });
  }

  return new Response("Build triggered", { status: 200 });
}

export const config: Config = {
  schedule: "@weekly"
};
```

Netlify runs scheduled functions in UTC. `@weekly` runs every Sunday at 00:00 UTC.

### 11.4 Alternative Explicit Cron Schedule

To run every Monday at 9:00 AM UTC:

```ts
export const config: Config = {
  schedule: "0 9 * * 1"
};
```

### 11.5 Important Netlify Notes

Scheduled functions only run on published deploys.

Scheduled functions cannot be invoked directly through a public URL in production.

Use the Netlify UI function page and the `Run now` action to test the function after deployment.

Build hooks require active builds.

The build hook URL must be treated like a secret.

Do not commit the build hook URL to the repository.

### 11.6 Fallback Option: GitHub Actions Scheduled Build Hook

If the Netlify-native scheduled function is not desired, use GitHub Actions to call the Netlify build hook.

Create:

```text
.github/workflows/weekly-netlify-build.yml
```

Example:

```yaml
name: Weekly Netlify Build

on:
  schedule:
    - cron: "0 9 * * 1"
  workflow_dispatch:

jobs:
  trigger-netlify:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Netlify build hook
        run: |
          curl -X POST -d '{}' "$NETLIFY_BUILD_HOOK_URL"
        env:
          NETLIFY_BUILD_HOOK_URL: ${{ secrets.NETLIFY_BUILD_HOOK_URL }}
```

This fallback can be easier to debug from GitHub.

## 12. Build Scripts

Recommended `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "sync:wiki": "rm -rf ./wiki-raw ./src/content/wiki && git clone --depth=1 https://github.com/AlexMercedCoder/dataaiwiki.wiki.git ./wiki-raw",
    "normalize:wiki": "node ./scripts/normalize-wiki.mjs",
    "build:astro": "astro build",
    "index:search": "pagefind --site dist",
    "build": "npm run sync:wiki && npm run normalize:wiki && npm run build:astro && npm run index:search",
    "preview": "astro preview"
  }
}
```

## 13. Suggested File Structure

```text
.
├── astro.config.mjs
├── netlify.toml
├── package.json
├── public/
│   ├── robots.txt
│   └── wiki-assets/
├── scripts/
│   └── normalize-wiki.mjs
├── src/
│   ├── components/
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── SearchBox.astro
│   │   └── WikiSidebar.astro
│   ├── content/
│   │   └── wiki/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── WikiLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── wiki/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   └── styles/
│       └── global.css
├── netlify/
│   └── functions/
│       └── weekly-rebuild.mts
└── wiki-raw/
```

`wiki-raw` should be ignored by Git.

Add to `.gitignore`:

```gitignore
wiki-raw/
src/content/wiki/
dist/
.cache/
.netlify/
```

The normalized content can either be ignored or committed. Recommended for this project: ignore it and regenerate on build.

## 14. SEO Requirements

Each wiki page should include:

1. `<title>`.
2. Meta description when available.
3. Canonical URL.
4. Open Graph title.
5. Open Graph description.
6. Sitemap entry.

If a page has no description, generate one from the first 150 to 160 characters of page content.

## 15. Accessibility Requirements

The site must:

1. Use semantic HTML.
2. Provide visible focus states.
3. Maintain sufficient color contrast.
4. Support keyboard navigation.
5. Use descriptive link text.
6. Avoid relying only on color to show state.
7. Include skip-to-content link.
8. Use proper heading order.

## 16. Performance Requirements

The site should:

1. Generate static HTML.
2. Avoid client-side JavaScript except for search and navigation.
3. Keep CSS small and global.
4. Use local assets when possible.
5. Avoid large image dependencies.
6. Target Lighthouse performance score above 90.

## 17. Error Handling

The build should fail when:

1. The wiki repo cannot be cloned.
2. The normalizer cannot parse required content.
3. Duplicate slugs are generated.
4. Required page metadata cannot be generated.
5. Astro cannot generate routes.

The normalizer should log:

1. Number of pages processed.
2. Number of links converted.
3. Number of assets copied.
4. Duplicate slug warnings.
5. Unsupported file warnings.

## 18. Content Edge Cases

The implementation should account for:

1. Wiki filenames with spaces.
2. Wiki filenames with uppercase letters.
3. Wiki filenames with punctuation.
4. Nested wiki folders.
5. Image references.
6. Relative Markdown links.
7. GitHub Wiki bracket links.
8. Missing `Home.md`.
9. Duplicate page titles.
10. Empty wiki pages.

## 19. Security Requirements

The build hook URL must be stored in Netlify environment variables.

Do not expose secrets in the client bundle.

Do not commit `.env` files.

If the wiki is private, use a deploy key or GitHub token stored as a Netlify environment variable.

Private wiki clone example:

```bash
git clone --depth=1 https://x-access-token:${GITHUB_TOKEN}@github.com/AlexMercedCoder/dataaiwiki.wiki.git ./wiki-raw
```

For public wikis, avoid using a token.

## 20. Analytics

Analytics are optional for version one.

If analytics are added, prefer lightweight privacy-friendly analytics.

Possible options:

1. Netlify Analytics.
2. Plausible.
3. Fathom.
4. GoatCounter.

## 21. Acceptance Criteria

The project is complete when:

1. Netlify successfully builds and deploys the Astro site.
2. The build clones the latest GitHub Wiki content.
3. Wiki Markdown files become static Astro pages.
4. Internal wiki links work on the website.
5. The site includes a `/wiki/` index page.
6. Each wiki page has a readable URL.
7. The footer includes all required links.
8. The site matches the provided minimalist design direction.
9. Search works across wiki pages.
10. A weekly scheduled rebuild is configured.
11. The scheduled rebuild can be tested manually through Netlify.
12. The build does not require manual file copying.
13. The site works on desktop and mobile.
14. The site produces a sitemap.

## 22. Milestones

### Milestone 1: Astro Foundation

Deliverables:

1. Astro project setup.
2. Global layout.
3. Design tokens.
4. Header and footer.
5. Basic home page.

### Milestone 2: Wiki Sync

Deliverables:

1. Build script that clones wiki repo.
2. Normalizer script.
3. Content collection.
4. Dynamic wiki routes.

### Milestone 3: Navigation and Search

Deliverables:

1. Wiki index.
2. Sidebar navigation.
3. Pagefind search.
4. Mobile navigation.

### Milestone 4: Netlify Deployment

Deliverables:

1. `netlify.toml`.
2. Production deploy.
3. Environment variables.
4. Build hook.

### Milestone 5: Scheduled Rebuild

Deliverables:

1. Netlify scheduled function.
2. Weekly rebuild configuration.
3. Manual test through Netlify UI.
4. Documentation in README.

## 23. Open Questions

1. Should the Astro site live inside `AlexMercedCoder/dataaiwiki` or a separate repo?
2. Should normalized wiki content be committed or generated only during build?
3. Should the homepage mirror `Home.md` or use a custom landing page?
4. Should contributors use frontmatter in wiki pages?
5. Should pages support topic grouping through metadata?
6. What should the final production domain be?
7. Should the site include analytics?
8. Should external links open in the same tab or a new tab?

## 24. Recommended Implementation Decision

Use the main repository for the Astro site.

Generate normalized wiki content during build.

Use `/wiki/` as the wiki index.

Use Netlify Scheduled Functions plus a Netlify Build Hook for the weekly rebuild.

Use GitHub Actions only as a fallback.

Use Pagefind for static search.

Follow the Refero style reference with a warm parchment background, cocoa ink typography, sharp layouts, thin borders, no shadows, no rounded corners, and strong display typography.
