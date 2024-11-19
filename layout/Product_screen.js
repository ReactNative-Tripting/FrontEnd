import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavigation from './components/BottomNavigation';
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
    Alert.alert('구매 완료', `${item.name}를 구매하였습니다!`);{/* 포인트 차감 확인 modal 사용자에게 송출후, 확인버튼 누를 시 해당 사용자 보관함에 아이템 추가및 아이템 가격만큼 포인트 차감.*/}
  };

  return (
    <View style={styles.content}>
      <Image source={item.image} style={styles.productImage} />{/*상품 이미지*/}
      <Text style={styles.productName}>{item.name}</Text>{/*상품 이름*/}
      <Text style={styles.productPoints}>{item.points}</Text>{/*상품 가격*/}
      <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>{/*상품 구매버튼*/}
        <Text style={styles.purchaseButtonText}>구매하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductScreen = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {/* 공란*/}
      <View style={styles.spacer} />
      <ProductContent item={item} />
      {/* 공란*/}
      <View style={styles.spacer} />
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
    flex: 0.1, 
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
