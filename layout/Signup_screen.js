import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from './components/Style';

export default function SignUpScreen({ navigation }) {
  const [step, setStep] = useState(1); // 현재 단계
  const [signupData, setSignupData] = useState({
    userId: '',
    userName: '',
    password: '',
    pwcheck: '',
    phoneNum: '',
    sex: 'male',
    termsAccepted: false,
    privacyAccepted: false,
  });
  const [isUserIdValid, setIsUserIdValid] = useState(true); // 아이디 유효성 상태

  const isPasswordMatch = signupData.password === signupData.pwcheck || signupData.pwcheck === '';

  // 아이디 중복 검사 함수
  const checkUserIdAvailability = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/users/userid/${userId}/exists`);
      const data = await response.json();
      if (response.ok) {
        setIsUserIdValid(!data.exists); // 중복된 아이디가 있으면 false, 없으면 true
        if (!data.exists) {
          Alert.alert('아이디 확인', '사용 가능한 아이디입니다.');
        } else {
          Alert.alert('아이디 중복', '이미 사용 중인 아이디입니다.');
        }
      } else {
        throw new Error(data.message || '아이디 확인에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('오류', error.message || '아이디 확인 도중 문제가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    if (signupData.termsAccepted && signupData.privacyAccepted) {
      // 회원가입 데이터 API로 전송
      try {
        const response = await fetch('http://localhost:8080/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: signupData.userId,
            userName: signupData.userName,
            password: signupData.password,
            phoneNum: signupData.phoneNum,
            email: `${signupData.userId}@gmail.com`, // 기본 이메일 형식
            sex: signupData.sex.charAt(0).toUpperCase() + signupData.sex.slice(1), // 대소문자 처리
          }),
        });

        const data = await response.json();
        if (response.ok) {
          Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.');
          navigation.navigate('Main'); // 회원가입 완료 후 메인 화면으로 이동
        } else {
          throw new Error(data.message || '회원가입에 실패했습니다.');
        }
      } catch (error) {
        Alert.alert('오류', error.message || '회원가입 도중 문제가 발생했습니다.');
      }
    } else {
      Alert.alert('주의', '이용약관 및 개인정보 처리방침에 동의해 주세요.');
    }
  };

  const handleNextStep = () => {
    if (step === 3) {
      handleSubmit(); // 마지막 단계에서 데이터 전송
    } else {
      setStep(step + 1);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={commonStyles.subtitle}>여행{'\n'}그 시작을 함께 해볼까요?</Text>
            <Text style={commonStyles.description}>먼저 아이디가 필요해요.</Text>

            <Text style={commonStyles.label}>아이디</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="아이디를 입력해주세요."
              placeholderTextColor="#C4C4C4"
              value={signupData.userId}
              onChangeText={(text) => setSignupData({ ...signupData, userId: text })}
              onBlur={() => checkUserIdAvailability(signupData.userId)} // 아이디 입력 후 확인
            />

            <TouchableOpacity style={commonStyles.checkButton} onPress={() => checkUserIdAvailability(signupData.userId)} /* 중복확인 함수 호출*/ >
              <Text style={commonStyles.checkButtonText}>중복확인</Text>
            </TouchableOpacity>


            {!isUserIdValid && (
              <Text style={commonStyles.errorText}>이미 사용 중인 아이디입니다.</Text>
            )}

            <Text style={commonStyles.label}>이름</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="이름을 입력해주세요."
              placeholderTextColor="#C4C4C4"
              value={signupData.userName}
              onChangeText={(text) => setSignupData({ ...signupData, userName: text })}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={commonStyles.label}>비밀번호</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="비밀번호를 입력해 주세요."
              placeholderTextColor="#C4C4C4"
              value={signupData.password}
              onChangeText={(text) => setSignupData({ ...signupData, password: text })}
              secureTextEntry
            />

            <Text style={commonStyles.label}>비밀번호 확인</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="다시 입력해 주세요."
              placeholderTextColor="#C4C4C4"
              value={signupData.pwcheck}
              onChangeText={(text) => setSignupData({ ...signupData, pwcheck: text })}
              secureTextEntry
            />

            {!isPasswordMatch && (
              <Text style={commonStyles.errorText}>비밀번호가 일치하지 않습니다.</Text>
            )}
          </>
        );
      case 3:
        return (
          <>
            <Text style={commonStyles.label}>전화번호 입력</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="전화번호를 입력해주세요."
              placeholderTextColor="#C4C4C4"
              keyboardType="phone-pad"
              value={signupData.phoneNum}
              onChangeText={(text) => setSignupData({ ...signupData, phoneNum: text })}
            />

            <View style={commonStyles.genderContainer}>
              <Text style={commonStyles.label}>성별 선택</Text>
              <View style={commonStyles.genderSelect}>
                <TouchableOpacity
                  style={
                    signupData.sex === 'male'
                      ? commonStyles.selectedGenderButton
                      : commonStyles.genderButton
                  }
                  onPress={() => setSignupData({ ...signupData, sex: 'male' })}
                >
                  <Text
                    style={
                      signupData.sex === 'male'
                        ? commonStyles.selectedGenderText
                        : commonStyles.genderText
                    }
                  >
                    남성
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    signupData.sex === 'female'
                      ? commonStyles.selectedGenderButton
                      : commonStyles.genderButton
                  }
                  onPress={() => setSignupData({ ...signupData, sex: 'female' })}
                >
                  <Text
                    style={
                      signupData.sex === 'female'
                        ? commonStyles.selectedGenderText
                        : commonStyles.genderText
                    }
                  >
                    여성
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={commonStyles.checkboxContainer}>
              <Switch
                value={signupData.termsAccepted}
                onValueChange={(value) =>
                  setSignupData({ ...signupData, termsAccepted: value })
                }
                thumbColor={signupData.termsAccepted ? '#00aaff' : '#f4f3f4'}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
              />
              <Text style={commonStyles.checkboxLabel}>이용약관에 동의합니다.</Text>
            </View>

            <View style={commonStyles.checkboxContainer}>
              <Switch
                value={signupData.privacyAccepted}
                onValueChange={(value) =>
                  setSignupData({ ...signupData, privacyAccepted: value })
                }
                thumbColor={signupData.privacyAccepted ? '#00aaff' : '#f4f3f4'}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
              />
              <Text style={commonStyles.checkboxLabel}>개인정보 처리방침에 동의합니다.</Text>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={commonStyles.container}>
      {/* 네비게이션 바 */}
      <View style={commonStyles.navBar}>
        <TouchableOpacity onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={commonStyles.navTitle}>회원가입 단계 {step}/3</Text>
      </View>

      {/* 단계별 콘텐츠 */}
      <ScrollView contentContainerStyle={commonStyles.content}>
        {renderStepContent()}
      </ScrollView>

      {/* 다음 단계 버튼 */}
      <TouchableOpacity style={commonStyles.button} onPress={handleNextStep}>
        <Text style={commonStyles.buttonText}>
          {step === 3 ? '회원가입 완료' : '다음'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

