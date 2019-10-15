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
import AllCategoriesGrid from '../../components/AllCategoriesGrid';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Actions } from "react-native-router-flux";

export default class GoClubKeywordSearch extends React.Component {

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

              <TouchableOpacity onPress={()=>Actions.pop()} style={styles.round}>
                <MaterialCommunityIcons name="check" size={25} color={colors.WHITE} />
              </TouchableOpacity>
              
              <Text style={[texts.HEADLINE, {marginTop:80, marginHorizontal:12}]}>Show Only GoClubs With The Keywords</Text>
              <TextInput style={commonStyles.INPUT.normal} placeholder="Service Keyword"/>

              <Text style={[texts.HEADLINE, {marginTop:20, marginHorizontal:12}]}>All Categories</Text>
              <AllCategoriesGrid />

          </View>
    )
  }
}

const styles = StyleSheet.create({
    round:{
        position:'absolute',
        right:20,
        marginTop:30,
        width:36,
        height:36,
        borderRadius:18,
        backgroundColor:colors.PURPLE,
        justifyContent:'center',
        alignItems:'center'
    }
});