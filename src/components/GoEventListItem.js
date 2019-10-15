import * as React from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { texts } from '../common/texts';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../common/colors';
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get("window").width;

export default class GoEventListItem extends React.Component {
 
  render() {
      const {title, image, start, end, joined, hi} = this.props;
    return (
        <TouchableOpacity onPress={()=>Actions.goeventprofile()} style={{backgroundColor:colors.WHITE, marginVertical:5, flexDirection:'row', flex:1, width:'100%', alignItems:'center'}}>
            <Image source={{uri:image}} style={{width:96, height:115}}/>
            <View style={{paddingVertical:6, paddingLeft:10, flex:1, width:'100%'}}>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../assets/images/social/icon_cat_runningman.png')} style={{width:30, height:30}} />
                    <Text style={[texts.HEADLINE, {maxWidth:width-158}]} numberOfLines={2}>{title}</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={require('../../assets/images/social/icon_startwork_inactive.png')} style={{width:24, height:24}} />
                    <Text style={[texts.CAPTION.PRIMARY, {maxWidth:width-164, marginLeft:4}]} numberOfLines={2}>{start + ' - ' + end}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Image source={{uri:image}} style={{width:20, height:20, borderRadius:10, marginLeft:2}} />
                    <Text style={[texts.LISTTEXT, {maxWidth:width-170, marginLeft:5}]} numberOfLines={1}>{hi}</Text>
                </View>
                <Text style={{marginLeft:1, fontSize:11, color:colors.PURPLE}}>{joined} people have joined this event recently!</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={45} color={colors.PURPLE} />
        </TouchableOpacity>
    )
  }
}