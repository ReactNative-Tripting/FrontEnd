import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

//스크린 임포팅

import SplashScreen from './layout/Splash_screen';
import LoginScreen from './layout/ACCOUNT_Login_screen';

import SignUp from './layout/ACTIVITY_Signup_screen';

import FindPw from './layout/ACCOUNT_FindPassword';
import FindID from './layout/ACCOUNT_FindID';

import Main from './layout/MAIN_Main_screen';
import Event from './layout/MAIN_Event_screen';
import Store from './layout/MAIN_ITEM_Store_Screen';
import Product from './layout/MAIN_ITEM_Product_screen';
import Storage from './layout/ITEM_Storage_screen'
import Mission from './layout/MAIN_Mission_screen';
import MissionDetail from './layout/MAIN_MissionDetail_screen';
import StartMenu from './layout/MAIN_StartMenu_screen';
import RoomScreenP from './layout/ACTIVITY_Room_screen_P';
import RoomScreenT from './layout/ACTIVITY_Room_screen_T';
import UserProfileScreen from './layout/ACCOUNT_Profile_screen';

import HealingScreen from './layout/ACTIVITY_Healing_Screen';
import EducationScreen from './layout/ACTIVITY_Education_Screen';
import FoodScreen from './layout/ACTIVITY_Food_Screen';
import MountainScreen from './layout/ACTIVITY_Mountain_Screen';
import Usersetting from './layout/ACTIVITY_UserSetting_Screen';

import MissionSelect from './layout/MAIN_MissionSelect_screen';

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
        <Stack.Screen name="UserSettings" component={Usersetting}/>
        <Stack.Screen name="User" component={UserProfileScreen}/>
        <Stack.Screen name="MissionSelect" component={MissionSelect}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
}
