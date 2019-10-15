import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import { colors } from '../../common/colors';
import { TestTags, FEEDBACK3 } from '../../common/staticdata';
import JobButton from '../../components/JobButton';
import GoClubFeedbackListItem from '../../components/GoClubFeedbackListItem';

export default class GoClubEdit extends React.Component {

  _renderItem = ({ item }) => (
        <GoClubFeedbackListItem image={item.image} title={item.name} position={item.position} count={item.count} admin={item.admin} me={item.me} pending={item.pending} edit={true}/>
  );

  _ItemSeparator = () => <View style={styles.separator} />; 

  render() {
    return (
      <View style={commonStyles.container}>
        <Header title="Edit GoClub" />
        <View style={{ backgroundColor:colors.WHITE, elevation:1, width:'100%', flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../../../assets/images/social/icon_cat_family.png')} style={{width:26, height:26, marginLeft:20}} />
            <Text style={[texts.CAPTION.LISTTEXT, {marginLeft:20}]}>Family</Text>
        </View>

        <View style={{marginTop:10, flex:1}}>
            <View style={{flexDirection:'row', backgroundColor:colors.WHITE, paddingVertical:6}}>
                <View style={{ alignItems:'center', width:80}}>
                   <Image source={require('../../../assets/images/none/counter_purpleactive.png')} style={{width:14, height:14}} />
                   <Text style={{color:colors.PURPLE}}>Describe</Text>
                </View>
                <View>
                    <Text style={[texts.HEADLINE]}>Badminton Jurong</Text>
                    <Text style={{marginTop:6}}>{'Love badminton? Staying in Jurong? \nCome join us and have fun together!'}</Text>
                    <ScrollView horizontal style={{ padding: 1, marginTop:10 }}>
                        {
                            TestTags.map((data, index) => 
                                <JobButton key={index} text={data.Tag} color={colors.PURPLE} />
                            )
                        }                 
                    </ScrollView>
                </View>
            </View>

            <View style={{flexDirection:'row', backgroundColor:colors.WHITE, paddingVertical:6, marginTop:10}}>
                <View style={{ alignItems:'center', width:80}}>
                   <Image source={require('../../../assets/images/none/counter_purpleactive.png')} style={{width:14, height:14}} />
                   <Text style={{color:colors.PURPLE}}>Limit</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={[texts.LISTTEXT]}>100 pax</Text>
                </View>
            </View>

            <View style={{flexDirection:'row', backgroundColor:colors.WHITE, paddingVertical:6, marginTop:10, flex:1}}>
                <View style={{ alignItems:'center', width:80}}>
                   <Image source={require('../../../assets/images/none/counter_purpleactive.png')} style={{width:14, height:14}} />
                   <Text style={{color:colors.PURPLE}}>Admin</Text>
                </View>
                <View >
                    <Text style={[texts.LISTTEXT]}>Total 3 Admins</Text>
                    <FlatList
                        data={FEEDBACK3}
                        keyExtractor={(item, i) => String(i)}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={this._ItemSeparator}
                    />
                </View>
            </View>

        </View>

        <TouchableOpacity style={{backgroundColor:colors.PURPLE, alignItems:'center'}}>
            <Text style={[texts.HEADLINE, {color:colors.WHITE, padding:15}]}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    separator: {
        height: 5,
        backgroundColor: 'rgba(0, 0, 0, .08)',
    },
});
