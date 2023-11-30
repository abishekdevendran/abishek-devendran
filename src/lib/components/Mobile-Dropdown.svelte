<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { LucideMenu } from 'lucide-svelte';
	import * as Sheet from '$lib/components/ui/sheet';
</script>

<Sheet.Root>
	<Sheet.Trigger>
		<Button variant="outline" size="icon" class="md:hidden">
			<LucideMenu class="h-[1.2rem] w-[1.2rem]" />
			<span class="sr-only">Toggle Hamburger Menu</span>
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="bottom">
		<Sheet.Header>
      <div class="flex flex-col gap-4 items-center justify-center">
        <div class="flex gap-2 items-center justify-center">
          <a href="/blog" class="text-2xl font-bold">
            Blog
          </a>
        </div>
        <div class="flex gap-2 items-center justify-center">
          <a href="/projects" class="text-2xl font-bold">
            Projects
          </a>
        </div>
        <div class="flex gap-2 items-center justify-center">
          <a href="/about" class="text-2xl font-bold">
            About
          </a>
        </div>
      </div>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
