import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import WalkthroughScreen from '../../screens/WalkthroughScreen';
import AuthStack from '../stacks/AuthStack';
import HomeScreen from '../../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="WalkthroughScreen">
      <Stack.Screen
        name="WalkthroughScreen"
        component={WalkthroughScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
       <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{ headerShown: false, animation: 'none'}}
      />
       <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, animation: 'none'}}
      />
    </Stack.Navigator>
  );
};

export default Routes;