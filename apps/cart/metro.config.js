const path = require('node:path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withModuleFederation } = require('@module-federation/metro');
const { withZephyr } = require('zephyr-metro-plugin');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    useWatchman: false,
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
  },
};

const baseConfig = mergeConfig(getDefaultConfig(projectRoot), config);

async function getConfig() {
  const zephyrConfig = await withZephyr()({
    name: 'cart',
    filename: 'cart.bundle',
    dts: true,
    exposes: {
      './App': './App.tsx',
    },
    shared: {
      '@gronxb-super-app/store': {
        singleton: true,
        eager: true, // Host-First, If None standalone fallback
        requiredVersion: '^1.0.0',
        version: '1.0.0',
      },
      react: {
        singleton: true,
        eager: false,
        import: false,
        requiredVersion: '19.2.7',
        version: '19.2.7',
      },
      'react-native': {
        singleton: true,
        eager: false,
        import: false,
        requiredVersion: '0.84.1',
        version: '0.84.1',
      },
    },
    shareStrategy: 'loaded-first',
  });

  return withModuleFederation(baseConfig, zephyrConfig, {
    flags: {
      unstable_patchHMRClient: true,
      unstable_patchInitializeCore: true,
      unstable_patchRuntimeRequire: true,
    },
  });
}

module.exports = getConfig();
