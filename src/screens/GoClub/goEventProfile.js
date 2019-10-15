import React from 'react';
import CategorySmallItem from '../../components/CategorySmallItem';
import Bar from '../../components/Bar';
import JobButton from '../../components/JobButton';
import Carousel from 'react-native-banner-carousel';
import Header from "../../components/Header";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Flex, WhiteSpace } from 'antd-mobile-rn';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import { TestCarousel, TestTags } from '../../common/staticdata';
import { Actions } from 'react-native-router-flux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { images } from '../../common/images';
import _ from 'underscore'
import { commonStyles } from '../../common/commonStyles';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;

class GoEventProfile extends React.Component {

  constructor(){
    super();
    this.state={
      showFiltering: false,
      modal:false,
      selectedOption: { name: 'Share', index: 0 },
      options: [
        { name: 'Share', index: 0, icon: images.button_share_purple },
        { name: 'Edit', index: 1, icon: images.button_edit_purple },
        { name: 'Duplicate', index: 2, icon: images.button_duplicate_purple },
        { name: 'Withdraw From Event', index: 3, icon: images.button_cross_fat_purple },
        { name: 'Delete Event', index: 4, icon: images.button_delete_purple },
      ],
    }
  }

  onPressItem(item) {
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
            let isSelected = item.index == this.state.selectedOption.index;
            // let weight = isSelected ? 'bold' : 'normal';
            return (
              <TouchableOpacity
                onPress={() => this.onPressItem(item)}
                key={index}
                style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
                <Image source={item.icon} style={{width:30, height:30}} />
                <Text style={{ flex: 1, fontSize: 15, color: colors.PURPLE, marginLeft:12 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    );
  }

  renderModal() {
    return (
      <Modal
        visible={this.state.modal}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={commonStyles.modalView}>
          <View style={commonStyles.modalContent}>
               <View style={{justifyContent:'center', alignItems:'center', flex:2}}>
                  <Text style={[texts.HEADLINE, {marginVertical:12}]}>Join This Event</Text>
                  <Text></Text>
               </View>
               <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <TouchableOpacity style={{height:50, flex:1, backgroundColor:colors.LIGHTPURPLE, alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({modal:false})}>
                  <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({ v:false})} style={{height:50, flex:1, backgroundColor:colors.PURPLE, alignItems:'center', justifyContent:'center'}}>
                  <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>Join</Text>
                </TouchableOpacity>
               </View>
             </View>
        </View>
      </Modal>
    );
  }

  renderContent2() {
    return (
          <ScrollView style={{ elevation: 3, flex: 1, backgroundColor: '#f0f0f0' }}>
              <Carousel
                autoplay
                autoplayTimeout={5000}
                loop
                index={0}
                pageSize={BannerWidth}
              >
                 {TestCarousel.map((data, index) => this.renderPage(data.URL, index))} 
              </Carousel>

              <WhiteSpace />

              <View>
                <Flex>
                  <View style={{ flex: 4, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 120 }}>
                    <Image style={{ width: 50, height: 50 }} source={require('../../../assets/images/social/icon_cat_sports.png')} />
                    <Text style={[styles.normalText, { textAlign: 'center' }]}>Social</Text>
                  </View>
                  <View style={{ flex: 11, backgroundColor: '#fff', marginLeft: 10, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Muli-Bold', fontSize: 21, textAlign: 'center', lineHeight: 25, marginTop: 3 }}>Neighbourhood Clean Up</Text>
                  </View>
                </Flex>
              </View>

              <CategorySmallItem icon={images.icon_time} text={'One-time Event\n 16 Jul, 2017 10:00 AM -12:30 PM'} />
              <CategorySmallItem icon={images.icon_info} text={'Seeking volunteers to clean up our\n neighbourhood. Lunch provided.'} />
              <CategorySmallItem 
                  icon={images.icon_location} 
                  text={'Jurong Community Centre\n 10 Jurong Rood 8# 04-4343-2'} 
                  rightElement={(
                    <TouchableOpacity onPress={()=>Actions.goclubmap()}>
                      <Image source={images.button_location_purple} style={{width:30, height:30}} />
                    </TouchableOpacity>
                  )}
              />

              <Bar />

              <CategorySmallItem icon={images.icon_group} text={'No associated GoClub'} />

              <TouchableOpacity>
                <Flex style={{ backgroundColor: colors.WHITE, padding: 10, marginTop:8 }}>
                  <Image
                    style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 5 }}
                    source={{ uri: 'http://www.hazelearth.com/admin-content/thumbs/nouser.jpg' }}
                  />
                  <Flex direction='column'>
                    <Text style={[styles.listTitle, { marginLeft: 20 }]}>{'Owner'}</Text>
                    <Text style={[styles.listTitle, { marginLeft: 20 }]}>{'Alan.Tam'}</Text>
                  </Flex>
                </Flex>
              </TouchableOpacity>

              <Bar />

              <View style={styles.progressbar}>
                <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>50/50 people have joined!</Text>
                <TouchableOpacity onPress={()=>Actions.gocluballattendees()} style={styles.round}>
                    <MaterialCommunityIcons name="eye" size={25} color={colors.WHITE} />
                </TouchableOpacity>
              </View>

              <View style={{ padding: 12, backgroundColor: '#fff' }}>
                <Text style={texts.LISTTITLE}>Schedule</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={texts.LISTTEXT}>Coming Sat: 17 Jul, 2017</Text>
                  <TouchableOpacity onPress={()=>Actions.goclubschedule()}>
                    <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>View Schedule</Text>
                  </TouchableOpacity>
                </View> 
              </View>

              <Text style={[texts.HEADLINE, { margin:12}]}>Updates</Text>
          
              <View style={{backgroundColor:colors.WHITE, marginVertical:5, paddingVertical:6, paddingHorizontal:12}}>
                <Text style={{color:colors.GREY3}}>By Alan.Tim on 10 Jul, 2017</Text>
                <Text style={texts.LISTTEXT}>Lunch will be chicken rice.</Text>
              </View>

              <View style={{backgroundColor:colors.WHITE, marginVertical:5, paddingVertical:6, paddingHorizontal:12}}>
                <Text style={{color:colors.GREY3}}>By Alan.Tim on 9 Jul, 2017</Text>
                <Text style={texts.LISTTEXT}>Attendees  please bring your own tools.</Text>
              </View>

              <TouchableOpacity style={[commonStyles.longbutton, {alignItems:'center', backgroundColor:colors.PURPLE}]}>
                <Text style={[texts.HEADLINE, {color:colors.WHITE}]}>Post Update</Text>
              </TouchableOpacity>


              <Bar/>
              <ScrollView horizontal style={{ padding: 1 }}>
                {
                  TestTags.map((data, index) => 
                    <JobButton key={index} text={data.Tag} color={colors.PURPLE} />
                  )
                }                 
              </ScrollView>

              <Bar />

              <View style={{ padding: 12, backgroundColor: '#fff' }}>
                <Text style={styles.headText}>Active Event</Text>
                <Text style={styles.normalText}>Latest response: 0 min ago</Text>
              </View>

              <Bar />

              <Flex justify="between" style={{ padding: 12 }}>
                <Text style={styles.smallText}>GoClub reference no: S38291</Text>
                <Text style={styles.smallText}>{'Created On 2019 - 02 - 26'}</Text>
              </Flex>

              <Flex justify="between" style={{ paddingHorizontal: 12, paddingVertical:10, backgroundColor:colors.LIGHTPURPLE }}>
                <Text style={styles.smallText}>11 People joined this goClub recently!</Text>
                <Text style={styles.smallText}>{'3 viewing now'}</Text>
              </Flex>

              <TouchableOpacity onPress={()=>this.setState({modal:true})} style={{backgroundColor:colors.PURPLE, alignItems:'center'}}>
                  <Text style={[texts.HEADLINE, {color:colors.WHITE, padding:15}]}>Join Event</Text>
              </TouchableOpacity>
              {this.renderModal()}
          </ScrollView>
    );
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

  filterToggle = () =>{
    this.setState({showFiltering: !this.state.showFiltering})
  }

  render() {
    let {showFiltering} = this.state
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
            <Header rightElement={(
                <TouchableOpacity 
                    onPress={this.filterToggle}
                    style={{position:'absolute', right:12}}>
                    <Image
                          source={!showFiltering?images.button_more_purple:images.button_more_active_purple}
                          style={{width:30,height:30}}
                    />
                </TouchableOpacity>
            )}/>

            {showFiltering && this.renderFiltering()}
            {!showFiltering && this.renderContent2()}
               
      </View>
    );
  }
}

export default GoEventProfile;

const styles = StyleSheet.create({
  normalText: texts.CAPTION.PRIMARY,
  smallText: texts.CAPTION.SECONDARY,
  listTitle: texts.LISTTITLE,
  listText: texts.LISTTEXT,
  headText: texts.HEADLINE,
  progressbar:{
    borderRadius:25,
    height:40,
    backgroundColor:colors.PURPLE,
    position:'relative',
    margin:12,
    alignItems:'center',
    justifyContent:'center'
  },
  round:{
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor:colors.PURPLE,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    right:10
}
});
