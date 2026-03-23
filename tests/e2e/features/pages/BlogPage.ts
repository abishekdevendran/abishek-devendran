// tests/e2e/pages/BlogPage.ts
import { type Page, expect } from '@playwright/test';

export class BlogPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async navigateTo(slug: string) {
		// Make sure this port matches your Vite dev server (I saw 3000 in your last run!)
		await this.page.goto(`http://localhost:3000/blog/${slug}`);
	}

	async verifyTitle(expectedTitle: string) {
		// Finds the exact h1 element with your title
		const heading = this.page.getByRole('heading', { level: 1, name: expectedTitle });
		await expect(heading).toBeVisible();
	}

	async verifyArticleContent() {
		// Verifies the markdown component rendered inside your prose wrapper
		const article = this.page.locator('article.prose');
		await expect(article).toBeVisible();
	}

	async verifyInteractiveElements() {
		// Finds your buttons via their sr-only text
		const shareBtn = this.page.getByRole('button', { name: 'Share' });
		const commentsBtn = this.page.getByRole('link', { name: 'Comments' }); // href="#comments" makes it a link to screen readers

		await expect(shareBtn).toBeVisible();
		await expect(commentsBtn).toBeVisible();

		// Verifies the Giscus section rendered
		const commentsSection = this.page.locator('#comments');
		await expect(commentsSection).toBeVisible();
	}
}
