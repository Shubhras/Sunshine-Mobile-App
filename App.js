import 'react-native-get-random-values';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppStyles from './AppStyles';
import { PortalProvider } from './src/components/global/Portal';
import Routes from './src/navigations/Routes';
import store, { persistor } from './src/redux/store/Store';
import ToastProvider from './src/components/alerts/Toast/ToastManager';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// create a component
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={AppStyles.gestureHandlerRootView}>
          <NavigationContainer>
            <PortalProvider>
              <SafeAreaProvider>
                <ToastProvider>
                  <Routes />
                </ToastProvider>
              </SafeAreaProvider>
            </PortalProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default App;
