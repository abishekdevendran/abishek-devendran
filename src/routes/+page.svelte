<script lang="ts">
	import BlogCard from '$lib/components/BlogCard.svelte';

	export let data;
</script>

<div class="flex items-center justify-center gap-4">
	{#each data.posts as post}
		<BlogCard {post} />
	{/each}
</div>
