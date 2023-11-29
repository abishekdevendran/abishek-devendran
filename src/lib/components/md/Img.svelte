<script lang="ts">
	export let href = '';
	export let title: string | undefined = undefined;
	export let text = '';
	export let className = '';
</script>

<div class={`w-full flex items-center justify-center ${className}`}>
	<img src={href} {title} alt={text} loading="lazy" />
</div>