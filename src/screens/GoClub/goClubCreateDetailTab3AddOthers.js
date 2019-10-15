import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import { colors } from '../../common/colors';
import Header from '../../components/Header';
import Avatar from '../../components/Avatar';
import UtilService from '../../utils/utils';
import { FEEDBACK3, FEEDBACK4 } from '../../common/staticdata';
import { Rating } from 'react-native-ratings';
import { images } from '../../common/images';

export default class GoClubCreateDetailTab3AddOthers extends React.Component {

  constructor(){
    super();
    this.state={
      content:'',
      starCount: 8
    }
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  _renderItem1 = ({ item }) => (
    <View style={{ flexDirection:'row', backgroundColor: colors.WHITE, padding:10, paddingHorizontal:16, alignItems:'center',}}>
    <Avatar size={60} image={item.image} style={{marginLeft:26}}/>
      <View style={{marginLeft:6 }}>
        <Text style={[texts.HEADLINE, {marginTop:8}]}>{item.name}</Text> 
        <Rating readonly type='star' ratingCount={5} imageSize={10} onFinishRating={this.ratingCompleted} />
      </View>
    <TouchableOpacity style={{alignItems:'flex-end', flex:1}}>
      <Image source={images.button_cross_fat_purple} style={{width:30, height:30}} />
    </TouchableOpacity>
  </View>
  );

  _renderItem2 = ({ item }) => (
    <View style={{ flexDirection:'row', backgroundColor: colors.WHITE, padding:10, paddingHorizontal:16, alignItems:'center',}}>
    <Avatar size={60} image={item.image} style={{marginLeft:26}}/>
      <View style={{marginLeft:6 }}>
        <Text style={[texts.HEADLINE, {marginTop:8}]}>{item.name}</Text> 
        <Rating readonly type='star' ratingCount={5} imageSize={10} onFinishRating={this.ratingCompleted} />
      </View>
    <TouchableOpacity style={{alignItems:'flex-end', flex:1}}>
      <Image source={images.add_fat_purple} style={{width:40, height:40}} />
    </TouchableOpacity>
  </View>
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={[commonStyles.container]}>
        <Header title="Create New GoClub"/>
        <ScrollView style={{  flex:1 }}>
          
          <Text style={[texts.HEADLINE, {marginTop:14, marginHorizontal:12, marginBottom:12}]}>Selected users:</Text>

          <FlatList
            data={FEEDBACK4}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem1}
            ItemSeparatorComponent={this._ItemSeparator} 
          />

          <TouchableOpacity style={[commonStyles.longbutton, {backgroundColor:colors.PURPLE, alignItems:'center', marginVertical:17}]}>
            <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>Add As Admins</Text>
          </TouchableOpacity>

          <View style={{position:'relative', marginBottom:12}}>
            <TouchableOpacity style={{position:'absolute', right:20, top:14, zIndex:1}}>
              <Avatar image={UtilService.getSearchIcon()} size={28} local={true}/>
            </TouchableOpacity>

            <TextInput
              style={commonStyles.INPUT.normal}  
              underlineColorAndroid="transparent"
              placeholder="Search user"
              onChangeText={content => this.setState({ content })}
              value={this.state.content}
            />
          </View>

          <FlatList
            data={FEEDBACK3}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem2}
            ItemSeparatorComponent={this._ItemSeparator} 
          />

          <TouchableOpacity style={[commonStyles.longbutton, {backgroundColor:colors.PURPLE, alignItems:'center', marginVertical:20 }]}>
            <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>Go to the summary</Text>
          </TouchableOpacity>
        
        </ScrollView>
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

