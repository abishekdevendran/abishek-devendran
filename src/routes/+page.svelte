<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import { title } from '$lib/stores/title';
	import { resolveImage } from '$lib/imageHandler';

	let { data } = $props();
	$title = 'Home';
</script>

<svelte:head>
	<title>Abishek Devendran</title>

	<meta
		name="description"
		content="Personal portfolio and blog of Abishek Devendran, an SDE-I at Amazon exploring system design, self-hosting, and web development."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://abishek.work/" />
	<meta property="og:site_name" content="Abishek Devendran" />
	<meta property="og:title" content="Abishek Devendran" />
	<meta
		property="og:description"
		content="Personal portfolio and blog of Abishek Devendran, an SDE-I at Amazon exploring system design, self-hosting, and web development."
	/>

	<meta
		property="og:image"
		content={'https://abishek.work' + (resolveImage(`/pfpBrand.png`) as any)?.img.src}
	/>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@Real_Abishek" />
	<meta name="twitter:title" content="Abishek Devendran" />
	<meta
		name="twitter:description"
		content="Personal portfolio and blog of Abishek Devendran, an SDE-I at Amazon exploring system design, self-hosting, and web development."
	/>
	<meta
		name="twitter:image"
		content={'https://abishek.work' + (resolveImage(`/pfpBrand.png`) as any)?.img.src}
	/>
</svelte:head>

<div class="flex flex-col justify-center gap-12 md:pt-12 pb-12">
	<Hero />

	<section class="space-y-6">
		<div class="flex items-center justify-between">
			<h2 class="text-3xl font-bold tracking-tight">Latest Posts</h2>
			<a
				href="/blog"
				class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
			>
				View all
			</a>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<BlogCard posts={data.posts.slice(0, 3)} />
		</div>
	</section>
</div>
