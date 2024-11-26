import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from './components/Style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductContent = ({ item, setStorageItems, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0); // 초기값 설정
  const [remainingPoints, setRemainingPoints] = useState(0); // 초기값 설정
  const [userId, setUserId] = useState('');

  // 사용자 데이터 로딩 및 포인트 조회
  useEffect(() => {
    fetchUserDataFromStorage();
  }, []); // 컴포넌트가 마운트 될 때 한 번만 호출

  const fetchUserDataFromStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id || 'unknown123'); // userId가 없으면 'unknown123'로 설정
      if (id) {
        const points = await fetchUserPoints(id);
        setCurrentPoints(points); // 가져온 포인트 상태에 설정
        setRemainingPoints(points); // 남은 포인트 설정
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('오류', '사용자 데이터를 불러오는 중 문제가 발생했습니다.');
    }
  };

  const fetchUserPoints = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/point/userid/${userId}/point`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '포인트 조회에 실패했습니다.');
      }

      const data = await response.json();
      return data.points; // 사용자 포인트 반환
    } catch (error) {
      console.error('Error fetching user points:', error);
      Alert.alert('오류', '포인트 조회 중 문제가 발생했습니다.');
      return 0; // 조회 실패 시 0으로 설정
    }
  };

  const useUserPoints = async (userId, pointsToUse) => {
    try {
      const response = await fetch(`http://localhost:8080/point/use`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, point: pointsToUse }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '포인트 사용에 실패했습니다.');
      }

      const updatedData = await response.json();
      return updatedData.remainingPoints; // 백엔드에서 반환된 남은 포인트
    } catch (error) {
      console.error('Error using user points:', error);
      Alert.alert('오류', '포인트 사용 중 문제가 발생했습니다.');
      return null;
    }
  };

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
      <Text style={styles.userPoints}>현재 포인트: {currentPoints}</Text> {/* 현재 포인트 표시 */}
      {/* 구매 버튼 */}
      <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
        <Text style={styles.purchaseButtonText}>구매하기</Text>
      </TouchableOpacity>

      {/* 구매 완료 모달 */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>구매 완료!</Text>
            <Text style={styles.modalText}>{item.name}를 구매하였습니다.</Text>
            <Text style={styles.modalText}>사용한 포인트: {item.points}</Text>
            <Text style={styles.modalText}>남은 포인트: {remainingPoints}</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
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

export default ProductContent;
