import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import { colors } from '../../common/colors';

export default class GoClubNewEventDetailTab1 extends React.Component {

  state = {
    content1:'',
    content2:'',
    content3:''
  }

  render() {
    return (
      <View style={{  flex:1 }}>

        <Text style={texts.LISTTEXT}>This will create on event that is associated with Badminton, Jurong.</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={texts.LISTTEXT}>To create an independent event, tap</Text>
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}> here.</Text>
        </View>

        <Text style={[texts.LISTTITLE, {marginTop:14}]}>Give your event a short title.</Text>
        <TextInput
            style={[commonStyles.INPUT.simple, { paddingLeft:10, marginHorizontal:0 }]}  
            underlineColorAndroid="transparent"
            placeholder="e.g. Neighbourhood Football Match"
            onChangeText={content1 => this.setState({ content1 })}
            value={this.state.content1}
        />

        <Text style={[texts.LISTTITLE, {marginTop:14}]}>Give your event a short title.</Text>
        <TextInput
            style={[commonStyles.INPUT.simple, { paddingLeft:10, marginHorizontal:0 }]}  
            underlineColorAndroid="transparent"
            placeholder="e.g. Neighbourhood Football Match"
            onChangeText={content1 => this.setState({ content1 })}
            value={this.state.content1}
        />

        <Text style={[texts.LISTTITLE, {marginTop:14}]}>Give your event a short title.</Text>
        <TextInput
            style={[commonStyles.INPUT.simple, { paddingLeft:10, marginHorizontal:0 }]}  
            underlineColorAndroid="transparent"
            placeholder="e.g. Neighbourhood Football Match"
            onChangeText={content1 => this.setState({ content1 })}
            value={this.state.content1}
        />
        
        <TouchableOpacity style={styles.photoButton}>
          <Image source={require('../../../assets/images/other/icon_photo_purple.png')} style={{width:32, height:32, marginRight:20}} />
          <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Include Photos (Optional)</Text>
        </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  photoButton: {
    flexDirection:'row',
    height: 42,
    borderColor: colors.PURPLE,
    borderWidth: 1,
    borderRadius: 2,
    marginTop: 20,
    paddingLeft: 10,
    justifyContent:'center',
    alignItems:'center'
  },
});
