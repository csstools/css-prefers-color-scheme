const postcss = require('postcss');
const plugin = require('../postcss');

// prepare CSS._prefersInterface for demo usage
require('..');

const cachedPrefersInterface = CSS._prefersInterface;
let cachedPrefersInterfaceValue = 'light';

CSS._prefersInterface = style => {
	cachedPrefersInterfaceValue = style || cachedPrefersInterfaceValue;

	return cachedPrefersInterface(cachedPrefersInterfaceValue);
};

// prepare a cache for <style> text with an incrementing id
const css = {};
let uuids = 0;

// prepare the default plugin options
const defaultOptions = {};

// transform <style> source with a plugin
const transformStyleElement = $style => {
	// prepare a unique <style> identifier
	if (!$style.hasAttribute('data-pcss')) {
		$style.setAttribute('data-pcss', `pcss-${++uuids}`);
	}

	const from = $style.getAttribute('data-pcss');

	// prepare the plugin options
	let pluginOptions;

	try {
		pluginOptions = JSON.parse($style.getAttribute('data-pcss-options'));
	} catch (error) {
		/* do nothing */
	}

	pluginOptions = pluginOptions || defaultOptions;

	// prepare the <style> source
	const source = $style.textContent;

	if (source !== css[from]) {
		// transform the source
		postcss([ plugin(pluginOptions) ]).process(source, { from })
		// replace the <style> source with the transformed result
		.then(
			result => {
				$style.textContent = css[from] = result.css;

				CSS._prefersInterface();
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
