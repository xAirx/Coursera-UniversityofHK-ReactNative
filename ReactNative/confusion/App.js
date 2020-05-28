import React from 'react';
import { SafeAreaView, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

/* import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from 'react-native-appearance'; */
import Main from './components/Navigators/MainComponent.js';
import { ConfigureStore } from './Redux/ConfigureStore';
import { Loading } from './components/helpers/Components/LoadingComponent.js';

console.disableYellowBox = true;

const { persistor, store } = ConfigureStore();

export default function App() {
  return (
    /*     <AppearanceProvider>
     */ <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
    /*     </AppearanceProvider>
     */
  );
}
