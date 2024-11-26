import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import commonStyles from './components/Style';  // 공통 스타일을 그대로 사용
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductContent = ({ item, setStorageItems, currentPoints, setCurrentPoints, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false); // 모달 상태
  const [remainingPoints, setRemainingPoints] = useState(currentPoints); // 남은 포인트

  const handlePurchase = () => {
    if (currentPoints < item.points) {
      Alert.alert('구매 실패', '포인트가 부족합니다.');
      return;
    }
    setModalVisible(true); // 모달 표시
  };

  return (
    <View style={styles.content}>
      


      {/* 상품 이미지 */}
      <Image source={item.image} style={styles.productImage} />

      {/* 상품 정보 */}
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPoints}>필요 포인트: {item.points}</Text>
      <Text style={styles.userPoints}>현재 포인트: {currentPoints}</Text>

      {/* 구매 버튼 */}
      <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
        <Text style={styles.purchaseButtonText}>구매하기</Text>
      </TouchableOpacity>

      {/* 구매 완료 모달 */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>구매 완료!</Text>
            <Text style={styles.modalText}>{item.name}를 구매하였습니다.</Text>
            <Text style={styles.modalText}>사용한 포인트: {item.points}</Text>
            <Text style={styles.modalText}>남은 포인트: {remainingPoints}</Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>닫기</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, { backgroundColor: '#4CAF50' }]}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Storage'); // 보관함으로 이동
                }}
              >
                <Text style={styles.modalButtonText}>보관함으로 이동</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProductScreen = ({ route, navigation, storageItems, setStorageItems, currentPoints, setCurrentPoints }) => {
  const { item } = route.params;

  return (
    <View style={commonStyles.container}>
      {/* 헤더 */}
     
      <View style={commonStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={commonStyles.headerTitle}>미션</Text>
          <TouchableOpacity>
            <Icon size={28} color="black" />
          </TouchableOpacity>
        </View>
      
      <ProductContent
        item={item}
        setStorageItems={setStorageItems}
        currentPoints={currentPoints}
        setCurrentPoints={setCurrentPoints}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'Spacebetween',
    paddingHorizontal: 26,
  },
  header: {
    flexDirection: 'row',            // 좌우로 배치
    justifyContent: 'space-between', // 좌측과 우측에 공간을 나누기
    alignItems: 'center',           // 중앙 정렬
    paddingHorizontal: 16,          // 양옆 여백
    height: 60,                     // 헤더 높이
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
    marginBottom: 10,
  },
  userPoints: {
    fontSize: 18,
    color: '#444444',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductScreen;
