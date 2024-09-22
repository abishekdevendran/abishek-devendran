<script>
	import Button from '$lib/components/ui/button/button.svelte';

	import { FileText, Github, Linkedin, Mail } from 'lucide-svelte';
</script>

<div class="md:pt-16 pb-6">
	<h2>About Me</h2>
	<div class="w-full px-8">
		<div class="rail w-52 pt-8 flex flex-col items-center text-center gap-4 sticky top-10">
			<img src="/pfpBrand.png" alt="Abishek Devendran" class="h-full w-auto rounded-full" />
			<h3>Abishek Devendran</h3>
			<div class="icons flex w-full items-center justify-center gap-2">
				<Button
					href="https://twitter.com/Real_Abishek"
					target="_blank"
					rel="noopener noreferrer"
					class="md:w-1/4 flex items-center justify-center gap-2 text-center"
				>
					<span class="text-2xl"> 𝕏 </span>
				</Button>
				<Button
					href="https://www.linkedin.com/in/abishekdevendran/"
					target="_blank"
					rel="noopener noreferrer"
					class="md:w-1/4 flex items-center justify-center gap-2 text-center"
				>
					<Linkedin size="20" />
				</Button>
				<Button
					href="https://github.com/abishekdevendran"
					target="_blank"
					rel="noopener noreferrer"
					class="md:w-1/4 flex items-center justify-center gap-2 text-center"
				>
					<Github size="20" />
				</Button>
				<Button
					href="mailto:abishekdevendran@gmail.com"
					target="_blank"
					rel="noopener noreferrer"
					class="md:w-1/4 flex items-center justify-center gap-2 text-center"
				>
					<Mail size="20" />
				</Button>
			</div>
		</div>
		<div class="h-[35rem]"></div>
	</div>
</div>
