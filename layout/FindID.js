import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FindID({ navigation }) {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleIDRetrieval = () => {
    // 아이디 찾기 로직 추가
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    alert('아이디가 이메일로 전송되었습니다.');
  };

  return (
    <View style={styles.container}>
      {/* 네비게이션 바 */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>아이디 찾기</Text>
      </View>

      {/* 폼 내용 */}
      <View style={styles.content}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일을 입력해주세요."
          placeholderTextColor="#C4C4C4"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>전화번호</Text>
        <TextInput
          style={styles.input}
          placeholder="전화번호를 입력해주세요."
          placeholderTextColor="#C4C4C4"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      {/* 하단 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleIDRetrieval}>
        <Text style={styles.buttonText}>아이디 찾기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    marginBottom: 20,
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#A6D8FF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
