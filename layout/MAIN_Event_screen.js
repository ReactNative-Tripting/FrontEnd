import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';  // 공통 스타일 import

import event1Image from './image/event1.png'; // 배너 이미지 추가
import event2Image from './image/event2.png'; // 이벤트 이미지 추가

export default function EventsPage({ route, navigation }) {
  const eventList = route.params.getEventList;
  const [selected, setSelected] = useState('');

  {/*eventList가 축제 정보를 담고 있는 변수
              사용법
    축제 시작일 : eventList[0].eventstartdate
    축제 마지막일 : eventList[0].eventenddate
    축제 이미지 : eventList[0].firstimage 참고로 이건 {uri: eventList[0].firstimage} 이런 식으로 사용해야 함
    축제 관련 전화번호 : eventList[0].tel
    축제 이름 : eventList[0].title*/}

  return (
    <View style={commonStyles.container}>
      {/*헤더*/}
      <View style={commonStyles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color="black" />
        </TouchableOpacity>
         <Text style={commonStyles.headerTitle}>트립팅</Text> 
        <TouchableOpacity>
          <Icon name="notifications" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* 배너 */}
      <View style={commonStyles.bannerContainer}>
        <Image source={{uri: eventList[0].firstimage}} style={commonStyles.bannerImage} />
        <Text style={commonStyles.bannerTitle}>신정호 국제 아트페스티벌</Text>
        <Text style={commonStyles.bannerSubtitle}>100일 100밤 | 디지털 아트대전</Text>
        <TouchableOpacity>
          <Text style={commonStyles.bannerLink}>더 보기</Text>
        </TouchableOpacity>
      </View>

      {/* 달력 */}
      {/*참조: https://wix.github.io/react-native-calendars/docs/Intro */}
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
        }}
        style={commonStyles.calendar}
      />

      {/* 하단 네비게이션 */}
      <View style={commonStyles.bottomNavContainer}>
        <BottomNavigation navigation={navigation} />
      </View>
    </View>
  );
}
