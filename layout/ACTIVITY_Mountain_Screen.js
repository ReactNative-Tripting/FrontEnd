import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder, Dimensions, Image } from 'react-native';

export default function HealingScreen() {
  const [selectedTab, setSelectedTab] = useState('산책'); // 현재 선택된 탭 상태 관리
  const screenHeight = Dimensions.get('window').height; // 화면 높이를 가져옴
  const slideAnim = useRef(new Animated.Value(0)).current; // 슬라이딩 애니메이션 값 (0에서 시작)
  const [checkedItems, setCheckedItems] = useState([false, false, false, false]); // 각 레이스 항목에 대한 체크 상태 관리

  // PanResponder 생성
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // 슬라이드 애니메이션 값 업데이트 (드래그하는 위치에 따라)
        slideAnim.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        let finalPosition = slideAnim._value;

        // 최종 위치가 너무 위나 아래로 가지 않도록 제한
        if (finalPosition < -screenHeight + 200) {
          finalPosition = -screenHeight + 200; // 너무 위로 올라가지 않도록 제한
        } else if (finalPosition > 0) {
          finalPosition = 0; // 화면 하단을 넘지 않도록
        }

        // 패널을 드래그가 끝난 위치에서 멈춤
        Animated.timing(slideAnim, {
          toValue: finalPosition,
          duration: 200,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const raceData = [
    {
      title: '미니 마라톤',
      description: '온양온천의 주요 명소를 연결하는 미니 마라톤 레이스입니다.',
      image: require('./image/event1.png'),
    },
    {
      title: '온천열차 레이스',
      description: '온양온천역에서 출발하는 열차를 타고 지정된 명소에 도착하세요.',
      image: require('./image/event1.png'),
    },
    {
      title: '온천 역사 퀴즈 레이스',
      description: '온양박물관, 현충사 등을 지나며 퀴즈를 풉니다.',
      image: require('./image/event1.png'),
    },
    {
      title: '온천 보트 레이싱',
      description: '신정호수에서 소형 보트를 타고 경쟁하는 레이스!',
      image: require('./image/event1.png'),
    },
  ];

  const handleCheckBoxToggle = (index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <View style={styles.container}>
      {/* 전체 화면을 차지하는 지도 배경 */}
      <View style={styles.mapContainer}>
        <Text style={styles.title}>일정 설정</Text>
        <View style={styles.mapSpace}>
          {/* 지도가 들어갈 공간 */}
        </View>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>시작</Text>
        </TouchableOpacity>
      </View>

      {/* 슬라이딩 패널 섹션 */}
      <Animated.View
        style={[
          styles.slidingPanel,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* 드래그 핸들 */}
        <View style={styles.handleContainer}>
          <View style={styles.handleBar} />
        </View>

        {/* 힐링 탭 */}
        <View style={styles.tabsContainerSingle}>
          <TouchableOpacity style={styles.tabButtonSingle}>
            <Text style={styles.tabTextSingle}>힐링</Text>
          </TouchableOpacity>
        </View>

        {/* 레이스 리스트 */}
        <View style={styles.raceList}>
          {raceData.map((race, index) => (
            <View key={index} style={styles.raceItem}>
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
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
  },
  mapSpace: {
    width: '90%',
    height: '80%',
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#A6D8FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slidingPanel: {
    position: 'absolute',
    bottom: -370,
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
    marginBottom: 10,
  },
  handleBar: {
    width: 80,
    height: 8,
    backgroundColor: '#888',
    borderRadius: 4,
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
    marginTop: 10,
  },
  raceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  raceImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25, // 이미지 둥글게
  },
  raceTextContainer: {
    flex: 1,
  },
  raceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  raceDescription: {
    marginTop: 5,
    color: '#777',
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#A6D8FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  checkedBox: {
    width: 16,
    height: 16,
    backgroundColor: '#A6D8FF',
    borderRadius: 2,
  },
});
