// tests/e2e/pages/index.ts
import type { Page } from '@playwright/test';
import { HomePage } from './HomePage.ts';

export default function createPages(page: Page) {
	// let pages = {
	// 	homePage: new HomePage(page)
	// };
	// return pages;

  // Using getters to ensure fresh instances of page objects for each test, more performant and less memory intensive
  return {
		get homePage() {
			return new HomePage(page);
		}
	};
}

export type AppPages = ReturnType<typeof createPages>;