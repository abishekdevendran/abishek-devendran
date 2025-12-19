import type { Post } from '$lib/types';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

export const load = async ({ params }) => {
	try {
		const post = (await import(`../../../posts/${params.slug}.md`)) as {
			default: Component; // The rendered markdown content
			metadata: Post; // The frontmatter (title, date, etc.)
		};
		return {
			component: post.default,
			metaData: post.metadata
		};
	} catch (e) {
		error(404, 'Post not found');
	}
};
