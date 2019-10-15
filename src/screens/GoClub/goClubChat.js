import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import Avatar from '../../components/Avatar';
import { Actions } from 'react-native-router-flux';

export default class GoClubChat extends React.Component {

  constructor(){
      super();
      this.state = {
          content:''
      }
  }
  render() {
    return (
      <View style={[commonStyles.container]}>
        <View style={styles.header}>
           <TouchableOpacity onPress={()=>Actions.pop()}>
             <Image source={require('../../../assets/images/arrow/button_backarrow_purple.png')} style={{ width: 30, height: 30, marginLeft:5 }}/>
           </TouchableOpacity>
           <View style={{alignItems:'center'}}>
               <Avatar image="https://image.tmdb.org/t/p/w235_and_h235_face/nweQTbIHNjZrsQsXYJ5ONmupVh.jpg" size={40} />
               <Text>BadminTon, Jurong</Text>
           </View>
           <Image source={require('../../../assets/images/button/button_info_purple.png')} style={{ width: 30, height: 30, marginRight:12 }}/>

        </View>
        <Text style={[texts.LISTTEXT, {marginTop:12, marginLeft:12, flex:1}]}></Text>
        <View style={styles.footer}>

            <TouchableOpacity onPress={()=>this.setState({content:''})} style={{marginHorizontal:12}}>
                <Image source={require('../../../assets/images/other/icon_photo_purple.png')} style={{width:32, height:32}} />
            </TouchableOpacity>

            <TouchableOpacity style={{position:'absolute', right:20, top:10}}>
                <Image source={require('../../../assets/images/button/button_send_grey.png')} style={{width:36, height:36}} />
            </TouchableOpacity> 

            <TextInput
                style={[commonStyles.INPUT.normal, { marginBottom:10, borderRadius:7, paddingLeft:10, width: '78%'}]}  
                underlineColorAndroid="transparent"
                placeholder="Message"
                onChangeText={content => this.setState({ content })}
                value={this.state.content}
            />

            </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    header:{
        paddingTop:12,
        backgroundColor: '#fff',
        elevation:2,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    footer:{
        alignItems:'center',
        flexDirection:'row',
        position:'relative',
        elevation:5,
        height:55,
        backgroundColor:'#fff'
    }
});