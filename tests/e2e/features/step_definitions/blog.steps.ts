// tests/e2e/features/step_definitions/blog.steps.ts
import { Given, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/setup.ts';

Given('I navigate to the blog post {string}', async function (this: CustomWorld, slug: string) {
	await this.pages.blogPage.navigateTo(slug);
});

Then(
	'the blog post title should be {string}',
	async function (this: CustomWorld, expectedTitle: string) {
		await this.pages.blogPage.verifyTitle(expectedTitle);
	}
);

Then('the main article content should be visible', async function (this: CustomWorld) {
	await this.pages.blogPage.verifyArticleContent();
});

Then('the share and comment interactions should be available', async function (this: CustomWorld) {
	await this.pages.blogPage.verifyInteractiveElements();
});
