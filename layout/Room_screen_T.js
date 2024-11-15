import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';

const RoomScreenT = ({ route, navigation }) => {
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

            {/* Team Tabs */}
            <View style={styles.teamTabs}>
                {['팀 A', '팀 B', '팀 C', '팀 D'].map((team, index) => (
                    <TouchableOpacity key={index} style={[styles.tab, index === 0 && styles.activeTab]}>
                        <Text style={styles.tabText}>{team}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Team Participant List */}
            <View style={styles.participantList}>
                {['소리', '새롬'].map((name, index) => (
                    <View key={index} style={styles.participant}>
                        <View style={styles.participantIcon}>
                            <Text style={styles.participantInitial}>A</Text>
                        </View>
                        <Text style={styles.participantName}>{name}</Text>
                        <TouchableOpacity>
                            <Icon name="close" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Buttons for Actions */}
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>참가하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>팀 삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>일정 설정</Text>
                </TouchableOpacity>
            </View>

            {/* Start Button */}
            <TouchableOpacity style={styles.startButton}>
                <Text style={styles.startButtonText}>시작하기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    teamTabs: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 10,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#A6D8FF',
    },
    tabText: {
        fontSize: 16,
        color: '#000',
    },
    participantList: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    participant: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    participantIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#E6E0F8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    participantInitial: {
        color: '#000',
        fontWeight: 'bold',
    },
    participantName: {
        flex: 1,
        fontSize: 16,
    },
    actionButtons: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    actionButton: {
        backgroundColor: '#A6D8FF',
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    startButton: {
        backgroundColor: '#A6D8FF',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 20,
    },
    startButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RoomScreenT;
