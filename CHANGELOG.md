# Changes to Prefers Color Scheme

### 2.0.0 (November 3, 2018)

- The client library now returns an object with various features, including:
  - `scheme` to get or set the preferred color scheme
  - `hasNativeSupport` to report whether `prefers-color-scheme` is supported
  - `onChange` to listen for when the preferred color scheme changes
  - `removeListener` to destroy the native `prefers-color-scheme` listener

### 1.0.0 (September 24, 2018)

- Initial version
