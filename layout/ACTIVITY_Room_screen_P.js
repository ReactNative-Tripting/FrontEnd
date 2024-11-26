import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';  // AsyncStorage import

const RoomScreenP = ({ route, navigation }) => {
    const { roomCode } = route.params;  // roomCode는 다른 화면에서 전달되어야 합니다.
    const [userId, setUserId] = useState(null);  // userId 상태 관리

    useEffect(() => {
        // AsyncStorage에서 userId 가져오기
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId !== null) {
                    setUserId(storedUserId);  // userId가 존재하면 상태 업데이트
                }
            } catch (error) {
                console.error('AsyncStorage에서 userId를 가져오는 중 오류 발생:', error);
            }
        };

        fetchUserId();  // 컴포넌트 마운트 시 userId 가져오기
    }, []);

    const handleExitRoom = async () => {
        if (!userId) {
            Alert.alert('로그인 필요', '로그인 후 방을 나갈 수 있습니다.');
            return;
        }

        try {
            // 템플릿 리터럴을 사용하여 URL에 변수 삽입
            const response = await fetch(`http://localhost:8080/rooms/exit?inviteCode=${roomCode}&userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                if (response.status === 204) {
                    console.log('방을 성공적으로 나갔습니다.');
                } else {
                    const data = await response.json();
                    console.log('방 나가기 성공:', data);
                }
                navigation.goBack();
            } else {
                const error = await response.json();
                console.error('방 나가기 실패:', error);
                Alert.alert('방 나가기 실패', error.message || '알 수 없는 오류');
            }
        } catch (error) {
            console.error('네트워크 오류:', error);
            Alert.alert('네트워크 오류', '방을 나가는 중에 문제가 발생했습니다.');
        }
    };

    return (
        <View style={commonStyles.container}>
            {/* Header */}
            <View style={commonStyles.header}>
                <Icon name="arrow-back" size={24} color="black" onPress={handleExitRoom} />
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
            <Button title="시작" />
            {/* 방 나가기 버튼 */}
            <Button title="나가기" onPress={handleExitRoom} />
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
