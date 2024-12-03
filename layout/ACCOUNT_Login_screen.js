import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from './components/Style';  

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleNextLogin = () => {
    if(!userId) {
      Alert.alert("경고, 아이디를 입력해주세요.");
      return;
    } else if(!password) {
      Alert.alert("경고, 비밀번호를 입력해주세요.");
      return;
    } else{
      handleLogin();
    }
  }

  const getEvent = async () => {
    const responseAPI = await fetch('http://tripting.kro.kr/Tripting/events/eventinfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const apiData = await responseAPI.json();
    const getAPIData = apiData.eventList;

    await AsyncStorage.setItem('eventlist', JSON.stringify(getAPIData));

    return getAPIData;
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://tripting.kro.kr/Tripting/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const { token, user } = data; // API 응답에 맞게 구조 분해
        if (token && user) {
          // 토큰 저장
          await AsyncStorage.setItem('userToken', token);

          // 사용자 정보를 분할하여 저장
          await AsyncStorage.setItem('userId', user.userId); // 사용자 ID
          await AsyncStorage.setItem('username', user.username); // 사용자 이름
          await AsyncStorage.setItem('userEmail', user.email); // 이메일
          await AsyncStorage.setItem('userPhoneNum', user.phoneNum.toString()); // 전화번호
          await AsyncStorage.setItem('userSex', user.sex); // 성별
          await AsyncStorage.setItem('userRoles', JSON.stringify(user.roles)); // 역할 (배열은 JSON 문자열로 저장)
          await AsyncStorage.setItem('userAccountNonExpired', JSON.stringify(user.accountNonExpired)); // 계정 만료 여부
          await AsyncStorage.setItem('userAccountNonLocked', JSON.stringify(user.accountNonLocked)); // 계정 잠금 여부
          await AsyncStorage.setItem('userCredentialsNonExpired', JSON.stringify(user.credentialsNonExpired)); // 자격증명 만료 여부
          await AsyncStorage.setItem('userEnabled', JSON.stringify(user.enabled)); // 계정 활성화 여부
          //get point
          const pointResponse = await fetch(`http://tripting.kro.kr/Tripting/point/userid/${userId}/point`);
          if (pointResponse.ok) {
            const data = await pointResponse.text(); // 응답 본문은 문자열 형태로 받음
            const parsedPoints = Number(data) || 0; // 숫자로 변환
            await AsyncStorage.setItem('userPoints', parsedPoints.toString()); // AsyncStorage에 저장
          } else {
            console.error('Error fetching currentPoints from API');
            Alert.alert('오류', '포인트 데이터를 가져오는 데 실패했습니다.');
          }

          Alert.alert('로그인 성공', `환영합니다, ${user.username}!`); // 사용자 이름을 표시
          const getEventList = await getEvent();
          navigation.navigate('Main', { getEventList });
        } else {
          console.error('API에서 token 또는 user가 누락되었습니다.');
          Alert.alert('로그인 실패', '서버에서 유효한 데이터를 받지 못했습니다.');
        }
      } else {
        Alert.alert('로그인 실패');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('오류 발생', '서버와 통신 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.logintextcon}>
        <Text style={commonStyles.logintitle}>안녕하세요.</Text>
        <Text style={commonStyles.loginsubtitle}>Tripting 입니다.</Text>
        <Text style={commonStyles.description}>먼저 로그인이 필요합니다 :)</Text>
      
        <View style={commonStyles.IdContainer}>
          <TextInput
            style={commonStyles.IdInput}
            placeholder="Enter your ID"
            placeholderTextColor="#999"
            value={userId}
            onChangeText={setUserId}
          />
        </View>

        <View style={commonStyles.passwordContainer}>
          <TextInput
            style={commonStyles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name="remove-red-eye" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={commonStyles.loginButton} onPress={handleNextLogin}>
          <Text style={commonStyles.loginText}>로그인</Text>
        </TouchableOpacity>

        {/* Navigation Links */}
        <View style={commonStyles.linkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={commonStyles.linkText}>회원가입</Text>
          </TouchableOpacity>
        </View> 

      </View>
    </View>
  );
};