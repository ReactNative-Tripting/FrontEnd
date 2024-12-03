import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from './components/Style';


const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '자료없음',
    id: '자료없음',
    email: 'noinfo@noinfo.com',
    points: 0,
  });

  const [loading, setLoading] = useState(true);

  // AsyncStorage에서 사용자 정보 불러오기
  const fetchUserDataFromStorage = async () => {
    try {
      // 각 값 가져오기
      const name = await AsyncStorage.getItem('username');
      const id = await AsyncStorage.getItem('userId');
      const email = await AsyncStorage.getItem('userEmail');
      const points = await AsyncStorage.getItem('userPoints');

      // 데이터가 없다면 기본값 설정
      setUser({
        name: name || '홍길동',
        id: id || 'unknown123',
        email: email || 'example@example.com',
        points: points ? parseInt(points, 10) : 0,
      });
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('오류', '사용자 데이터를 불러오는 중 문제가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDataFromStorage();
  }, []);

  if (loading) {
    return <Text>로딩 중...</Text>;
  }

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconAnt name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>프로필</Text>
        <Icon name="clear" size={24} color="white"/>
      </View>

      {/* User Info */}
      <View style={commonStyles.profilecontainer}>
      <View style={commonStyles.userInfoContainer}>
        <Text style={commonStyles.userName}>{user.name || '이름 없음'}</Text>
        <Text style={commonStyles.userId}>아이디: {user.id || '아이디 없음'}</Text>
        <Text style={commonStyles.userEmail}>이메일: {user.email || '이메일 없음'}</Text>
        <Text style={commonStyles.userPoints}>보유 포인트: {user.points || 0} P</Text>
      </View>

      {/* Button to Storage */}
      <TouchableOpacity style={commonStyles.storageButton} onPress={() => navigation.navigate('Storage')}>
        <Text style={commonStyles.storageButtonText}>보관함으로 이동</Text>
      </TouchableOpacity>

      {/* Logout Button at the Bottom */}
      <View style={commonStyles.footer}>
        <TouchableOpacity style={commonStyles.logoutButton} onPress={() => navigation.replace('Login')}>
          <Text style={commonStyles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      
        </View>
      </View>
    </View>
  );
};

export default UserProfileScreen;
