import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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

const StartMenuScreen = ({navigation}) => {
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
					<TouchableOpacity key={item.id} style={commonStyles.menuItem}>
						<Image source={item.image } style={commonStyles.menuImage} />
						<View style={commonStyles.labelContainer}>
							<Text style={commonStyles.menuLabel}>{item.label}</Text>
						</View>
					</TouchableOpacity>
				))}
			</View>

		{/* Bottom Navigation */}
			<View style={commonStyles.bottomNavContainer}>
  	    <BottomNavigation navigation={navigation} />
 	   	</View>

		</View>
	);
};

export default StartMenuScreen;