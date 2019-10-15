import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Dimensions, ScrollView } from 'react-native';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import { colors } from '../../common/colors';
import UtilService from '../../utils/utils';
import Avatar from '../../components/Avatar';
import GoClubFeedbackListItem from '../../components/GoClubFeedbackListItem';
import { FEEDBACK, FEEDBACK2 } from '../../common/staticdata';
import Bar from '../../components/Bar';
import { texts } from '../../common/texts';

export default class GoClubAllMembers extends React.Component {

  state={
      content:'',
  }

  _renderItem = ({ item }) => (
      <GoClubFeedbackListItem image={item.image} title={item.name} position={item.position} count={item.count} admin={item.admin} me={item.me} pending={item.pending}/>
   );

  _ItemSeparator = () => <View style={styles.separator} />;
 
  render() {
    const {content} = this.state
    return (
          <View style={commonStyles.container}>
            <Header title={'View All Members'} />
             <ScrollView>
              <View style={{position:'relative'}}>
                <TouchableOpacity style={{position:'absolute', left:20, top:18}}>
                  <Image source={require('../../../assets/images/fav/button_search_purple.png')} style={{width:20, height:20}} />
                </TouchableOpacity> 

                <TextInput
                  style={[commonStyles.INPUT.normal, { marginBottom:10, borderRadius:7, paddingLeft:40, width: content.length > 0 ? '75%':'94%'}]}  
                  underlineColorAndroid="transparent"
                  placeholder="Search through All Members"
                  onChangeText={content => this.setState({ content })}
                  value={this.state.content}
                />

                {
                    content.length > 0 &&
                    <TouchableOpacity onPress={()=>this.setState({content:''})} style={{position:'absolute', right:20, top:15}}>
                        <Avatar image={UtilService.getRemoveIcon(3)} size={26} local={true}/>
                    </TouchableOpacity>
                } 

              </View>

              <Text style={[texts.HEADLINE, {marginVertical:5, marginHorizontal:12}]}>Pending Approval</Text>

              <FlatList
                data={FEEDBACK2}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._ItemSeparator}
              />

              <Bar />

              <FlatList
                data={FEEDBACK}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._ItemSeparator}
              />
            </ScrollView>
          </View>
    )
  }
}

const styles = StyleSheet.create({
    button:{
        marginHorizontal:12,
        borderColor:colors.PURPLE,
        borderWidth:1,
        borderRadius:1,
        marginVertical:10,
        padding:8
    },
    separator: {
      height: 5,
      backgroundColor: 'rgba(0, 0, 0, .08)',
    },
   
});