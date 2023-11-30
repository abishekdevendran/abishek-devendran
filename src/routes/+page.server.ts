import type { Post } from '$lib/types.js';

export const load = async ({ fetch }) => {
	const response = await fetch('/api/posts');
	const posts: (Post & {
		slug: string;
	})[] = await response.json();
	return { posts };
};
