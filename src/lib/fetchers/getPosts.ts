import type { Post } from "$lib/types";

export default async function getPosts(tags?: string[]) {
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
	if (tags) {
		posts = posts.filter((post) => post.tags?.some((tag) => tags.includes(tag)));
	}
	posts.sort(
		(a, b) =>{
			let aDateArr = a.updatedAt ? a.updatedAt.split('/') : a.publishedAt.split('/');
			let bDateArr = b.updatedAt ? b.updatedAt.split('/') : b.publishedAt.split('/');
			let aDate = new Date(`${aDateArr[2]}-${aDateArr[1]}-${aDateArr[0]}`);
			let bDate = new Date(`${bDateArr[2]}-${bDateArr[1]}-${bDateArr[0]}`);
			return bDate.getTime() - aDate.getTime();
		}
	);
	return posts;
}
