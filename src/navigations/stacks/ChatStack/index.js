import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Conversations from '../../../screens/Conversations';

// Creating stack navigator
const Stack = createNativeStackNavigator();

// Auth stack
const ChatStack = () => {
  // Returning
  return (
    <Stack.Navigator initialRouteName="Conversations">
      <Stack.Screen
        name="Conversations"
        component={Conversations}
        options={{ headerShown: false, animation: 'none' }}
      />
    </Stack.Navigator>
  );
};

// Exporting
export default ChatStack;
