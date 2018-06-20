# Installing Media Prefers-Interface

[Media Prefers-Interface] runs in all Node environments, with special instructions for:

| [Node](#node) | [Webpack](#webpack) | [Create React App](#create-react-app) | [Gulp](#gulp) | [Grunt](#grunt) |
| --- | --- | --- | --- | --- |

## Node

Add [Media Prefers-Interface] to your project:

```bash
npm install postcss-media-prefers-interface --save-dev
```

Use [Media Prefers-Interface] to process your CSS:

```js
import postcssMediaPrefers-Interface from 'postcss-media-prefers-interface';

postcssMediaPrefers-Interface.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
import from 'postcss';
import postcssMediaPrefers-Interface from 'postcss-media-prefers-interface';

postcss([
  postcssMediaPrefers-Interface(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

## Webpack

Add [Loader] to your project:

```bash
npm install postcss-loader --save-dev
```

Use [Media Prefers-Interface] in your Webpack configuration:

```js
import postcssMediaPrefers-Interface from 'postcss-media-prefers-interface';

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              postcssMediaPrefers-Interface(/* pluginOptions */)
            ]
          } }
        ]
      }
    ]
  }
}
```

## Create React App

Add [React App Rewired] and [React App Rewire PostCSS] to your project:

```bash
npm install react-app-rewired react-app-rewire---save-dev
```

Use [React App Rewire PostCSS] and [Media Prefers-Interface] in your
`config-overrides.js` file:

```js
import reactAppRewirefrom 'react-app-rewire-postcss';
import postcssMediaPrefers-Interface from 'postcss-media-prefers-interface';

export default config => reactAppRewirePostcss(config, {
  plugins: () => [
    postcssMediaPrefers-Interface(/* pluginOptions */)
  ]
});
```

## Gulp

Add [Gulp PostCSS] to your project:

```bash
npm install gulp---save-dev
```

Use [Media Prefers-Interface] in your Gulpfile:

```js
import from 'gulp-postcss';
import postcssMediaPrefers-Interface from 'postcss-media-prefers-interface';

gulp.task('css', () => gulp.src('./src/*.css').pipe(
  postcss([
    postcssMediaPrefers-Interface(/* pluginOptions */)
  ])
).pipe(
  gulp.dest('.')
));
```

## Grunt

Add [Grunt PostCSS] to your project:

```bash
npm install grunt---save-dev
```

Use [Media Prefers-Interface] in your Gruntfile:

```js
import postcssMediaPrefers-Interface from 'postcss-media-prefers-interface';

grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
  postcss: {
    options: {
      use: [
       postcssMediaPrefers-Interface(/* pluginOptions */)
      ]
    },
    dist: {
      src: '*.css'
    }
  }
});
```

[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Loader]: https://github.com/postcss/postcss-loader
[Media Prefers-Interface]: https://github.com/jonathantneal/postcss-media-prefers-interface
[React App Rewire PostCSS]: https://github.com/csstools/react-app-rewire-postcss
[React App Rewired]: https://github.com/timarney/react-app-rewired
