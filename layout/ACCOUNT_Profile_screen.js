import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

      // 값 출력 (디버깅용)
      console.log('Fetched user data from AsyncStorage:');
      console.log('Name:', name);
      console.log('ID:', id);
      console.log('Email:', email);
      console.log('Points:', points);

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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconAnt name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>프로필</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{user.name || '이름 없음'}</Text>
        <Text style={styles.userId}>아이디: {user.id || '아이디 없음'}</Text>
        <Text style={styles.userEmail}>이메일: {user.email || '이메일 없음'}</Text>
        <Text style={styles.userPoints}>보유 포인트: {user.points || 0} P</Text>
      </View>

      {/* Button to Storage */}
      <TouchableOpacity style={styles.storageButton} onPress={() => navigation.navigate('Storage')}>
        <Text style={styles.storageButtonText}>보관함으로 이동</Text>
      </TouchableOpacity>

      {/* Logout Button at the Bottom */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  userId: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  userPoints: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  userJoinDate: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  storageButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
  },
  storageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
