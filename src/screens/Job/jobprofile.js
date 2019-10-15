import React from 'react';
import CategorySmallItem from '../../components/CategorySmallItem';
import Bar from '../../components/Bar';
import JobButton from '../../components/JobButton';
import Carousel from 'react-native-banner-carousel';
import Header from "../../components/Header";
import api from "../../service/api";

import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-ratings';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { images } from '../../common/images';
import { commonStyles } from '../../common/commonStyles';

import * as actionsJob from "../../store/job/actions";
import * as actionsCommon from "../../store/common/actions";
import _ from 'underscore'
import LottieScreen from '../../components/Lottie';
import Cache from "../../utils/cache";
import UtilService from '../../utils/utils';
import i from '../../common/i';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;

class JobProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 2,
      visible: false,
      offer: 0,
      isWaiting: false,
      showFiltering: false,
      selectedOption: { name: 'Share', index: 0 },
      options: [
        { name: 'Share', index: 0, icon: UtilService.getShareIcon(this.props.index) },
        { name: 'Report GoClub', index: 1, icon: UtilService.getFlagIcon(this.props.index), text: 'You made a report' },
      ],
      fav_mapping: false,
      index: this.props.itemProfile.IsJob ? 0 : 1,
      itemProfile: this.props.itemProfile,
      profile: {},

    };
  }

  componentDidMount() {
    console.log('************************************', Cache.currentUser)
    // this.refresh()
  }

  refresh() {
    this.getItemById(this.props.itemProfile.ID)
  }

  getItemById(ID) {
    this.setState({ isWaiting: true })
    api.getItemById(ID, (err, res) => {
      if (err == null) {
        this.setState({ itemProfile: res.Value })
        let fav_mapping = _.find(this.state.itemProfile.Favorite, (u) => {
          return u.User.Id == Cache.currentUser.Id
        })
        this.setState({ fav_mapping: fav_mapping ? true : false })
        if (res.Value.IsJob) {
          this.setState({ index: 0 })
        }
        this.setState({ isWaiting: false })
      }
    })
  }

  createFav() {
    this.setState({ isWaiting: true })

    let JobID = this.props.itemProfile.ID
    let UserID = Cache.currentUser.Id
    let Flag = !this.state.fav_mapping
    let IsJob = this.props.itemProfile.IsJob

    api.createFav(JobID, UserID, Flag, IsJob, (err, res) => {
      if (err == null) {
        if (res.Value) {
          this.setState({ index: 0 })
          this.refresh()
        }
        this.setState({ isWaiting: false })
      }
    })
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  renderPage(URL, index) {
    return (
      <View key={index}>
        <Image
          style={{ width: BannerWidth, height: BannerHeight }}
          source={{ uri: URL }}
        />
      </View>
    );
  }

  onPressItem(item) {
    this.setState({ showFiltering: false, isSetDating: true });
  }

  renderIndicator() {
    return (
      <Modal
        visible={this.state.isWaiting}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={commonStyles.LOADING.indicatorContainer}>
          <View style={commonStyles.LOADING.indicator}>
            <LottieScreen />
          </View>
        </View>
      </Modal>
    );
  }

  renderFiltering() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({ showFiltering: false })}
        style={{ elevation: 3, flex: 1, backgroundColor: '#848389' }}>
        <View style={{ width: '100%', padding: 15, backgroundColor: '#fff' }}>
          {this.state.options.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => this.onPressItem(item)}
                key={index}
                style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
                <Image source={item.icon} style={{ width: 30, height: 30 }} />
                <Text style={{ flex: 1, fontSize: 15, color: UtilService.getColor(this.props.index), marginLeft: 12 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    );
  }

  renderContent() {
    const { itemProfile, index } = this.state;

    return (
      <ScrollView style={{ elevation: 3, flex: 1, backgroundColor: '#f0f0f0' }}>
        
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}
        >
          {itemProfile.Attachments.length == 0 && <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: 'https://icoconvert.com/images/noimage2.png' }} />}
          {itemProfile.Attachments.map((data, index) => this.renderPage(data.URL, index))}
        </Carousel>

        <WhiteSpace />

        <View>
          <Flex>
            <View style={{ flex: 4, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 120 }}>
              <Image style={{ width: 50, height: 50 }} source={{ uri: itemProfile.Category.Image }} />
              <Text style={[styles.normalText, { textAlign: 'center' }]}>{itemProfile.Category.Name}</Text>
            </View>
            <View style={{ flex: 11, backgroundColor: '#fff', marginLeft: 10, height: 120, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Muli-Bold', fontSize: 21, textAlign: 'center', lineHeight: 25, marginTop: 3 }}>{itemProfile.Title}</Text>
            </View>
          </Flex>

        </View>

        <CategorySmallItem icon={images.icon_budget} text={'$ ' + itemProfile.Amount ? itemProfile.Amount : '0'} />
        <CategorySmallItem icon={images.icon_location} text={itemProfile.Location ? itemProfile.Location.ADDRESS : 'No Address'} />
        <CategorySmallItem icon={images.icon_info} text={itemProfile.User ? itemProfile.Description : ''} />

        <Bar />

        <TouchableOpacity onPress={() => { Actions.jobclientprofile({ User: itemProfile.User, index: itemProfile.IsJob?0:1 }) }}>
          <Flex style={{ backgroundColor: colors.WHITE, padding: 10 }}>
            <Image
              style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 5 }}
              source={{ uri: itemProfile.User.PhotoURL ? itemProfile.User.PhotoURL : 'https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png.png' }}
            />
            <Flex direction='column'>
              <Text style={[styles.listTitle, { marginLeft: 20 }]}>{itemProfile.User.UserName}</Text>
              <Rating
                type='star'
                ratingCount={5}
                starCount={1}
                imageSize={10}
                style={{ marginLeft: 12 }}
                onFinishRating={this.ratingCompleted}
              />
            </Flex>
          </Flex>
        </TouchableOpacity>

        <Bar />

        <ScrollView horizontal style={{ padding: 1 }}>
          {
            itemProfile.Tags.map((data, index) =>
              <JobButton key={index} text={data.Tag} color={this.state.index == 0 ? colors.CYAN : colors.GREEN} />
            )
          }
        </ScrollView>

        <Bar />

        <View style={{ padding: 12, backgroundColor: '#fff' }}>
          <Text style={styles.headText}>0 responses</Text>
          <Text style={styles.normalText}>Latest response: 0 min ago</Text>
        </View>

        <Bar />

        <Flex justify="between" style={{ paddingHorizontal: 12 }}>
          <Text style={styles.smallText}>Service reference no: S38291</Text>
          <Text style={styles.smallText}>{UtilService.getDateTime(itemProfile.CreatedOn) + ' ' + UtilService.getHourMinutes(itemProfile.CreatedOn)}</Text>
        </Flex>

        <Flex style={{ backgroundColor: index == 0 ? colors.CYAN : colors.GREEN, marginTop: 16 }}>
          <TouchableOpacity style={{ flex: 5, justifyContent: 'center', alignItems: 'center', height: 80 }}>
            <Text style={[styles.headText, { textAlign: 'center', color: '#fff' }]}>
              {index == 0 ? 'Make Offer' : 'Hire Talent'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let currentOffer = this.props.itemProfile.Offer
              let offer_mapping = _.find(currentOffer, (u) => {
                return u.UserID == Cache.currentUser.Id
              })
              console.log('offer_mapping', offer_mapping)
              let offer_id = null
              let session = []
              if (offer_mapping) {
                offer_id = offer_mapping.ID
                session = offer_mapping.Sessions
              }
              Actions.mainchat({
                session: session,
                itemProfile: itemProfile,
                offer_id: offer_id,
                PhotoURL: itemProfile.User.PhotoURL,
                UserName: itemProfile.User.UserName,
                UserId: itemProfile.User.Id,
              })
            }}
            style={{ flex: 3 }}>
            <View style={{
              backgroundColor: index == 0 ? '#5ac8fa' : '#62d275',
              height: 80,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Ionicons
                name="ios-chatbubbles"
                size={35}
                color={colors.WHITE}
              />
            </View>
          </TouchableOpacity>
        </Flex>
        <View style={{height:25}}></View>
      </ScrollView>
    )
  }

  render() {

    const { showFiltering, itemProfile, index, fav_mapping } = this.state;
    console.log('----------------------------------------', itemProfile)

    return (
      <ScrollView style={i.container}>
        <Header type={index} title={""} FavElement={(
          <TouchableOpacity onPress={() => this.setState({ showFiltering: !showFiltering })} style={{ position: 'absolute', right: 10 }}>
            <Image
              source={
                index == 0 ? 
                (!showFiltering ? images.button_more_cyan:images.button_more_active_cyan) : 
                (!showFiltering ? images.button_more_green:images.button_more_active_green)
              }
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        )} rightElement={(
          <TouchableOpacity onPress={() => { this.createFav() }} style={{ position: 'absolute', right: 50 }}>
            <Image
              source={
                index == 0 ? 
                  (fav_mapping ? images.button_favourite_cyan:images.button_favourite_outline_cyan) : 
                  (fav_mapping ? images.button_favourite_green:images.button_favourite_outline_green)
              }
              style={{ width: 26, height: 24, marginBottom: 3 }}
            />
          </TouchableOpacity>
        )} />

        {this.renderIndicator()}
        {showFiltering && this.renderFiltering()}
        {!showFiltering && this.renderContent()}
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    job: state.job.job,
    job_type: state.job.job_type,
    userId: state.common.userId,
    token: state.common.token,
    searchCategoryID: state.job.searchCategoryID
  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch),
    actionsCommon: bindActionCreators(actionsCommon, dispatch)

  })
)(JobProfile);

const styles = StyleSheet.create({
  normalText: texts.CAPTION.PRIMARY,
  smallText: texts.CAPTION.SECONDARY,
  listTitle: texts.LISTTITLE,
  listText: texts.LISTTEXT,
  headText: texts.HEADLINE,
});
