import getPosts from '$lib/fetchers/getPosts';
import { json } from '@sveltejs/kit';

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
