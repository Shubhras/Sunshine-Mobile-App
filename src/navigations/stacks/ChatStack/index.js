import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../../../screens/ChatScreen';

// Creating stack navigator
const Stack = createNativeStackNavigator();

// Auth stack
const ChatStack = () => {
  // Returning
  return (
    <Stack.Navigator initialRouteName="Chat">
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
    </Stack.Navigator>
  );
};

// Exporting
export default ChatStack;
