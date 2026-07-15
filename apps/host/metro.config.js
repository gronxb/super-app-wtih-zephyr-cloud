const path = require('path');
const { withModuleFederation } = require('@module-federation/metro');
const { getDefaultConfig, mergeConfig } = require('@rock-js/plugin-metro');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');
const cartPort = process.env.CART_PORT ?? '8082';
const discoverPort = process.env.DISCOVER_PORT ?? '8083';

const config = mergeConfig(getDefaultConfig(projectRoot), {
  watchFolders: [workspaceRoot],
  resolver: {
    useWatchman: false,
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
  },
});

module.exports = withModuleFederation(
  config,
  {
    name: 'host',
    remotes: {
      cart: `cart@http://localhost:${cartPort}/mf-manifest.json`,
      discover: `discover@http://localhost:${discoverPort}/mf-manifest.json`,
    },
    shared: {
      '@gronxb-super-app/store': {
        singleton: true,
        eager: true,
        requiredVersion: '^1.0.0',
        version: '1.0.0',
      },
      react: {
        singleton: true,
        eager: true,
        requiredVersion: '19.2.7',
        version: '19.2.7',
      },
      'react-native': {
        singleton: true,
        eager: true,
        requiredVersion: '0.84.1',
        version: '0.84.1',
      },
    },
    shareStrategy: 'loaded-first',
  },
  {
    flags: {
      unstable_patchHMRClient: true,
      unstable_patchInitializeCore: true,
      unstable_patchRuntimeRequire: true,
    },
  },
);
