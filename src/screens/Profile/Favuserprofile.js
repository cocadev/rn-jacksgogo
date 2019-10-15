import React from 'react';
import CategorySmallItem from '../../components/CategorySmallItem';
import Bar from '../../components/Bar';
import Header from '../../components/Header';

import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import { colors } from '../../common/colors';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-ratings';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { images } from '../../common/images';

import * as actionsJob from "../../store/job/actions";

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 220;

class FavUserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 5
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
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
    const User = this.props.favuser;
    if (!User){
      return false
    }

    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <ScrollView>
          
          <Header title={""}  FavElement={(
            <View style={{ position: 'absolute', right:20 }} onPress={this.onButtonSave}>
              <Image
                source={images.icon.fav_orange_full}
                style={{width:24,height:22}}
               />
            </View>
          )}/>

          <Image source ={{uri:User.PhotoURL ? User.PhotoURL : images.no_user}} style={{width:'100%', height:225}}/>

          <View style={{ backgroundColor: '#fff' }}>
            <Text style={{ fontFamily: 'Muli-Bold', fontSize: 32, textAlign: 'center', paddingVertical: 12 }}>{User.UserName}</Text>
          </View>

          <Flex style={{ backgroundColor: colors.WHITE, padding: 15, marginTop: 10 }}>

            <Flex direction="column" align='start'>
              <Flex>
                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={17}
                  onFinishRating={this.ratingCompleted}
                />
                <Text style={{ fontFamily: 'Muli', fontSize: 14, marginLeft: 10 }}> {'('+ User.Rate +')'} </Text>
              </Flex>
            </Flex>

            <TouchableOpacity onPress={() => Actions.fullfeedback()} style={{ position: 'absolute', right: 10 }}>
              <Text style={{ color: colors.ORANGE, fontFamily: 'Muli-Bold', fontSize: 15 }}>See All Reviews</Text>
            </TouchableOpacity>

          </Flex>

          <CategorySmallItem icon={'error-outline'} text={User.Overview} />
          <CategorySmallItem icon={'near-me'} text={User.Address.ADDRESS} />

          <Bar />

          <TouchableOpacity onPress={() => { Actions.allservicesbyclient()}}>
            <View style={{ marginHorizontal: 10, borderWidth: 1, borderColor: colors.ORANGE, padding: 12 }}>
              <Text style={{ fontFamily: 'Muli-Bold', fontSize: 16, textAlign: 'center', color: colors.ORANGE }}>View All Services by  {User.UserName}</Text>
            </View>
          </TouchableOpacity>

          <Bar />

        </ScrollView>

      </View>
    );
  }
}

export default connect(
  state => ({
    favuser: state.job.favuser,
  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch)
  })
)(FavUserProfile);