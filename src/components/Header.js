import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Image } from 'react-native';
import { Modal, ActionSheet, Button } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import { colors } from '../common/colors';
import { texts } from '../common/texts';
import { images } from '../common/images';
import { commonStyles } from '../common/commonStyles';

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      clicked: 'none',
      text: '',
    }
  }

  showShareActionSheet = () => {
    const opts = {
      url: 'https://www.alipay.com/',
      message: 'message to go with the shared url',
      excludedActivityTypes: [
        <Button onClick={() => ActionSheet.close()}>close ActionSheet</Button>
      ],
      subject: null
    }
    if (Platform.OS === 'ios') {
      opts.subject = 'a subject to go in the email heading'
      opts.excludedActivityTypes = [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    }

    ActionSheet.showShareActionSheetWithOptions(opts, (error) => alert(error), (success, method) => {
      let text
      if (success) {
        text = `by ${method} share it`
      } else {
        text = 'You did not share'
      }
      this.setState({ text })
    })
  }

  onButtonQuit = () => {
    Modal.alert('Quit Posting A New Service?', ('All info will be lost.'), [
      { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
      { text: 'Quit', onPress: () => Actions.pop('postjob') }
    ])
  }

  onButtonPost = () => {
    Modal.alert('Service Posted!', ('Service reference no: S38921-11'), [
      { text: 'View Service', onPress: () => console.log('ok') }
    ])
  }

  onButtonQuitEditProfile= () => {
    Actions.pop('editprofile')
  }



  render() {
    const { type } = this.props;
    let icon_image

    if(type == 0){
      color = colors.CYAN
      icon_image = images.icon.button_backarrow_cyan
    } else if(type == 1){
      color = colors.GREEN
      icon_image = images.icon.button_backarrow_green
    } else if(type == 2){
      color = colors.ORANGE
      icon_image = images.icon.button_backarrow_orange
    } else{
      color = colors.PURPLE
      icon_image = images.icon.button_backarrow_purple
    }

    return (
      <View style={styles.container}>
        {<TouchableOpacity onPress={()=>Actions.pop()} style={[commonStyles.ICON.iconLeft, {justifyContent:'center'}]}>
            <Image
              source={icon_image}
              style={{ width: 30, height: 30 }}
            />
        </TouchableOpacity>}
        <View style={styles.view}>
          <Text style={[texts.TITLE3, {marginBottom:4}]}>{this.props.title}</Text>
        </View>
        
        {this.props.leftElement}
        {this.props.rightElement}
        {this.props.FavElement}

      </View>
      
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: 36,
    width:'100%',
    paddingHorizontal: 10,
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: '#fff',
    elevation:3,
    marginBottom:2,
  },
  view:{
    flex:1,
    justifyContent:'center', 
    alignItems:'center'
  },
});
