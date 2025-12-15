import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import WalkthroughScreen from '../../screens/WalkthroughScreen';
import AuthStack from '../stacks/AuthStack';
import HomeTopTab from '../tabs/HomeTopTab';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="HomeTopTab">
      <Stack.Screen
        name="WalkthroughScreen"
        component={WalkthroughScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="HomeTopTab"
        component={HomeTopTab}
        options={{ headerShown: false, animation: 'none' }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
