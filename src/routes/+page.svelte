<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import { title } from '$lib/stores/title';

	let { data } = $props();
	$title = 'Home';
</script>

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
