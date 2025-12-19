import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfileScreen from '../../../screens/MyProfileScreen';

// Creating stack navigator
const Stack = createNativeStackNavigator();

// Auth stack
const MyProfileStack = () => {
  // Returning
  return (
    <Stack.Navigator initialRouteName="MyProfile">
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
    </Stack.Navigator>
  );
};

// Exporting
export default MyProfileStack;
