import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
  // console.log(props);
  
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      buttonWrapperStyle={{marginHorizontal:12}}
      // color={Platform.OS === 'android' ? 'white' : Colors.primary}
      color={props.iconName === 'md-remove'? 'red': 'white'}
      buttonStyle={{backgroundColor: Colors.primary}}
    />
  );
};

export default CustomHeaderButton;