<script lang="ts">
	export let href = '';
	export let title: string | undefined = undefined;
</script>

<a {href} {title} class="underline text-primary"><slot /></a>
