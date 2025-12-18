import type { Post } from '$lib/types';

export default async function getPosts(tags?: string[]) {
	let posts: (Post & {
		slug: string;
	})[] = [];
	const paths = import.meta.glob('/src/posts/*.md', {
		eager: true
	});

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').pop()?.replace(/\.md$/, '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Post;
			if (metadata.published) {
				const post = { ...metadata, slug };
				post.tags = post.tags || []; // Ensure tags is an array
				if (!post.author) post.author = 'Abishek Devendran';
				posts.push(post);
			}
		}
	}

	if (tags) {
		posts = posts.filter((post) => post.tags?.some((tag) => tags.includes(tag)));
	}

	posts.sort((a, b) => {
		return (
			new Date(b.updatedAt || b.publishedAt).getTime() -
			new Date(a.updatedAt || a.publishedAt).getTime()
		);
	});

	return posts;
}
