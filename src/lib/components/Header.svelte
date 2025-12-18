<script lang="ts">
	import { title } from '$lib/stores/title';
	import { page } from '$app/state';
	import ModeToggle from '$lib/components/ModeToggle.svelte';

	let computedTitle = $derived(
		title && $title !== 'Home' ? `${$title} | Abishek Devendran` : 'Abishek Devendran'
	);
</script>

<svelte:head>
	<title>
		{computedTitle}
	</title>
</svelte:head>
<header
	class="fixed bottom-4 left-4 right-4 md:bottom-auto md:left-0 md:right-0 md:top-0 z-50 rounded-2xl md:rounded-none border bg-background/80 shadow-sm backdrop-blur-md md:border-b md:border-x-0 md:bg-background/75 transition-all duration-300 pointer-events-auto"
>
	<div class="container flex h-14 items-center justify-between px-4 md:px-6 mx-auto">
		<a href="/" class="group flex items-center gap-2 transition-opacity hover:opacity-80">
			<img
				src="/SignatureBrand.png"
				alt="Abishek Devendran"
				class="h-8 w-auto dark:invert md:h-9"
			/>
		</a>

		<nav class="flex items-center gap-1 md:gap-2">
			<!-- Mobile: Simple text links or icons could go here, for now keeping it clean -->
			<div class="flex items-center gap-1 md:gap-2">
				<a
					href="/blog"
					class={`px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground rounded-full ${
						page.url.pathname.startsWith('/blog')
							? 'bg-secondary text-secondary-foreground'
							: 'text-muted-foreground'
					}`}
				>
					Blog
				</a>
				<a
					href="/about"
					class={`px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground rounded-full ${
						page.url.pathname.startsWith('/about')
							? 'bg-secondary text-secondary-foreground'
							: 'text-muted-foreground'
					}`}
				>
					About
				</a>
			</div>

			<div class="ml-2 pl-2 border-l border-border">
				<ModeToggle />
			</div>
		</nav>
	</div>
</header>
