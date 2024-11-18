//스플레시 스크린, 어플리케이션 시작시 로고 출력 후, 메인페이지로 이동
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();
//스플레시 스크린 출력 후, 일정시간 후 메인화면 출력하기 위한 코드
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // 뒤로가기 눌러도 다시 스플레시 화면으로 가지 않게 끔 replace 사용
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('./image/logo.png')} // 로고 이미지
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
