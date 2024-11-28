import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';

import event1Image from './image/event1.png';
import event2Image from './image/event2.png';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const userData = await AsyncStorage.getItem('userData');
            if (token && userData) {
              console.log('Stored Token:', token);
              console.log('Stored userData:', userData);
            } else {
              console.log('No token found');
            }
          } catch (error) {
            console.error('Error retrieving token:', error);
          }
        }}>
          <Icon name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>트립팅</Text>
        <TouchableOpacity onPress={() => navigation.navigate('User')}>
          <IconAnt name="user" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* 배너 섹션 */}
      <View style={styles.bannerContainer}>
        <Image
          source={event1Image}
          style={styles.bannerImage}
        />
        <Text style={styles.bannerText}>아트밸리 아산 제3회 신정호 국제 아트페스티벌</Text>
        </View>

      {/* 행사 D-day 섹션 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>행사 D-day</Text>
        <Icon name="arrow-forward" size={20} color="black" />
      </View>
      <ScrollView style={styles.eventList}>
        <View style={styles.eventItem}>
          <Image
            source={event1Image}
            style={styles.eventImage}
          />
          <View style={styles.eventDescription}>
            <Text style={styles.eventTextTitle}>신정호 국제 아트페스티벌 100인 100작</Text>
            <Text style={styles.eventTextDetail}>생성형 AI 작품 공유 전시</Text>
          </View>
        </View>
        {/**/}
        <View style={styles.eventItem}>
          <Image
            source={event2Image}
            style={styles.eventImage}
          />
          <View style={styles.eventDescription}>
            <Text style={styles.eventTextTitle}>아트밸리 아산 제2회 재즈페스티벌</Text>
            <Text style={styles.eventTextDetail}>자연과 함께하는 재즈 음악 축제</Text>
          </View>
        </View>
      </ScrollView>

      {/* 일정 섹션 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>설정 된 일정</Text>
        <Icon name="arrow-forward" size={20} color="black" />
      </View>
      <View style={styles.scheduleList}>
        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleText}>
            아트밸리 아산 제23회 외암민속마을
          </Text>
          <Icon name="check-box" size={24} color="#6e6e6e" />
        </View>
        <View style={styles.scheduleItem}>
          <Text style={styles.scheduleText}>
            아트밸리 아산 제2회 재즈페스티벌 with 자연
          </Text>
          <Icon name="check-box-outline-blank" size={24} color="#6e6e6e" />
        </View>
      </View>
      {/* 하단 네비게이션 바 */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bannerContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginTop: 20,
    padding: 15,
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  bannerText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  moreText: {
    marginTop: 5,
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  eventList: {
    marginBottom: 20,
    paddingHorizontal: 0,
    paddingHorizontal: 20,
  },
  eventItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  eventDescription: {
    flex: 1,
    marginLeft: 15,
  },
  eventTextTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventTextDetail: {
    fontSize: 14,
    color: '#777',
  },
  scheduleList: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  scheduleText: {
    fontSize: 16,
    color: '#333',
  },
});
