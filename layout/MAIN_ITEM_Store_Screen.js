import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
import commonStyles from './components/Style';  // 공통 스타일 import

const data = [
  { id: '1', name: '금위버섯', points: '5,000 포인트', image: require('./image/item1.png') },
  { id: '2', name: '배', points: '50,000 포인트', image: require('./image/item2.png') },
  { id: '3', name: '토마토', points: '39,000 포인트', image: require('./image/item3.png') },
  { id: '4', name: '캠벨포도', points: '15,000 포인트', image: require('./image/item4.png') },
  { id: '5', name: '블루베리', points: '16,000 포인트', image: require('./image/item5.png') },
  { id: '6', name: '외암 연엽주', points: '20,000 포인트', image: require('./image/item6.png') },
  { id: '7', name: '밥맛좋은 인주쌀', points: '36,000 포인트', image: require('./image/item7.jpg') },
  { id: '8', name: '보리쌀', points: '12,000 포인트', image: require('./image/item8.jpg') },
  { id: '9', name: '쌈채소', points: '20,000 포인트', image: require('./image/item9.jpg') },
  { id: '10', name: '노루궁뎅이버섯', points: '5,000 포인트', image: require('./image/item10.jpg') },
  { id: '11', name: '정매원 매실', points: '40,000 포인트', image: require('./image/item11.jpg') },
  { id: '12', name: '유기농 삼색 포도 4kg', points: '60,000 포인트', image: require('./image/item12.jpg') },
  { id: '13', name: '꾸지뽕', points: '35,000 포인트', image: require('./image/item13.jpg') },
  { id: '14', name: '산딸기', points: '20,000 포인트', image: require('./image/item14.jpg') },
  { id: '15', name: '삼겹살(구이용) 1kg', points: '25,300 포인트', image: require('./image/item15.jpg') },
  { id: '16', name: '동물복지 구운유정란', points: '11,000 포인트', image: require('./image/item16.jpg') },
  { id: '17', name: '꾸지뽕 건가지', points: '8,600 포인트', image: require('./image/item17.jpg') },
  { id: '18', name: '아산담은 아로니아분말', points: '19,000 포인트', image: require('./image/item18.jpg') },
  { id: '19', name: '온새미로 목장 딸기 파우치', points: '1,200 포인트', image: require('./image/item19.jpg') },
  { id: '20', name: '주원농원 100% 유기배즙', points: '33,000 포인트', image: require('./image/item20.jpg') },
];

const StoreScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={commonStyles.itemContainer}
      onPress={() => navigation.navigate('Product', { item })}
    >
      <Image source={item.image} style={commonStyles.itemImage} />

      <Text style={commonStyles.itemName}>{item.name}</Text>
      <Text style={commonStyles.itemPoints}>{item.points}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <Icon size={24} color="black" />
        <Text style={commonStyles.headerTitle}>상점</Text>
        <Icon size={24} color="black" />
      </View>

      {/* Category Filters */}


      {/* Product Grid */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={commonStyles.productList}
      />

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

export default StoreScreen;
