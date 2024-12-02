// React Native에서 필요한 모듈과 패키지들을 import
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';
import axios from 'axios';

// MissionDetail 컴포넌트 정의
const MissionDetail = () => {
  const route = useRoute(); // 현재 라우트의 정보를 가져옴
  const navigation = useNavigation(); // 네비게이션 객체를 가져옴
  const { missionId } = route.params; // 라우트에서 전달된 미션 ID를 가져옴
  const [mission, setMission] = useState(null); // 현재 미션 정보를 저장하는 상태
  const [imageUri, setImageUri] = useState(null); // 선택한 이미지의 URI
  const [imageFile, setImageFile] = useState(null); // 선택한 이미지 파일 정보

  // Azure Custom Vision 및 Computer Vision API의 엔드포인트와 키
  const customVisionEndpoint = "https://customvisiontripting-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/ec56b14e-0c38-4424-95d8-fd423dff805f/classify/iterations/Iteration4/image";
  const customVisionApiKey = "4BoNZBWyOr7WlGsLIMD9WfHjjO6XLMqTJkpaTrau5c1eBAp3WOOVJQQJ99AJACYeBjFXJ3w3AAAIACOGbNIB";
  const computerVisionEndpoint = "https://tripting003033.cognitiveservices.azure.com/vision/v3.2/ocr";
  const computerVisionApiKey = "FiT3qKeYV32sXVEzJzOBvLb9TB1DhHEr0FkQU8V48bkqzu9GPBixJQQJ99ALACYeBjFXJ3w3AAAFACOGvqCc";

  // AsyncStorage에서 특정 미션의 세부 정보를 가져오는 함수
  const fetchMissionDetail = async () => {
    try {
      const storedMissions = await AsyncStorage.getItem('missions'); // 저장된 미션 정보 가져오기
      const parsedMissions = storedMissions ? JSON.parse(storedMissions) : []; // JSON으로 파싱
      const missionDetail = parsedMissions.find((m) => m.id === missionId); // 현재 미션 ID에 해당하는 미션 찾기
      if (missionDetail) {
        setMission(missionDetail); // 미션 정보 상태 업데이트
      } else {
        Alert.alert('오류', '미션을 찾을 수 없습니다.'); // 미션이 없을 경우 오류 알림
      }
    } catch (error) {
      console.error('미션 로드 중 오류:', error); // 에러 로깅
    }
  };

  // 컴포넌트가 처음 렌더링될 때 fetchMissionDetail 호출
  useEffect(() => {
    fetchMissionDetail();
  }, []);

  // 미션을 포기하는 함수
  const handleCancelMission = async () => {
    Alert.alert(
      "미션 포기",
      "미션을 포기하시겠습니까?",
      [
        {
          text: "아니오",
          style: "cancel",
        },
        {
          text: "예",
          onPress: async () => {
            try {
              const storedMissions = await AsyncStorage.getItem('missions');
              const parsedMissions = storedMissions ? JSON.parse(storedMissions) : [];
              const updatedMissions = parsedMissions.filter((m) => m.id !== missionId); // 미션 제거
              await AsyncStorage.setItem('missions', JSON.stringify(updatedMissions));
              Alert.alert("미션 포기", "미션이 성공적으로 삭제되었습니다."); // 성공 알림
              navigation.replace("Mission"); // 미션 리스트 화면으로 이동
            } catch (error) {
              console.error('미션 삭제 중 오류:', error); // 에러 로깅
              Alert.alert("오류", "미션 삭제에 실패했습니다.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // 갤러리에서 사진을 선택하는 함수
  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('알림', '사진 선택이 취소되었습니다.'); // 사용자가 선택을 취소한 경우
      } else if (response.errorCode) {
        Alert.alert('오류', `사진 선택 중 오류가 발생했습니다: ${response.errorMessage}`);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri); // 선택한 사진의 URI 저장
        setImageFile({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName || "photo.jpg",
          type: response.assets[0].type || "image/jpeg",
        }); // 선택한 사진의 파일 정보 저장
      }
    });
  };

  // 카메라로 사진을 촬영하는 함수
  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('알림', '사진 촬영이 취소되었습니다.');
      } else if (response.errorCode) {
        Alert.alert('오류', `사진 촬영 중 오류가 발생했습니다: ${response.errorMessage}`);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri); // 촬영한 사진의 URI 저장
        setImageFile({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName || "photo.jpg",
          type: response.assets[0].type || "image/jpeg",
        }); // 촬영한 사진의 파일 정보 저장
      }
    });
  };

  // 선택한 사진을 API로 전송하고 결과를 확인하는 함수
  const submitToApi = async () => {
    if (!imageFile) {
      Alert.alert("이미지를 선택해주세요!"); // 이미지가 없으면 알림
      return;
    }

    try {
      if (mission.description.includes("영수증")) {
        // 영수증 OCR 처리
        const imageData = new FormData();
        imageData.append("file", {
          uri: imageFile.uri,
          name: imageFile.name,
          type: imageFile.type,
        });

        const response = await axios.post(
          `${computerVisionEndpoint}?language=ko&detectOrientation=true`,
          imageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Ocp-Apim-Subscription-Key": computerVisionApiKey,
            },
          }
        );

        if (response.data && response.data.regions) {
          const texts = response.data.regions
            .flatMap((region) => region.lines)
            .flatMap((line) => line.words)
            .map((word) => word.text); // OCR로 추출된 텍스트 목록

          if (texts.some(text => text.includes(mission.title.split("에서")[0].trim()))) {
            completeMissionAndRedirect(); // 성공 처리
          } else {
            Alert.alert("미션 실패!", "다른 가게거나 사진이 잘 보이지 않습니다. 다시 시도해주세요!");
          }
        }
      } else {
        // 장소 사진 분석 처리
        const formData = new FormData();
        formData.append("file", {
          uri: imageFile.uri,
          name: imageFile.name,
          type: imageFile.type,
        });

        const response = await axios.post(customVisionEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Prediction-Key": customVisionApiKey,
          },
        });

        if (response.data && response.data.predictions) {
          const highestPrediction = response.data.predictions.reduce((prev, current) =>
            prev.probability > current.probability ? prev : current
          ); // 가장 높은 예측 결과

          if (highestPrediction.tagName === 'Negative') {
            Alert.alert("미션 실패!", "이 사진은 적합하지 않습니다. 다시 시도해주세요");
          } else {
            completeMissionAndRedirect();
          }
        } else {
          Alert.alert("미션 실패!", "분석 결과를 찾을 수 없습니다. 다시 시도해주세요.");
        }
      }
    } catch (error) {
      console.error("API 호출 오류:", error);
      Alert.alert("오류 발생", "이미지 업로드에 실패했습니다.");
    }
  };

  // 미션 완료 처리 후 화면 전환
  const completeMissionAndRedirect = async () => {
    try {
      const storedMissions = await AsyncStorage.getItem('missions');
      const parsedMissions = storedMissions ? JSON.parse(storedMissions) : [];
      const updatedMissions = parsedMissions.filter((m) => m.id !== missionId); // 완료된 미션 제거
      await AsyncStorage.setItem('missions', JSON.stringify(updatedMissions));
      Alert.alert("미션 성공!", "미션이 성공적으로 완료되었습니다.");
      navigation.replace("Mission"); // 미션 리스트 화면으로 이동
    } catch (error) {
      console.error('미션 처리 중 오류:', error);
    }
  };

  // 미션 정보가 로드되지 않은 경우 로딩 화면
  if (!mission) {
    return (
      <View style={commonStyles.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  // 메인 렌더링 부분
  return (
    <KeyboardAvoidingView style={commonStyles.container} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={commonStyles.header}>
          <Icon name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
          <Text style={commonStyles.headerTitle}>미션 세부 정보</Text>
        </View>
        <View style={styles.missionInfo}>
          <Text style={styles.title}>{mission.title}</Text>
          <Text style={styles.missionDescription}>{mission.description}</Text>
        </View>
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
            <>
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
              <TouchableOpacity style={styles.completeButton} onPress={submitToApi}>
                <Text style={styles.completeButtonText}>성공?실패?</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <TouchableOpacity
          style={[styles.completeButton, styles.cancelButton]}
          onPress={handleCancelMission}
        >
          <Text style={styles.completeButtonText}>미션 포기</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  missionDescription: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  missionInfo: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#A6D8FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
});

// MissionDetail 컴포넌트 export
export default MissionDetail;
