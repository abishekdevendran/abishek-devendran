<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';
	import { title } from '$lib/stores/title';

	let { data } = $props();
	$title = 'Blog';
</script>

<div class="flex flex-col justify-center gap-8 md:pt-12 pb-12 w-full">
	<div class="space-y-4 text-center md:text-left">
		<h1 class="text-4xl md:text-5xl font-bold tracking-tight">Blog</h1>
		<p class="text-lg text-muted-foreground max-w-2xl">
			Thoughts on software engineering, design, and other things I find interesting.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
		<BlogCard posts={data.posts} />
	</div>
</div>
