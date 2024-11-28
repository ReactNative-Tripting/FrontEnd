import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './Style';  // 공통 스타일 import
import AsyncStorage from '@react-native-async-storage/async-storage';

function BottomNavigation({ navigation }) {
  const [getEventList, setEventList] = useState(null);

  useEffect(() => {
    const fetchEventList = async () => {
      const getEventData = await AsyncStorage.getItem('eventlist');
      setEventList(JSON.parse(getEventData));
    };
    fetchEventList();
  }, []);

  return(
    <View style={commonStyles.bottomNav}>
        <TouchableOpacity style={commonStyles.navItem} onPress={() => {
        navigation.navigate('Main', { getEventList });}}>
          <Icon name="home" size={24} color="black" />
          <Text style={commonStyles.navText}>메인화면</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navItem} onPress={() => navigation.replace('Mission')}>
          <Icon name="map" size={24} color="black" />
          <Text style={commonStyles.navText}>미션</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navItem} onPress={() => navigation.replace('StartMenu')}>
          <Icon name="add-circle-outline" size={24} color="black" />
          <Text style={commonStyles.navText}>추가</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navItem} onPress={() => {
          navigation.navigate('Event', { getEventList });
        }}>
          <Icon name="event" size={24} color="black" />
          <Text style={commonStyles.navTsssext}>행사</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.navItem} onPress={() => navigation.replace('Store')}>
          <Icon name="store" size={24} color="black" />
          <Text style={commonStyles.navText}>상점</Text>
        </TouchableOpacity>
      </View>
  )
}

export default BottomNavigation;
