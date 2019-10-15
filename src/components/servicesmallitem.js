import * as React from 'react';
import { Text } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../common/colors';

export default class ServiceSmallItem extends React.Component {

  render() {

    const { text, icon } = this.props;

    return (
      <Flex style={{ paddingVertical: 4, borderBottomColor:'#ddd', borderBottomWidth:1, backgroundColor:'#fff' }}>
        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={colors.ORANGE}
          style={{ marginHorizontal: 12 }}
        />
        <Text style={{ fontWeight: '500', fontFamily:'Muli',fontSize:12 }}>{text}</Text>
      </Flex>
    )
  }
}