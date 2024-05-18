// webpack.config.js
module.exports = {
    resolve: {
      alias: {
        "react-native$": "react-native-web",
        "normalize-css-color": "@react-native/normalize-color",
        // ... any other aliases
      }
      // ... any other `resolve` config
    },
    // .. other config
  };