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
  const { missionname, sendMissionList } = route.params;
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const customVisionEndpoint = "https://customvisiontripting-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/ec56b14e-0c38-4424-95d8-fd423dff805f/classify/iterations/Iteration3/image";
  const customVisionApiKey = "4BoNZBWyOr7WlGsLIMD9WfHjjO6XLMqTJkpaTrau5c1eBAp3WOOVJQQJ99AJACYeBjFXJ3w3AAAIACOGbNIB";
  const computerVisionEndpoint = "https://tripting003033.cognitiveservices.azure.com/vision/v3.2/ocr";
  const computerVisionApiKey = "818b99a3710e4c6f9d20ce56f4ba8ebb";

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
      let endpoint = customVisionEndpoint;
      let apiKey = customVisionApiKey;
      let headers = {
        "Content-Type": "multipart/form-data",
        "Prediction-Key": apiKey,
      };

      if (sendMissionList[0].description && sendMissionList[0].description.includes('영수증')) {
        endpoint = computerVisionEndpoint;
        apiKey = computerVisionApiKey;
        headers = {
          "Content-Type": "multipart/form-data",
          "Ocp-Apim-Subscription-Key": apiKey,
        };
      }

      const formData = new FormData();
      formData.append("file", {
        uri: imageFile.uri,
        name: imageFile.name,
        type: imageFile.type,
      });

      const response = await axios.post(endpoint, formData, { headers });

      if (endpoint === customVisionEndpoint) {
        const predictions = response.data.predictions;
        if (predictions && predictions.length > 0) {
          const bestPrediction = predictions.reduce((max, prediction) =>
            prediction.probability > max.probability ? prediction : max
          );
          if (bestPrediction.tagName.toLowerCase() === "negative") {
            Alert.alert(
              "미션 실패",
              `태그: ${bestPrediction.tagName}\n확률: ${(bestPrediction.probability * 100).toFixed(2)}%`
            );
          } else {
            Alert.alert(
              "미션 성공",
              `태그: ${bestPrediction.tagName}\n확률: ${(bestPrediction.probability * 100).toFixed(2)}%`
            );
          }
        } else {
          Alert.alert("분석 결과", "적합한 예측 결과가 없습니다.");
        }
      } else {
        const { analyzeResult } = response.data;
        if (analyzeResult && analyzeResult.readResults.length > 0) {
          const words = analyzeResult.readResults.flatMap(result =>
            result.lines.flatMap(line =>
              line.words.map(word => word.text)
            )
          );
          Alert.alert("영수증 분석 결과", `분석된 텍스트: ${words.join(', ')}`);
        } else {
          Alert.alert("분석 결과", "텍스트를 감지할 수 없습니다.");
        }
      }
    } catch (error) {
      console.error("API 호출 오류:", error.response?.data || error.message);
      Alert.alert("오류 발생", "이미지 업로드에 실패했습니다.");
    }
  };

  return (
    <KeyboardAvoidingView style={commonStyles.container} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={commonStyles.header}>
          <Icon name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
          <Text style={commonStyles.headerTitle}>미션 세부 정보</Text>
          <Icon size={24} />
        </View>
        <View style={styles.missionInfo}>
          <Text style={styles.title}>{sendMissionList[0].description}</Text>
        </View>
        <View style={styles.photoSection}>
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
      <View style={styles.uploadbutton}>
        <TouchableOpacity style={styles.completeButton} onPress={submitToApi}>
          <Text style={styles.completeButtonText}>업로드</Text>
        </TouchableOpacity>
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
    marginTop: 30,
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
  uploadbutton: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: 'center',
  },
});

export default MissionDetail;