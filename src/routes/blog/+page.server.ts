import getPosts from '$lib/fetchers/getPosts';
import type { Post } from '$lib/types.js';

export const load = async () => {
	const posts = await getPosts();
	return { posts };
};
