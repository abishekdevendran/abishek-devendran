// tests/e2e/pages/HomePage.ts
import { type Page, expect } from '@playwright/test';

export class HomePage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async navigate() {
		await this.page.goto('http://localhost:3000/');
	}

	async verifyTitleContains(expectedTitle: string) {
		await expect(this.page).toHaveTitle(new RegExp(expectedTitle, 'i'));
	}
}
