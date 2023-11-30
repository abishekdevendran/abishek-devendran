<script lang="ts">
	import ThemeSwitcher from '$lib/components/Theme-Switcher.svelte';
	import { title } from '$lib/stores/title';
	$: computedTitle =
		title && $title !== 'Home' ? `${$title} | Abishek Devendran` : 'Abishek Devendran';
</script>

<svelte:head>
	<title>
		{computedTitle}
	</title>
</svelte:head>
<header
	class="supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur"
>
	<div class="container flex h-14 items-center justify-between">
		<a href="/" class="h-full w-auto">
			<img src="/SignatureBrand.png" alt="Abishek Devendran" class="h-full w-auto dark:invert" />
		</a>
		<div>
			<ThemeSwitcher />
		</div>
	</div>
</header>
