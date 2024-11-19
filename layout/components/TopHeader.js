import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import commonStyles from './Style';

const TopHeader = ({Navigation}) =>(
<View style={commonStyles.header}>
    <TouchableOpacity>
        <Icon name="menu" size={28} color="black" />
    </TouchableOpacity>
    <Text style={commonStyles.headerTitle}>트립팅</Text>
    <TouchableOpacity>
        <IconAnt name="user" size={28} color="black" />
    </TouchableOpacity>
    </View>
);
export default TopHeader;