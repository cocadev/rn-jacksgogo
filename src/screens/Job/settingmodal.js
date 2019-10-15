import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SERVICEITEMS, SERVICEITEMS2 } from '../../common/staticdata';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import { colors } from '../../common/colors';
import { WhiteSpace, Flex, Checkbox } from '@ant-design/react-native';



export default class SettingModal extends React.Component {

  constructor() {
    super();
    this.state = {
      content: ''
    }
  }

  render() {

    return (
      <View style={styles.container}>
          <View style={styles.icon}>
            <TouchableOpacity >
              <MaterialIcons name="check" size={20} color={colors.WHITE} />
            </TouchableOpacity>
          </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={[styles.headline, { lineHeight: 47, marginTop: 40 }]}>Area</Text>
          <Flex>
            <View style={{ flex: 1 }}>
              <Checkbox>CBD</Checkbox>
            </View>
            <View style={{ flex: 1 }}>
              <Checkbox>Orchard</Checkbox>
            </View>
          </Flex>
          <WhiteSpace />
          <Flex>
            <View style={{ flex: 1 }}>
              <Checkbox>Central South</Checkbox>
            </View>
            <View style={{ flex: 1 }}>
              <Checkbox>Newton</Checkbox>
            </View>
          </Flex>
          <WhiteSpace />
          <Flex>
            <View style={{ flex: 1 }}>
              <Checkbox>Eunos</Checkbox>
            </View>
            <View style={{ flex: 1 }}>
              <Checkbox>Toa Payoh</Checkbox>
            </View>
          </Flex>
          <WhiteSpace />

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

          <WhiteSpace />

          <Text style={[styles.headline, { lineHeight: 22, marginTop: 20 }]}>Additional Tags</Text>

          <TextInput
            style={[styles.input, { marginHorizontal: 0 }]}
            underlineColorAndroid='transparent'
            placeholder="Separate tags with comma"
            onChangeText={content => this.setState({ content })}
            value={this.state.content}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon:{ 
    backgroundColor: colors.CYAN,
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'},
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