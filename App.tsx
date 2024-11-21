import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

//스크린 임포팅

import SplashScreen from './layout/Splash_screen';
import LoginScreen from './layout/Login_screen';

import SignUp from './layout/Signup_screen';

import FindPw from './layout/FindPassword';
import FindID from './layout/FindID';

import Main from './layout/Main_screen';
import Event from './layout/Event_screen';
import Store from './layout/Store_Screen';
  import Product from './layout/Product_screen';
  import Storage from './layout/Storage_screen'
  import Mission from './layout/Mission_screen';
  import MissionDetail from './layout/MissionDetail_screen';
import StartMenu from './layout/StartMenu_screen';
import RoomScreenP from './layout/Room_screen_P';
import RoomScreenT from './layout/Room_screen_T';
import UserProfileScreen from './layout/Profile_screen';

import HealingScreen from './layout/HealingScreen';
import EducationScreen from './layout/EducationScreen';
import FoodScreen from './layout/FoodScreen';
import MountainScreen from './layout/MountainScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="FindPw" component={FindPw}/>
        <Stack.Screen name="FindID" component={FindID}/>
        <Stack.Screen name="Main" component={Main}/>
        <Stack.Screen name="Event" component={Event}/>
        <Stack.Screen name="Store" component={Store}/>
        <Stack.Screen name="Product" component={Product}/>
        <Stack.Screen name="Storage" component={Storage}/>
        <Stack.Screen name="StartMenu" component={StartMenu}/>
        <Stack.Screen name="Mission" component={Mission}/>
        <Stack.Screen name="MissionDetail" component={MissionDetail}/>
        <Stack.Screen name="RoomP" component={RoomScreenP}/>
        <Stack.Screen name="RoomT" component={RoomScreenT}/>     
        <Stack.Screen name="Healing" component={HealingScreen}/>
        <Stack.Screen name="Education" component={EducationScreen}/>
        <Stack.Screen name="Food" component={FoodScreen}/>
        <Stack.Screen name="Mountain" component={MountainScreen}/>
        <Stack.Screen name="User" component={UserProfileScreen}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}
