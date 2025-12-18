<script lang="ts">
	import type { Post } from '$lib/types';
	import { CalendarDays, Hash } from '@lucide/svelte';

	interface Props {
		posts: (Post & {
			slug: string;
		})[];
	}

	let { posts }: Props = $props();
</script>

{#each posts as post}
	<a href={`/blog/${post.slug}`} class="group flex flex-col h-full w-full min-w-0">
		<div
			class="relative flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:-translate-y-1"
		>
			<div class="aspect-video w-full overflow-hidden bg-muted">
				<img
					src={post.coverImage ?? '/0.jpg'}
					alt={post.title}
					class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
			</div>

			<div class="flex flex-col flex-grow p-5 gap-3">
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
						<div>
							<span class="text-xs text-muted-foreground">{post.readingTime.text}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</a>
{/each}
