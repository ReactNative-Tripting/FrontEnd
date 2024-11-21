import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import commonStyles from './Style';

const TopHeader = ({ navigation, scrollY }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // This is an Animated value that will track scroll position
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150], // When the scroll position goes over 150
    outputRange: [1, 0], // The header fades out
    extrapolate: 'clamp',
  });

  const handleLeftPress = () => {
    // Navigate to the menu or any action when the menu is pressed
    console.log('Left button pressed');
  };

  const handleRightPress = () => {
    // Navigate to user profile or any other action when the user icon is pressed
    console.log('Right button pressed');
  };

  // You can check if scrolled and modify header content
  if (scrollY > 50) {
    setIsScrolled(true);
  } else {
    setIsScrolled(false);
  }

  return (
    <Animated.View
      style={[commonStyles.header, { opacity: headerOpacity }]}
    >
      <TouchableOpacity onPress={handleLeftPress}>
        <Icon name="menu" size={28} color="black" />
      </TouchableOpacity>

      {/* Conditionally render the title based on scroll */}
      <Text style={commonStyles.headerTitle}>
        {isScrolled ? 'Scrolled Title' : '트립팅'}
      </Text>

      <TouchableOpacity onPress={handleRightPress}>
        <IconAnt name="user" size={28} color="black" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TopHeader;
