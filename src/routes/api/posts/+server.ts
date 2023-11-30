import type { Post } from '$lib/types';
import { json } from '@sveltejs/kit';

async function getPosts(
	tags?: string[],
) {
	let posts: (Post & {
		slug: string;
	})[] = [];
	const paths = import.meta.glob('/src/posts/*.md', {
		eager: true,
		as: 'raw'
	});
	for (const path in paths) {
		const file: any = paths[path];
		// console.log(file);
		// parse frontmatter for metadata
		let metaData = {} as Post;
		let block = file.split('---')[1].trim().split('\n');
		for (const line of block) {
			const [key, value]: [keyof Post, string] = line.split(':');
			if (key === 'tags') {
				// remove brackets
				metaData[key] = value.slice(2, -1).split(', ');
				continue;
			}
			// @ts-ignore
			metaData[key] = value.trim();
		}
		const slug = path.split('/').pop()?.replace(/\.md$/, '')!;
		let author = metaData.author ?? 'Abishek Devendran';
		metaData.published && posts.push({ slug, ...metaData, author });
	}
	if(tags) {
		posts = posts.filter(post => post.tags?.some(tag => tags.includes(tag)));
	}
	posts.sort(
		(a, b) =>
			new Date(b.updatedAt ?? b.publishedAt).getTime() -
			new Date(a.updatedAt ?? a.publishedAt).getTime()
	);
	return posts;
}

export async function GET({
	url
}) {
	console.log(url.searchParams.getAll('tag'));
	const posts = await getPosts(url.searchParams.getAll('tag'));
	return json(posts);
}
