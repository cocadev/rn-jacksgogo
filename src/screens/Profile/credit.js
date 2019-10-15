import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import { List, Flex, Button } from 'antd-mobile-rn'
import { colors } from '../../common/colors';
import { commonStyles } from '../../common/commonStyles';
import { images } from '../../common/images';

export default class Credit extends React.Component {
  render() {
    return (
      <View style={[commonStyles.container, {marginTop:22}]}>
        <View style={[commonStyles.VIEW.main, styles.headerContainer]}>
          <Text style={texts.HEADLINE}>Credit</Text>
          <Text style={[texts.TITLE1,{lineHeight:40}]}>$ 150.00</Text>
          <TouchableOpacity onPress={()=>Actions.pop('credit')} style={{position:'absolute', top:10, left:10}}>
            <Image source={images.icon.left_arrow_orange} style={commonStyles.ICON.arrowIcon}/>
          </TouchableOpacity>
        </View>
        <Flex justify='around' style={{backgroundColor:'#fff'}}>
          <Text style={[texts.CAPTION.BOLD, { lineHeight: 37 }]}>Details</Text>
          <Text style={[texts.CAPTION.BOLD, { lineHeight: 37, marginLeft:130 }]}>Added ($)</Text>
          <Text style={[texts.CAPTION.BOLD, { lineHeight: 37 }]}>Used ($)</Text>
        </Flex>
        <List>
          <List.Item >
            <Text style={[texts.CAPTION.SECONDARY, { lineHeight: 37 }]}>11 Jun, 2017</Text>
            <Text style={texts.LISTTEXT}>Outgoing Payment to</Text>
            <Text style={texts.LISTTITLE}>Alan.Tam</Text>
            <Text style={[texts.CAPTION.PRIMARY, { lineHeight: 37 }]}>Job Ref. No. J38291</Text>
            <Text style={[texts.LISTTITLE, {position:'absolute',right:3, top:35}]}>30.00</Text>
            <Text style={[texts.LISTTITLE, {position:'absolute',right:80, top:35}]}></Text>
          </List.Item>
          <List.Item >
            <Text style={[texts.CAPTION.SECONDARY, { lineHeight: 37 }]}>8 Jun, 2017</Text>
            <Text style={texts.LISTTEXT}>Incoming Payment to</Text>
            <Text style={texts.LISTTITLE}>Elaine.Kok</Text>
            <Text style={[texts.CAPTION.PRIMARY, { lineHeight: 37 }]}>Job Ref. No. J38223</Text>
            <Text style={[texts.LISTTITLE, {position:'absolute',right:3, top:35}]}></Text>
            <Text style={[texts.LISTTITLE, {position:'absolute',right:80, top:35}]}>180.00</Text>
          </List.Item>
        </List>
        <View style={{justifyContent:'flex-end',flex:1}}>
          <Text style={[texts.CAPTION.PRIMARY, styles.demoText]}>Tap to see when payment method is already set up</Text>
          <Button style={styles.button}>
            <Text style={[styles.BUTTON, {color:'#fff'}]}>Set Up Payment Method</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer:{
    backgroundColor:colors.LIGHTORANGE,
    paddingVertical:36
  },
  button:{
    alignItems:'center', 
    backgroundColor:colors.ORANGE,
    height:60
  },
  demoText:{
    color:colors.PURPLE,
    textAlign:'center',
    paddingHorizontal:70, 
    marginBottom:30
  }
});