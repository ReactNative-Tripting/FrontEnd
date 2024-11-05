import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MainScreen() {
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
        <Image source={require('./image/event1.png')} style={styles.bannerImage}/>
        <Text style={styles.bannerText}>Banner Title</Text>
        <TouchableOpacity>
            <Text style={styles.bannerLink}>더 보기</Text>
        </TouchableOpacity>
      </View>
    

      {/* Event Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventList}>
        <View style={styles.eventCard}>
          <Image source={require('./image/event1.png')} style={styles.eventImage} />
          <Text style={styles.eventText}>Event Title 1</Text>      
        </View>
      </ScrollView>

      {/* Scheduled Events Section */}
      <View style={styles.scheduleList}>
        <View style={styles.scheduleItem}>
            <Text style={styles.scheduleText}>Scheduled Event 1</Text>
            <TouchableOpacity>
                <Icon name="check-box" size={24} color="#6e6e6e" />
            </TouchableOpacity>
        </View>

            <View style={styles.scheduleItem}>
                <Text style={styles.scheduleText}>Scheduled Event 2</Text>
                <TouchableOpacity>
                    <Icon name="check-box-outline-blank" size={24} color="#6e6e6e" />
                </TouchableOpacity>
            </View>
        </View>


        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
            <TouchableOpacity>
                <Icon name="home" size={30} color="black" />
            </TouchableOpacity>
    
            <TouchableOpacity>
                <Icon name="add-circle" size={30} color="black" />
            </TouchableOpacity>
    
      <TouchableOpacity>
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
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bannerLink: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventList: {
    paddingHorizontal: 16,
  },
  eventCard: {
    width: 120,
    marginRight: 10,
  },
  eventImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  eventText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
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
  },
});
