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
import Dietary from '../../screens/Dietary';
import Exercise from '../../screens/Exercise';
import PersonalityTraits from '../../screens/PersonalityTraits';
import LoveLanguage from '../../screens/LoveLanguage';
import Pets from '../../screens/Pets';
import Travel from '../../screens/Travel';
import Movie from '../../screens/Movie';
import Education from '../../screens/Education';
import Lifestyle from '../../screens/Lifestyle';
import Children from '../../screens/Children';
import Religion from '../../screens/Religion';
import Sports from '../../screens/Sports';
import InitalLoadScreen from '../../screens/InitalLoadScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="InitalLoadScreen">
       <Stack.Screen
        name="InitalLoadScreen"
        component={InitalLoadScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
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
      <Stack.Screen
        name="Dietary"
        component={Dietary}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Personality"
        component={PersonalityTraits}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="LoveLanguage"
        component={LoveLanguage}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Pets"
        component={Pets}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Travel"
        component={Travel}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Movie"
        component={Movie}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Education"
        component={Education}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Lifestyle"
        component={Lifestyle}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Children"
        component={Children}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Religion"
        component={Religion}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Sports"
        component={Sports}
        options={{ headerShown: false, animation: 'none' }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
