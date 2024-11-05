import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SignUp2({ navigation }) {
  const [password, setPassword] = useState('');
  const [pwcheck, setPwcheck] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [gender, setGender] = useState('');
  const [termsofuse, setTermsofuse] = useState('');
  const [personalinfouse, setPersonalinfouse] = useState('');

  const isPasswordMatch = password === pwcheck || pwcheck === '';

  const handleSubmit = () => {
    console.log('Password:', password);
    console.log('Phonenum:', phonenum);
    console.log('Gender:', gender);
  };

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>회원가입</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력해 주세요."
          placeholderTextColor="#C4C4C4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>비밀번호 확인</Text>
        <TextInput
          style={styles.input}
          placeholder="다시 입력해 주세요."
          placeholderTextColor="#C4C4C4"
          value={pwcheck}
          onChangeText={setPwcheck}
          secureTextEntry
        />

        {!isPasswordMatch && (
          <Text style={styles.errorText}>비밀번호가 일치하지 않습니다</Text>
        )}
      </View>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp3')}>
          <Text style={styles.buttonText}>계속하기</Text>
        </TouchableOpacity>
      </View>
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#A6D8FF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
