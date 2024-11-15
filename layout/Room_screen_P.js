import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';

const RoomScreenP = ({ route, navigation }) => {
    const { roomCode } = route.params;

    return (
        <View style={commonStyles.container}>
            {/* Header */}
            <View style={commonStyles.header}>
                <Icon name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                <Text style={commonStyles.headerTitle}>{roomCode}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RoomSettingsScreen')}>
                    <Icon name="settings" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <Text style={styles.title}>방에 입장했습니다!</Text>
            <Text style={styles.roomCode}>방 코드: {roomCode}</Text>

            {/* Participants List and other room features */}
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

export default RoomScreenP;
