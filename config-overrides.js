/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");
const { override, useBabelRc, addBabelPreset, addBabelPlugin } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  addBabelPreset(['@babel/preset-typescript', { allowDeclareFields: true }]),
  addBabelPlugin(['@babel/plugin-transform-typescript', { allowDeclareFields: true }]),
  addBabelPlugin(['@babel/plugin-transform-class-properties', { loose: true }]),
  addBabelPlugin(['@babel/plugin-transform-private-methods', { loose: true }]),
  addBabelPlugin(['@babel/plugin-transform-private-property-in-object', { loose: true }]),
  (config) => {
    // Add a specific rule for TypeScript files
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          ['@babel/preset-typescript', { allowDeclareFields: true }]
        ],
        plugins: [
          ['@babel/plugin-transform-typescript', { allowDeclareFields: true }],
          ['@babel/plugin-transform-class-properties', { loose: true }],
          ['@babel/plugin-transform-private-methods', { loose: true }],
          ['@babel/plugin-transform-private-property-in-object', { loose: true }]
        ]
      }
    });

    config.module.rules = config.module.rules.map((rule) => {
      if (rule.oneOf instanceof Array) {
        rule.oneOf[rule.oneOf.length - 1].exclude = [/\.(js|mjs|jsx|cjs|ts|tsx)$/, /\.html$/, /\.json$/];
      }

      return rule;
    });
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify"),
      url: require.resolve("url"),
      zlib: require.resolve("browserify-zlib"),
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ]);
    config.module.rules.unshift({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false, // disable the behavior
      },
    });

    config.module.rules.unshift({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false, // disable the behavior
      },
    });

    return config;
  }
);
