import { setWorldConstructor, Before, After, World } from '@cucumber/cucumber';
import { chromium, type Browser, type BrowserContext, type Page } from '@playwright/test';
import createPages, { type AppPages } from '../pages/index.ts';

export class CustomWorld extends World {
	browser!: Browser;
	context!: BrowserContext;
	page!: Page;
	pages!: AppPages;
}

setWorldConstructor(CustomWorld);

Before(async function (this: CustomWorld) {
	// Boot up your local Google Chrome
	this.browser = await chromium.launch({
		headless: true, // Change to false if you want to visually watch the browser
		channel: 'chrome'
	});
	this.context = await this.browser.newContext();
	this.page = await this.context.newPage();
	this.pages = createPages(this.page);
});

After(async function (this: CustomWorld) {
	// Clean up to prevent memory leaks
	if (this.page) await this.page.close();
	if (this.context) await this.context.close();
	if (this.browser) await this.browser.close();
});
