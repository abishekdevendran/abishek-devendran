<script lang="ts">
	import { goto } from '$app/navigation';

	export let depth: number;
	export let raw: string;
	export let text: string;
	$: id = text.replace(/\s/g, '-').toLowerCase();
</script>

{#if depth === 1}
	<h1 {id}>
		<!-- <button on:click={() => goto(`#${id}`)}> # </button> -->
		<slot />
	</h1>
{:else if depth === 2}
	<h2 {id}>
		<!-- <button on:click={() => goto(`#${id}`)}> # </button> -->
		<slot />
	</h2>
{:else if depth === 3}
	<h3 {id}>
		<!-- <button on:click={() => goto(`#${id}`)}> # </button> -->
		<slot />
	</h3>
{:else if depth === 4}
	<h4 {id}>
		<!-- <button on:click={() => goto(`#${id}`)}> # </button> -->
		<slot />
	</h4>
{:else if depth === 5}
	<h5 {id}>
		<!-- <button on:click={() => goto(`#${id}`)}> # </button> -->
		<slot />
	</h5>
{:else if depth === 6}
	<h6 {id}>
		<!-- <button on:click={() => goto(`#${id}`)}> # </button> -->
		<slot />
	</h6>
{:else}
	{raw}
{/if} 