<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Copy } from 'lucide-svelte';
  import { mode } from 'mode-watcher';
  import { toast } from 'svelte-sonner'
  import { HighlightAuto, LineNumbers } from "svelte-highlight";
  import atomOneDark from 'svelte-highlight/styles/atom-one-dark';
	import atomOneLight from 'svelte-highlight/styles/atom-one-light';

	export let lang: string = '';
	export let text: string = '';

  let htmlImport: string = '';
	$: if ($mode === 'dark') {
		htmlImport = atomOneDark;
	} else {
		htmlImport = atomOneLight;
	}

	const copyToClipboard = () => {
		console.log('copying');
		if (!navigator.clipboard) {
			toast.error('Your browser does not support clipboard API');
			return;
		}
		navigator.clipboard.writeText(text);
		toast.success('Copied to clipboard');
	};
</script>

<svelte:head>
	{@html htmlImport}
</svelte:head>
	<div
		class="w-full flex items-center justify-between text-center capitalize rounded-t-xl p-2 dark:bg-primary bg-secondary mt-4 pl-4"
	>
		<p>
			{lang}
		</p>
		<Button class="cursor-pointer rounded-lg p-2" on:click={copyToClipboard} variant="ghost" size="icon">
			<Copy />
		</Button>
	</div>
  <HighlightAuto code={text} let:highlighted>
    <LineNumbers {highlighted} hideBorder />
  </HighlightAuto>