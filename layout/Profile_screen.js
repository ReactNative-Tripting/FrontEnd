import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '홍길동',
    id: 'hong123',
    email: 'hong@example.com',
    points: 1200,
    joinDate: '2023-06-01',
    profileImage: null,
  });

  // 프로필 이미지 변경
  const handleImageChange = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('취소됨', '이미지 선택이 취소되었습니다.');
      } else if (response.errorCode) {
        Alert.alert('오류', `이미지를 불러오는 중 오류가 발생했습니다: ${response.errorMessage}`);
      } else if (response.assets) {
        const source = { uri: response.assets[0].uri };
        setUser({ ...user, profileImage: source });
      }
    });
  };

  // 프로필 이미지 초기화
  const handleImageReset = () => {
    setUser({ ...user, profileImage: null });
    Alert.alert('초기화 완료', '프로필 이미지가 초기화되었습니다.');
  };

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
