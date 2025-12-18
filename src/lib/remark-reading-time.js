// @ts-nocheck
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import fs from 'node:fs';

/**
 * Remarks plugin to compute reading time and inject it into frontmatter
 */
export function remarkReadingTime() {
	return function (tree, file) {
		let text = '';

		// Try to get raw content for better estimation (preserving whitespace/structure)
		if (file.filename && fs.existsSync(file.filename)) {
			try {
				text = fs.readFileSync(file.filename, 'utf8');
			} catch (e) {
				text = toString(tree);
			}
		} else if (file.contents) {
			text = file.contents.toString();
		} else {
			text = toString(tree); // Fallback to AST text
		}

		const readingTimeResult = getReadingTime(text);

		// mdsvex stores frontmatter in file.data.fm
		// We add the readingTime object to it
		file.data.fm = {
			...file.data.fm,
			readingTime: readingTimeResult
		};
	};
}
