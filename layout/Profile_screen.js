import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '홍길동',
    id: 'hong123',
    email: 'hong@example.com',
    points: 1200,
    joinDate: '2023-06-01',
    profileImage: null,
    name: '',
    id: '',

  });

  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // 사용자 정보 가져오기
  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // 응답이 200이 아닌 경우, 오류 메시지 출력
        const errorData = await response.json();
        console.error('Error response:', errorData);
        Alert.alert('오류', '사용자 정보를 불러오는 중 오류가 발생했습니다.');
        return;
      }

      const data = await response.json();
      console.log('User data fetched:', data);  // 성공적으로 받은 사용자 데이터
      setUser({
        name: data.name,
        id: data.id,
        });
    } catch (error) {
      console.error('Error fetching user data:', error); // catch 된 에러 콘솔에 출력
      Alert.alert('오류', '서버와의 통신 중 문제가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    const getTokenAndFetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          console.log('Token retrieved:', token); // 토큰이 성공적으로 로드되었을 때
          fetchUserData(token); // 토큰이 있으면 사용자 정보 불러오기
        } else {
          console.log('No token found, redirecting to login'); // 토큰이 없으면 로그인 화면으로 이동
          Alert.alert('로그인 필요', '로그인이 필요합니다.');
          navigation.replace('Login'); // 로그인 화면으로 이동
        }
      } catch (error) {
        console.error('Error retrieving token from AsyncStorage:', error); // AsyncStorage에서 토큰을 가져오는 중 에러가 발생한 경우
        Alert.alert('오류', '토큰을 가져오는 중 오류가 발생했습니다.');
      }
    };

    getTokenAndFetchData();
  }, [navigation]);

  // 프로필 이미지 변경
  const handleImageChange = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Image picker cancelled');
        Alert.alert('취소됨', '이미지 선택이 취소되었습니다.');
      } else if (response.errorCode) {
        console.error('Image picker error:', response.errorMessage); // 이미지 선택 중 오류 발생
        Alert.alert('오류', `이미지를 불러오는 중 오류가 발생했습니다: ${response.errorMessage}`);
      } else if (response.assets) {
        const source = { uri: response.assets[0].uri };
        console.log('Image selected:', source); // 선택된 이미지 URI 출력
        setUser({ ...user, profileImage: source });
      }
    });
  };

  // 프로필 이미지 초기화
  const handleImageReset = () => {
    setUser({ ...user, profileImage: null });
    Alert.alert('초기화 완료', '프로필 이미지가 초기화되었습니다.');
  };

  if (loading) {
    return <Text>로딩 중...</Text>; // 로딩 중일 때 표시할 UI
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

      {/* Profile Image */}
      <View style={styles.iconContainer}>
        {user.profileImage ? (
          <Image source={user.profileImage} style={styles.profileImage} />
        ) : (
          <IconAnt name="user" size={100} color="black" />
        )}
        <TouchableOpacity style={styles.imageButton} onPress={handleImageChange}>
          <Text style={styles.imageButtonText}>이미지 변경</Text>
        </TouchableOpacity>
        {user.profileImage && (
          <TouchableOpacity style={styles.imageButton} onPress={handleImageReset}>
            <Text style={styles.imageButtonText}>이미지 초기화</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userId}>아이디: {user.id}</Text>
        <Text style={styles.userEmail}>이메일: {user.email}</Text>
        <Text style={styles.userPoints}>보유 포인트: {user.points} P</Text>
        <Text style={styles.userJoinDate}>가입일: {user.joinDate}</Text>
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
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  imageButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 14,
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
