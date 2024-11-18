import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';  // 공통 스타일 import

import event1Image from './image/event1.png'; // 배너 이미지 추가
import event2Image from './image/event2.png'; // 이벤트 이미지 추가

export default function EventsPage({ navigation }) {
  const [selected, setSelected] = useState('');

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>트립팅</Text>
        <TouchableOpacity>
          <Icon name="notifications" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Banner Section */}
      <View style={commonStyles.bannerContainer}>
        <Image source={event1Image} style={commonStyles.bannerImage} />
        <Text style={commonStyles.bannerTitle}>신정호 국제 아트페스티벌</Text>
        <Text style={commonStyles.bannerSubtitle}>100일 100밤 | 디지털 아트대전</Text>
        <TouchableOpacity>
          <Text style={commonStyles.bannerLink}>더 보기</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
        }}
        style={commonStyles.calendar}
      />

      {/* Bottom Navigation */}
      <View style={commonStyles.bottomNavContainer}>
        <BottomNavigation navigation={navigation} />
      </View>
    </View>
  );
}