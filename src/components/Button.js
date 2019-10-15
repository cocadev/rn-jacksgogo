import * as React from 'react';
import { View } from 'react-native';
import { colors } from '../common/colors';
import { Entypo } from '@expo/vector-icons';

export default class ButtonComponent extends React.Component {
 
  render() {
   const {color,iconName} = this.props;
    return (
          <View
            style={{
              borderRadius: 20,
              backgroundColor: color,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Entypo name={iconName} size='26' color={colors.WHITE} />
          </View>
    )
  }
}