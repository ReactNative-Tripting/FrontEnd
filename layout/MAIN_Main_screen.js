import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';

import event1Image from './image/event1.png';
import event2Image from './image/event2.png';

export default function MainScreen({ navigation }) {
  const eventList = [
    {
      id: '1',
      title: '신정호 국제 아트페스티벌 100인 100작',
      detail: '생성형 AI 작품 공유 전시',
      image: event1Image,
    },
    {
      id: '2',
      title: '아트밸리 아산 제2회 재즈페스티벌',
      detail: '자연과 함께하는 재즈 음악 축제',
      image: event2Image,
    },
    {
      id: '3',
      title: 'test',
      detail: 'test',
      image: event1Image,
    },
  ];

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Image source={item.image} style={styles.eventImage} />
      <View style={styles.eventDescription}>
        <Text style={styles.eventTextTitle}>{item.title}</Text>
        <Text style={styles.eventTextDetail}>{item.detail}</Text>
      </View>
    </View>
  );

  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <Swiper
        style={styles.swiperContainer}
        showsButtons={false}
        autoplay
        autoplayTimeout={5}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      >
        <View style={styles.bannerItem}>
          <Image source={event1Image} style={styles.bannerImage} resizeMode="cover" />
          <Text style={styles.bannerText}>
            아트밸리 아산 제3회 신정호 국제 아트페스티벌
          </Text>
        </View>
        <View style={styles.bannerItem}>
          <Image source={event2Image} style={styles.bannerImage} resizeMode="cover" />
          <Text style={styles.bannerText}>
            아트밸리 아산 제2회 재즈페스티벌
          </Text>
        </View>
      </Swiper>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Icon size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>트립팅</Text>
        <TouchableOpacity onPress={() => navigation.navigate('User')}>
          <IconAnt name="user" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* 배너 */}
      {renderBanner()}

      {/* 스크롤 뷰로 리스트 감싸기 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>행사 D-day</Text>
      
      </View>
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={eventList}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.eventList}
        />
      </ScrollView>

      {/* 하단 네비게이션 바 */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 2, // 헤더가 다른 요소들보다 위로 오도록 설정
    backgroundColor: '#fff',
    height: 60, // 헤더 고정 높이 설정
    },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    marginTop: 0 // 배너 아래로 스크롤 컨텐츠 시작
  },
  bannerContainer: {
    width: '100%',
    height: 250, // 배너 고정 크기 설정
  },
  swiperContainer: {
    height: 250, // 배너 높이 고정
  },
  bannerItem: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 250, // 배너 이미지 높이 고정
  },
  bannerText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
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
    paddingHorizontal: 2,
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
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: '#333',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});
