import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image, navigation, ScrollView} from 'react-native';
import { html } from './API_KakaoMapsAPI';
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HealingScreen() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('푸드');
  const [checkedItems, setCheckedItems] = useState([false, false, false, false]);
  const [isPanelVisible, setIsPanelVisible] = useState(false); // 패널 상태
  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(new Animated.Value(screenHeight - 80)).current; // 초기 위치 설정

  const raceData = [
    {
      id: '1',
      title: '미니 마라톤',
      description: '온양온천의 주요 명소를 연결하는 미니 마라톤 레이스입니다.',
      image: require('./image/event1.png'),
    },
    {
      id: '2',
      title: '온천열차 레이스',
      description: '온양온천역에서 출발하는 열차를 타고 지정된 명소에 도착하세요.',
      image: require('./image/event1.png'),
    },
    {
      id: '3',
      title: '온천 역사 퀴즈 레이스',
      description: '온양박물관, 현충사 등을 지나며 퀴즈를 풉니다.',
      image: require('./image/event1.png'),
    },
    {
      id: '4',
      title: '온천 보트 레이싱',
      description: '신정호수에서 소형 보트를 타고 경쟁하는 레이스!',
      image: require('./image/event1.png'),
    },
  ];

  // 체크박스 상태 관리
  const handleCheckBoxToggle = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  // 미션 저장 함수
  const handleConfirm = async () => {
    try {
      const selectedMissions = raceData.filter((_, index) => checkedItems[index]);
      if (selectedMissions.length === 0) {
        alert('미션을 선택해주세요!');
        return;
      }

      await AsyncStorage.setItem('missions', JSON.stringify(selectedMissions));
      alert('선택된 미션이 저장되었습니다.');
    } catch (error) {
      console.error('미션 저장 오류:', error);
    }
  };

  // 패널 보이기/숨기기
  const togglePanel = () => {
    const toValue = isPanelVisible ? screenHeight - 80 : screenHeight - 400; // 위/아래 위치 설정
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsPanelVisible(!isPanelVisible); // 상태 토글
  };

  return (
    <View style={styles.container}>
      {/* 전체 화면을 차지하는 지도 배경 */}
      <View style={styles.mapContainer}>
        <Text style={styles.title}>일정 설정</Text>
        <View style={styles.mapSpace}>
          <WebView
            source={{ html: html }}
          />
        </View>
        <TouchableOpacity style={styles.startButton} onPress={() => {
          handleConfirm(); // 기존 함수 호출
          navigation.replace('Mission'); // 네비게이션 추가
        }}>
          <Text style={styles.startButtonText}>시작</Text>
        </TouchableOpacity>
      </View>

      {/* 슬라이딩 패널 섹션 */}
      <Animated.View
        style={[styles.slidingPanel, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.handleContainer}>
          <TouchableOpacity style={styles.panelToggleButton} onPress={togglePanel}/>
        </View>

        {/* 힐링 탭 */}
        <View style={styles.tabsContainerSingle}>
          <TouchableOpacity style={styles.tabButtonSingle}>
            <Text style={styles.tabTextSingle}>푸드</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.raceList}>
          {raceData.map((race, index) => (
            <View key={race.id} style={styles.raceItem}>
              <Image source={race.image} style={styles.raceImage} />
              <View style={styles.raceTextContainer}>
                <Text style={styles.raceTitle}>{race.title}</Text>
                <Text style={styles.raceDescription}>{race.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.checkBox}
                onPress={() => handleCheckBoxToggle(index)}
              >
                {checkedItems[index] && <View style={styles.checkedBox} />}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#FFFFFF' 
  },
  mapContainer: { 
    flex: 1, 
    backgroundColor: '#e6e6e6', 
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold', 
    marginTop: 40, 
    marginBottom: 10 
  },
  mapSpace: {
    width: '90%', 
    height: '75%', 
    backgroundColor: '#d3d3d3', 
    borderRadius: 10, 
    
  },
  startButton: {
    backgroundColor: '#A6D8FF', 
    padding: 12, 
    borderRadius: 25, 
    marginTop: 20,
    
  },
  startButtonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  slidingPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 400,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  handleContainer: { 
    alignItems: 'center', 
    marginBottom: 10 
  },
  panelToggleButton: {
    padding: 10,
    backgroundColor: '#CCCCCC',
    borderRadius: 20,
    alignSelf: 'center',
  },

  tabsContainerSingle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButtonSingle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
  },
  tabTextSingle: {
    color: '#000',
    fontWeight: 'bold',
  },
  raceList: { 
    marginTop: 10 
  },
  raceItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1 
  },
  raceImage: { 
    width: 50, 
    height: 50, 
    marginRight: 15 
  },
  raceTextContainer: { 
    flex: 1 
  },
  raceTitle: { 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  raceDescription: { 
    color: '#777' 
  },
  checkBox: { 
    width: 24, 
    height: 24, 
    borderWidth: 2, 
    borderColor: '#A6D8FF', 
    borderRadius: 4 
  },
  checkedBox: { 
    width: 16, 
    height: 16, 
    backgroundColor: '#A6D8FF', 
    borderRadius: 2 
  },
});
