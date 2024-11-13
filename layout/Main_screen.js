import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>트립팅</Text>
        <TouchableOpacity>
          <Icon name="notifications" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* 배너 섹션 */}
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://example.com/banner-image.jpg' }} // 실제 이미지 URL로 변경
          style={styles.bannerImage}
        />
        <Text style={styles.bannerText}>아트밸리 아산 제3회 신정호 국제 아트페스티벌</Text>
        <TouchableOpacity>
          <Text style={styles.moreText}>더 보기</Text>
        </TouchableOpacity>
      </View>

      {/* 행사 D-day 섹션 */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>행사 D-day</Text>
        <Icon name="arrow-forward" size={20} color="black" />
      </View>
      <ScrollView style={styles.eventList}>
        <View style={styles.eventItem}>
          <Image
            source={{ uri: 'https://example.com/event1.jpg' }} // 실제 이미지 URL로 변경
            style={styles.eventImage}
          />
          <View style={styles.eventDescription}>
            <Text style={styles.eventTextTitle}>신정호 국제 아트페스티벌 100인 100작</Text>
            <Text style={styles.eventTextDetail}>생성형 AI 작품 공유 전시</Text>
          </View>
        </View>
        <View style={styles.eventItem}>
          <Image
            source={{ uri: 'https://example.com/event2.jpg' }} // 실제 이미지 URL로 변경
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

      {/* 하단 네비게이션 */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={30} color="black" />
          <Text style={styles.navText}>메인화면</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="flag" size={30} color="black" />
          <Text style={styles.navText}>미션</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="add-circle" size={30} color="black" />
          <Text style={styles.navText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="event" size={30} color="black" />
          <Text style={styles.navText}>행사</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="store" size={30} color="black" />
          <Text style={styles.navText}>상점</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerContainer: {
    padding: 16,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  moreText: {
    color: '#888',
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventList: {
    paddingHorizontal: 16,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  eventImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  eventDescription: {
    flex: 2,
  },
  eventTextTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  eventTextDetail: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  scheduleList: {
    paddingHorizontal: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  scheduleText: {
    fontSize: 14,
    color: '#333',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
  },
});
