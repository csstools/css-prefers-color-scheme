const colorIndexRegExp = /\(color-index: *(22|48|70)\)/i;
const prefersColorSchemeRegExp = /prefers-color-scheme:/i;

const prefersColorSchemeInit = initialColorScheme => {

	const mediaQueryString = '(prefers-color-scheme: dark)';
	const mediaQueryList = window.matchMedia && matchMedia(mediaQueryString);
	const hasNativeSupport = mediaQueryList && mediaQueryList.media === mediaQueryString;

	const mediaQueryListener = () => {
		set(mediaQueryList.matches ? 'dark' : 'light');
	};

	const removeListener = () => {
		if (mediaQueryList) {
			mediaQueryList.removeListener(mediaQueryListener);
		}
	};

	const set = colorScheme => {
		if (colorScheme !== currentColorScheme) {
			currentColorScheme = colorScheme;

			if (typeof result.onChange === 'function') {
				result.onChange();
			}
		}
		
		[].forEach.call(document.styleSheets || [], styleSheet => {

			let length = styleSheet.cssRules.length, cssRules = styleSheet.cssRules;

			for (let i = 0; i < length; i++) {
				const cssRule = cssRules[i]
				if(!cssRule.media) {
					continue;
				}
				const colorSchemeMatch = prefersColorSchemeRegExp.test(cssRule.media.mediaText);

				if (colorSchemeMatch) {
					const index = [].indexOf.call(cssRule.parentStyleSheet.cssRules, cssRule);
					cssRule.parentStyleSheet.deleteRule(index);
					i--
					length--
				} else {
					const colorIndexMatch = (cssRule.media.mediaText || '').match(colorIndexRegExp);
					if (colorIndexMatch) {
						cssRule.media.mediaText = (
							(/^dark$/i.test(colorScheme)
								? colorIndexMatch[1] === '48'
								: /^light$/i.test(colorScheme)
									? colorIndexMatch[1] === '70'
									: colorIndexMatch[1] === '22')
								? 'not all and '
								: ''
						) + colorIndexMatch[0];
					}
				}

			}

		});
	};
	
	const result = Object.defineProperty(
		{ hasNativeSupport, removeListener },
		'scheme',
		{ get: () => currentColorScheme, set }
	);

	// initialize the color scheme using the provided value, the system value, or light
	let currentColorScheme = initialColorScheme || (mediaQueryList && mediaQueryList.matches ? 'dark' : 'light');

	set(currentColorScheme);

	// listen for system changes
	if (mediaQueryList) {
		mediaQueryList.addListener(mediaQueryListener);
	}

	return result;
};
