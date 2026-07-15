import { platformIOS } from '@rock-js/platform-ios';
import { platformAndroid } from '@rock-js/platform-android';
import { pluginMetro } from '@rock-js/plugin-metro';
import moduleFederation from '@module-federation/metro-plugin-rock';

export default {
  bundler: pluginMetro(),
  plugins: [moduleFederation()],
  platforms: {
    ios: platformIOS(),
    android: platformAndroid(),
  },
};
