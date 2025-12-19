import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AccountDetails from '../../screens/AccountDetails';
import BlockedUsers from '../../screens/BlockedUsers';
import Contactus from '../../screens/Contactus';
import NumerogogyNumberMatch from '../../screens/NumerogogyNumberMatch';
import Settings from '../../screens/Settings';
import UpgradeAccount from '../../screens/UpgradeAccount';
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
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="UpgradeAccount"
        component={UpgradeAccount}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Contactus"
        component={Contactus}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="NumerogogyNumberMatch"
        component={NumerogogyNumberMatch}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="BlockedUsers"
        component={BlockedUsers}
        options={{ headerShown: false, animation: 'none' }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
