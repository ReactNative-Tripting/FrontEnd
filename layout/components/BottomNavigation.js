import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './Style';  // 공통 스타일 import

const BottomNavigation = ({ navigation }) => (
  <View style={commonStyles.bottomNav}>
    <TouchableOpacity style={commonStyles.navItem} onPress={() => navigation.navigate('Main')}>
      <Icon name="home" size={24} color="black" />
      <Text style={commonStyles.navText}>메인화면</Text>
    </TouchableOpacity>
    <TouchableOpacity style={commonStyles.navItem} onPress={() => navigation.navigate('Mission')}>
      <Icon name="map" size={24} color="black" />
      <Text style={commonStyles.navText}>미션</Text>
    </TouchableOpacity>
    <TouchableOpacity style={commonStyles.navItem} onPress={() => navigation.navigate('Add')}>
      <Icon name="add-circle-outline" size={24} color="black" />
      <Text style={commonStyles.navText}>추가</Text> 
    </TouchableOpacity>
    <TouchableOpacity style={commonStyles.navItem} onPress={() => navigation.navigate('Event')}>
      <Icon name="event" size={24} color="black" />
      <Text style={commonStyles.navText}>행사</Text>
    </TouchableOpacity>
    <TouchableOpacity style={commonStyles.navItem} onPress={() => navigation.navigate('Store')}>
      <Icon name="store" size={24} color="black" />
      <Text style={commonStyles.navText}>상점</Text> 
    </TouchableOpacity>
  </View>
);

export default BottomNavigation;
