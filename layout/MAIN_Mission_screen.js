import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';
import BottomNavigation from './components/BottomNavigation';

const MissionScreen = ({ navigation }) => {
  const [missions, setMissions] = useState([]);
  const [newMissionLabel, setNewMissionLabel] = useState('');  // 추가할 미션 이름을 위한 상태

  // AsyncStorage에서 미션 데이터 로드
  const loadMissions = async () => {
    try {
      const storedMissions = await AsyncStorage.getItem('missions');
      const parsedMissions = storedMissions ? JSON.parse(storedMissions) : [];
      console.log('AsyncStorage에 저장된 미션:', parsedMissions);  // 로드된 미션 출력
      setMissions(parsedMissions);
    } catch (error) {
      console.error('미션 로드 중 오류:', error);
    }
  };

  // 미션 초기 데이터 저장 (처음 실행 시)
  const initializeMissions = async () => {
    const defaultMissions = [
      { id: '1', title: '미니 마라톤', description: '온양온천의 주요 명소를 연결하는 미니 마라톤 레이스입니다.', image: 1 },
      { id: '2', title: '온천열차 레이스', description: '온양온천역에서 출발하는 열차를 타고 지정된 명소에 도착하세요.', image: 1 },
      { id: '3', title: '온천 역사 퀴즈 레이스', description: '온양박물관, 현충사 등을 지나며 퀴즈를 풉니다.', image: 1 },
    ];
    try {
      const storedMissions = await AsyncStorage.getItem('missions');
      if (!storedMissions) {
        await AsyncStorage.setItem('missions', JSON.stringify(defaultMissions));
        setMissions(defaultMissions);
      } else {
        setMissions(JSON.parse(storedMissions));
      }
    } catch (error) {
      console.error('미션 초기화 중 오류:', error);
    }
  };

  // 새로운 미션을 AsyncStorage에 추가
  const addMission = async () => {
    if (!newMissionLabel.trim()) {
      Alert.alert('오류', '미션 이름을 입력해주세요.');
      return;
    }

    const newMission = {
      id: (missions.length + 1).toString(),
      title: newMissionLabel.trim(),  // title로 수정
      description: '새로운 미션 설명',
      image: 1,
    };

    try {
      const updatedMissions = [...missions, newMission];
      await AsyncStorage.setItem('missions', JSON.stringify(updatedMissions));
      setMissions(updatedMissions);
      setNewMissionLabel('');  // 미션 추가 후 입력 필드 초기화
    } catch (error) {
      console.error('미션 추가 중 오류:', error);
    }
  };

  useEffect(() => {
    loadMissions();  // 컴포넌트가 마운트될 때 미션 데이터 로드
  }, []);

  return (
    <View style={commonStyles.container}>
      {/* 헤더 */}
      <View style={commonStyles.header}>
        <TouchableOpacity>
          <Icon  size={28} color="black" />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>미션</Text>
        <TouchableOpacity>
          <Icon size={28} color="black" />
        </TouchableOpacity>
</View>

      {/* 미션 리스트 */}
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
        {missions.length === 0 ? (
          // 미션이 없을 경우 중앙에 회백색 메시지 출력
          <View style={styles.noMissionsContainer}>
            <Text style={styles.noMissionsText}>미션이 없습니다.</Text>
          </View>
        ) : (
          missions.map((mission) => (
            <TouchableOpacity
              key={mission.id}
              style={commonStyles.missionItem}
              onPress={() => navigation.navigate('MissionDetail', { missionId: mission.id })}
            >
              <View style={commonStyles.missionLabelContainer}>
                {/* 미션 제목을 mission.title로 출력 */}
                <Text style={commonStyles.missionLabel}>{mission.title}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* 하단 네비게이션 바 */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  addMissionContainer: {
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    paddingLeft: 10,
  },
  noMissionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noMissionsText: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
  },
});

export default MissionScreen;
