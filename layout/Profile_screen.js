import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';

const UserProfileScreen = ({ navigation }) => {
  // 예시 user 데이터 (null일 경우)
  const user = null;  // 여기에 실제 데이터가 들어가면 값을 볼 수 있습니다.

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconAnt name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ width: 24 }} /> {/* Placeholder for spacing */}
      </View>

      {/* Profile Icon */}
      <View style={styles.iconContainer}>
        <IconAnt name="user" size={100} color="black" />
      </View>
      
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 20,
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
