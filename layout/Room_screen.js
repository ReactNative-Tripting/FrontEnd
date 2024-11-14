import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';

const RoomScreen = ({ route, navigation }) => {
	const { roomCode } = route.params;

	return (
        

		<View style={commonStyles.container}>
			
            <View style={commonStyles.header}>
				<Icon name="menu" size={24} color="black" />
				<Text style={commonStyles.headerTitle}>일정 선택</Text>
				<Icon name="search" size={24} color="black" />
			</View>
            
            <Text style={styles.title}>방에 입장했습니다!</Text>
			<Text style={styles.roomCode}>방 코드: {roomCode}</Text>

			{/* 참여자 리스트 및 기타 방 내 기능을 위한 영역 */}
			<View style={styles.roomContent}>
				<Text>참여자 리스트가 여기에 표시됩니다.</Text>
			</View>

			<Button title="나가기" onPress={() => navigation.goBack()} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	title: {
		fontSize: 24,
		marginBottom: 20,
	},
	roomCode: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 40,
	},
	roomContent: {
		width: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default RoomScreen;
