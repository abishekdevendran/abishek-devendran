<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { parseDate } from '$lib/dateParser';
	import type { Post } from '$lib/types';
	import { CalendarDays, Hash } from 'lucide-svelte';

	export let post: Post & {
		slug: string;
	};
</script>

<a href={`/${post.slug}`}>
	<Card.Root class="w-96 hover:border-white transition-all duration-100 transform-gpu">
		<Card.Content class="p-2">
			<img
				src={post.coverImage ?? '/0.jpg'}
				alt={post.title}
				class="w-full h-48 object-cover rounded-md"
			/>
		</Card.Content>
		<Card.Header class="p-4 pb-0">
			<Card.Title>{post.title}</Card.Title>
			<Card.Description>{post.description}</Card.Description>
			<div class="w-full flex items-center justify-center gap-2">
				{#each post.tags as tag}
					<span
						class="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 border p-1 rounded-md"
					>
						<Hash class="inline-block h-4 w-4" />
						{tag}</span
					>
				{/each}
			</div>
		</Card.Header>
		<Card.Footer class="p-4">
			<div class="flex gap-2 items-center justify-center">
				<CalendarDays class="inline-block h-4 w-4" />
				{parseDate(post.updatedAt ?? post.publishedAt)}
			</div>
		</Card.Footer>
	</Card.Root>
</a>
