import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';
import BottomNavigation from './components/BottomNavigation';

const MissionSelect = ({ route, navigation }) => {
  const getRoute = route.params;
  const missionname = getRoute.missionname;
  console.log("test",missionname);
  const [missionList, setMissionList] = useState([]);
  const [missionList2, setMissionList2] = useState([]);

  useEffect(() => {
    getMissionList();
  }, []);

  const getMissionList = async () => {
    const missionResponse = await fetch(`http://localhost:8080/Tripting/missions/miss?type=ocr&area=${missionname}`, {
      method: 'GET'
    });

    if(!missionResponse.ok) {
      console.log("요청 실패");
    }
    const data = await missionResponse.json();
    console.log("가져온 것 : ", data);
    setMissionList(data);

    const missionResponse2 = await fetch(`http://localhost:8080/Tripting/missions/miss?type=cus&area=${missionname}`, {
      method: 'GET'
    });

    if(!missionResponse2.ok) {
      console.log("요청 실패");
    }
    const data2 = await missionResponse2.json();
    console.log("2가져온 것 : ", data2);
    setMissionList2(data2);
  }

  return (
    <View style={commonStyles.container}>
      {/* 헤더 */}
      <View style={commonStyles.header}>
        <Icon name="menu" size={24} color="black" />
        <Text style={commonStyles.headerTitle}>미션</Text>
        <Icon name="search" size={24} color="black" />
      </View>

      {/* 미션 리스트 */}
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
        {missionList.length > 0 && missionList2.length > 0 ? (
          <>
            <TouchableOpacity style={commonStyles.navItem} onPress={() => {
                const sendMissionList = missionList;
                console.log(sendMissionList);
                navigation.navigate('MissionDetail', { missionname, sendMissionList });}}>
              <View style={commonStyles.missionLabelContainer}>
                <Text>{missionList[0].title}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.navItem} onPress={() => {
                const sendMissionList = missionList2;
                console.log('확인 : ', sendMissionList);
                navigation.navigate('MissionDetail', { missionname, sendMissionList });}}>
              <View style={commonStyles.missionLabelContainer}>
                <Text>{missionList2[0].title}</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <Text>미션 데이터 없음</Text>
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

export default MissionSelect;
