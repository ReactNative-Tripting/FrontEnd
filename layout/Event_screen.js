// src/pages/EventsPage.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function EventsPage({ navigation }) {
  const [selected, setSelected] = useState('');

  return (
  	<View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
      	  <Icon name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>트립팅</Text>
        <TouchableOpacity>
          <Icon name="notifications" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Banner Section */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerTitle}>신정호 국제 아트페스티벌</Text>
        <Text style={styles.bannerSubtitle}>100일 100밤 | 디지털 아트대전</Text>
      </View>

      {/* Calendar */}
      <Calendar
        onDayPress={day => {
        	setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
        }}
        style={styles.calendar}
      />

    
      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Icon name="home" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity>
					<Icon name="map" size={30} color="black"/>
				</TouchableOpacity>

				<TouchableOpacity>
          <Icon name="add-circle" size={30} color="black" />
        </TouchableOpacity>
        
				<TouchableOpacity onPress={() => navigation.navigate('Event')}>
          <Icon name="event" size={30} color="black" />
        </TouchableOpacity>
        
				<TouchableOpacity>
          <Icon name="shopping-cart" size={30} color="black" />
        </TouchableOpacity>
        
			</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerContainer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#4c2874',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  calendar: {
    marginVertical: 16,
  },
  scheduleList: {
    paddingHorizontal: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  scheduleText: {
  	fontSize: 14,
    color: '#333',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff', 
    zIndex: 10, 
  },
});