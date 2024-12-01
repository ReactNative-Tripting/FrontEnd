import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';
import BottomNavigation from './components/BottomNavigation';
import KakaoMapsAPI from './API_KakaoMapsAPI';
import { WebView } from 'react-native-webview';

const MissionSelect = ({ navigation }) => {
  const [missions, setMissions] = useState([]);
  const [newMissionLabel, setNewMissionLabel] = useState('');  // 추가할 미션 이름을 위한 상태
  const array = [
    {
      latlng: {
        latitude: "36.79876109631288",
        longitude: "127.07585238863194"
      },
      name: "공학관"
    },
    {
      latlng: {
        latitude: "36.7946574500278",
        longitude: "127.10436919388525"
      },
      name: "아산역"
    }
  ];

  const mapHtml = KakaoMapsAPI(array);
  console.log("test ", mapHtml);

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
        <View style={styles.mapContainer}>
          <Text style={styles.title}>일정 설정</Text>
          <View style={styles.mapSpace}>
            <WebView
              source={{ html: mapHtml }}
            />
          </View>
        </View>
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
