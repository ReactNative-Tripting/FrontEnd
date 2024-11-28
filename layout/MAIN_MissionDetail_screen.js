import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './components/Style';

const MissionDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { missionId } = route.params;
  const [mission, setMission] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  // 미션 로드
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

  // 미션 완료 처리
  const handleCompleteMission = async () => {
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
        {/* 헤더 */}
        <View style={commonStyles.header}>
          <Icon name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
          <Text style={commonStyles.headerTitle}>미션 세부 정보</Text>
          <Icon name="" size={24} />
        </View>

        {/* 미션 제목 및 설명 */}
        <View style={styles.missionInfo}>
          <Text style={styles.title}>{mission.title}</Text>
          <Text style={styles.missionDescription}>{mission.description}</Text>
        </View>

        {/* 사진 선택 */}
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
      
      {/*업로드 버튼*/}
      <View style={styles.uploadbutton}>
        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteMission}>
          <Text style={styles.completeButtonText}>업로드</Text>
        </TouchableOpacity>
      </View>

      {/* 미션 완료 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteMission}>
          <Text style={styles.completeButtonText}>미션 완료</Text>
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
