<script lang="ts">
	import { title } from '$lib/stores/title';
	import { Hash } from 'lucide-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import ImageComponent from '$lib/components/md/Img.svelte';
	import HeadingComponent from '$lib/components/md/Heading.svelte';
	import CodeComponent from '$lib/components/md/Code.svelte';
	import { parseDate } from '$lib/dateParser';

	export let data;
	$title = data.metaData.title;
</script>

<svelte:head>
	<meta name="description" content={data.metaData.description} />
	<meta property="og:title" content={data.metaData.title} />
	<meta property="og:description" content={data.metaData.description} />
	<meta property="og:type" content="article" />
</svelte:head>
<main class="max-w-3xl mx-auto px-2">
	<div class="w-full flex items-center justify-center pb-16 pt-4 flex-col gap-4" id="title">
		<img
			src={data.metaData.coverImage ?? '/0.jpg'}
			alt={data.metaData.title}
			class="w-full h-auto object-cover rounded-md"
		/>
		<h1 class="text-center before:content-none">
			{data.metaData.title}
		</h1>
		<h6 class="w-full flex items-center justify-center gap-4 text-center">
			<span>
				{parseDate(data.metaData.updatedAt ?? data.metaData.publishedAt)}
			</span>
			●
			<span>
				{5} min
			</span>
			●
			<span>{data.metaData.author}</span>
		</h6>
		<div class="w-full flex items-center justify-center gap-2">
			{#each data.metaData.tags as tag}
				<span
					class="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 border p-1 rounded-md"
				>
					<Hash class="inline-block h-4 w-4" />
					{tag}</span
				>
			{/each}
		</div>
	</div>
	<div class="w-full markdown-holder">
		<SvelteMarkdown
			source={data.content}
			renderers={{ image: ImageComponent, heading: HeadingComponent, code: CodeComponent }}
		/>
	</div>
</main>
