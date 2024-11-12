import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import commonStyles from './components/Style';
const MissionDetail = () => {
  const route = useRoute();
  const { missionId } = route.params; // 미션 아이디를 받아옵니다.

  return (
    <View style={commonStyles.container}>
        <View style={commonStyles.header}/>
      <Text style={commonStyles.title}>미션 {missionId} 세부 내용</Text>
      {/* 여기에 미션 ID에 맞는 세부 정보를 추가합니다 */}
    </View>
  );
};


export default MissionDetail;
