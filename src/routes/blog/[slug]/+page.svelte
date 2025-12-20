<script lang="ts">
	import { title } from '$lib/stores/title';
	import { Hash, MessagesSquare, Share2 } from '@lucide/svelte';
	import { mode } from 'mode-watcher';

	import Button from '$lib/components/ui/button/button.svelte';
	import Giscus from '@giscus/svelte';
	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { resolveImage } from '$lib/imageHandler.js';
	import Img from '$lib/components/Img.svelte';

	let { data } = $props();
	// svelte-ignore state_referenced_locally
	$title = data.metaData.title + ' | Blog ';

	onMount(() => {
		if (!browser) return;

		const handleCopy = async (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const btn = target.closest('.copy-btn') as HTMLElement;
			if (!btn) return;

			const code = atob(btn.dataset.code || '');
			await navigator.clipboard.writeText(code);

			const copyIcon = btn.querySelector('.copy-icon');
			const checkIcon = btn.querySelector('.check-icon');

			if (copyIcon && checkIcon) {
				copyIcon.classList.add('hidden');
				checkIcon.classList.remove('hidden');

				setTimeout(() => {
					copyIcon.classList.remove('hidden');
					checkIcon.classList.add('hidden');
				}, 2000);
			}
		};

		document.addEventListener('click', handleCopy);
		return () => document.removeEventListener('click', handleCopy);
	});

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

	const fallbackImage = resolveImage('0.jpg')!;
</script>

<svelte:head>
	<meta name="description" content={data.metaData.description} />
	<meta property="og:url" content={'https://abishek.work' + data.url} />
	<meta property="og:title" content={data.metaData.title} />
	<meta property="og:description" content={data.metaData.description} />
	<meta property="og:type" content="article" />
	<meta
		property="og:image"
		content={'https://abishek.work' +
			((resolveImage(data.metaData.coverImage) as any)?.img.src ?? (fallbackImage as any).img.src)}
	/>

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@Real_Abishek" />
	<meta name="twitter:title" content={data.metaData.title} />
	<meta name="twitter:description" content={data.metaData.description} />
	<meta
		name="twitter:image"
		content={'https://abishek.work' +
			((resolveImage(data.metaData.coverImage) as any)?.img.src ?? (fallbackImage as any).img.src)}
	/>
</svelte:head>

<div>
	<div class="flex flex-col gap-6 md:gap-8 pb-12 max-w-3xl mx-auto px-4 pt-8 md:pt-12 lg:max-w-4xl" id="title">
		<div class="space-y-4 text-center">
			<h1
				class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight"
			>
				{data.metaData.title}
			</h1>

			<div
				class="flex items-center justify-center gap-3 text-sm md:text-base text-muted-foreground"
			>
				<time datetime={data.metaData.publishedAt}>
					{new Date(data.metaData.updatedAt ?? data.metaData.publishedAt).toLocaleDateString(
						'en-US',
						{
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						}
					)}
				</time>
				<span>•</span>
				<span>{data.metaData.readingTime.text}</span>
				<span>•</span>
				<span>{data.metaData.author}</span>
			</div>
		</div>

		<div
			class="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"
		>
			<Img
				src={data.metaData.coverImage ?? '0.jpg'}
				alt={data.metaData.title}
				class="w-full h-full object-cover"
			/>
		</div>

		<div class="flex flex-wrap justify-center gap-2">
			{#each data.metaData.tags as tag}
				<span
					class="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/20"
				>
					<Hash class="h-3.5 w-3.5" />
					{tag}
				</span>
			{/each}
		</div>
	</div>

	<article
		class="prose prose-neutral dark:prose-invert mx-auto w-full max-w-lg md:max-w-xl lg:max-w-3xl"
	>
		<data.component />
	</article>
	<div
		class="sticky bottom-20 md:bottom-8 mt-10 flex items-center w-fit mx-auto gap-2 p-1.5 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg z-50 transition-all"
	>
		<Button class="rounded-full w-10 h-10 p-0" variant="ghost" onclick={shareFunction}>
			<Share2 class="h-4 w-4" />
			<span class="sr-only">Share</span>
		</Button>
		<div class="w-px h-4 bg-border"></div>
		<Button class="rounded-full w-10 h-10 p-0" variant="ghost" href="#comments">
			<MessagesSquare class="h-4 w-4" />
			<span class="sr-only">Comments</span>
		</Button>
	</div>

	<div class="max-w-3xl mx-auto mt-10 pt-10 border-t border-border" id="comments">
		<h2 class="text-2xl font-bold tracking-tight mb-8">Comments</h2>
		<Giscus
			id="comments"
			repo="abishekdevendran/abishek-devendran"
			repoId="R_kgDOKzqRKw"
			category="Announcements"
			categoryId="DIC_kwDOKzqRK84CbbFO"
			mapping="pathname"
			term="Welcome to my blog"
			strict="0"
			reactionsEnabled="1"
			emitMetadata="1"
			inputPosition="top"
			theme={mode.current === 'dark' ? 'dark' : 'light'}
			lang="en"
			loading="lazy"
		/>
	</div>
</div>
