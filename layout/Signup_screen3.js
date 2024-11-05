import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Signup3({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('male');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleFormSubmit = () => {
    if (termsAccepted && privacyAccepted) {
      Alert.alert('성공', '회원가입이 완료되었습니다.');
      navigation.navigate('Main');
    } else {
      Alert.alert('주의', '이용약관 및 개인정보 처리방침에 동의해 주세요.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 네비게이션 바 */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>회원가입</Text>
      </View>

      {/* 폼 내용 */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>전화번호 입력</Text>
        <TextInput
          style={styles.input}
          placeholder="전화번호를 입력해주세요."
          placeholderTextColor="#C4C4C4"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <View style={styles.genderContainer}>
          <Text style={styles.label}>성별 선택</Text>
          <View style={styles.genderSelect}>
            <TouchableOpacity
              style={gender === 'male' ? styles.selectedGenderButton : styles.genderButton}
              onPress={() => setGender('male')}
            >
              <Text style={gender === 'male' ? styles.selectedGenderText : styles.genderText}>남성</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={gender === 'female' ? styles.selectedGenderButton : styles.genderButton}
              onPress={() => setGender('female')}
            >
              <Text style={gender === 'female' ? styles.selectedGenderText : styles.genderText}>여성</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.checkboxContainer}>
          <Switch
            value={termsAccepted}
            onValueChange={setTermsAccepted}
            thumbColor={termsAccepted ? '#00aaff' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
          <Text style={styles.checkboxLabel}>Triptip 이용약관에 동의합니다.</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Switch
            value={privacyAccepted}
            onValueChange={setPrivacyAccepted}
            thumbColor={privacyAccepted ? '#00aaff' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
          <Text style={styles.checkboxLabel}>Triptip 개인정보 처리방침에 동의합니다.</Text>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>회원가입 완료</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
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
  genderContainer: {
    marginBottom: 20,
  },
  genderSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  selectedGenderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#00aaff',
    backgroundColor: '#00aaff',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  genderText: {
    color: '#000',
    fontSize: 16,
  },
  selectedGenderText: {
    color: '#fff',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
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
