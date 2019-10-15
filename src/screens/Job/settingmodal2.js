import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SERVICEITEMS, SERVICEITEMS2 } from '../../common/staticdata';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import { colors } from '../../common/colors';
import { WhiteSpace, Flex, Checkbox } from 'antd-mobile-rn';

export default class SettingModal2 extends React.Component {

  constructor() {
    super();
    this.state = {
      content: ''
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: colors.CYAN,
            position: 'absolute',
            right: 10,
            top: 10,
            borderRadius: 30,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity >
            <MaterialIcons name="check" size={20} color={colors.WHITE} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 10 }}>

          <WhiteSpace />
          <WhiteSpace />
          <WhiteSpace />

          <WhiteSpace />

          <Text style={[styles.headline, { lineHeight: 22, marginTop: 20 }]}>Location</Text>

          <TextInput
            style={[styles.input, { marginHorizontal: 0 }]}
            underlineColorAndroid='transparent'
            placeholder="2 Jurong West Avenue 5"
            onChangeText={content => this.setState({ content })}
            value={this.state.content}
          />

          <View style={{ backgroundColor: colors.CYAN, borderRadius: 5, height: 50, marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.listtitle, { color: colors.WHITE, textAlign: 'center' }]}>Use Your Current Location</Text>
          </View>

          <Text style={[styles.headline, { lineHeight: 45, marginTop: 10 }]}>Categories</Text>
          <Flex justify="between">
            {
              SERVICEITEMS.map((item, index) => (
                <View style={[styles.category, { width: 70, height: 70 }]} key={index}>
                  <MaterialIcons
                    name={item.icon}
                    size={38}
                    color={colors.ORANGE}
                  />
                  <View style={{ height: 32, justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={[styles.caption, { textAlign: 'center' }]}>{item.title}</Text>
                  </View>
                </View>
              ))
            }
          </Flex>

          <WhiteSpace />
          <WhiteSpace />

          <Flex justify="between">
            {
              SERVICEITEMS2.map((item, index) => (
                <View style={[styles.category, { width: 70, height: 70 }]} key={index}>
                  <MaterialIcons
                    name={item.icon}
                    size={38}
                    color={colors.ORANGE}
                  />
                  <View style={{ height: 32, justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={[styles.caption, { textAlign: 'center' }]}>{item.title}</Text>
                  </View>
                </View>
              ))
            }
          </Flex>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  listtitle: texts.LISTTITLE,
  caption: texts.CAPTION.SECONDARY,
  headline: texts.HEADLINE,
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: 'Muli'
  },
  category: {
    width: 80,
    height: 80,
    backgroundColor: '#e1f1f8',
    alignItems: 'center'
  }
});