import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: { host: true, port: 3000 },
	ssr: {
		noExternal: ['svelte-sonner']
	},
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()]
});
