import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';  // 공통 스타일 import

import event1Image from './image/event1.png';
import event2Image from './image/event2.png';

export default function MainScreen({ navigation }) {
  
  const carouselData = [ 
    {title: 'Event 1', image: event1Image},
    {title: 'Event 2', image: event2Image},
  ]
  
  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity>
          <Icon name="notifications" size={commonStyles.iconStyle.size} color={commonStyles.iconStyle.color} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>트립팅</Text>
        <TouchableOpacity>
          <Icon name="user" size={commonStyles.iconStyle.size} color={commonStyles.iconStyle.color} />
        </TouchableOpacity>
      </View>

      {/* Banner Section */}
      <View style={commonStyles.bannerContainer}>
        <Image source={event1Image} style={commonStyles.bannerImage} />
        <Text style={commonStyles.bannerText}>Banner Title</Text>
        <TouchableOpacity>
          <Text style={commonStyles.bannerLink}>더 보기</Text>
        </TouchableOpacity>
      </View>

      {/* Event Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={commonStyles.eventList}>
        {carouselData.map((item, index) => (
          <View key={index} style={commonStyles.eventCard}>
            <Image source={item.image} style={commonStyles.eventImage} />
            <Text style={commonStyles.eventText}>{item.title}</Text>      
          </View>
        ))}
      </ScrollView>

      {/* Scheduled Events Section */}
      <View style={commonStyles.scheduleList}>
        <View style={commonStyles.scheduleItem}>
          <Text style={commonStyles.scheduleText}>Scheduled Event 1</Text>
          <TouchableOpacity>
            <Icon name="check-box" size={24} color="#6e6e6e" />
          </TouchableOpacity>
        </View>

        <View style={commonStyles.scheduleItem}>
          <Text style={commonStyles.scheduleText}>Scheduled Event 2</Text>
          <TouchableOpacity>
            <Icon name="check-box-outline-blank" size={24} color="#6e6e6e" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
}
