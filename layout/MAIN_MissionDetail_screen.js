import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import commonStyles from './components/Style';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MissionDetail = () => {
  const route = useRoute();
  const { missionId } = route.params; // 미션 아이디를 받아옵니다.
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

  // 사진 선택 (갤러리에서)
  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('알림', '사진 선택이 취소되었습니다.');
      } else if (response.errorCode) {
        Alert.alert('오류', `사진 선택 중 오류가 발생했습니다: ${response.errorMessage}`);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };
//이미지 업로드 함수
  const handleUploadPhoto = () => {
    if (!imageUri) {
      Alert.alert('업로드 실패', '선택한 이미지가 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg', // 이미지 타입 설정 (예: 'image/jpeg', 'image/png')
      name: `mission_${missionId}.jpg`, // 파일 이름 생성
    });

    // 서버 URL (이 부분은 서버 API 엔드포인트로 대체)
    fetch('https://your-server.com/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('업로드 성공', '이미지가 성공적으로 업로드되었습니다.');
      })
      .catch(error => {
        console.error('업로드 실패:', error);
        Alert.alert('오류', '이미지 업로드 중 오류가 발생했습니다.');
      });
  };

  // 사진 촬영 (카메라)
  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('알림', '사진 촬영이 취소되었습니다.');
      } else if (response.errorCode) {
        Alert.alert('오류', `사진 촬영 중 오류가 발생했습니다: ${response.errorMessage}`);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={commonStyles.container}>
      {/* 헤더 */}
      <View style={commonStyles.header}>
      <Icon name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={commonStyles.headerTitle}>미션</Text>
        <Icon name="search" size={24} color="black" />
      </View>

      <Text style={commonStyles.title}>미션 {missionId} 세부 내용</Text>

      {/* 사진 선택 및 업로드 */}
      <View style={styles.photoSection}>
        <Text style={styles.subtitle}>미션: 특정 장소에 가서 사진 찍기</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
            <Text style={styles.buttonText}>사진 선택</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
            <Text style={styles.buttonText}>사진 촬영</Text>
          </TouchableOpacity>
        </View>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        )}
      </View>
     {/* 업로드 버튼 */}
     <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPhoto}>
        <Text style={styles.uploadButtonText}>업로드</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  photoSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A6D8FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: '#FFA500', // 주황색 배경
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MissionDetail;