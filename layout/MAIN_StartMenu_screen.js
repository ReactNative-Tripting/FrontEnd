import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const menuItems = [
  { id: '1', label: '레이싱 개인', image: require('./image/racing_p.png') },
  { id: '2', label: '레이싱 단체', image: require('./image/racing_t.png') },
  { id: '3', label: '힐링', image: require('./image/healing.png') },
  { id: '4', label: '교육', image: require('./image/educating.png') },
  { id: '5', label: '먹거리', image: require('./image/eating.png') },
  { id: '6', label: '산책', image: require('./image/tracking.png') },
  { id: '7', label: '사용자 설정', image: require('./image/editing.png') },
];

const StartMenuScreen = ({ navigation }) => {
  const [isIndividualModalVisible, setIndividualModalVisible] = useState(false);
  const [isTeamModalVisible, setTeamModalVisible] = useState(false);
  const [joinRoomCode, setJoinRoomCode] = useState('');
  const [userId, setUserId] = useState('');

  // 사용자 데이터 로딩
  useEffect(() => {
    fetchUserDataFromStorage();
  }, []);

  const fetchUserDataFromStorage = async () => {
    try {
      // 각 값 가져오기
      const id = await AsyncStorage.getItem('userId');
      
      // userId가 없을 경우를 대비하여 기본값 설정
      setUserId(id || 'unknown123');  // userId가 없으면 'unknown123'로 설정
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('오류', '사용자 데이터를 불러오는 중 문제가 발생했습니다.');
    }
  };

  // 메뉴 아이템 클릭 처리
  const handleMenuPress = (item) => {
    if (item.id === '1') {
      setIndividualModalVisible(true);
    } else if (item.id === '2') {
      setTeamModalVisible(true);
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

  // 개인 방 생성 버튼 처리 (백엔드 호출)
  const handleCreateIndividualRoom = async () => {
	try {
	  const response = await fetch('http://localhost:8080/rooms/create', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		  roomName: 'Test Room',
		  userId: userId, // userId 전달
		}),
	  });
  
	  if (response.ok) {
		const data = await response.json();
		console.log('방 생성 성공:', data);
		
		setIndividualModalVisible(false);
  
		// RoomP 화면으로 이동하며 데이터 전달
		navigation.navigate('RoomP', {
		  roomCode: data.inviteCode,
		  roomName: data.roomName,
		  members: data.members,
		});
	  } else {
		const error = await response.json();
		console.error('방 생성 실패:', error);
		alert(`방 생성 실패: ${error.message || '알 수 없는 오류'}`);
	  }
	} catch (error) {
	  console.error('네트워크 오류:', error);
	  alert('방 생성 중 네트워크 오류가 발생했습니다.');
	}
  };
  
  // 팀 방 생성 버튼 처리 (백엔드 호출)
  const handleCreateTeamRoom = async () => {
    try {
      const response = await fetch('http://localhost:8080/rooms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: '팀 레이싱 방', // 필요하면 동적으로 설정 가능
          userId: userId, // userId 전달
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('방 생성 성공:', data);

        setTeamModalVisible(false);

        // RoomT 화면으로 이동하며 데이터 전달
        navigation.navigate('RoomT', {
          roomCode: data.inviteCode,
          roomName: data.roomName,
          members: data.members,
        });
      } else {
        const error = await response.json();
        console.error('방 생성 실패:', error);
        alert(`방 생성 실패: ${error.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      alert('방 생성 중 네트워크 오류가 발생했습니다.');
    }
  };

  // 참가 버튼 처리
  const handleJoinRoom = async (roomType) => {
    if (!joinRoomCode) {
      alert("참가 코드를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/rooms/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId || '', // userId가 undefined일 경우 빈 문자열로 처리
          inviteCode: joinRoomCode,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // 방 이름 및 멤버 정보를 로그에 출력 (디버깅용)
        console.log('방 입장 성공:', data);

        const destination = roomType === 'individual' ? 'RoomP' : 'RoomT';
        setIndividualModalVisible(false);
        setTeamModalVisible(false);

        // 방 화면으로 이동하며 데이터 전달
        navigation.navigate(destination, {
          roomCode: data.inviteCode,
          roomName: data.roomName,
          members: data.members,
        });
      } else {
        const error = await response.json();
        console.error('방 입장 실패:', error);
        alert(`방 입장 실패: ${error.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      alert('방 입장 중 네트워크 오류가 발생했습니다.');
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

			{/* Individual Racing Modal */}
			<Modal
				visible={isIndividualModalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setIndividualModalVisible(false)}
			>
				<View style={commonStyles.modalOverlay}>
					<View style={commonStyles.modalContainer}>
						<Text style={commonStyles.modalTitle}>개인 레이싱 옵션</Text>

						<TouchableOpacity style={commonStyles.modalButton} onPress={handleCreateIndividualRoom}>
							<Text style={commonStyles.modalButtonText}>방 만들기</Text>
						</TouchableOpacity>

						<TextInput
							style={commonStyles.input}
							placeholder="참가 코드 입력"
							value={joinRoomCode}
							onChangeText={setJoinRoomCode}
							keyboardType="numeric"
						/>
						<TouchableOpacity style={commonStyles.modalButton} onPress={() => handleJoinRoom('individual')}>
							<Text style={commonStyles.modalButtonText}>방 참가</Text>
						</TouchableOpacity>

						<TouchableOpacity style={commonStyles.modalButton} onPress={() => setIndividualModalVisible(false)}>
							<Text style={commonStyles.modalButtonText}>닫기</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			{/* Team Racing Modal */}
			<Modal
				visible={isTeamModalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setTeamModalVisible(false)}
			>
				<View style={commonStyles.modalOverlay}>
					<View style={commonStyles.modalContainer}>
						<Text style={commonStyles.modalTitle}>팀 레이싱 옵션</Text>

						<TouchableOpacity style={commonStyles.modalButton} onPress={handleCreateTeamRoom}>
							<Text style={commonStyles.modalButtonText}>방 만들기</Text>
						</TouchableOpacity>

						<TextInput
							style={commonStyles.input}
							placeholder="참가 코드 입력"
							value={joinRoomCode}
							onChangeText={setJoinRoomCode}
							keyboardType="numeric"
						/>
						<TouchableOpacity style={commonStyles.modalButton} onPress={() => handleJoinRoom('team')}>
							<Text style={commonStyles.modalButtonText}>방 참가</Text>
						</TouchableOpacity>

						<TouchableOpacity style={commonStyles.modalButton} onPress={() => setTeamModalVisible(false)}>
							<Text style={commonStyles.modalButtonText}>닫기</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			{/* Bottom Navigation */}
			<BottomNavigation navigation={navigation}/>
		</View>
	);
};

export default StartMenuScreen;
