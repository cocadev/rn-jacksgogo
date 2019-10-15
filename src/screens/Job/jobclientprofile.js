import React from 'react';
import CategorySmallItem from '../../components/CategorySmallItem';
import Bar from '../../components/Bar';
import Header from '../../components/Header';
import api from "../../service/api";

import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import { colors } from '../../common/colors';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-ratings';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { images } from '../../common/images';

import * as actionsJob from "../../store/job/actions";
import * as actionsCommon from "../../store/common/actions";
import i from '../../common/i';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 220;

class JobClientProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 5,
    };
  }

  refresh() {
    this.getUserById(this.props.User.userId)
  }

  getUserById(ID) {
    api.getUserById(ID, (err, res) => {
      if (err == null) {
        this.setState({ User: res.Value })
        if (res.Value.IsJob) {
          this.setState({ index: 0 })
        }
      }
    })
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

  onButtonSave = () => {
    this.props.actionsJob.CreateFavoriteUser(this.props.job.UserID, this.props.userId, this.props.token)
  }

  render() {
    const { User, index } = this.props
    console.log('UserUserUser', User)
    return (
      <ScrollView style={i.container}>

        <Header type={index} rightElement={(
          <TouchableOpacity style={{ position: 'absolute', right: 20 }} onPress={this.onButtonSave}>
            <Image
              source={index == 0 ? images.icon.button_favourite_outline_cyan : images.icon.button_favourite_outline_green}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        )} />

        <Image source={{ uri: User.PhotoURL ? User.PhotoURL : images.no_user }} style={{ width: '100%', height: 225 }} />

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
              <Text style={{ fontFamily: 'Muli', fontSize: 14, marginLeft: 10 }}> {'(' + User.Rate + ')'} </Text>
            </Flex>
          </Flex>

          <TouchableOpacity onPress={() => Actions.fullfeedback()} style={{ position: 'absolute', right: 10 }}>
            <Text style={{ color: colors.ORANGE, fontFamily: 'Muli-Bold', fontSize: 15 }}>See All Reviews</Text>
          </TouchableOpacity>

        </Flex>

        <CategorySmallItem icon={images.icon_info} text={User.Overview} />
        <CategorySmallItem icon={images.icon_location} text={User.Address.ADDRESS} />

        <Bar />

        <TouchableOpacity onPress={() => { Actions.allservicesbyclient({User}) }}>
          <View style={{ marginHorizontal: 10, borderWidth: 1, borderColor: colors.ORANGE, padding: 12 }}>
            <Text style={{ fontFamily: 'Muli-Bold', fontSize: 16, textAlign: 'center', color: colors.ORANGE }}>View All Services {User.UserName}</Text>
          </View>
        </TouchableOpacity>

        <Bar />

      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    job: state.job.job,
    userId: state.common.userId,
    token: state.common.token,
    job_type: state.job.job_type
  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch),
    actionsCommon: bindActionCreators(actionsCommon, dispatch)
  })
)(JobClientProfile);