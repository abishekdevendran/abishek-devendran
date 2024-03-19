import type { Post } from '$lib/types.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const mdFile = await import(`../../../posts/${params.slug}.md?raw`);
		let metaData = {} as Post;
		let block = mdFile.default.split('---')[1].trim().split('\n');
		for (const line of block) {
			const [key, ...rest]: [keyof Post, ...[string]] = line.split(':');
			const value = rest.join(':');
			if (key === 'tags') {
				// remove brackets
				metaData[key] = value.slice(2, -1).split(', ');
				continue;
			}
			// @ts-ignore
			metaData[key] = value.trim();
		}
		metaData.author = metaData.author ?? 'Abishek Devendran';
		const content = mdFile.default.split('---')[2].trim();
		// console.log(mdFile.default.$$render());
		console.log(metaData);
		return {
			content,
			metaData
		};
	} catch (e) {
		throw error(404, 'Post not found');
	}
};
