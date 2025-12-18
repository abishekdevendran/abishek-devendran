<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { fly } from 'svelte/transition';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ModeWatcher } from 'mode-watcher';
	import { onNavigate } from '$app/navigation';

	let { data, children } = $props();
	import '../app.css';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Header />
<Toaster />
<ModeWatcher />
{#key data.url}
	<div
		class="transition container mx-auto px-4 md:px-6 pt-24 pb-24 md:pb-12 min-h-screen flex flex-col"
		in:fly={{ x: -20, duration: 300, delay: 150 }}
		out:fly={{ x: 20, duration: 200 }}
	>
		{@render children?.()}
	</div>
{/key}
<Footer />
