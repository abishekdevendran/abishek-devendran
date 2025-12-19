<script>
	import { FileText, Github, Linkedin } from '@lucide/svelte';
	import pfpBrand from '$lib/assets/pfpBrand.png?enhanced';
</script>

<div
	class="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-12 md:py-24 animate-in fade-in slide-in-from-bottom-4 duration-700"
>
	<div class="order-2 md:order-1 md:col-span-8 flex flex-col gap-6">
		<div class="space-y-2">
			<p class="text-lg md:text-xl text-muted-foreground font-medium">Hi, I'm</p>
			<h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
				Abishek Devendran
			</h1>
		</div>

		<p class="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
			I'm a software engineer based in Chennai, India, specializing in building (and occasionally
			designing) exceptional digital experiences. Focused on accessible, human-centered products. In
			my free time, I play video games, chess, and watch Anime.
		</p>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
			<a
				href="https://twitter.com/Real_Abishek"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center justify-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-secondary-foreground/20 transition-all duration-300"
			>
				<span class="text-xl group-hover:scale-110 transition-transform shrink-0">𝕏</span>
				<span class="font-medium group-hover:text-foreground">Twitter</span>
			</a>

			<a
				href="https://www.linkedin.com/in/abishekdevendran/"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center justify-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-secondary-foreground/20 transition-all duration-300"
			>
				<Linkedin
					class="w-5 h-5 group-hover:scale-110 transition-transform text-[#0077b5] shrink-0"
				/>
				<span class="font-medium group-hover:text-foreground">LinkedIn</span>
			</a>

			<a
				href="https://github.com/abishekdevendran"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center justify-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-secondary-foreground/20 transition-all duration-300"
			>
				<Github class="w-5 h-5 group-hover:scale-110 transition-transform shrink-0" />
				<span class="font-medium group-hover:text-foreground">Github</span>
			</a>

			<a
				href="/Resume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center justify-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 hover:border-secondary-foreground/20 transition-all duration-300"
			>
				<FileText
					class="w-5 h-5 group-hover:scale-110 transition-transform text-primary shrink-0"
				/>
				<span class="font-medium group-hover:text-foreground">Resume</span>
			</a>
		</div>
	</div>

	<div class="order-1 md:order-2 md:col-span-4 flex justify-center md:justify-end">
		<div
			class="relative group perspective-1000"
			role="img"
			aria-label="Abishek Devendran 3D Profile"
			onmousemove={(e) => {
				const rect = e.currentTarget.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;
				const centerX = rect.width / 2;
				const centerY = rect.height / 2;

				const rotateX = ((y - centerY) / centerY) * -20; // Max 20deg rotation
				const rotateY = ((x - centerX) / centerX) * 20;

				e.currentTarget.style.setProperty('--rotate-x', `${rotateX}deg`);
				e.currentTarget.style.setProperty('--rotate-y', `${rotateY}deg`);
			}}
			onmouseleave={(e) => {
				e.currentTarget.style.setProperty('--rotate-x', '0deg');
				e.currentTarget.style.setProperty('--rotate-y', '0deg');
			}}
		>
			<div
				class="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-full opacity-25 group-hover:opacity-50 blur transition duration-1000 group-hover:duration-200"
			></div>
			<enhanced:img
				fetchpriority="high"
				src={pfpBrand}
				sizes="200px"
				loading="eager"
				alt="Abishek Devendran"
				class="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-background shadow-2xl transition-transform duration-200 ease-out aspect-square shrink-0"
				style="transform: perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) scale3d(1.02, 1.02, 1.02);"
			/>
		</div>
	</div>
</div>
