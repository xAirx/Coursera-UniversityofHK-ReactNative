import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { ToastAndroid } from 'react-native';

export const AndroidInitialConnectivity = () => {
  NetInfo.addEventListener(
    'connectionChange',
    this.AndroidHandleConnectivityChange
  );

  console.log('We are now in ANDROIDINITIALCONNCETIVITY');
  NetInfo.getConnectionInfo().then(connectionInfo => {
    console.log(
      'THIS IS THE CONNECTIONINFO FROM ANDROIDINITIALCONNCETIVITY',
      connectionInfo.type
    );

    ToastAndroid.show(
      `Initial Network Connectivity Type: ${connectionInfo.type}, effectiveType: ${connectionInfo.effectiveType}`,
      ToastAndroid.LONG
    );
  });
};

export const AndroidHandleConnectivityChange = connectionInfo => {
  console.log('We are now in ANDROIDINITIALCONNCETIVITYCHANGE');
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

export const AndroidRemoveListener = () => {
  console.log('We are now in REMOVEANDROIDINITIALCONNCETIVITYCHANGE');
  NetInfo.removeEventListener(
    'connectionChange',
    this.AndroidHandleConnectivityChange
  );
};

const android = () => <div></div>;

export default android;
