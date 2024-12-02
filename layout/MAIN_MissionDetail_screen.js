import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';
import axios from 'axios';

const MissionDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { missionId } = route.params;
  const [mission, setMission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isMissionSuccessful, setIsMissionSuccessful] = useState(false); // 미션 성공 여부 상태 추가

  const customVisionEndpoint = "https://customvisiontripting-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/ec56b14e-0c38-4424-95d8-fd423dff805f/classify/iterations/Iteration4/image";
  const customVisionApiKey = "4BoNZBWyOr7WlGsLIMD9WfHjjO6XLMqTJkpaTrau5c1eBAp3WOOVJQQJ99AJACYeBjFXJ3w3AAAIACOGbNIB";
  const computerVisionEndpoint = "https://tripting003033.cognitiveservices.azure.com/vision/v3.2/ocr";
  const computerVisionApiKey = "FiT3qKeYV32sXVEzJzOBvLb9TB1DhHEr0FkQU8V48bkqzu9GPBixJQQJ99ALACYeBjFXJ3w3AAAFACOGvqCc";

  const fetchMissionDetail = async () => {
    try {
      const storedMissions = await AsyncStorage.getItem('missions');
      const parsedMissions = storedMissions ? JSON.parse(storedMissions) : [];
      const missionDetail = parsedMissions.find((m) => m.id === missionId);
      if (missionDetail) {
        setMission(missionDetail);
      } else {
        Alert.alert('오류', '미션을 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('미션 로드 중 오류:', error);
    }
  };

  useEffect(() => {
    fetchMissionDetail();
  }, []);

  const handleCompleteMission = async () => {
    if (!isMissionSuccessful) {
      Alert.alert("미션 완료 불가", "아직 미션이 완료되지 않았습니다! 다시한번 확인해주세요.");
      return;
    }

    try {
      const storedMissions = await AsyncStorage.getItem('missions');
      const parsedMissions = storedMissions ? JSON.parse(storedMissions) : [];
      const updatedMissions = parsedMissions.filter((m) => m.id !== missionId);
      await AsyncStorage.setItem('missions', JSON.stringify(updatedMissions));
      Alert.alert('미션 완료', '미션이 성공적으로 완료되었습니다.');
      navigation.replace("Mission");
    } catch (error) {
      console.error('미션 삭제 중 오류:', error);
    }
  };

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
              const updatedMissions = parsedMissions.filter((m) => m.id !== missionId);
              await AsyncStorage.setItem('missions', JSON.stringify(updatedMissions));
              Alert.alert("미션 포기", "미션이 성공적으로 삭제되었습니다.");
              navigation.replace("Mission");
            } catch (error) {
              console.error('미션 삭제 중 오류:', error);
              Alert.alert("오류", "미션 삭제에 실패했습니다.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('알림', '사진 선택이 취소되었습니다.');
      } else if (response.errorCode) {
        Alert.alert('오류', `사진 선택 중 오류가 발생했습니다: ${response.errorMessage}`);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
        setImageFile({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName || "photo.jpg",
          type: response.assets[0].type || "image/jpeg",
        });
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        Alert.alert('알림', '사진 촬영이 취소되었습니다.');
      } else if (response.errorCode) {
        Alert.alert('오류', `사진 촬영 중 오류가 발생했습니다: ${response.errorMessage}`);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
        setImageFile({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName || "photo.jpg",
          type: response.assets[0].type || "image/jpeg",
        });
      }
    });
  };

  const submitToApi = async () => {
    if (!imageFile) {
      Alert.alert("이미지를 선택해주세요!");
      return;
    }

    try {
      if (mission.description.includes("영수증")) {
        // Computer Vision (OCR) API 호출
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
            .map((word) => word.text);

          if (texts.length === 0) {
            setIsMissionSuccessful(false);
            Alert.alert("결과", "영수증이 아닙니다! 다시 한번 확인해주세요!");
            return;
          }

          const missionLocation = mission.title.split("에서")[0].trim();
          
          const isSuccessful = texts.some(text => text.includes(missionLocation));

          if (isSuccessful) {
            setIsMissionSuccessful(true);
            Alert.alert("미션 성공!", "미션 완료버튼을 눌러주세요!");
          } else {
            setIsMissionSuccessful(false);
            Alert.alert("미션 실패!", "다른 가게 거나 사진이 잘 보이지 않습니다 다시 시도해주세요!");
          }
        } else {
          setIsMissionSuccessful(false);
          Alert.alert("결과", "영수증이 아닙니다! 다시 한번 확인해주세요!");
        }
      } else {
        // Custom Vision API 호출
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

        if (response.data && response.data.predictions && response.data.predictions.length > 0) {
          const highestPrediction = response.data.predictions.reduce((prev, current) => {
            return (prev.probability > current.probability) ? prev : current;
          });

          if (highestPrediction.tagName.toLowerCase() === "negative" ||
              highestPrediction.tagName !== mission.title) {
            // 미션 실패 조건: 'negative'이거나 미션 제목과 일치하지 않음
            setIsMissionSuccessful(false);
            Alert.alert("결과", "분석 결과가 기준을 충족하지 못했습니다. 다시 시도해주세요.");
          } else {
            setIsMissionSuccessful(true);
            Alert.alert(
              "결과",
              `가장 높은 예측: ${highestPrediction.tagName} (${(highestPrediction.probability * 100).toFixed(2)}%)`
            );
          }
        } else {
          setIsMissionSuccessful(false);
          Alert.alert("결과", "분석 결과를 찾을 수 없습니다.");
        }
      }
    } catch (error) {
      console.error("API 호출 오류:", error.response?.data || error.message);
      Alert.alert("오류 발생", "이미지 업로드에 실패했습니다.");
    }
  };

  if (!mission) {
    return (
      <View style={commonStyles.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={commonStyles.container} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={commonStyles.header}>
          <Icon name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
          <Text style={commonStyles.headerTitle}>미션 세부 정보</Text>
          <Icon name="" size={24} />
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
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.completeButton} onPress={submitToApi}>
          <Text style={styles.completeButtonText}>성공?실패?</Text>
        </TouchableOpacity>
        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.completeButton} onPress={handleCompleteMission}>
            <Text style={styles.completeButtonText}>미션 완료</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.completeButton, styles.cancelButton]}
            onPress={handleCancelMission}
          >
            <Text style={styles.completeButtonText}>미션 포기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

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
  footer: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
});

export default MissionDetail;
