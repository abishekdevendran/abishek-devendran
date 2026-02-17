import getPosts from '$lib/fetchers/getPosts';

// Tell SvelteKit to prerender this endpoint
export const prerender = true;

const site = 'https://abishek.work';

export async function GET() {
	// Fetch all your markdown posts using your existing utility
	const posts = await getPosts();

	// Define your static pages
	const pages = [
		{ path: '/', priority: '1.0', changefreq: 'weekly' },
		{ path: '/about', priority: '0.8', changefreq: 'weekly' },
		{ path: '/blog', priority: '0.9', changefreq: 'weekly' }
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
>
  ${pages
		.map(
			(page) => `
  <url>
    <loc>${site}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
		)
		.join('')}
  ${posts
		.filter((post) => post.published) // Ensure you only index published posts
		.map(
			(post) => `
  <url>
    <loc>${site}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt ?? post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
		)
		.join('')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
