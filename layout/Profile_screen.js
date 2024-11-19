import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';

const UserProfileScreen = ({ navigation }) => {
  // 예시 user 데이터 (null일 경우)
  const user = {
    name: '홍길동',
    email: 'hong@example.com',
    joinDate: '2023-06-01',
  }; // 실제 사용자 데이터로 대체

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconAnt name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Icon */}
      <View style={styles.iconContainer}>
        <IconAnt name="user" size={100} color="black" />
      </View>

      {/* User Info */}
      {user ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userJoinDate}>가입일: {user.joinDate}</Text>
        </View>
      ) : (
        <Text style={styles.noUserText}>유저 정보가 없습니다.</Text>
      )}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
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
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
  },
  userJoinDate: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  noUserText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#FF5733',
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
