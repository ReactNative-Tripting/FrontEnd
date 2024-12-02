import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';

export default function EventDetail({ route, navigation }) {
  // route.params로 전달된 데이터 받아오기
  const { eventData } = route.params; // MainScreen에서 전달한 eventData

  return (
 
    <View style={styles.container}>
    
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>이벤트 상세</Text>
      <TouchableOpacity>
        <Icon  size={28} color="black" />
      </TouchableOpacity>
    </View>

      {/* 이벤트 상세 정보 표시 */}
      <View style={styles.eventcontainer}>
        <Image source={{ uri: eventData.firstimage }} style={styles.eventImage} />
        <Text style={styles.eventTitle}>{eventData.title}</Text>
        <Text style={styles.eventDetail}>행사 시작일 : {eventData.eventstartdate}</Text>
        <Text style={styles.eventDetail}>행사 종료일 : {eventData.eventenddate}</Text>
        <Text style={styles.eventDetail}>행사 관련 전화번호 : {eventData.tel}</Text>
        <Text style={styles.eventDetail}>행사 위치 : {eventData.eventadress}</Text>
      </View>
      <BottomNavigation navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  eventcontainer:{
    flex:1,
    padding:20
  },
  eventImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  eventDetail: {
    fontSize: 16,
    color: '#777',
    marginVertical: 5,
  },
});
