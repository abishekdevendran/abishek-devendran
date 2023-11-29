<script lang="ts">
	import { title } from '$lib/stores/title';
	import { Hash } from 'lucide-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import ImageComponent from '$lib/components/md/Img.svelte';
	import HeadingComponent from '$lib/components/md/Heading.svelte';
	import CodeComponent from '$lib/components/md/Code.svelte';
	export let data;
	$title = data.metaData.title;
</script>

<svelte:head>
	<meta name="description" content={data.metaData.description} />
	<meta property="og:title" content={data.metaData.title} />
	<meta property="og:description" content={data.metaData.description} />
	<meta property="og:type" content="article" />
</svelte:head>
<main class="max-w-xl mx-auto">
	<div class="tags w-full flex items-center justify-center gap-2">
		{#each data.metaData.tags as tag}
			<span class="text-xs text-gray-500 dark:text-gray-400">
				<Hash class="inline-block h-4 w-4" />
				{tag}</span
			>
		{/each}
	</div>
	<div class="w-full markdown-holder">
		<SvelteMarkdown
			source={data.content}
			renderers={{ image: ImageComponent, heading: HeadingComponent, code: CodeComponent }}
		/>
	</div>
</main>
