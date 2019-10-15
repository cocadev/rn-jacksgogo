import React from 'react';
import Header from '../../components/Header';

import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { colors } from '../../common/colors';
import { Rating } from 'react-native-ratings';
import { images } from '../../common/images';
import { Actions } from 'react-native-router-flux';
import Cache from "../../utils/cache";
import { commonStyles } from '../../common/commonStyles';
import CategorySmallItem from '../../components/CategorySmallItem';
import Bar from '../../components/Bar';
import { texts } from '../../common/texts';
import JobButton from '../../components/JobButton';
import { TestTags } from '../../common/staticdata';
import i from '../../common/i';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;

// const images = [
//   'http://asianwiki.com/images/d/d9/Xuan_Dong.jpg'
// ];

class ProfilePrivate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  renderPage(image, index) {
    return (
      <View key={index}>
        <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
      </View>
    );
  }

  render() {
 
    return (
      <View style={i.container}>

        <Header title={"Private Profile"} type={2} rightElement={(
            <TouchableOpacity style={commonStyles.ICON.iconRight} onPress={()=>Actions.profileedit()}>
              <Image
                source={images.orange_right_edit}
                style={commonStyles.IMAGE.logo_round_30}
              />
            </TouchableOpacity>
        )}/>

        <ScrollView>

          <Image source ={{uri: Cache.currentUser.PhotoURL ? Cache.currentUser. PhotoURL : images.no_user}} style={{width:'100%', height:180}}/>

          <View style={{ backgroundColor: '#fff' }}>
            <Text style={styles.name}> {Cache.currentUser.UserName} </Text>
          </View>

          <View style={{backgroundColor:colors.WHITE, paddingVertical:12, flexDirection:'row', marginTop:5, paddingHorizontal:12}}>
            <Rating readonly type="star" ratingCount={5} imageSize={17} onFinishRating={this.ratingCompleted} />
            <Text style={texts.LISTTEXT}> ({Cache.currentUser.Rate}) </Text>
            <Text style={[texts.LISTTITLE, {position:'absolute', right:12, color:colors.ORANGE,top:12}]}>See All Reviews</Text>
          </View>
            
          <CategorySmallItem icon={images.icon_phone} text={Cache.currentUser.PhoneNumber} />
          <CategorySmallItem icon={images.icon_email} text={Cache.currentUser.Email} />
          <CategorySmallItem icon={images.icon_location} text={Cache.currentUser.Address.BUILDING} />
          <CategorySmallItem icon={images.icon_info} text={Cache.currentUser.Overview} />
 
          <Bar/>

          <ScrollView horizontal style={{ padding: 1 }}>
            {
                TestTags.map((data, index) => 
                <JobButton key={index} text={data.Tag} color={colors.ORANGE} />
                )
            }                 
          </ScrollView>

          <View style={[commonStyles.longbutton, {alignItems:'center', borderColor:colors.ORANGE}]}>
             <Text style={[texts.HEADLINE, {color:colors.ORANGE}]}>View Public Profile</Text>
          </View>
         
        </ScrollView>
      </View>
    );
  }
}

export default ProfilePrivate;

const styles = StyleSheet.create({
  name:{
    fontFamily: 'Muli-Bold',
    fontSize: 27,
    textAlign: 'center',
    paddingVertical: 8,
  }
})