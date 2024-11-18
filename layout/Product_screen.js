import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
//헤더
const Header = ({ navigation }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>상품 정보</Text>
    <Icon name="shopping-cart" size={24} color="black" />
  </View>
);
//구매버튼을 누르면 아래 핸들 사용
const ProductContent = ({ item }) => {
  const handlePurchase = () => {
    Alert.alert('구매 완료', `${item.name}를 구매하였습니다!`);
  };

  return (
    <View style={styles.content}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPoints}>{item.points}</Text>
      <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
        <Text style={styles.purchaseButtonText}>구매하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const BottomNavigation = ({ navigation }) => (
  <View style={styles.bottomNav}>
    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
      <Icon name="home" size={24} color="black" />
      <Text style={styles.navText}>메인화면</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Mission')}>
      <Icon name="map" size={24} color="black" />
      <Text style={styles.navText}>미션</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Icon name="add-circle-outline" size={24} color="black" />
      <Text style={styles.navText}>추가</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Icon name="event" size={24} color="black" />
      <Text style={styles.navText}>행사</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Store')}>
      <Icon name="store" size={24} color="black" />
      <Text style={styles.navText}>상점</Text>
    </TouchableOpacity>
  </View>
);

const ProductScreen = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header navigation={navigation} />
      
      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Content */}
      <ProductContent item={item} />

      {/* Spacer */}
      <View style={styles.spacer} />

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
  spacer: {
    flex: 0.1, // 공백을 위해 공간 확보
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPoints: {
    fontSize: 18,
    color: '#888888',
    marginBottom: 20,
  },
  purchaseButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
  },
});

export default ProductScreen;
