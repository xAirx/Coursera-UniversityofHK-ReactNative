import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { ToastAndroid } from 'react-native';

export const IOSInitialConnectivity = () => {
  NetInfo.addEventListener(
    'connectionChange',
    this.IOSHandleConnectivityChange
  );
  NetInfo.getConnectionInfo().then(connectionInfo => {
    console.log('We are now in IOSINITIALCONNCETIVITY');
    console.log(
      'THIS IS THE CONNECTIONINFO FROM IOSINITIALCONNCETIVITY',
      connectionInfo.type
    );
    ToastAndroid.show(
      `Initial Network Connectivity Type: ${connectionInfo.type}, effectiveType: ${connectionInfo.effectiveType}`,
      ToastAndroid.LONG
    );
  });
};

export const IOSHandleConnectivityChange = connectionInfo => {
  console.log('We are now in IOSINITIALCONNCETIVITYCHANGE');
  console.log(
    'THIS IS THE CONNECTIONINFO FROM ANDROIDHANDLECONNECTIVITYCHANGE',
    connectionInfo.type
  );
  switch (connectionInfo.type) {
    case 'none':
      ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
      break;
    case 'wifi':
      ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
      break;
    case 'cellular':
      ToastAndroid.show(
        'You are now connected to Cellular!',
        ToastAndroid.LONG
      );
      break;
    case 'unknown':
      ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
      break;
    default:
      break;
  }
};

export const IOSRemoveListener = () => {
  console.log('We are now in REMOVEIOSINITIALCONNCETIVITYCHANGE');
  NetInfo.removeEventListener(
    'connectionChange',
    this.AndroidHandleConnectivityChange
  );
};

const ios = () => <div></div>;

export default ios;
