const initPrefersColorScheme = require('../index');
const postcssPrefersColorScheme = require('../postcss');

// prepare a cache for <style> text with an incrementing id
const css = {};
let uuids = 0;

// transform <style> source with a plugin
const transformStyleElement = $style => {
	// prepare a unique <style> identifier
	if (!$style.hasAttribute('data-pcss')) {
		$style.setAttribute('data-pcss', `pcss-${++uuids}`);
	}

	const from = $style.getAttribute('data-pcss');

	// prepare the <style> source
	const source = $style.textContent;

	if (source !== css[from]) {
		// transform the source
		Promise.resolve(
			postcssPrefersColorScheme.process(source, { from })
		)
		// replace the <style> source with the transformed result
		.then(
			result => {
				$style.textContent = css[from] = result.css;

				if (window.prefersColorScheme) {
					window.prefersColorScheme.scheme = window.prefersColorScheme.scheme;
				}
			},
			// otherwise, use a fallback and log the error
			error => {
				console.error(error);
			}
		);
	}
}

// transform <style> elements in the <head>
[].forEach.call(
	document.head.getElementsByTagName('style'),
	transformStyleElement
);

// watch for and transform new <style> elements in <head>
if (typeof MutationObserver !== 'undefined') {
	(new MutationObserver(
		mutations => mutations.forEach(
			mutation => [].forEach.call(
				mutation.addedNodes || [],
				$node => {
					if ($node.nodeName === 'STYLE') {
						transformStyleElement($node);
					}
				}
			)
		)
	)).observe(document.documentElement, { childList: true, subtree: true });
}

window.initPrefersColorScheme = initPrefersColorScheme;
