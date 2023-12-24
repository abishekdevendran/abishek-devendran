<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Toaster } from 'svelte-sonner';
	import { fly } from 'svelte/transition';
	import '../app.pcss';

	export let data;
</script>

<ModeWatcher />
<Toaster />
<Header />
{#key data.url}
	<div
		class="transition md:container px-4"
		in:fly={{ x: -200, duration: 300, delay: 300 }}
		out:fly={{ x: 200, duration: 300 }}
	>
		<slot />
	</div>
{/key}
<Footer />
