import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export const CurrentPlatform = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

const PlatformCheck = () => <div></div>;

export default PlatformCheck;
