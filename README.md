# Media Prefers-Interface [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Support Chat][git-img]][git-url]

[Media Prefers-Interface] lets you activate a “dark mode” media query in CSS
using a `CSS._prefersInterface()` function.

```css
@media (color-index: 48) {
  body {
    background-color: black;
    color: white;
  }
}
```

This media query would become applied with the following command:

```js
CSS._prefersInterface('dark')
```

And would stop being applied with the following command:

```js
CSS._prefersInterface('light');
```

Which, inversely, would activate the follow media query:

```css
@media (color-index: 70) {
  body {
    background-color: black;
    color: white;
  }
}
```

## How does it work?

The `color-index` media query is understood in all major browsers going back to
Internet Explorer 9, but all implementations only seem to allow a `color-index`
of `0`.

This script inverts `(color-index: 48)` queries into
`not all and (color-index: 48)` to activate “dark mode” specific css, while it
also inverts `(color-index: 70)` queries into `not all and (color-index: 48)`
to activate “light mode” specific css.

These valid queries are accessible to `document.styleSheet`, so no css parsing
is required to use this library, and the entire script is only 285 bytes.

## Why does it work this way?

The value of `48` is chosen for dark mode because it is the keycode for `0`,
the hexidecimal value of black. Likewise, `70` is chosen for light mode because
it is the keycode for `f`, the hexidecimal value of white.

## Usage

Add [Media Prefers-Interface] to your project:

```bash
npm install postcss-media-prefers-interface --save-dev
```

Use `CSS._prefersInterface()` to rewrite your queries:

```js
CSS._prefersInterface(true || false);
```

[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-media-prefers-interface.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-media-prefers-interface
[git-img]: https://img.shields.io/badge/support-chat-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[npm-img]: https://img.shields.io/npm/v/postcss-media-prefers-interface.svg
[npm-url]: https://www.npmjs.com/package/postcss-media-prefers-interface

[PostCSS]: https://github.com/postcss/postcss
[Media Prefers-Interface]: https://github.com/jonathantneal/postcss-media-prefers-interface
