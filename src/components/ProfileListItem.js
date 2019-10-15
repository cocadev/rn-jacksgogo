import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { Entypo } from '@expo/vector-icons';
import { texts } from '../common/texts';
import { colors } from '../common/colors';
import Avatar from './Avatar';

export default class ProfileListItem extends React.Component {

  render() {

    const { text, image } = this.props;

    return (
      <Flex style={{ backgroundColor: colors.WHITE, paddingHorizontal: 12, marginVertical: 3, height:70 }}>
        <Avatar image={image} size={60}/>
        <Text style={[styles.listText, { marginLeft: 10 }]}>{text}</Text>
        <Text style={[styles.listText, { color: colors.ORANGE, textAlign: "right", flex: 1 }]}>
          <Entypo
            name="chevron-right"
            size={20}
            color='#F26513'
          />
        </Text>
      </Flex>
    )
  }
}

const styles = StyleSheet.create({
  listText: texts.LISTTEXT
})