<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { title } from '$lib/stores/title';
	import {
		Github,
		Linkedin,
		Mail,
		Briefcase,
		GraduationCap,
		MapPin,
		ExternalLink
	} from '@lucide/svelte';
	import pfpBrand from '$lib/assets/pfpBrand.png?enhanced';

	$title = 'About';

	// Timeline Data
	const timeline = [
		{
			period: '2025 - Present',
			role: 'SDE-I',
			company: 'Amazon',
			location: 'Chennai',
			link: 'https://www.amazon.jobs/content/en/teams/amazon-web-services/software-development-engineer', // Optional link
			description: 'Building scalable systems and working with distributed microservices.',
			type: 'work',
			current: true
		},
		{
			period: '2024 - 2025',
			role: 'Software Engineer',
			company: 'Randomwalk.AI',
			location: 'Remote / Hybrid',
			link: 'https://randomwalk.ai',
			description: 'Worked on AI-driven solutions and full-stack development.',
			type: 'work',
			current: false
		},
		{
			period: '2023 - 2024',
			role: 'SDE Intern',
			company: 'OruPhones',
			location: 'Chennai',
			link: 'https://oruphones.com',
			description:
				'Handled full-stack tasks and optimized web performance during my final year internship.',
			type: 'work',
			current: false
		},
		{
			period: '2020 - 2024',
			role: 'Bachelor of Technology',
			company: 'IIITDM Kancheepuram',
			location: 'Chennai',
			link: 'https://www.iiitdm.ac.in',
			description: 'Graduated with a focus on Computer Science fundamentals.',
			type: 'education',
			current: false
		}
	];
</script>

<div class="md:pt-16 pb-12 w-full max-w-6xl mx-auto px-4 sm:px-8">
	<h2 class="text-3xl font-bold mb-8 md:pl-8">About Me</h2>

	<div class="flex flex-col md:flex-row gap-12">
		<div
			class="md:w-64 shrink-0 flex flex-col items-center text-center gap-6 md:sticky md:top-24 h-fit"
		>
			<div class="relative group">
				<div
					class="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"
				></div>
				<enhanced:img
					src={pfpBrand}
					sizes="200px"
					alt="Abishek Devendran"
					class="relative h-48 w-48 object-cover rounded-full border-2 border-background shadow-xl"
				/>
			</div>

			<div class="space-y-1">
				<h3 class="text-xl font-semibold">Abishek Devendran</h3>
				<p class="text-muted-foreground text-sm">SDE-I @ Amazon</p>
			</div>

			<div class="flex flex-wrap justify-center gap-3 w-full">
				<Button
					variant="outline"
					size="icon"
					href="https://twitter.com/Real_Abishek"
					target="_blank"
				>
					<span class="text-lg font-bold">𝕏</span>
				</Button>
				<Button
					variant="outline"
					size="icon"
					href="https://www.linkedin.com/in/abishekdevendran/"
					target="_blank"
				>
					<Linkedin class="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					href="https://github.com/abishekdevendran"
					target="_blank"
				>
					<Github class="h-4 w-4" />
				</Button>
				<Button variant="outline" size="icon" href="mailto:abishekdevendran@gmail.com">
					<Mail class="h-4 w-4" />
				</Button>
			</div>
		</div>

		<div class="flex-1 relative border-l border-border/50 ml-4 md:ml-0 space-y-12 pb-10">
			{#each timeline as item, index}
				<div class="relative pl-8 md:pl-12 group">
					<div
						class="absolute -left-1.25 top-1 h-3 w-3 rounded-full border border-border bg-background transition-colors duration-300 group-hover:border-primary group-hover:bg-primary"
					>
						{#if item.current}
							<span class="absolute -inset-1 animate-ping rounded-full bg-primary opacity-75"
							></span>
						{/if}
					</div>

					<div class="flex flex-col gap-2">
						<span class="text-sm font-mono text-muted-foreground">{item.period}</span>

						<h3 class="text-xl font-bold flex items-center gap-2">
							{item.role}
							{#if item.current}
								<span
									class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20"
									>Current</span
								>
							{/if}
						</h3>

						<div class="flex items-center gap-4 text-sm text-foreground/80">
							{#if item.link}
								<a
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-1 font-semibold hover:text-primary transition-colors hover:underline decoration-primary/50 underline-offset-4"
								>
									{#if item.type === 'work'}
										<Briefcase class="h-3.5 w-3.5" />
									{:else}
										<GraduationCap class="h-3.5 w-3.5" />
									{/if}
									{item.company}
									<ExternalLink class="h-3 w-3 opacity-50" />
								</a>
							{:else}
								<span class="flex items-center gap-1 font-semibold">
									{#if item.type === 'work'}
										<Briefcase class="h-3.5 w-3.5" />
									{:else}
										<GraduationCap class="h-3.5 w-3.5" />
									{/if}
									{item.company}
								</span>
							{/if}

							<span class="flex items-center gap-1 text-muted-foreground">
								<MapPin class="h-3.5 w-3.5" />
								{item.location}
							</span>
						</div>

						<p class="text-muted-foreground mt-2 leading-relaxed max-w-2xl">
							{item.description}
						</p>
					</div>
				</div>
			{/each}

			<div class="absolute -left-0.75 bottom-0 h-2 w-2 rounded-full bg-border/50"></div>
		</div>
	</div>
</div>
