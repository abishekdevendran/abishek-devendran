<script lang="ts">
	import { title } from '$lib/stores/title';
	import { Hash, MessagesSquare, Share, Share2 } from 'lucide-svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import ImageComponent from '$lib/components/md/Img.svelte';
	import HeadingComponent from '$lib/components/md/Heading.svelte';
	import CodeComponent from '$lib/components/md/Code.svelte';
	import { parseDate } from '$lib/dateParser';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { toast } from 'svelte-sonner';

	export let data;
	$title = data.metaData.title;

	const shareFunction = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: data.metaData.title,
					text: data.metaData.description,
					url: window.location.href
				});
			} catch (err) {
				console.log(err);
				toast.error('Failed to share');
			}
		} else if (navigator.clipboard) {
			try {
				await navigator.clipboard.writeText(window.location.href);
				toast.success('Link copied to clipboard');
			} catch (err) {
				console.log(err);
				toast.error('Failed to copy link to clipboard');
			}
		} else {
			toast.error('Your browser does not support sharing');
		}
	};
</script>

<svelte:head>
	<meta name="description" content={data.metaData.description} />
	<meta property="og:title" content={data.metaData.title} />
	<meta property="og:description" content={data.metaData.description} />
	<meta property="og:type" content="article" />
</svelte:head>
<main class="max-w-3xl mx-auto px-2 pb-6">
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
	<div class="w-full markdown-holder pb-6">
		<SvelteMarkdown
			source={data.content}
			renderers={{ image: ImageComponent, heading: HeadingComponent, code: CodeComponent }}
		/>
	</div>
	<div
		class="mx-auto mb-6 flex items-center justify-center gap-4 sticky bottom-8 rounded-full p-2 bg-background border z-10 max-w-fit"
	>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					class="rounded-full p-0 aspect-square"
					variant="outline"
					on:click={shareFunction}
				>
					<Share2 class="h-4 w-4" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Share</p>
			</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					class="rounded-full p-0 aspect-square"
					variant="outline"
					href="#comments"
				>
					<MessagesSquare class="h-4 w-4" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Comments</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</div>
	<div class="comments" id="comments">
		<script
		src="https://giscus.app/client.js"
		data-repo="abishekdevendran/abishek-devendran"
		data-repo-id="R_kgDOKzqRKw"
		data-category="Announcements"
		data-category-id="DIC_kwDOKzqRK84CbbFO"
		data-mapping="pathname"
		data-strict="0"
		data-reactions-enabled="1"
		data-emit-metadata="1"
		data-input-position="top"
		data-theme="preferred_color_scheme"
		data-lang="en"
		data-loading="lazy"
		crossorigin="anonymous"
		async
		>
	</script>
	</div>
</main>
