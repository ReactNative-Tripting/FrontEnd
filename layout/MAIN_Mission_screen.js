import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';  // 공통 스타일 import
//미션 아이템. 라벨은 제목, 아이디는 번호 순. 
const missionItems = [
  { id: '1', label: '미션 1' },
  { id: '2', label: '미션 2' },
  { id: '3', label: '미션 3' },
  { id: '4', label: '미션 4' },
  { id: '5', label: '미션 5' },
];

const MissionScreen = ({navigation}) => {
  const handleMissionPress = (missionId) => {
    navigation.navigate('MissionDetail', { missionId });
  };

  return (
    <View style={commonStyles.container}>
      {/* 헤더 */}
      <View style={commonStyles.header}>
        <Icon name="menu" size={24} color="black" />
        <Text style={commonStyles.headerTitle}>미션</Text>
        <Icon name="search" size={24} color="black" />
      </View>

      {/* 스크롤 가능한 컨테이너 */}
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
        {missionItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={commonStyles.missionItem}
            onPress={() => handleMissionPress(item.id)} // 미션 버튼을 누르면 해당 id을 지닌 missiondetal 스크린으로 들어가짐, 유저당 미션 아이디를 저장해 놓으면 됨.
          >
            <View style={commonStyles.missionLabelContainer}>
              <Text style={commonStyles.missionLabel}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 하단 네비게이션 바 */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
};
export default MissionScreen;
