import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,
} from 'react-native';
import commonStyles from './components/Style';

export default function SignUpScreen({ navigation }) {
  const [step, setStep] = useState(1); // 현재 단계
  const [signupData, setSignupData] = useState({
    userId: '',
    username: '',
    password: '',
    phoneNum: '',
    email: '',
    sex: 'Male',
  });
  const [isIdValid, setIsIdValid] = useState(true); // 아이디 중복 여부 상태

  // 아이디 중복 확인 함수
  const checkUserIdAvailability = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/users/check-id?userId=${userId}`);
      if (response.ok) {
        const result = await response.json();
        if (result.exists) {
          // 아이디가 중복될 경우
          setIsIdValid(false);
          Alert.alert('아이디 중복', '이 아이디는 이미 사용 중입니다.');
        } else {
          setIsIdValid(true); // 아이디가 유효한 경우
        }
      } else {
        setIsIdValid(false);
        Alert.alert('서버 오류', '아이디 중복 확인에 실패했습니다.');
      }
    } catch (error) {
      setIsIdValid(false);
      Alert.alert('네트워크 오류', '서버와 연결할 수 없습니다.');
    }
  };

  // 회원가입 진행
  const handleNextStep = async () => {
    if (step === 1) {
      // 아이디 중복 확인
      if (signupData.userId === '') {
        Alert.alert('아이디 입력', '아이디를 입력해주세요.');
        return;
      }
      await checkUserIdAvailability(signupData.userId);
      if (!isIdValid) {
        return; // 아이디가 중복된 경우 진행하지 않음
      }
      setStep(step + 1); // 아이디 중복이 없으면 다음 단계로
    } else if (step === 2) {
      // 비밀번호 확인과 비밀번호 일치 여부 추가
      if (signupData.password !== signupData.password) {
        Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
        return;
      }
      setStep(step + 1); // 비밀번호 확인 후 3단계로 진행
    } else if (step === 3) {
      // 최종 회원가입 처리
      const { userId, username, password, phoneNum, email, sex } = signupData;
      try {
        const response = await fetch('http://localhost:8080/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            username: username,
            password: password,
            phoneNum: phoneNum,
            email: email,
            sex: sex,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          Alert.alert('회원가입 성공', '회원가입이 완료되었습니다!');
          navigation.navigate('Main'); // 회원가입 후 메인 화면으로 이동
        } else {
          const error = await response.json();
          Alert.alert('회원가입 실패', error.message || '서버 오류');
        }
      } catch (error) {
        Alert.alert('오류', '네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        console.error(error);
      }
    }
  };

  return (
    <View style={commonStyles.container}>
      {/* 회원가입 폼 */}
      <Text style={commonStyles.subtitle}>회원가입</Text>

      {/* 1단계: 아이디 입력 */}
      {step === 1 && (
        <>
          <Text style={commonStyles.label}>아이디</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="아이디를 입력해주세요."
            value={signupData.userId}
            onChangeText={(text) => setSignupData({ ...signupData, userId: text })}
          />
          {!isIdValid && signupData.userId !== '' && (
            <Text style={commonStyles.errorText}>이 아이디는 이미 사용 중입니다.</Text>
          )}
        </>
      )}

      {/* 2단계: 비밀번호 입력 */}
      {step === 2 && (
        <>
          <Text style={commonStyles.label}>비밀번호</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry
            value={signupData.password}
            onChangeText={(text) => setSignupData({ ...signupData, password: text })}
          />

          <Text style={commonStyles.label}>비밀번호 확인</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="다시 입력해주세요."
            secureTextEntry
            value={signupData.password}
            onChangeText={(text) => setSignupData({ ...signupData, password: text })}
          />
        </>
      )}

      {/* 3단계: 나머지 정보 입력 */}
      {step === 3 && (
        <>
          <Text style={commonStyles.label}>전화번호</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="전화번호를 입력해주세요."
            keyboardType="phone-pad"
            value={signupData.phoneNum}
            onChangeText={(text) => setSignupData({ ...signupData, phoneNum: text })}
          />

          <Text style={commonStyles.label}>이메일</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="이메일을 입력해주세요."
            value={signupData.email}
            onChangeText={(text) => setSignupData({ ...signupData, email: text })}
          />

          <Text style={commonStyles.label}>성별</Text>
          <TextInput
            style={commonStyles.input}
            placeholder="성별을 입력해주세요."
            value={signupData.sex}
            onChangeText={(text) => setSignupData({ ...signupData, sex: text })}
          />
        </>
      )}

      {/* 하단 버튼 */}
      <TouchableOpacity style={commonStyles.button} onPress={handleNextStep}>
        <Text style={commonStyles.buttonText}>
          {step === 3 ? '회원가입 완료' : '다음'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
