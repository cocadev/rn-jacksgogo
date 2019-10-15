import React from 'react';
import CategorySmallItem from '../../components/CategorySmallItem';
import Carousel from 'react-native-banner-carousel';
import Bar from '../../components/Bar';
import Header from '../../components/Header';

import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Flex, WhiteSpace } from 'antd-mobile-rn';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import { Rating } from 'react-native-ratings';
import { commonStyles } from '../../common/commonStyles';
import { images } from '../../common/images';
import UtilService from '../../utils/utils';
import api from "../../service/api";
import LottieScreen from '../../components/Lottie';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;

class ViewJob extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 2,
      offer: 0,
      showFiltering: false,
      isWaiting: false,
      job:null,
      selectedOption: { name: 'Share', index: 0 },
      options: [
        { name: 'Share', index: 0, icon: UtilService.getShareIcon(this.props.index) },
        { name: 'Edit', index: 1, icon: UtilService.getEditIcon(this.props.index), },
        { name: 'Duplicate', index: 1, icon: UtilService.getDuplicateIcon(this.props.index), },
        { name: 'Delete', index: 1, icon: UtilService.getDeleteIcon(this.props.index), },
      ],
    };
  }

  componentDidMount() {

    if(this.props.jobId){
      const type = this.props.index == 0 ? 'Job' : 'Service';

      this.setState({isWaiting:true})
      api.getItemById(this.props.jobId, type, (err, res) => {
        if (err == null) {
          this.setState({ job: res.Value })
        }
        this.setState({isWaiting:false})
      })
    } else{
      this.setState({ job: this.props.job })
    }
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
    item.index == 3
      ? Modal.alert("Delete Job?", "Deleted jobs can be found in Job Listing.", [
        { text: "Cancel", onPress: () => console.log("cancel"), style: "cancel" },
        { text: "Delete", onPress: () => this.props.actionsJob.DeleteJob(this.props.job.ID, this.props.token) }
      ])
      : null
    this.setState({ showFiltering: false, isSetDating: true });
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

    const JOB = this.state.job;

    if(!this.state.job){
      return false
    }

    console.log('hi                                  pppppppppp', JOB)

    return (
      <ScrollView>

        {
          JOB.IsUrgent
            ? <View style={[commonStyles.VIEW.rowView, { height: 35, backgroundColor: colors.RED }]}>
              <Text style={[texts.LISTTITLE, { color: '#fff' }]}>Urgent</Text>
            </View>
            : null
        }

        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth}
        >
          {JOB.Attachments.map((data, index) => this.renderPage(data.URL, index))}
        </Carousel>

        <WhiteSpace />

        <View>
          <Flex>
            <View style={{ flex: 4, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 120 }}>
              <Image style={{ width: 50, height: 50 }} source={{ uri: JOB.Category.Image }} />

              <Text style={[styles.normalText, { textAlign: 'center' }]}>{JOB.Category.Name}</Text>
            </View>
            <View style={{ flex: 11, backgroundColor: '#fff', marginLeft: 10, height: 120, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Muli-Bold', fontSize: 21, textAlign: 'center', lineHeight: 25, marginTop: 3 }}>{JOB.Title}</Text>
            </View>
          </Flex>

        </View>

        <CategorySmallItem icon={images.icon_budget} text={'$ ' + JOB.Amount ? JOB.Amount : '0'} />
        <CategorySmallItem icon={images.icon_location} text={JOB.Location ? JOB.Location.ADDRESS : 'No Address'} />
        <CategorySmallItem icon={images.icon_info} text={JOB.User ? JOB.Description : ''} />

        <Bar />

        <View >
          <Flex style={{ backgroundColor: colors.WHITE, padding: 10 }}>
            <Image
              style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 5 }}
              source={{ uri: JOB.User.PhotoURL ? JOB.User.PhotoURL : 'http://www.hazelearth.com/admin-content/thumbs/nouser.jpg' }}
            />
            <Flex direction='column'>
              <Text style={[styles.listTitle, { marginLeft: 20 }]}>{JOB.User.UserName}</Text>
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
        </View>

        <Bar />

        <Flex justify="between" style={{ paddingHorizontal: 12, paddingVertical: 22, backgroundColor: '#fff' }}>
          <Text style={styles.smallText}>Job reference no: S38291</Text>
          <Text style={styles.smallText}>{JOB.CreatedOn}</Text>
        </Flex>

        <TouchableOpacity style={[commonStyles.VIEW.rowView, { backgroundColor: '#eaeaea' }]}>
          <Text style={[texts.LISTTITLE, { padding: 20, color: colors.GREY2 }]}>No Offers Yet</Text>
        </TouchableOpacity>

      </ScrollView>

    )
  }

  render() {

    const { showFiltering } = this.state;

    return (
      <View style={commonStyles.container}>

        <Header type={2} title={""} FavElement={(
          <TouchableOpacity onPress={() => this.setState({ showFiltering: !showFiltering })} style={{ position: 'absolute', right: 10 }}>
            <Image
              source={!showFiltering ? UtilService.getMoreIcon(this.props.index) : UtilService.getMoreActiveIcon(this.props.index)}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        )} leftElement={(
          <TouchableOpacity
            onPress={() => { Actions.main()}}
            style={{ flexDirection: 'row', position: 'absolute', left: 10, backgroundColor: colors.WHITE }}>
            <Image source={images.icon.button_backarrow_orange} style={{ width: 32, height: 32 }} />
            <Text style={{ fontSize: 20, color: colors.ORANGE }}>Briefcase</Text>
          </TouchableOpacity>
        )} />

        {this.state.isWaiting && <LottieScreen/>}

        {showFiltering && this.renderFiltering()}
        {!showFiltering && this.renderContent()}

      </View>
    );
  }
}

export default ViewJob;

const styles = StyleSheet.create({
  normalText: texts.CAPTION.PRIMARY,
  smallText: texts.CAPTION.SECONDARY,
  listTitle: texts.LISTTITLE,
  listText: texts.LISTTEXT,
  headText: texts.HEADLINE,
  cancel: {
    backgroundColor: '#e7f7fe'
  }
});
