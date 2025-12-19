import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event, {
		preload: ({ type }) => {
			// Preload fonts, JS, and CSS.
			// This adds <link rel="preload"> to the head for these assets.
			return type === 'font' || type === 'js' || type === 'css';
		}
	});
};
