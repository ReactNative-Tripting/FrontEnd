import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import commonStyles from './components/Style';  // 공통 스타일을 그대로 사용
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductContent = ({ item, setStorageItems, currentPoints, setCurrentPoints, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false); // 모달 상태
  const [remainingPoints, setRemainingPoints] = useState(currentPoints); // 남은 포인트
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchUserDataFromStorage();
  }, []);

  const fetchUserDataFromStorage = async () => {
    try {
      // userId 가져오기
      const id = await AsyncStorage.getItem('userId');
      const userId = id || 'unknown123'; // userId가 없으면 기본값 설정
      setUserId(userId);
  
      console.log('Loaded userId:', userId);
  
      // 유저 포인트 조회 API 호출
      const response = await fetch(`http://localhost:8080/Tripting/point/userid/${userId}/point`);
      if (!response.ok) {
        console.error(`Error fetching points: ${response.status} - ${response.statusText}`);
        Alert.alert('오류', '포인트 데이터를 가져오는 데 실패했습니다.');
        return;
      }
  
      // 포인트 데이터 추출
      const points = await response.text(); // 포인트는 단순 문자열 응답으로 처리
      const parsedPoints = parseInt(points, 10) || 0; // 숫자로 변환
      setRemainingPoints(parsedPoints);
      await AsyncStorage.setItem('currentPoints', parsedPoints.toString());
      console.log('Loaded currentPoints from API:', parsedPoints);
    } catch (error) {
      console.error('Error fetching user points:', error);
      Alert.alert('오류', '포인트 데이터를 불러오는 중 문제가 발생했습니다.');
    }
  };
  
  const handlePurchase = async () => {
    // 아이템 구매에 필요한 포인트 계산
    const pointsRequired = parseInt(item.points.replace(/[^0-9]/g, '')); // "5,000 포인트" 형식에서 숫자만 추출
  
    if (remainingPoints < pointsRequired) {
      Alert.alert('구매 실패', '포인트가 부족합니다.');
      return;
    }
  
    const requestBody = {
      userId: userId,
      point: pointsRequired, // 사용하려는 포인트
    };
  
    try {
      // 포인트 사용 API 호출
      const response = await fetch('http://localhost:8080/Tripting/point/use', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        console.error(`Error using points: ${response.status} - ${response.statusText}`);
        Alert.alert('구매 실패', '포인트 차감에 실패했습니다.');
        return;
      }
  
      const responseBody = await response.json(); // 포인트 사용 후 남은 포인트를 반환한다고 가정
      console.log('포인트 사용 성공:', responseBody);
  
      // 남은 포인트 업데이트
      if (responseBody.remainingPoints !== undefined) {
        setRemainingPoints(responseBody.remainingPoints);
      } else {
        setRemainingPoints(remainingPoints - pointsRequired); // 응답에 남은 포인트가 없으면 기존 로직으로 처리
      }
  
      setModalVisible(true);
  
      // 구매한 아이템 저장소에 추가
      await addItemToStorage(item?.name);
    } catch (error) {
      console.error('Error using points:', error);
      Alert.alert('오류', '포인트 사용 중 문제가 발생했습니다.');
    }
  };
  
  // 구매한 아이템을 저장소에 추가
  const addItemToStorage = async (itemName) => {
    const requestBody = {
      userId: userId,
      items: [itemName],
    };
  
    try {
      const response = await fetch('http://localhost:8080/Tripting/storage/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        console.log('아이템이 저장소에 추가되었습니다.');
      } else {
        console.error('저장소에 아이템 추가 실패:', await response.text());
        Alert.alert('오류', '저장소에 아이템을 추가하는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding item to storage:', error);
      Alert.alert('오류', '저장소에 아이템을 추가하는 중 문제가 발생했습니다.');
    }
  };
  
  return (
    <View style={styles.content}>
      


      {/* 상품 이미지 */}
      <Image source={item?.image} style={styles.productImage} />

      {/* 상품 정보 */}
      <Text style={styles.productName}>{item?.name || '상품명 없음'}</Text>
      <Text style={styles.productPoints}>필요 포인트: {item?.points}</Text>
      <Text style={styles.userPoints}>
        현재 포인트: {remainingPoints || currentPoints}
      </Text>

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
            <Text style={styles.modalText}>{item?.name || '상품명 없음'}를 구매하였습니다.</Text>
            <Text style={styles.modalText}>사용한 포인트: {item?.points || 0}</Text>
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
  
      {/* 화면 중앙에 ProductContent 배치 */}
      <View style={commonStyles.centerContent}>
        <ProductContent
          item={item}
          setStorageItems={setStorageItems}
          currentPoints={currentPoints}
          setCurrentPoints={setCurrentPoints}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 전체 화면을 차지
  },
  centerContent: {
    flex: 1, // 남은 공간을 차지
    justifyContent: 'center', // 세로 중앙 정렬
    alignItems: 'center', // 가로 중앙 정렬
    paddingHorizontal: 20, // 좌우 여백을 추가할 수 있음
  },
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
