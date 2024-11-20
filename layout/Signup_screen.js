
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from './components/Style';

export default function SignUpScreen({ navigation }) {
  const [step, setStep] = useState(1); // 현재 단계
  const [signupData, setSignupData] = useState({
    email: '', // 이메일 추가
    name: '',
    password: '',
    pwcheck: '',
    phoneNumber: '',
    gender: 'male',
    termsAccepted: false,
    privacyAccepted: false,
  });

  const isPasswordMatch = signupData.password === signupData.pwcheck || signupData.pwcheck === '';
  const isEmailValid = /\S+@\S+\.\S+/.test(signupData.email); // 이메일 유효성 검사 정규 표현식

  const handleNextStep = () => {
    if (step === 3) {
      if (signupData.termsAccepted && signupData.privacyAccepted) {
        console.log('회원가입 데이터:', signupData); // 회원가입 데이터 출력
        Alert.alert('회원가입 성공', '회원가입이 완료되었습니다.');
        navigation.navigate('Main'); // 회원가입 완료 후 메인 화면으로 이동
      } else {
        Alert.alert('주의', '이용약관 및 개인정보 처리방침에 동의해 주세요.');
      }
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
            <Text style={commonStyles.description}>먼저 이메일을 입력해주세요.</Text>

            <Text style={commonStyles.label}>이메일</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="이메일을 입력해주세요."
              placeholderTextColor="#C4C4C4"
              value={signupData.email}
              onChangeText={(text) => setSignupData({ ...signupData, email: text })}
            />
            {!isEmailValid && signupData.email !== '' && (
              <Text style={commonStyles.errorText}>유효한 이메일 주소를 입력해주세요.</Text>
            )}

            <Text style={commonStyles.label}>이름</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="이름을 입력해주세요."
              placeholderTextColor="#C4C4C4"
              value={signupData.name}
              onChangeText={(text) => setSignupData({ ...signupData, name: text })}
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
              value={signupData.phoneNumber}
              onChangeText={(text) => setSignupData({ ...signupData, phoneNumber: text })}
            />

            <View style={commonStyles.genderContainer}>
              <Text style={commonStyles.label}>성별 선택</Text>
              <View style={commonStyles.genderSelect}>
                <TouchableOpacity
                  style={
                    signupData.gender === 'male'
                      ? commonStyles.selectedGenderButton
                      : commonStyles.genderButton
                  }
                  onPress={() => setSignupData({ ...signupData, gender: 'male' })}
                >
                  <Text
                    style={
                      signupData.gender === 'male'
                        ? commonStyles.selectedGenderText
                        : commonStyles.genderText
                    }
                  >
                    남성
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    signupData.gender === 'female'
                      ? commonStyles.selectedGenderButton
                      : commonStyles.genderButton
                  }
                  onPress={() => setSignupData({ ...signupData, gender: 'female' })}
                >
                  <Text
                    style={
                      signupData.gender === 'female'
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
      <ScrollView contentContainerStyle={commonStyles.content}>{renderStepContent()}</ScrollView>

      {/* 하단 버튼 */}
      <TouchableOpacity
        style={commonStyles.button}
        onPress={handleNextStep}
        disabled={!isPasswordMatch && step === 2} // 비밀번호가 일치하지 않으면 버튼 비활성화
      >
        <Text style={commonStyles.buttonText}>
          {step === 3 ? '회원가입 완료' : '계속하기'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
