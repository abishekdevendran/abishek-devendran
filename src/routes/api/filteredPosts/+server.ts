import getPosts from '$lib/fetchers/getPosts.js';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	console.log(url.searchParams.getAll('tag'));
	const posts = await getPosts(url.searchParams.getAll('tag'));
	return json(posts);
}
