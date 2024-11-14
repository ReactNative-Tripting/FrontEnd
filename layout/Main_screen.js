import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';

import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';

import event1Image from './image/event1.png';
import event2Image from './image/event2.png';


export default function MainScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      {/* 헤더 */}
      <View style={commonStyles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>트립팅</Text>
        <TouchableOpacity>
          <IconAnt name="user" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* 배너 섹션 */}
      <View style={commonStyles.bannerContainer}>
        <Image
          source={event1Image} // 실제 이미지 URL로 변경 { uri: 'https://example.com/banner-image.jpg' }
          style={commonStyles.bannerImage}
        />
        <Text style={commonStyles.bannerText}>아트밸리 아산 제3회 신정호 국제 아트페스티벌</Text>
        <TouchableOpacity>
          <Text style={commonStyles.moreText}>더 보기</Text>
        </TouchableOpacity>
      </View>

      {/* 행사 D-day 섹션 */}
      <View style={commonStyles.sectionHeader}>
        <Text style={commonStyles.sectionTitle}>행사 D-day</Text>
        <Icon name="arrow-forward" size={20} color="black" />
      </View>
      <ScrollView style={commonStyles.eventList}>
        <View style={commonStyles.eventItem}>
          <Image
            source={event1Image} // 실제 이미지 URL로 변경{ uri: 'https://example.com/event1.jpg' }
            style={commonStyles.eventImage}
          />
          <View style={commonStyles.eventDescription}>
            <Text style={commonStyles.eventTextTitle}>신정호 국제 아트페스티벌 100인 100작</Text>
            <Text style={commonStyles.eventTextDetail}>생성형 AI 작품 공유 전시</Text>
          </View>
        </View>
        <View style={commonStyles.eventItem}>
          <Image
            source={event2Image} // 실제 이미지 URL로 변경{ uri: 'https://example.com/event2.jpg' }
            style={commonStyles.eventImage}
          />
          <View style={commonStyles.eventDescription}>
            <Text style={commonStyles.eventTextTitle}>아트밸리 아산 제2회 재즈페스티벌</Text>
            <Text style={commonStyles.eventTextDetail}>자연과 함께하는 재즈 음악 축제</Text>
          </View>
        </View>
      </ScrollView>

      {/* 일정 섹션 */}
      <View style={commonStyles.sectionHeader}>
        <Text style={commonStyles.sectionTitle}>설정 된 일정</Text>
        <Icon name="arrow-forward" size={20} color="black" />
      </View>
      <View style={commonStyles.scheduleList}>
        <View style={commonStyles.scheduleItem}>
          <Text style={commonStyles.scheduleText}>
            아트밸리 아산 제23회 외암민속마을
          </Text>
          <Icon name="check-box" size={24} color="#6e6e6e" />
        </View>
        <View style={commonStyles.scheduleItem}>
          <Text style={commonStyles.scheduleText}>
            아트밸리 아산 제2회 재즈페스티벌 with 자연
          </Text>
          <Icon name="check-box-outline-blank" size={24} color="#6e6e6e" />
        </View>
      </View>

    <BottomNavigation navigation={navigation}/>

    </View>
  );
}
