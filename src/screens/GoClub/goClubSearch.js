import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import Bar from '../../components/Bar';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import UtilService from '../../utils/utils';
import Avatar from '../../components/Avatar';
import { SERVICEITEMS2 } from '../../common/staticdata';

export default class GoClubSearch extends React.Component {

  state={
      content:''
  }

  _renderItem = ({ item }) => (
     <View style={{backgroundColor:colors.WHITE, padding:12}}>
       <Text>{item.title}</Text>
     </View>
   );

  _ItemSeparator = () => <View style={styles.separator} />;
 
  render() {
    return (
          <View style={commonStyles.container}>
            <Header title={'Search GoClubs'} />
            <ScrollView>
              <View style={{position:'relative'}}>
                <TouchableOpacity style={{position:'absolute', right:20, top:14, zIndex:1}}>
                  <Avatar image={UtilService.getSearchIcon(3)} size={28} local={true}/>
                </TouchableOpacity>

                <TextInput
                  style={commonStyles.INPUT.normal}  
                  underlineColorAndroid="transparent"
                  placeholder="Search for GoClubs"
                  onChangeText={content => this.setState({ content })}
                  value={this.state.content}
                />
              </View>

              <View style={[commonStyles.longbutton, {alignItems:'center'}]}>
                <Text style={[texts.HEADLINE, {color:colors.PURPLE}]}>Advanced Search </Text>
              </View>

              <Bar />

              <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:12, marginVertical:6}}>
                <Text style={texts.HEADLINE}>History</Text>
                <Text style={{color:colors.PURPLE}}>Clear</Text>
              </View>

              <FlatList
                data={SERVICEITEMS2}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._ItemSeparator} 
              />

              <Bar/>

              <Text style={[texts.HEADLINE, {marginHorizontal:12}]}>Want to search for others instead?</Text>

              <View style={commonStyles.longbutton}>
                <Text style={[texts.HEADLINE, {color:colors.PURPLE}]}>Services</Text>
              </View>
              <View style={commonStyles.longbutton}>
                <Text style={[texts.HEADLINE, {color:colors.PURPLE}]}>Jobs</Text>
              </View>
              <View style={commonStyles.longbutton}>
                <Text style={[texts.HEADLINE, {color:colors.PURPLE}]}>GoClubs</Text>
              </View>
              <View style={commonStyles.longbutton}>
                <Text style={[texts.HEADLINE, {color:colors.PURPLE}]}>Users</Text>
              </View>
            </ScrollView>
          </View>
    )
  }
}

const styles = StyleSheet.create({
    separator: {
      height: 5,
      backgroundColor: 'rgba(0, 0, 0, .08)',
    },
});