<script>
	import Button from './ui/button/button.svelte';
	import { FileText, Github, Linkedin } from 'lucide-svelte';
</script>

<div class="w-full flex max-md:flex-col-reverse py-4 items-center justify-between gap-12">
	<div class="max-w-3xl">
		<p>Hi, I'm</p>
		<h1 class="text-4xl font-bold">Abishek Devendran</h1>
		<p>
			I'm a software engineer based in Chennai, India. I specialize in building (and occasionally
			designing) exceptional digital experiences. Currently, I'm focused on building accessible,
			human-centered products. In my free time, I like to play video games and chess, and watch
			Anime. I'm also starting out with blogging to share my experiences and learnings.
		</p>
		<div
			class="w-full flex max-md:flex-col max-md:items-stretch items-center justify-center gap-6 pt-6"
		>
			<Button
				href="https://twitter.com/Real_Abishek"
				target="_blank"
				rel="noopener noreferrer"
				class="md:w-1/4 flex items-center justify-center gap-2 text-center"
			>
				<span class="text-2xl"> 𝕏 </span>
				<span class="leading-7"> Twitter </span>
			</Button>
			<Button
				href="https://www.linkedin.com/in/abishekdevendran/"
				target="_blank"
				rel="noopener noreferrer"
				class="md:w-1/4 flex items-center justify-center gap-2 text-center"
			>
				<Linkedin size="20" />
				<span class="leading-7"> LinkedIn </span>
			</Button>
			<Button
				href="https://github.com/abishekdevendran"
				target="_blank"
				rel="noopener noreferrer"
				class="md:w-1/4 flex items-center justify-center gap-2 text-center"
			>
				<Github size="20" />
				<span class="leading-7"> Github </span>
			</Button>
			<Button
				href="/Resume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="md:w-1/4 flex items-center justify-center gap-2 text-center"
			>
				<FileText size="20" />
				<span class="leading-7"> Resume </span>
			</Button>
		</div>
	</div>
	<img src="/pfpBrand.jpg" alt="Abishek Devendran" class="h-full w-auto rounded-full" />
</div>
