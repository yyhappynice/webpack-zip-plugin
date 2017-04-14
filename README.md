# Webpack Zip Plugin

This plugin zip your dist after webpack builds.

## Install

`npm install --save-dev webpack-zip-plugin`

## Quick Start

Insert into your webpack.config.js:

```js
const WebpackZipPlugin = require('webpack-zip-plugin')

module.exports = {
  ...
  plugins: [
    new WebpackZipPlugin({
      initialFile: './dist',
      endPath: './buildPath',
      zipName: '[name].zip'
    })
  ]
}

```

## Example

```js
const path = require('path')
const webpack = require('webpack')

const WebpackZipPlugin = require('webpack-zip-plugin')

module.exports = {
  entry: './test/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WebpackZipPlugin({
      initialFile: 'dist',
      endPath: './weidian',
      zipName: 'weidian.zip',
      publishShell: ''
    })
  ]
}
```

## API

* `initialFile`: Need to pack the target file, excluding the file itself **Default: ''**
* `endPath`: Packaged file directory **Default: ''**
* `zipName`: Zip package name **Default: ''**

## LICENSE

MIT