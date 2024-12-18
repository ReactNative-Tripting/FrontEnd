import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';

const storageItems = [
  { id: '1', name: '금위버섯', date: '~2025-12-31', image: require('./image/item1.png') },
  { id: '2', name: '배', date: '~2025-12-31', image: require('./image/item2.png') },
  { id: '3', name: '토마토', date: '~2025-12-31', image: require('./image/item3.png') },
  { id: '4', name: '캠벨포도', date: '~2025-12-31', image: require('./image/item4.png') },
  { id: '5', name: '블루베리', date: '~2025-12-31', image: require('./image/item5.png') },
  { id: '6', name: '외암 연엽주', date: '~2025-12-31', image: require('./image/item6.png') },
];

const StorageScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPoints}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>보관함</Text>
        <Icon size={24} color="black" />
      </View>

      {/* Title */}
      <Text style={styles.title}>내 보관함</Text>

      {/* Item Grid */}
      <FlatList
        data={storageItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  productList: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Adjust for bottom navigation space
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemPoints: {
    fontSize: 14,
    color: '#888',
  },
});

export default StorageScreen;
