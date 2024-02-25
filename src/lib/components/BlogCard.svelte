<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { parseDate } from '$lib/dateParser';
	import type { Post } from '$lib/types';
	import { CalendarDays, Hash } from 'lucide-svelte';

	export let posts: (Post & {
		slug: string;
	})[];
</script>

{#each posts as post}
	<a href={`/blog/${post.slug}`} class="flex-grow basis-0 min-w-0 md:h-full">
		<Card.Root
			class="flex-grow basis-0 w-full hover:border-white transition-all duration-100 transform-gpu md:h-full"
		>
			<Card.Content class="p-2 h-48">
				<img
					src={post.coverImage ?? '/0.jpg'}
					alt={post.title}
					class="w-full h-48 md:h-full object-cover rounded-md"
				/>
			</Card.Content>
			<Card.Header class="p-4 pb-0">
				<Card.Title>{post.title}</Card.Title>
				<Card.Description class="min-h-10">{post.description}</Card.Description>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="whitespace-nowrap flex-nowrap overflow-hidden scroll-m-2 overflow-ellipsis pt-2"
					on:mouseenter={(ev) => {
						const self = ev.currentTarget;
						// first child
						const fullContainer = self.firstElementChild;
						if (!fullContainer) return;
						// if width of fullContainer is greater than the width of the container
						if (fullContainer.scrollWidth > fullContainer.clientWidth) {
							// calculate the difference
							const diff = fullContainer.scrollWidth - fullContainer.clientWidth;
							// set style as trasnform: translateX(-diff)
							// @ts-ignore
							fullContainer.style.transform = `translateX(-${diff}px)`;
						}
					}}
					on:mouseleave={(ev) => {
						const self = ev.currentTarget;
						// first child
						const fullContainer = self.firstElementChild;
						if (!fullContainer) return;
						// @ts-ignore
						fullContainer.style.transform = `translateX(0px)`;
					}}
				>
					<div class="w-full flex gap-2 mx-auto pb-1 transition-all duration-1000 ease-linear">
						{#each post.tags as tag}
							<span
								class="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 border p-1 pr-2 rounded-md"
							>
								<Hash class="inline-block h-4 w-4" />
								{tag}</span
							>
						{/each}
					</div>
				</div>
			</Card.Header>
			<Card.Footer class="px-4 pt-2 pb-4">
				<div class="flex gap-2 items-center justify-center">
					<CalendarDays class="inline-block h-4 w-4" />
					{parseDate(post.updatedAt ?? post.publishedAt)}
				</div>
			</Card.Footer>
		</Card.Root>
	</a>
{/each}
