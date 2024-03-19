import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { escapeSvelte, mdsvex } from 'mdsvex';
import shiki from 'shiki';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte'],
	preprocess: [
		vitePreprocess({})
		// mdsvex({
		// 	extensions: ['.md'],
		// 	highlight: {
		// 		highlighter: async (code, lang = 'text') => {
		// 			const highlighter = await shiki.getHighlighter({
		// 				themes: ['material-theme-darker', 'github-light']
		// 			});
		// 			const html = highlighter.codeToHtml(code, { lang });
		// 			return `<div class="flex w-full items-center justify-between ">${lang}</div>{@html \`${escapeSvelte(
		// 				html
		// 			)}\`}`;
		// 		}
		// 	}
		// })
	],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		})
	}
};

export default config;
