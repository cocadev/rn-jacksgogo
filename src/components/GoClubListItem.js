import * as React from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { texts } from '../common/texts';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../common/colors';
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get("window").width;

export default class GoClubListItem extends React.Component {
 
  render() {
      const {title, image, position, count} = this.props;
    return (
        <TouchableOpacity onPress={()=>Actions.goclubprofile()} style={{backgroundColor:colors.WHITE, marginLeft:10, marginTop:10}}>
            <Image source={{uri:image}} style={{width:width/2-16, height:128}}/>
            <View style={{paddingTop:10, paddingHorizontal:5}}>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../assets/images/social/icon_cat_sports.png')} style={{width:30, height:30}} />
                    <Text style={[texts.HEADLINE, {maxWidth:width/2-64}]} numberOfLines={2}>{title}</Text>
                </View>
                <Text style={{maxWidth:width/2-34}} numberOfLines={2} >{position}</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <MaterialIcons name="group" size={25} color={colors.GREY2} />
                    <Text style={{marginLeft:10}}>{count}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
  }
}