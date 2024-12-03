import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Image, navigation, ScrollView} from 'react-native';
import KakaoMapsAPI from './API_KakaoMapsAPI';
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HealingScreen() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('교육');
  const [checkedItems, setCheckedItems] = useState([false, false, false, false]);
  const [isPanelVisible, setIsPanelVisible] = useState(false); // 패널 상태
  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(new Animated.Value(screenHeight - 80)).current; // 초기 위치 설정
  const [routesList, setRoutesList] = useState([]);

  useEffect(() => {
    getRoutes();
  }, []);

  const getRoutes = async () => {
    const routesResponse = await fetch('http://tripting.kro.kr/Tripting/routes/type?type=education', {
      method: 'GET',
    });

    const data = await routesResponse.json();
    setRoutesList(data);
  }

  // 체크박스 상태 관리
  const handleCheckBoxToggle = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  // 미션 저장 함수
  const handleConfirm = async () => {
    try {
      const selectedMissions = routesList.filter((_, index) => checkedItems[index]);
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

  const mapHtml = KakaoMapsAPI(routesList);

  return (
    <View style={styles.container}>
      {/* 전체 화면을 차지하는 지도 배경 */}
      <View style={styles.mapContainer}>
        <Text style={styles.title}>일정 설정</Text>
        <View style={styles.mapSpace}>
          <WebView
            source={{ html: mapHtml }}
          />
        </View>
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
          <TouchableOpacity style={styles.tabButtonSingle} onPress={() => {
            handleConfirm();
            navigation.replace('Mission');
          }}>
            <Text style={styles.tabTextSingle}>교육 일정 시작</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.raceList}>
          {routesList.map((routesList, index) => (
            <View key={routesList.id} style={styles.raceItem}>
              <Image source={{uri: routesList.url}} style={styles.raceImage} />
              <View style={styles.raceTextContainer}>
                <Text style={styles.raceTitle}>{routesList.name}</Text>
                <Text style={styles.raceDescription}>{routesList.info}</Text>
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
