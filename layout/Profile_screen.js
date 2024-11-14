import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserProfileScreen = ({ navigation }) => {
	// 유저 정보 예시
	const user = {
		name: '홍길동',
		email: 'hong@example.com',
		joinDate: '2023-01-01',
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>유저 프로필</Text>

			<View style={styles.infoContainer}>
				<Text style={styles.label}>이름:</Text>
				<Text style={styles.value}>{user.name}</Text>
			</View>

			<View style={styles.infoContainer}>
				<Text style={styles.label}>이메일:</Text>
				<Text style={styles.value}>{user.email}</Text>
			</View>

			<View style={styles.infoContainer}>
				<Text style={styles.label}>가입일:</Text>
				<Text style={styles.value}>{user.joinDate}</Text>
			</View>

			<TouchableOpacity style={styles.button} onPress={() => alert('프로필 편집')}>
				<Text style={styles.buttonText}>프로필 편집</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.button} onPress={() => alert('로그아웃')}>
				<Text style={styles.buttonText}>로그아웃</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f2f2f2',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	infoContainer: {
		flexDirection: 'row',
		marginVertical: 5,
	},
	label: {
		fontWeight: 'bold',
		marginRight: 10,
	},
	value: {
		color: '#333',
	},
	button: {
		marginTop: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: '#007BFF',
		borderRadius: 5,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
	},
});

export default UserProfileScreen;
