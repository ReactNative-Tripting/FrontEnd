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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  infoContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 20,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FF4D4D',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
