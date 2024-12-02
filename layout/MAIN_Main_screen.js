import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';

import event1Image from './image/event1.png';
import event2Image from './image/event2.png';

export default function MainScreen({ route, navigation }) {
  const eventLists = route.params.getEventList;
  const eventList = eventLists.map((event, index) => ({
    eventenddate: event.eventenddate,
    eventstartdate: event.eventstartdate,
    firstimage: event.firstimage,
    mapx: event.mapx,
    mpay: event.mpay,
    tel: event.tel,
    title: event.title,
    id: index.toString(),
  }));

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Image source={{uri: item.firstimage}} style={styles.eventImage} />
      <View style={styles.eventDescription}>
        <Text style={styles.eventTextTitle}>{item.title}</Text>
        <Text style={styles.eventTextDetail}>행사 시작일 : {item.eventstartdate}</Text>
        <Text style={styles.eventTextDetail}>행사 종료일 : {item.eventenddate}</Text>
        <Text style={styles.eventTextDetail}>행사 관련 전화번호 : {item.tel}</Text>
      </View>
    </View>
  );

  const renderBanner = () => (
    <View style={styles.eventItem}>
      <Swiper
        style={styles.swiperContainer}
        showsButtons={false}
        autoplay
        autoplayTimeout={5}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      >
        {eventList.map((event) => (
          <View key={event.id} style={styles.bannerItem}>
            <Image source={{ uri: event .firstimage }} style={styles.bannerImage} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Icon size={28} color="black"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>트립팅</Text>
        <TouchableOpacity onPress={() => navigation.navigate('User')}>
          <IconAnt name="user" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* 배너 섹션 */}
      {renderBanner()}


      {/* 행사 D-day 섹션 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>행사 List</Text>
      </View>
      <FlatList
        data={eventList}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventList}
      />
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
    height: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    marginTop: 0
  },
  bannerContainer: {
    width: '100%',
    height: 250,
  },
  swiperContainer: {
    height: 250,
  },
  bannerItem: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 250,
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
