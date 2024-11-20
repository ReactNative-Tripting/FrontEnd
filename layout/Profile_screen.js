import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker'; // Use launchImageLibrary to select images

const UserProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: '홍길동',
    id: 'hong123',
    password: '********',
    email: 'hong@example.com',
    points: 1200,
    joinDate: '2023-06-01',
    profileImage: null, // Initially no profile image
  });

  // Function to handle the profile image change
  const handleImageChange = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: false, // Can set to true if you need base64 data
    };

    // Open the image picker
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        const source = { uri: response.assets[0].uri };
        setUser({ ...user, profileImage: source });
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconAnt name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Icon or Image */}
      <TouchableOpacity onPress={handleImageChange}>
        <View style={styles.iconContainer}>
          {/* Display profile image or default icon */}
          {user.profileImage ? (
            <Image source={user.profileImage} style={styles.profileImage} />
          ) : (
            <IconAnt name="user" size={100} color="black" />
          )}
        </View>
      </TouchableOpacity>

      {/* User Info */}
      {user ? (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userId}>아이디: {user.id}</Text>
          <Text style={styles.userEmail}>이메일: {user.email}</Text>
          <Text style={styles.userPoints}>보유 포인트: {user.points} P</Text>
          <Text style={styles.userJoinDate}>가입일: {user.joinDate}</Text>
        </View>
      ) : (
        <Text style={styles.noUserText}>유저 정보가 없습니다.</Text>
      )}

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
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
