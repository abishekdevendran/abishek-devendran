<script lang="ts">
	import { resolveImage } from '$lib/imageHandler';

	// Props
	// src: Can be the filename ("0.jpg") or the resolved object
	// alt: Required for accessibility
	// class: To pass Tailwind classes down
	let {
		src,
		alt,
		class: className = '',
		loading = 'eager' as 'lazy' | 'eager' | null | undefined,
		sizes = '',
		...rest
	} = $props();

	// 1. Resolve the image.
	// If 'src' is a string, look it up. If it's already an object, use it.
	let imageObj = $derived(typeof src === 'string' ? resolveImage(src) : src);
</script>

{#if imageObj}
	<picture>
		{#if imageObj.sources?.avif}
			<source srcset={imageObj.sources.avif} type="image/avif" {sizes} />
		{/if}

		{#if imageObj.sources?.webp}
			<source srcset={imageObj.sources.webp} type="image/webp" {sizes} />
		{/if}

		<img
			src={imageObj.img.src}
			width={imageObj.img.w}
			height={imageObj.img.h}
			{alt}
			{loading}
			class={className}
			{...rest}
		/>
	</picture>
{:else}
	<div
		class={`bg-muted flex items-center justify-center text-xs text-muted-foreground ${className}`}
	>
		Image Not Found
	</div>
{/if}
