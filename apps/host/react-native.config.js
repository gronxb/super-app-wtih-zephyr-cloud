// react-native.config.js
const commands = require('@module-federation/metro-plugin-rnc-cli');
const { updateManifest } = require('@module-federation/metro');
const { zephyrCommandWrapper } = require('zephyr-metro-plugin');

const wrappedFuncPromise = zephyrCommandWrapper(
  commands.bundleMFHostCommand.func,
  commands.loadMetroConfig,
  () => {
    updateManifest(
      global.__METRO_FEDERATION_MANIFEST_PATH,
      global.__METRO_FEDERATION_CONFIG,
    );
  },
);

const zephyrCommand = {
  name: 'bundle-mf-host',
  description: 'Bundles a Module Federation host with Zephyr Cloud',
  func: async (...args) => {
    const wrappedFunc = await wrappedFuncPromise;
    return wrappedFunc(...args);
  },
  options: [
    ...commands.bundleMFHostCommand.options,
    {
      name: '--config-cmd [string]',
      description: '[Internal] React Native Xcode bundling compatibility.',
    },
  ],
};

module.exports = {
  commands: [zephyrCommand],
};
