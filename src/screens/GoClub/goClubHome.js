import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { texts } from '../../common/texts';
import { JOBLISTING } from '../../common/staticdata';
import { commonStyles } from '../../common/commonStyles';
import { colors } from '../../common/colors';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import AllCategoriesGrid from '../../components/AllCategoriesGrid';
import Bar from '../../components/Bar'
import GoClubListItem from '../../components/GoClubListItem';
import GoEventListItem from '../../components/GoEventListItem';
import { Actions } from 'react-native-router-flux';

const width = Dimensions.get("window").width;

export default class GoClubHome extends React.Component {

  _renderGoClub = ({item}) => (
    <GoClubListItem image={item.image} title={item.title} position={item.position} count={item.count} />
  )

  _renderEvent = ({item}) => (
    <GoEventListItem image={item.image} joined={item.joined} start={item.start} end={item.end} title={item.title} hi ={item.hi}/>
  )

  render() {
    return (
      <View style={commonStyles.VIEW.centerView}>
        <View style={styles.header}>
          <Text style={[texts.TITLE2, {color: colors.PURPLE}]}>GoClub</Text>
          <TouchableOpacity onPress={()=>Actions.goclubsearch()}>
            <Ionicons name="ios-search" size={30} color={colors.PURPLE} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{width:'100%', flex:1}}>
            <View style={styles.club}>

                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                  <View style={{flexDirection:'row', alignItems:'flex-end', flex:1}}>
                    <Text style={[texts.TITLE1, {color:colors.PURPLE, marginLeft:12 }]}>43</Text>
                    <Text style={texts.TITLE3}> GoClubs</Text>
                  </View>
                  <Text style={{marginRight:10}}>6 new since 6 hrs ago</Text>
                </View>

                <View style={{flexDirection:'row', marginTop:8, justifyContent:'space-around'}}>
                    <TouchableOpacity onPress={()=>Actions.goclubjoined()} style={{marginHorizontal:12, alignItems:'center'}}>
                        <View style={styles.round}>
                           <MaterialCommunityIcons name="check" size={25} color={colors.WHITE} />
                        </View>
                        <Text style={[{color:colors.PURPLE}]}>View Joined</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Actions.gocluball()} style={{marginHorizontal:12, alignItems:'center'}}>
                        <View style={styles.round}>
                           <MaterialCommunityIcons name="eye" size={25} color={colors.WHITE} />
                        </View>
                        <Text style={[{color:colors.PURPLE}]}>View All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Actions.goclubcreate()} style={{marginHorizontal:12, alignItems:'center'}}>
                        <View style={styles.round}>
                           <MaterialCommunityIcons name="plus" size={25} color={colors.WHITE} />
                        </View>
                        <Text style={[{color:colors.PURPLE}]}>Create New</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <Text style={[texts.HEADLINE, {marginTop:20, marginLeft:12}]}>All Categories</Text>

            <AllCategoriesGrid type={'gocluball'}/>

            <Text style={[texts.HEADLINE, {marginTop:10, marginLeft:12}]}>Recommended For You</Text>
            <ScrollView horizontal>
                <FlatList
                    horizontal
                    data={JOBLISTING}
                    keyExtractor={(item, i) => String(i)}
                    renderItem={this._renderGoClub}
                />
            </ScrollView>

            <Bar />


            <View style={styles.club}>

                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                    <View style={{flexDirection:'row', alignItems:'flex-end', flex:1}}>
                        <Text style={[texts.TITLE1, {color:colors.PURPLE, marginLeft:12 }]}>110</Text>
                        <Text style={texts.TITLE3}> Events</Text>
                    </View>
                    <Text style={{marginRight:10}}>14 new since 6 hrs ago</Text>
                </View>

                <View style={{flexDirection:'row', marginTop:8, justifyContent:'space-around'}}>
                    <TouchableOpacity onPress={()=>Actions.goclubpastevent()} style={{marginHorizontal:12, alignItems:'center'}}>
                        <View style={styles.round}>
                          <MaterialCommunityIcons name="check" size={25} color={colors.WHITE} />
                        </View>
                        <Text style={[{color:colors.PURPLE}]}>View Joined</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Actions.goclubpastevent()} style={{marginHorizontal:12, alignItems:'center'}}>
                        <View style={styles.round}>
                        <MaterialCommunityIcons name="eye" size={25} color={colors.WHITE} />
                        </View>
                        <Text style={[{color:colors.PURPLE}]}>View All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Actions.goclubnewevent()} style={{marginHorizontal:12, alignItems:'center'}}>
                        <View style={styles.round}>
                        <MaterialCommunityIcons name="plus" size={25} color={colors.WHITE} />
                        </View>
                        <Text style={[{color:colors.PURPLE}]}>Create New</Text>
                    </TouchableOpacity>
                </View>
                </View>

                <Text style={[texts.HEADLINE, {marginTop:20, marginLeft:12}]}>All Categories</Text>
                <AllCategoriesGrid />

                <Text style={[texts.HEADLINE, {marginTop:10, marginLeft:12}]}>Recommended For You</Text>
                <ScrollView>
                    <FlatList
                        data={JOBLISTING}
                        keyExtractor={(item, i) => String(i)}
                        renderItem={this._renderEvent}
                    />
                </ScrollView>

                <Bar />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    header: {
      height: 63,
      width:'100%',
      paddingHorizontal: 10,
      alignItems: "flex-end",
      justifyContent:'space-between',
      flexDirection: "row",
      backgroundColor: '#fff',
      elevation:5,
    },
    club:{
        marginTop:10,
        paddingVertical:8,
        backgroundColor:colors.WHITE,
        justifyContent:'space-between',
        alignItems: "center",
        borderLeftWidth:3,
        borderLeftColor:colors.PURPLE,
    },
    round:{
        width:40,
        height:40,
        borderRadius:20,
        backgroundColor:colors.PURPLE,
        justifyContent:'center',
        alignItems:'center'
    }
  });
