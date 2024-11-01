import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';


import LoginScreen from './layout/Login_screen';
import SplashScreen from './layout/Splash_screen';
//import FindID from './layout/FindID';
//import FindPassword from './layout/FindPassword';
import SignUp from './layout/Signup_screen';
import Main from './layout/Main_screen';

const Stack = createStackNavigator();

/*  <Stack.Screen name="FindID" component={FindID} />
    <Stack.Screen name="FindPassword" component={FindPassword} />
    
*/

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
		<Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Main" component={Main} />
        
      </Stack.Navigator>
	
    </NavigationContainer>
  );
}