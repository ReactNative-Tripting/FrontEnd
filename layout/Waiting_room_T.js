import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import commonStyles from './components/Style';

const TeamWaitingRoom = () => {
  const [selectedTeam, setSelectedTeam] = useState('Team A');
  const [teams, setTeams] = useState({
    'Team A': [{ id: 1, name: '소리' }, { id: 2, name: '새롬' }],
    'Team B': [],
    'Team C': [],
    'Team D': [],
  });

  const handleRemoveMember = (team, memberId) => {
    setTeams(prevTeams => ({
      ...prevTeams,
      [team]: prevTeams[team].filter(member => member.id !== memberId),
    }));
  };

  const handleJoinTeam = () => {
    // Logic to join a team
  };

  const handleDeleteTeam = () => {
    // Logic to delete a team
  };

  return (
    <View style={styles.container}>
      {/* Team Tabs */}
      <View style={styles.tabs}>
        {Object.keys(teams).map(team => (
          <TouchableOpacity
            key={team}
            style={[styles.tab, selectedTeam === team && styles.activeTab]}
            onPress={() => setSelectedTeam(team)}
          >
            <Text style={styles.tabText}>{team}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Team Members List */}
      <FlatList
        data={teams[selectedTeam]}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text style={styles.memberText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveMember(selectedTeam, item.id)}>
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Action Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleJoinTeam}>
        <Text style={styles.buttonText}>참가하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDeleteTeam}>
        <Text style={styles.buttonText}>팀 삭제</Text>
      </TouchableOpacity>
      
      {/* Start Button */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const IndividualWaitingRoom = () => {
  const [individuals, setIndividuals] = useState([
    { id: 1, name: '민석' },
    { id: 2, name: '노을' },
    { id: 3, name: '하늘' },
  ]);

  const handleRemoveIndividual = (id) => {
    setIndividuals(prevIndividuals => prevIndividuals.filter(ind => ind.id !== id));
  };

  const handleInvite = () => {
    // Logic to invite more participants
  };

  return (
    <View style={styles.container}>
      {/* Individuals List */}
      <FlatList
        data={individuals}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text style={styles.memberText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveIndividual(item.id)}>
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Action Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleInvite}>
        <Text style={styles.buttonText}>초대하기</Text>
      </TouchableOpacity>

      {/* Start Button */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
  },
  activeTab: {
    borderBottomColor: '#8E24AA',
  },
  tabText: {
    color: '#8E24AA',
    fontWeight: 'bold',
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#F3E5F5',
  },
  memberText: {
    fontSize: 16,
    color: '#333',
  },
  removeText: {
    color: 'red',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#B3E5FC',
    padding: 12,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#64B5F6',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { TeamWaitingRoom, IndividualWaitingRoom };
