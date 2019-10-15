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
import { Actions } from "react-native-router-flux";

export default class GoClubAll extends React.Component {

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
            <Header title={'All GoClubs'} />
              <View style={commonStyles.subHeader}>
                <TouchableOpacity>
                  <Text style={[texts.HEADLINE, {color:colors.PURPLE}]}>By Popularity</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>Actions.goclubkeywordsearch()}>
                  <Image source={require('../../../assets/images/fav/button_filter_purple.png')} style={{width:30, height:30}} />
                </TouchableOpacity>
              </View>

              <FlatList
                data={JOBLISTING}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
                numColumns={2}
              />
              <TouchableOpacity style={{backgroundColor:colors.PURPLE, alignItems:'center', marginTop:4}}>
                  <Text style={[texts.HEADLINE, {color:colors.WHITE, padding:15}]}>Create A New GoClub</Text>
              </TouchableOpacity>
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