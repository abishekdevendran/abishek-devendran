// src/lib/components/imageHandler.ts

// 1. Get the Raw Data (No 'import: default' tricks needed here if we handle it carefully)
const assets = import.meta.glob('$lib/assets/*.{png,jpg,jpeg,webp}', {
	eager: true,
	query: { enhanced: true, w: '2400;2000;1600;1200;800;400' },
	import: 'default' // Keep this to get the inner object directly
});

export function resolveImage(path: string | undefined) {
	if (!path) return null;
	const cleanPath = path.startsWith('/') ? path.slice(1) : path;
	const match = Object.keys(assets).find((key) => key.endsWith(cleanPath));

	// Returns the exact object structure you logged earlier
	return match ? assets[match] : null;
}
