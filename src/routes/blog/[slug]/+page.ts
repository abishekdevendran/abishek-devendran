import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	try {
		const post = await import(`../../../posts/${params.slug}.md`);
		return {
			component: post.default,
			metaData: post.metadata
		};
	} catch (e) {
		error(404, 'Post not found');
	}
};
