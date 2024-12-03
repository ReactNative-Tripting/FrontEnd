import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';
import axios from 'axios';
import ImageResizer from 'react-native-image-resizer';
import stringSimilarity from 'string-similarity';

const MissionDetail = () => {
  const route = useRoute();
  const { missionname, sendMissionList } = route.params;
  const mission = sendMissionList[0].description;
  const navigation = useNavigation();
  const missionId = missionname.id;
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const customVisionEndpoint = "https://customvisiontripting-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/ec56b14e-0c38-4424-95d8-fd423dff805f/classify/iterations/Iteration4/image";
  const customVisionApiKey = "4BoNZBWyOr7WlGsLIMD9WfHjjO6XLMqTJkpaTrau5c1eBAp3WOOVJQQJ99AJACYeBjFXJ3w3AAAIACOGbNIB";
  const computerVisionEndpoint = "https://tripting241018.cognitiveservices.azure.com/vision/v3.2/ocr";
  const computerVisionApiKey = "FM40SSr87cSKWHzaxziKTBr5D40hbkyvYDURsWAFERdCL99nVu21JQQJ99ALACNns7RXJ3w3AAAFACOG69sJ";

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

  const preprocessImage = async (uri) => {
    try{
      const resizedImage = await ImageResizer.createResizedImage(
        uri,
        1000, // 너비
        1000, // 높이
        'JPEG', // 형식
        100 // 품질
      );

      return resizedImage.uri;
    } catch (error) {
      console.error("이미지 전처리 오류 : ", error);
      return uri;
    }
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        Alert.alert('알림', '사진 선택이 취소되었습니다.');
      } else if (response.errorCode) {
        Alert.alert('오류', `사진 선택 중 오류가 발생했습니다: ${response.errorMessage}`);
      } else if (response.assets) {
        const processedUri = await preprocessImage(response.assets[0].uri);
        setImageUri(processedUri);
        setImageFile({
          uri: processedUri,
          name: response.assets[0].fileName || 'photo.jpg',
          type: response.assets[0].type || 'image/jpeg',
        });
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({ mediaType: 'photo' }, async (response) => {
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
      if (mission.includes("영수증")) {
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

          const missionna = sendMissionList[0].title.split("에서")[0].trim()
          const bestMatch = stringSimilarity.findBestMatch(missionna, texts);

          if (bestMatch.bestMatch.rating > 0.55) {
            await completeMissionAndRedirect();
          } else {
            Alert.alert("미션 실패!", "다른 가게거나 사진이 잘 보이지 않습니다. 다시 시도해주세요!");
          }
        }
      } else {
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
          );

          if (highestPrediction.tagName === sendMissionList[0].area && highestPrediction.probability >= 0.8) {
            await completeMissionAndRedirect();
          } else {
            Alert.alert(
              "미션 실패!",
              `예측 결과: ${highestPrediction.tagName} (${(highestPrediction.probability * 100).toFixed(2)}%)`
            );
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

  const completeMissionAndRedirect = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const points = await AsyncStorage.getItem('userPoints');
      const randomPoint = Math.floor(Math.random() * (10000 - 500 + 1)) + 500;
      const sumPoint = parseInt(points) + parseInt(randomPoint);
      await AsyncStorage.setItem('userPoints', sumPoint.toString());
      const pointResponse = await fetch('http://localhost:8080/Tripting/point/earn', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          point: randomPoint,
        }),
      });
      const storedMissions = await AsyncStorage.getItem('missions');
      const parsedMissions = storedMissions ? JSON.parse(storedMissions) : [];
      const updatedMissions = parsedMissions.filter((m) => m.id !== missionId);
      await AsyncStorage.setItem('missions', JSON.stringify(updatedMissions));
      Alert.alert("미션 성공!", `${randomPoint}포인트가 지급되었습니다.`);
      navigation.replace("Mission");
    } catch (error) {
      console.error('미션 처리 중 오류:', error);
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
          <Icon name="clear" size={24} color ="white"/>
        </View>

      <View style={styles.missionContainer}>
        <View style={styles.missionInfo}>
          <Text style={styles.missionDescription}>{mission.description}</Text>
        </View>

          <View style={styles.photoSection}>
            <Text style={styles.subtitle}>{mission}</Text>
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
        </View>
      </ScrollView>
      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  missionContainer :{
    flex:1,
    padding :20
  },
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

export default MissionDetail;