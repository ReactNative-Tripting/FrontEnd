import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
//import CheckBox from '@react-native-community/checkbox'; // CheckBox 모듈 import
import { Switch } from 'react-native';

export default function LoginScreen() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* 상단 로고 */}
     
      <Text style={styles.title}>안녕하세요.</Text>
      <Text style={styles.subtitle}>Tripting 입니다.</Text>
      <Text style={styles.description}>먼저 로그인이 필요합니다 :)</Text>

      {/* 아이디 입력 필드 */}
      <TextInput 
        style={styles.input} 
        placeholder="아이디" 
        placeholderTextColor="#999"
      />

      {/* 비밀번호 입력 필드 */}
      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="비밀번호" 
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.eyeIcon}>👁️</Text>
        </TouchableOpacity>
      </View>

      {/* 기억하기 체크박스 */}
      <View style={styles.rememberContainer}>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
        />
        <Text style={styles.rememberText}>기억하기</Text>
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      {/* 아이디, 비밀번호 찾기 및 회원가입 */}
      <Text style={styles.helpText}>아이디 찾기   비밀번호 찾기   회원가입</Text>

      {/* 구분선 */}
      <View style={styles.divider}></View>

      {/* 간편 로그인 */}
      <Text style={styles.quickLoginText}>간편 로그인</Text>

      {/* 카카오톡 로그인 버튼 */}
      <TouchableOpacity style={[styles.socialButton, styles.kakaoButton]}>
        <Text style={styles.socialText}>카카오톡</Text>
      </TouchableOpacity>

      {/* 네이버 로그인 버튼 */}
      <TouchableOpacity style={[styles.socialButton, styles.naverButton]}>
        <Text style={styles.socialText}>네이버</Text>
      </TouchableOpacity>

      {/* 구글 로그인 버튼 */}
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
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100, // 로고 크기
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  eyeIcon: {
    fontSize: 18,
    marginRight: 10,
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
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
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
    padding: 15,
    borderRadius: 5,
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