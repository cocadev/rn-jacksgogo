import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import Header from '../../components/Header';
import { commonStyles } from '../../common/commonStyles';
import { images } from '../../common/images';
import { Actions } from "react-native-router-flux"
import i from '../../common/i';

export default class Payment extends React.Component {
  render() {
    return (
      <View
        style={i.container}>
        <Header action="payment" type={2} title="Payment Method" rightElement={(
            <TouchableOpacity style={commonStyles.ICON.iconRight} onPress={()=>Actions.editpayment()}>
              <Image
                source={images.icon.orange_right_edit}
                style={commonStyles.IMAGE.logo_round_35}
              />
            </TouchableOpacity>
        )}/>
        <View style={commonStyles.VIEW.centerView}>
          <View style={styles.card}>
            <Text style={styles.visa}> VISA </Text>
            <View style={styles.mark} />
            <WhiteSpace />
            <Flex justify="around">
              <Text style={styles.number}>****</Text>
              <Text style={styles.number}>****</Text>
              <Text style={styles.number}>****</Text>
              <Text style={styles.number}>3792</Text>
            </Flex>
            <WhiteSpace />
            <Text style={styles.titlecard}> VALID THRU </Text>
            <Text style={styles.date}> 09/21 </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date:{
    fontSize: 17,
    color: '#fff',
    left: 150,
    fontWeight: '600',
  },
  titlecard:{
    fontSize: 15,
    color: '#fff',
    left: 150 
  },
  number:{
    fontSize: 25,
    color: '#fff'
  },
  mark:{
    width: 50,
    height: 30,
    backgroundColor: '#fef1b8',
    marginLeft: 10,
  },
  visa:{
    textAlign: 'right',
    fontSize: 36,
    color: '#fff' 
  },
  card:{
    backgroundColor: '#FB7C23',
    height: 200,
    margin: 2,
    borderRadius: 16,
    width: '85%',
    padding: 15,
  }
});