import React from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { texts } from '../../common/texts';
import { JacksGoGoText } from '../../common/staticdata';
import Header from '../../components/Header';
import { commonStyles } from '../../common/commonStyles';
import { colors } from '../../common/colors';
import { images } from '../../common/images';

export default class JacksGoGo extends React.Component {
  render() {
    return (
      <View style={commonStyles.container}>
        <ScrollView>
          <Header action="jacksgogo" title="Jacks GoGo" />
          <View style={commonStyles.VIEW.centerView}>
            <View style={[commonStyles.VIEW.centerView, {backgroundColor: colors.LIGHTORANGE, height: 200}]}>
              <Image source={images.logo} style={commonStyles.IMAGE.logo_size_150} />
            </View>
            <View style={commonStyles.VIEW.main}>
              <Text style={[texts.TITLE2, {padding:10}]}>Title</Text>
              <Text style={texts.LISTTEXT}>{JacksGoGoText}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
