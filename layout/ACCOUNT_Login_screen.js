import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      console.log('로그인 시도 중...');
      const response = await fetch('http://localhost:8080/users/login', {
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
        console.log('API 응답 데이터:', data);

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

          console.log('Id 저장값',userId);

          Alert.alert('로그인 성공', `환영합니다, ${user.username}!`); // 사용자 이름을 표시
          navigation.replace('Main');
        } else {
          console.error('API에서 token 또는 user가 누락되었습니다.');
          Alert.alert('로그인 실패', '서버에서 유효한 데이터를 받지 못했습니다.');
        }
      } else {
        const error = await response.json();
        console.log('Error Response:', error);
        Alert.alert('로그인 실패', error.message || '아이디 또는 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('오류 발생', '서버와 통신 중 문제가 발생했습니다.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>안녕하세요.</Text>
      <Text style={styles.subtitle}>Tripting 입니다.</Text>
      <Text style={styles.description}>먼저 로그인이 필요합니다 :)</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your ID"
        placeholderTextColor="#999"
        value={userId}
        onChangeText={setUserId}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
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

      <View style={styles.rememberContainer}>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          thumbColor={rememberMe ? '#4caf50' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
        <Text style={styles.rememberText}>기억하기</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      {/* Navigation Links */}
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('FindID')}>
          <Text style={styles.linkText}>아이디 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FindPw')}>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider}></View>

      <Text style={styles.quickLoginText}>간편 로그인</Text>

      <TouchableOpacity style={[styles.socialButton, styles.kakaoButton]}>
        <Text style={styles.socialText}>카카오톡</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.naverButton]}>
        <Text style={styles.socialText}>네이버</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <Text style={styles.socialText}>구글</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeIcon: {
    fontSize: 18,
    color: '#999',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  loginButton: {
    backgroundColor: '#ADD8E6',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 12,
    color: '#0066cc',
    marginHorizontal: 10,
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  quickLoginText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  socialButton: {
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  kakaoButton: {
    backgroundColor: '#fee500',
  },
  naverButton: {
    backgroundColor: '#03C75A',
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  socialText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});