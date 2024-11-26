import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import commonStyles from './components/Style';  // 공통 스타일을 그대로 사용
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';  // AsyncStorage 임포트

const ProductContent = ({ item, setStorageItems, currentPoints, setCurrentPoints, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false); // 모달 상태
  const [remainingPoints, setRemainingPoints] = useState(currentPoints); // 남은 포인트
  const [userId, setUserId] = useState("");

  // 사용자 데이터 로딩
  useEffect(() => {
    fetchUserDataFromStorage();
  }, []);

  const fetchUserDataFromStorage = async () => {
    try {
      // 각 값 가져오기
      const id = await AsyncStorage.getItem('userId');
      const points = await AsyncStorage.getItem('currentPoints'); // 기존 currentPoints 가져오기
  
      if (!points) {
        // currentPoints가 없으면 API 호출해서 값을 가져옵니다.
        const response = await fetch(`http://localhost:8080/point/userid/${id}/point`);
        if (response.ok) {
          const data = await response.text(); // 응답 본문은 문자열 형태로 받음
          setRemainingPoints(Number(data) || 0); // currentPoints 값 설정
          await AsyncStorage.setItem('currentPoints', data); // AsyncStorage에 저장
          console.log('Loaded currentPoints from API:', data);
        } else {
          console.log('Error fetching currentPoints from API');
        }
      } else {
        // 기존의 currentPoints가 있으면 그대로 사용
        setRemainingPoints(Number(points) || 0);
        console.log('Loaded currentPoints from AsyncStorage:', points);
      }
  
      setUserId(id || 'unknown123');  // userId가 없으면 'unknown123'로 설정
      console.log('Loaded userId:', id);
  
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('오류', '사용자 데이터를 불러오는 중 문제가 발생했습니다.');
    }
  };
  

  const handlePurchase = async () => {
    if (remainingPoints < item.points) {
      Alert.alert('구매 실패', '포인트가 부족합니다.');
      return;
    }
  
    // 포인트 차감 처리
    const newPoints = remainingPoints - item.points;
  
    // 아이템 포인트 값 출력
    console.log('아이템 포인트:', item.points);
  
    // API 호출하여 포인트 업데이트
    try {
      const response = await fetch('http://localhost:8080/point/use', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { 
            userId: userId 
          },
          point: item.points, // 사용될 포인트
        }),
      });
  
      // 응답 상태 코드 확인
      console.log('응답 상태:', response.status);
  
      // 응답 본문이 있는지 확인하고 파싱 시도
      const responseBody = await response.text(); // 먼저 텍스트로 받아서 본문을 확인
      console.log('응답 본문 (텍스트로 확인):', responseBody);
  
      // 응답 본문이 비어있지 않으면 JSON으로 파싱
      let parsedBody = null;
      if (responseBody) {
        parsedBody = JSON.parse(responseBody);  // 텍스트를 JSON으로 변환
      }
  
      // 응답 상태가 성공적일 때
      if (response.ok) {
        setRemainingPoints(newPoints); // 상태 업데이트
        await AsyncStorage.setItem('currentPoints', newPoints.toString()); // AsyncStorage에 업데이트된 포인트 저장
        setModalVisible(true); // 모달 표시
      } else {
        console.log('Error updating points:', parsedBody || responseBody); // 오류 메시지 출력
        Alert.alert('구매 실패', '포인트 차감에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error calling API:', error);
      Alert.alert('오류', 'API 호출 중 오류가 발생했습니다.');
    }
  };
  

  return (
    <View style={styles.content}>
      {/* 상품 이미지 */}
      <Image 
        source={item?.image} // item.image가 없으면 기본 이미지 사용
        style={styles.productImage} 
      />

      {/* 상품 정보 */}
      <Text style={styles.productName}>{item?.name || '상품명 없음'}</Text>
      <Text style={styles.productPoints}>필요 포인트: {item?.points || 0}</Text>
      <Text style={styles.userPoints}>현재 포인트: {remainingPoints}</Text>

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
    justifyContent: 'space-between',
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
