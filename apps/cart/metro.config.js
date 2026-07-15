const path = require('path');
const { withModuleFederation } = require('@module-federation/metro');
const { getDefaultConfig, mergeConfig } = require('@rock-js/plugin-metro');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

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
    name: 'cart',
    filename: 'cart.bundle',
    dts: true,
    exposes: {
      './App': './App.tsx',
    },
    shared: {
      '@gronxb-super-app/store': {
        singleton: true,
        eager: false,
        requiredVersion: '^1.0.0',
        version: '1.0.0',
      },
      react: {
        singleton: true,
        eager: false,
        requiredVersion: '19.2.7',
        version: '19.2.7',
      },
      'react-native': {
        singleton: true,
        eager: false,
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
