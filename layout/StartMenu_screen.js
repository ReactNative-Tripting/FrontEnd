import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';

// 메뉴 아이템 배열 정의
const menuItems = [
  { id: '1', label: '레이싱 개인', image: require('./image/racing_p.png') },
  { id: '2', label: '레이싱 단체', image: require('./image/racing_t.png') },
  { id: '3', label: '힐링', image: require('./image/healing.png') },
  { id: '4', label: '교육', image: require('./image/educating.png') },
  { id: '5', label: '먹거리', image: require('./image/eating.png') },
  { id: '6', label: '산책', image: require('./image/tracking.png') },
  { id: '7', label: '사용자 설정', image: require('./image/editing.png') },
];

const generateRoomCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const StartMenuScreen = ({ navigation }) => {
  const [isRacingModalVisible, setRacingModalVisible] = useState(false);
  const [joinRoomCode, setJoinRoomCode] = useState('');

  const handleMenuPress = (item) => {
    if (item.id === '1' || item.id === '2') {
      setRacingModalVisible(true);
    } else if (item.id === '3') {
      navigation.navigate('Healing');
    } else if (item.id === '4') {
      navigation.navigate('Education');
    } else if (item.id === '5') {
      navigation.navigate('Food');
    } else if (item.id === '6') {
      navigation.navigate('Mountain');
    } else if (item.id === '7') {
      navigation.navigate('UserSettings');
    } else {
      console.log(`${item.label} 클릭됨`);
    }
  };

  const handleCreateRoom = () => {
    const roomCode = generateRoomCode();
    setRacingModalVisible(false);
    navigation.navigate('Room', { roomCode });
  };

  const handleJoinRoom = () => {
    if (joinRoomCode) {
      setRacingModalVisible(false);
      navigation.navigate('Room', { roomCode: joinRoomCode });
    } else {
      alert("참가 코드를 입력해주세요.");
    }
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <Icon name="menu" size={24} color="black" />
        <Text style={commonStyles.headerTitle}>일정 선택</Text>
        <Icon name="search" size={24} color="black" />
      </View>

      {/* Menu Items */}
      <View style={commonStyles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={commonStyles.menuItem}
            onPress={() => handleMenuPress(item)}
          >
            <Image source={item.image} style={commonStyles.menuImage} />
            <View style={commonStyles.labelContainer}>
              <Text style={commonStyles.menuLabel}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Racing Modal */}
      <Modal
        visible={isRacingModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRacingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>레이싱 옵션</Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleCreateRoom}>
              <Text style={styles.modalButtonText}>방 만들기</Text>
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="참가 코드 입력"
              value={joinRoomCode}
              onChangeText={setJoinRoomCode}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleJoinRoom}>
              <Text style={styles.modalButtonText}>참가</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setRacingModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={commonStyles.bottomNavContainer}>
        <BottomNavigation navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
  },
  menuItem: {
    width: '40%',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  menuImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  labelContainer: {
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default StartMenuScreen;
