import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';
import AsyncStorage from '@react-native-async-storage/async-storage';  // AsyncStorage import

const RoomScreenP = ({ route, navigation }) => {
    const { roomCode } = route.params;  // roomCode는 다른 화면에서 전달되어야 합니다.
    const [userId, setUserId] = useState(null);  // userId 상태 관리
    const [participants, setParticipants] = useState([]);  // 참여자 리스트 상태 관리

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

    useEffect(() => {
        if (roomCode && userId) {
            // 방에 입장할 때 참여자 리스트 가져오기
            const fetchParticipants = async () => {
                try {
                    const response = await fetch(`http://tripting.kro.kr/Tripting/rooms/list?inviteCode=${roomCode}`);
                    if (response.ok) {
                        const data = await response.json();
                        setParticipants(data.members);  // 데이터에서 members 배열만 가져옴
                    } else {
                        console.error('참여자 리스트를 가져오는 중 오류 발생');
                        Alert.alert('참여자 리스트 오류', '참여자 리스트를 불러오는 중 문제가 발생했습니다.');
                    }
                } catch (error) {
                    console.error('네트워크 오류:', error);
                    Alert.alert('네트워크 오류', '참여자 리스트를 불러오는 중 문제가 발생했습니다.');
                }
            };

            fetchParticipants();  // 참여자 리스트 가져오기
        }
    }, [roomCode, userId]);

    const handleExitRoom = async () => {
        if (!userId) {
            Alert.alert('로그인 필요', '로그인 후 방을 나갈 수 있습니다.');
            return;
        }

        try {
            // 템플릿 리터럴을 사용하여 URL에 변수 삽입
            const response = await fetch(`http://tripting.kro.kr/Tripting/rooms/exit?inviteCode=${roomCode}&userId=${userId}`, {
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

    // 참여자 목록을 FlatList로 표시
    const renderParticipant = ({ item }) => (
        <View style={styles.participantItem}>
            <Text style={styles.participantText}>{item}</Text>  {/* 참가자 이름 표시 */}
        </View>
    );

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
            <Text style={styles.title}>방에ㅋ 입장했습니다!</Text>
            <Text style={styles.roomCode}>방 코드: {roomCode}</Text>

            {/* 참여자 리스트 표시 */}
            <FlatList
                data={participants}
                renderItem={renderParticipant}
                keyExtractor={(item, index) => index.toString()}  // 참여자 이름을 key로 사용 (여기서는 index 사용)
                ListEmptyComponent={<Text>참여자가 없습니다.</Text>}  // 참여자가 없을 경우 메시지 표시
            />

            <Button title="시작" onPress={navigation.navigate('UserSettings')}/>
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
    participantItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    participantText: {
        fontSize: 18,
        color: '#333',
    },
});

export default RoomScreenP;
