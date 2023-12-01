<script lang="ts">
	import MobileDropdown from '$lib/components/Mobile-Dropdown.svelte';
	import ThemeSwitcher from '$lib/components/Theme-Switcher.svelte';
	import { title } from '$lib/stores/title';
	import { page } from '$app/stores';

	$: computedTitle =
		title && $title !== 'Home' ? `${$title} | Abishek Devendran` : 'Abishek Devendran';
</script>

<svelte:head>
	<title>
		{computedTitle}
	</title>
</svelte:head>
<header
	class="supports-[backdrop-filter]:bg-background/60 fixed bottom-0 md:top-0 z-10 w-full border-b bg-background/95 shadow-sm backdrop-blur h-16 py-1"
>
	<div class="md:container flex h-14 items-center justify-between max-md:px-2">
		<a href="/" class="h-full w-auto">
			<img src="/SignatureBrand.png" alt="Abishek Devendran" class="h-full w-auto dark:invert" />
		</a>
		<div class="flex items-center justify-center gap-2 md:gap-6">
			<a href="/blog" class={`max-md:hidden ${$page.url.pathname === '/blog' ? 'underline' : ''}`}
				>Blog</a
			>
			<a href="/projects"  class={`max-md:hidden ${$page.url.pathname === '/projects' ? 'underline' : ''}`}>Projects</a>
			<a href="/about"  class={`max-md:hidden ${$page.url.pathname === '/about' ? 'underline' : ''}`}>About</a>
			<ThemeSwitcher />
			<MobileDropdown />
		</div>
	</div>
</header>
