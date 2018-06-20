!function (root) {
	const colorIndexRegExp = /(not all and )?(\(color-index: (40|70)\))/i;

	root.CSS = root.CSS || {};

	root.CSS._prefersInterface = style => {
		Array.prototype.forEach.call(document.styleSheets, styleSheet => {
			Array.prototype.forEach.call(styleSheet.cssRules, cssRule => {
				const mediaText = Object(cssRule.media).mediaText;
				if (colorIndexRegExp.test(mediaText)) {
					const isDarkMediaText = mediatext.match(colorIndexRegExp)[3] === '40';

					cssRule.media.mediaText = (
						(/^dark$/i.test(style) ? isDarkMediaText : !isDarkMediaText)
							? 'not all and '
						: ''
					) + mediaText.replace(colorIndexRegExp, '$2');
				}
			});
		});
	};
}(typeof self !== 'undefined' ? self : this);
