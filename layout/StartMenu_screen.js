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

const StartMenuScreen = () => {
return (
<View style={styles.container}>
{/* Header */}
<View style={styles.header}>
<MaterialIcons name="menu" size={24} color="black" />
<Text style={styles.headerTitle}>일정 선택</Text>
<MaterialIcons name="search" size={24} color="black" />
</View>

{/* Menu Items */}
<View style={styles.menuContainer}>
{menuItems.map(item => (
<TouchableOpacity key={item.id} style={styles.menuItem}>
<Image source={{ uri: item.image }} style={styles.menuImage} />
<View style={styles.labelContainer}>
<Text style={styles.menuLabel}>{item.label}</Text>
</View>
</TouchableOpacity>
))}
</View>

{/* Bottom Navigation */}
<View style={styles.bottomNav}>
<TouchableOpacity style={styles.navItem}>
<MaterialIcons name="home" size={24} color="black" />
<Text style={styles.navText}>메인화면</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.navItem}>
<MaterialIcons name="map" size={24} color="black" />
<Text style={styles.navText}>미션</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.navItem}>
<MaterialIcons name="add-circle-outline" size={24} color="black" />
<Text style={styles.navText}>추가</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.navItem}>
<MaterialIcons name="event" size={24} color="black" />
<Text style={styles.navText}>행사</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.navItem}>
<MaterialIcons name="store" size={24} color="black" />
<Text style={styles.navText}>상점</Text>
</TouchableOpacity>
</View>
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#FFFFFF',
},
header: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
paddingHorizontal: 16,
paddingVertical: 10,
borderBottomWidth: 1,
borderBottomColor: '#E0E0E0',
},
headerTitle: {
fontSize: 18,
fontWeight: 'bold',
},
menuContainer: {
flex: 1,
paddingHorizontal: 16,
paddingTop: 20,
},
menuItem: {
flexDirection: 'row',
alignItems: 'center',
backgroundColor: '#B3E5FC',
borderRadius: 8,
marginVertical: 8,
overflow: 'hidden',
},
menuImage: {
width: 80,
height: 80,
resizeMode: 'cover',
},
labelContainer: {
flex: 1,
padding: 16,
},
menuLabel: {
fontSize: 18,
color: '#FFFFFF',
fontWeight: 'bold',
},
bottomNav: {
flexDirection: 'row',
justifyContent: 'space-around',
paddingVertical: 10,
borderTopWidth: 1,
borderTopColor: '#E0E0E0',
},
navItem: {
alignItems: 'center',
},
navText: {
fontSize: 10,
marginTop: 4,
},
});

export default StartMenuScreen;