import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';  // 공통 스타일 import

const missionItems = [
  { id: '1', label: '미션 1' },
  { id: '2', label: '미션 2' },
  { id: '3', label: '미션 3' },
  { id: '4', label: '미션 4' },
  { id: '5', label: '미션 5' },
];

const MissionScreen = ({navigation}) => {
  const handleMissionPress = (missionId) => {
    navigation.navigate('MissionDetail', { missionId });
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <Icon name="menu" size={24} color="black" />
        <Text style={commonStyles.headerTitle}>미션</Text>
        <Icon name="search" size={24} color="black" />
      </View>

      {/* Scrollable Mission List */}
      <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
        {missionItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={commonStyles.missionItem}
            onPress={() => handleMissionPress(item.id)} // Navigate on press
          >
            <View style={commonStyles.missionLabelContainer}>
              <Text style={commonStyles.missionLabel}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
};
export default MissionScreen;
