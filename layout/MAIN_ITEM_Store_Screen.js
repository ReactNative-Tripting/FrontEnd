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
