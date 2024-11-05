module.exports = function override(config, env) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "stream": require.resolve("stream-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "fs": false,
    };
    return config;
  };
  