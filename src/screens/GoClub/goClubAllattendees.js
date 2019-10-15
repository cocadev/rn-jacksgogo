import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import { colors } from '../../common/colors';
import GoClubFeedbackListItem from '../../components/GoClubFeedbackListItem';
import { FEEDBACK3 } from '../../common/staticdata';

export default class GoClubAllattendees extends React.Component {

  _renderItem = ({ item }) => (
      <GoClubFeedbackListItem image={item.image} title={item.name} position={item.position} count={item.count} admin={item.admin} me={item.me} pending={item.pending} edit={true}/>
  );

  _ItemSeparator = () => <View style={styles.separator} />; 

  render() {
    return (
      <View style={commonStyles.container}>
        <Header title="All Attendees" />
        <View style={{ backgroundColor:colors.WHITE, elevation:1, width:'100%', flexDirection:'row', paddingVertical:4}}>
            <Image source={require('../../../assets/images/social/icon_cat_family.png')} style={{width:26, height:26, marginLeft:20}} />
            <View style={{marginLeft:6}}>
                <Text style={[texts.CAPTION.LISTTEXT]}>Neighbourhood Clean Up</Text>
                <Text style={{color:colors.GREY3}}>Independent event</Text>
                <Text>16 Jul, 2017 10:00 AM - 12:30 PM</Text>
            </View>
        </View>

        <View style={{marginTop:10, flex:1}}>
            <FlatList
                data={FEEDBACK3}
                keyExtractor={(item, i) => String(i)}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._ItemSeparator}
            />
        </View>

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
