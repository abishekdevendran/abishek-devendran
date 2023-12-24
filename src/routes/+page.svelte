<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';
	import Hero from '$lib/components/Hero.svelte';
	export let data;
</script>

<div class="flex flex-col items-center justify-center gap-4 md:pt-16 pb-6">
	<Hero />
	<div class="w-full flex flex-col items-stretch justify-center md:flex-row gap-4">
		<BlogCard posts={data.posts.slice(0, 3)} />
	</div>
</div>
