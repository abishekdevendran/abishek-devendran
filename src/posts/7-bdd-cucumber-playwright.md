---
title: 'The Cucumber Incident: Over-Engineering BDD Tests for a SvelteKit Portfolio'
publishedAt: '2026-03-23'
description: "How I survived the Node.js ESM module resolution boss fight to build an enterprise-grade Cucumber + Playwright testing stack for my personal blog."
tags: ['sveltekit', 'playwright', 'cucumber', 'bdd', 'typescript', 'testing', 'esm']
published: true
coverImage: /7.jpg
author: Abishek Devendran
---

# Life Update & The Problem

Life in Chennai keeps me pretty busy with Rifle Clubs, Ice Skating CLasses, Surfing sessions and long drives in the city traffic on my new Bike!, but my personal portfolio (`abishek.work`) is my sacred sandbox. Recently, I added some complex routing and dark-mode toggles. 

I needed a way to test it. 

I had three options:
1.  **Click around manually:** (Caveman behavior. Prone to human error).
2.  **Write standard Playwright scripts:** (Functional, but a bit boring).
3.  **Over-engineer an enterprise-grade, Behavior-Driven Development (BDD) stack using Cucumber, Playwright, and a dynamically mapped Page Object Model, entirely in strict TypeScript.**

Obviously, I chose option 3. 

Why use plain English feature files designed for non-technical Product Managers on a solo project where I am the only stakeholder? Because it's cool, it looks great on a resume, and I wanted to see if I could.

Here is how I built the ultimate testing Rube Goldberg machine.

---

# The Architecture

The goal was simple: I write a plain English sentence like `Given I navigate to the blog post "first-post"`, and my computer opens a browser, navigates my SvelteKit site, checks the DOM, and spits out a beautiful HTML report.

Here is the stack that makes the magic happen:

1.  **The Muscle (Playwright):** Drives the browser and asserts the DOM.
2.  **The Brain (Cucumber):** Parses plain-English `.feature` files into executable steps.
3.  **The Translator (`tsx`):** Compiles TypeScript on the fly without breaking SvelteKit's ESM rules.
4.  **The Factory (Page Object Manager):** A lazy-loaded TypeScript class router.

---

# Layer 1: Bypassing the Linux Dependency Hell

If you run Linux (like my Fedora setup), installing Playwright usually results in a terminal screaming at you about missing `libicu` and `apt-get` packages. 

Instead of polluting my host OS with random libraries for Playwright's custom browser binaries, I bypassed it entirely. I told Playwright to skip the downloads and just hijack my system's native Google Chrome.

```typescript
// playwright.config.ts / setup.ts
use: { 
  ...devices['Desktop Chrome'],
  channel: 'chrome', // <-- The magic word. "Just use the browser I already have."
},
```

---

# Layer 2: The ESM Boss Fight (TypeScript vs. Node)

This was the hardest part of the build. SvelteKit uses `"type": "module"` (ESM). 
* Node.js strictly demands file extensions (e.g., `import { setup } from './setup.js'`).
* TypeScript historically *hates* when you put extensions in import paths.

If you don't do it perfectly, Node crashes with `ERR_MODULE_NOT_FOUND`. To fix this, I had to commit a modern JavaScript sin: **Importing `.ts` files directly.**

```typescript
// Yes, the .ts extension is required here. Yes, it feels illegal.
import { CustomWorld } from '../support/setup.ts'; 
```

To stop VS Code from throwing red squiggly lines everywhere, I had to enable the ultimate modern TS flag in `tsconfig.json`:
`"allowImportingTsExtensions": true`

Finally, I wired Cucumber to use `tsx/esm` as its runtime importer. It intercepts the files, translates the TypeScript in memory, and hands valid JavaScript back to Node. Flawless victory.

---

# Layer 3: The Lazy Page Object Factory

If I hardcoded `this.page.locator(...)` into every step definition, my code would turn into spaghetti the second I changed a Tailwind class on my blog.

I built a **Page Object Model (POM)** to abstract the UI logic. But to ensure this setup could scale to hundreds of tests without leaking memory, I wrapped them in an `index.ts` Page Manager using **ES6 getters**.

```typescript
// tests/e2e/pages/index.ts
import type { Page } from '@playwright/test';
import { HomePage } from './HomePage.ts';
import { BlogPage } from './BlogPage.ts';

export function createPages(page: Page) {
  // Using getters ensures we only instantiate the page object 
  // if the specific test actually asks for it. Zero memory waste.
  return {
    get homePage() { return new HomePage(page); },
    get blogPage() { return new BlogPage(page); }
  };
}

export type AppPages = ReturnType<typeof createPages>;
```

Now, in my step definitions, I just type `await this.pages.blogPage.verifyTitle("Hello World")` and the autocompletion is absolutely perfect.

---

# Layer 4: The Aesthetics (YAML & HTML)

Terminal dots (`....`) are for peasants. I wanted a visual dashboard. 

I ditched the standard `cucumber.js` file for a clean `cucumber.yaml` configuration. This let me add comments (which JSON doesn't support) and enable enterprise features like **parallel execution** and **auto-retries** for flaky tests.

```yaml
# cucumber.yaml
default:
  formatOptions:
    snippetInterface: async-await
  paths:
    - tests/e2e/features/**/*.feature
  import:
    - tsx/esm
    - tests/e2e/features/support/**/*.ts
    - tests/e2e/features/step_definitions/**/*.ts
  format:
    - progress
    - html:test-results/cucumber-report.html # The Dashboard
  
  retry: 1 # Defeat network flakiness
  parallel: 2 # Go fast
```

I added `test-results/` to my `.gitignore` so the HTML reports stay strictly local and transient.

---

# Conclusion

The SvelteKit BDD architecture is now live.
* **Cost:** ₹0/month.
* **Execution Time:** ~0.7 seconds per scenario.
* **Developer Experience:** Unmatched.

Is it overkill for a personal blog? Absolutely. But there is something incredibly satisfying about typing `pnpm test:bdd` and watching a headless browser flawlessly navigate your Semantic HTML (using `getByRole` for screen-reader text, of course) to prove that your code works perfectly.

If you ever find yourself fighting the Node.js ESM module resolution system while trying to write end-to-end tests... don't give up. The green checkmarks are worth it.