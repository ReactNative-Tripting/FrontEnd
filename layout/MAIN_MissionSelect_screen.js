import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';
import BottomNavigation from './components/BottomNavigation';

const MissionSelect = ({ route, navigation }) => {
  const getRoute = route.params;
  const missionname = getRoute.missionname;
  const namename = missionname.name;
  const [missionList, setMissionList] = useState([]);
  const [missionList2, setMissionList2] = useState([]);

  useEffect(() => {
    getMissionList();
  }, []);

  const getMissionList = async () => {
    const missionResponse = await fetch(`http://localhost:8080/Tripting/missions/miss?type=ocr&area=${namename}`, {
      method: 'GET'
    });

    if(!missionResponse.ok) {
      console.log("요청 실패");
    }
    const data = await missionResponse.json();
    console.log("가져온 것 : ", data);
    setMissionList(data);

    const missionResponse2 = await fetch(`http://localhost:8080/Tripting/missions/miss?type=cus&area=${namename}`, {
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
        <Icon name="clear" size={24} color="white" />
        <Text style={commonStyles.headerTitle}>미션</Text>
        <Icon name="clear" size={24} color="white" />
      </View>
  
      {/* 미션 리스트 */}
      <ScrollView contentContainerStyle={styles.missionContainer}>
        {missionList.length > 0 && missionList2.length > 0 ? (
          <>
            <TouchableOpacity
              style={styles.missionButton}
              onPress={() => {
                const sendMissionList = missionList;
                console.log(sendMissionList);
                navigation.navigate('MissionDetail', { missionname, sendMissionList });
              }}
            >
              <Text style={styles.missionButtonText}>{missionList[0].title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.missionButton}
              onPress={() => {
                const sendMissionList = missionList2;
                console.log('확인 : ', sendMissionList);
                navigation.navigate('MissionDetail', { missionname, sendMissionList });
              }}
            >
              <Text style={styles.missionButtonText}>{missionList2[0].title}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noMissionsText}>미션 데이터 없음</Text>
        )}
      </ScrollView>
  
      {/* 하단 네비게이션 바 */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
  
};

const styles = StyleSheet.create({
  missionContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  missionButton: {
    width: '80%',
    paddingVertical: 20,
    marginVertical: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  missionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  noMissionsText: {
    fontSize: 16,
    color: '#999',
  },
});


export default MissionSelect;
