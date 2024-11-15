import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';

const menuItems = [
	{ id: '1', label: '레이싱 개인', image: require('./image/racing_p.png') },
	{ id: '2', label: '레이싱 단체', image: require('./image/racing_t.png') },
	{ id: '3', label: '힐링', image: require('./image/healing.png') },
	{ id: '4', label: '교육', image: require('./image/educating.png') },
	{ id: '5', label: '먹거리', image: require('./image/eating.png') },
	{ id: '6', label: '산책', image: require('./image/tracking.png') },
	{ id: '7', label: '사용자 설정', image: require('./image/editing.png') },
];

// 방 코드 생성 함수
const generateRoomCode = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

const StartMenuScreen = ({ navigation }) => {
	const [isIndividualModalVisible, setIndividualModalVisible] = useState(false);
	const [isTeamModalVisible, setTeamModalVisible] = useState(false);
	const [joinRoomCode, setJoinRoomCode] = useState('');

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

	// 개인 방 생성 버튼 처리
	const handleCreateIndividualRoom = () => {
		const roomCode = generateRoomCode();
		setIndividualModalVisible(false);
		navigation.navigate('RoomP', { roomCode });
	};

	// 팀 방 생성 버튼 처리
	const handleCreateTeamRoom = () => {
		const roomCode = generateRoomCode();
		setTeamModalVisible(false);
		navigation.navigate('RoomT', { roomCode });
	};

	// 참가 버튼 처리
	const handleJoinRoom = (roomType) => {
		if (joinRoomCode) {
			const destination = roomType === 'individual' ? 'RoomP' : 'RoomT';
			setIndividualModalVisible(false);
			setTeamModalVisible(false);
			navigation.navigate(destination, { roomCode: joinRoomCode });
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

			{/* Individual Racing Modal */}
			<Modal
				visible={isIndividualModalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setIndividualModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>개인 레이싱 옵션</Text>

						<TouchableOpacity style={styles.modalButton} onPress={handleCreateIndividualRoom}>
							<Text style={styles.modalButtonText}>방 만들기</Text>
						</TouchableOpacity>

						<TextInput
							style={styles.input}
							placeholder="참가 코드 입력"
							value={joinRoomCode}
							onChangeText={setJoinRoomCode}
							keyboardType="numeric"
						/>
						<TouchableOpacity style={styles.modalButton} onPress={() => handleJoinRoom('individual')}>
							<Text style={styles.modalButtonText}>참가</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.modalCloseButton} onPress={() => setIndividualModalVisible(false)}>
							<Text style={styles.modalCloseButtonText}>닫기</Text>
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
				<View style={styles.modalOverlay}>
					<View style={styles.modalContainer}>
						<Text style={styles.modalTitle}>팀 레이싱 옵션</Text>

						<TouchableOpacity style={styles.modalButton} onPress={handleCreateTeamRoom}>
							<Text style={styles.modalButtonText}>방 만들기</Text>
						</TouchableOpacity>

						<TextInput
							style={styles.input}
							placeholder="참가 코드 입력"
							value={joinRoomCode}
							onChangeText={setJoinRoomCode}
							keyboardType="numeric"
						/>
						<TouchableOpacity style={styles.modalButton} onPress={() => handleJoinRoom('team')}>
							<Text style={styles.modalButtonText}>참가</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.modalCloseButton} onPress={() => setTeamModalVisible(false)}>
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
});

export default StartMenuScreen;
