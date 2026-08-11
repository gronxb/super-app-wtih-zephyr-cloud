import { platformIOS } from '@rock-js/platform-ios';
import { platformAndroid } from '@rock-js/platform-android';
import { pluginMetro } from '@rock-js/plugin-metro';
import { zephyrMetroRockPlugin } from 'zephyr-metro-plugin';

export default {
  bundler: pluginMetro(),
  plugins: [zephyrMetroRockPlugin()],
  platforms: {
    ios: platformIOS(),
    android: platformAndroid(),
  },
};
