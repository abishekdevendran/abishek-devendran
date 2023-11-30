<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';
	import Hero from '$lib/components/Hero.svelte';
	export let data;
</script>

<div class="flex items-center justify-center gap-4">
	<Hero />
	<BlogCard post={data.posts[0]} />
</div>
