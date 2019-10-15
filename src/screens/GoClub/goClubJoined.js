import * as React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Dimensions, ScrollView } from 'react-native';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import { colors } from '../../common/colors';
import UtilService from '../../utils/utils';
import Avatar from '../../components/Avatar';
import { JOBLISTING } from '../../common/staticdata';
import { texts } from '../../common/texts';
import GoClubListItem from '../../components/GoClubListItem';

export default class GoClubJoined extends React.Component {

  state={
      content:'',
  }

  _renderItem = ({ item }) => (
      <GoClubListItem image={item.image} title={item.title} position={item.position} count={item.count} />
   );

  _ItemSeparator = () => <View style={styles.separator} />;
 
  render() {
    const {content} = this.state
    return (
          <View style={commonStyles.container}>
            <Header title={'Joined GoClubs'} />
             <ScrollView>
              <View style={{position:'relative'}}>
                <TouchableOpacity style={{position:'absolute', left:20, top:18}}>
                  <Image source={require('../../../assets/images/fav/button_search_purple.png')} style={{width:20, height:20}} />
                </TouchableOpacity> 

                <TextInput
                  style={[commonStyles.INPUT.normal, { marginBottom:10, borderRadius:7, paddingLeft:40, width: content.length > 0 ? '75%':'94%'}]}  
                  underlineColorAndroid="transparent"
                  placeholder="Search for GoClubs"
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

              <View style={{flexDirection:'row', marginLeft:12, alignItems:'center'}}>
                <Image source={require('../../../assets/images/social/icon_cat_runningman.png')} style={{width:30, height:30}} />
                <Text style={[texts.HEADLINE, {color:colors.GREY2, marginLeft:12}]}>Social</Text>
              </View>

              <FlatList
                data={JOBLISTING}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
                numColumns={2}
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