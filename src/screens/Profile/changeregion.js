import React from 'react';
import { View, Text, Image } from 'react-native';
import { texts } from '../../common/texts';
import { colors } from '../../common/colors';
import Header from '../../components/Header';
import { commonStyles } from '../../common/commonStyles';
import { images } from '../../common/images';
import i from '../../common/i';

export default class ChangeRegion extends React.Component {
  render() {
    return (
      <View style={i.container}>
        <Header action="changeregion" type={2} title="Change Region" />
        <View style={commonStyles.VIEW.main}>
          <Text style={[texts.TITLE2, {marginVertical:30}]}> Your Current active region is </Text>
          <Image style={commonStyles.IMAGE.logo_round_80} source={images.flag.icon_singapore} />
          <Text style={[texts.HEADLINE, {marginVertical:10}]}> Singapore </Text>
          <Text style={[texts.LISTTEXT, {marginVertical:25}]}>
            You can only view content from Singapore. To view content from other
            countries, active your other regional account.
          </Text>
          <View style={[commonStyles.VIEW.rowView, {backgroundColor:colors.ORANGE,paddingVertical:6}]}>
            <Image style={[commonStyles.IMAGE.logo_round_35, {marginRight:20}]} source={images.flag.icon_malaysia} />
            <Text style={[texts.HEADLINE, {color:colors.WHITE}]}> Activate Malaysia Account </Text>
          </View>
        </View>
      </View>
    );
  }
}
