import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from 'react-native-appearance';
import Main from './components/MainComponent';
import { ConfigureStore } from './Redux/ConfigureStore';
import { Loading } from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

export default function App() {
  return (
    <AppearanceProvider>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    </AppearanceProvider>
  );
}
