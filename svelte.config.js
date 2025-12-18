import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { highlightCode } from './src/lib/shiki.ts';
import { remarkReadingTime } from './src/lib/remark-reading-time.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [remarkReadingTime],
			highlight: {
				highlighter: async (code, lang = 'text', meta) => {
					let filename = null;
					if (meta) {
						const filenameMatch = meta.match(/filename="([^"]+)"/);
						if (filenameMatch) {
							filename = filenameMatch[1];
						}
					}

					const html = await highlightCode(code, lang);
					const base64Code = Buffer.from(code).toString('base64');
					const title = filename || lang || 'text';
					return `<div class="my-6 rounded-xl overflow-hidden border border-border bg-card shadow-sm group relative">
						<div class="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border/50 text-xs select-none">
							<div class="flex items-center gap-2">
								<div class="flex gap-1.5 mr-2">
									<div class="w-3 h-3 rounded-full bg-red-500/80"></div>
									<div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
									<div class="w-3 h-3 rounded-full bg-green-500/80"></div>
								</div>
								<span class="text-muted-foreground font-mono opacity-80">${title}</span>
							</div>
							<button class="copy-btn relative p-1.5 rounded-md hover:bg-background/80 transition-colors text-muted-foreground hover:text-foreground" aria-label="Copy code" data-code="${base64Code}">
								<svg class="w-3.5 h-3.5 copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
								<svg class="w-3.5 h-3.5 check-icon hidden text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
							</button>
						</div>
						<div class="code-content p-4 overflow-x-auto">
							${html}
						</div>
					</div>`;
				}
			}
		})
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
