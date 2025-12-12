import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeScreen from '../../../screens/SwipeScreen';

// Creating stack navigator
const Stack = createNativeStackNavigator();

// Auth stack
const SwipeStack = () => {
  // Returning
  return (
    <Stack.Navigator initialRouteName="Swipe">
      <Stack.Screen
        name="Swipe"
        component={SwipeScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
    </Stack.Navigator>
  );
};

// Exporting
export default SwipeStack;
