module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            'expo-modules-core': 'expo-modules-core/build',
            'expo-web-browser': 'expo-web-browser/build'
          }
        }
      ]
    ]
  };
};