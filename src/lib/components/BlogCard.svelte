<script lang="ts">
	import Img from '$lib/components/Img.svelte';
	const assets = import.meta.glob('$lib/assets/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}', {
		eager: true,
		query: { enhanced: true }
	});

	export function resolveImage(path: string | undefined) {
		if (!path) return null;

		const cleanPath = path.startsWith('/') ? path.slice(1) : path;

		// Find the matching key
		const matchKey = Object.keys(assets).find((key) => key.endsWith(cleanPath));

		if (!matchKey) return null;

		// 2. Extract the 'default' export manually
		// This ensures we pass the EXACT reference the plugin created.
		const module = assets[matchKey] as { default: unknown };

		return module.default;
	}
	import type { Post } from '$lib/types';
	import { CalendarDays, Hash } from '@lucide/svelte';

	interface Props {
		posts: (Post & {
			slug: string;
		})[];
	}

	let { posts }: Props = $props();
	const fallbackImage = resolveImage('0.jpg');
</script>

{#each posts as post}
	<a href={`/blog/${post.slug}`} class="group flex flex-col h-full w-full min-w-0">
		<div
			class="relative flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:-translate-y-1"
		>
			<div class="aspect-video w-full overflow-hidden bg-muted">
				<Img
					src={post.coverImage ?? '0.jpg'}
					alt={post.title}
					sizes="(max-width: 768px) 100vw, 400px"
					class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>

			<div class="flex flex-col grow p-5 gap-3">
				<div class="space-y-2">
					<h3
						class="text-xl font-bold tracking-tight text-foreground line-clamp-2 md:line-clamp-1 group-hover:text-primary transition-colors"
					>
						{post.title}
					</h3>
					<p class="text-sm text-muted-foreground line-clamp-2">
						{post.description}
					</p>
				</div>

				<div class="mt-auto pt-4 flex flex-col gap-4">
					<div class="flex flex-wrap gap-2">
						{#each post.tags.slice(0, 3) as tag}
							<span
								class="inline-flex items-center gap-1 rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-secondary-foreground"
							>
								<Hash class="h-3 w-3" />
								{tag}
							</span>
						{/each}
						{#if post.tags.length > 3}
							<span
								class="inline-flex items-center rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-secondary-foreground"
							>
								+{post.tags.length - 3}
							</span>
						{/if}
					</div>
					<div class="flex items-center justify-between">
						<div class="flex items-center text-xs text-muted-foreground">
							<CalendarDays class="mr-1 h-3 w-3" />
							{new Date(post.updatedAt || post.publishedAt).toLocaleDateString('en-US', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
						</div>
						{#if post.readingTime}
							<div>
								<span class="text-xs text-muted-foreground">{post.readingTime.text}</span>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</a>
{/each}
