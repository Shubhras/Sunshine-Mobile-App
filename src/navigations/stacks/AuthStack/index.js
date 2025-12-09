import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../../screens/LoginScreen';
import ResetPasswordScreen from '../../../screens/ResetPasswordScreen';
import SignupScreen from '../../../screens/SignupScreen';
import SmsAuthenticationScreen from '../../../screens/SmsAuthenticationScreen';
import WelcomeScreen from '../../../screens/WelcomeScreen';

// Creating stack navigator
const Stack = createNativeStackNavigator();

// Auth stack
const AuthStack = () => {
  // Returning
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
      <Stack.Screen
        name="Sms"
        component={SmsAuthenticationScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
       <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
       <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false, animation: 'none' }}
      />
    </Stack.Navigator>
  );
};

// Exporting
export default AuthStack;
