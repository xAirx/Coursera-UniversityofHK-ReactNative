import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import Main from './components/MainComponent';
import { ConfigureStore } from './Redux/ConfigureStore';

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
