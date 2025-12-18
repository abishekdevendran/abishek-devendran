import { codeToHtml } from 'shiki';

export async function highlightCode(code: string, lang: string) {
	const html = await codeToHtml(code, {
		lang: lang,
		themes: {
			light: 'github-light', // your preferred light theme
			dark: 'material-theme-darker' // your preferred dark theme
		},
		defaultColor: false // Optional: gives you full control via CSS
	});
	return html.replace(/{/g, '&#123;').replace(/}/g, '&#125;');
}
