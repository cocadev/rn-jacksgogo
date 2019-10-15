import React from 'react';
import CategorySmallItem from '../../components/CategorySmallItem';
import Bar from '../../components/Bar';
import JobButton from '../../components/JobButton';
import Carousel from 'react-native-banner-carousel';
import Header from "../../components/Header";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList, ScrollView, Modal, TextInput } from 'react-native';
import { Flex, WhiteSpace } from 'antd-mobile-rn';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import { JOBLISTING } from '../../common/staticdata';
import GoEventListItem from '../../components/GoEventListItem';
import _ from 'underscore'
import { TestCarousel, TestTags } from '../../common/staticdata';
import { commonStyles } from '../../common/commonStyles';
import { FontAwesome } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { images } from '../../common/images';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 180;

class GoClubProfile extends React.Component {

  constructor(){
    super();
    this.state={
      showFiltering: false,
      selectedOption: { name: 'Share', index: 0 },
      modalReport:false,
      modalDone:false,
      modalLeave:false,
      modalDelete:false,
      options: [
        { name: 'Share', index: 0, icon: images.button_share_purple },
        { name: 'Edit', index: 1, icon: images.button_edit_purple },
        { name: 'Leave GoClub', index: 2, icon: images.button_cross_fat_purple },
        { name: 'Report GoClub', index: 3, icon: images.icon_flag_purple, text:'You made a report' },
        { name: 'Delete GoClub', index: 4, icon: images.button_delete_purple, },
      ],
    }
  }

  renderView(){
    <Text>EUGENE</Text>
  }

  onPressItem(item) {
    this.setState({ showFiltering: false });
    if(item.index == 1 ) {
      this.setState({showFiltering:false})
      Actions.goclubedit()
    }
    if(item.index == 2 ) {
      this.setState({modalLeave:true, showFiltering:false})
    }
    if(item.index == 3 ) {
      this.setState({modalReport:true, showFiltering:false})
    }
    if(item.index == 4 ) {
      this.setState({modalDelete:true, showFiltering:false})
    }
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

  _renderEvent = ({item}) => (
    <GoEventListItem image={item.image} joined={item.joined} start={item.start} end={item.end} title={item.title} hi ={item.hi} />
  )

  renderModalReport() {
    return (
      <Modal
        visible={this.state.modalReport}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={commonStyles.modalView}>
          <View style={commonStyles.modalContent}>
               <View style={{justifyContent:'center', alignItems:'center', flex:2}}>
                  <Text style={[texts.HEADLINE, {marginVertical:12}]}>Report GoClub</Text>
                  <Text>Mark this GoClub inappropriate or offensive.</Text>
               </View>
               <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <TouchableOpacity style={{height:50, flex:1, backgroundColor:colors.LIGHTPURPLE, alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({modalReport:false})}>
                  <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({modalDone:true, modalReport:false})} style={{height:50, flex:1, backgroundColor:colors.PURPLE, alignItems:'center', justifyContent:'center'}}>
                  <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>Report</Text>
                </TouchableOpacity>
               </View>
             </View>
        </View>
      </Modal>
    );
  }

  renderModalLeave() {
    return (
      <Modal
        visible={this.state.modalLeave}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={commonStyles.modalView}>
          <View style={[commonStyles.modalContent, {height:200}]}>
               <View style={{justifyContent:'center', alignItems:'center', flex:2}}>
                  <Text style={[texts.HEADLINE, {marginVertical:12}]}>Withdraw From GoClub?</Text>
                  <Text style={{textAlign:'center'}}>Let Clarence.Tan know why you are withdrawing from the event.</Text>
               </View>
               <TextInput 
                    style={[commonStyles.INPUT.normal, {marginBottom:12}]}
                    underlineColorAndroid="transparent"
                    placeholder="Reason"
                    onChangeText={content => this.setState({ content })}
                    value={this.state.content}
                />
               <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <TouchableOpacity style={{height:50, flex:1, backgroundColor:colors.LIGHTPURPLE, alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({modalLeave:false})}>
                  <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({modalLeave:false})} style={{height:50, flex:1, backgroundColor:colors.RED, alignItems:'center', justifyContent:'center'}}>
                  <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>Withdraw</Text>
                </TouchableOpacity>
               </View>
             </View>
        </View>
      </Modal>
    );
  }

  renderModalDelete() {
    return (
      <Modal
        visible={this.state.modalDelete}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={commonStyles.modalView}>
          <View style={[commonStyles.modalContent, {height:200}]}>
               <View style={{justifyContent:'center', alignItems:'center', flex:2}}>
                  <Text style={[texts.HEADLINE, {marginVertical:12}]}>Delete GoClub?</Text>
                  <Text style={{textAlign:'center'}}>Let members know why you are deleting the GoClub.</Text>
               </View>
               <TextInput 
                    style={[commonStyles.INPUT.normal, {marginBottom:12}]}
                    underlineColorAndroid="transparent"
                    placeholder="Reason"
                    onChangeText={content => this.setState({ content })}
                    value={this.state.content}
                />
               <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <TouchableOpacity style={{height:50, flex:1, backgroundColor:colors.LIGHTPURPLE, alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({modalDelete:false})}>
                  <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({modalDelete:false})} style={{height:50, flex:1, backgroundColor:colors.RED, alignItems:'center', justifyContent:'center'}}>
                  <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>Delete</Text>
                </TouchableOpacity>
               </View>
             </View>
        </View>
      </Modal>
    );
  }

  renderModalDone() {
    return (
      <Modal
        visible={this.state.modalDone}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={commonStyles.modalView}>
          <View style={commonStyles.modalContent}>
               <View style={{justifyContent:'center', alignItems:'center', flex:2}}>
                  <Text style={[texts.HEADLINE, {marginVertical:12}]}>Thank You!</Text>
                  <Text>Our team will be looking into the matter.</Text>
               </View>
               <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <TouchableOpacity style={{height:50, flex:1, backgroundColor:colors.PURPLE, alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({modalDone:false})}>
                  <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>Done</Text>
                </TouchableOpacity>
               </View>
             </View>
        </View>
      </Modal>
    );
  }

  renderContent() {
    return(
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
                  <Text style={[styles.normalText, { textAlign: 'center' }]}>Sports</Text>
                </View>
                <View style={{ flex: 11, backgroundColor: '#fff', marginLeft: 10, height: 120, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontFamily: 'Muli-Bold', fontSize: 21, textAlign: 'center', lineHeight: 25, marginTop: 3 }}>Football Ole Ole</Text>
                </View>
              </Flex>

            </View>

            <CategorySmallItem icon={'error-outline'} text={'Football fan club and sessions in Victory Park.'} />

            <View style={{position:'relative'}}>
              <CategorySmallItem icon={'group'} text={'10, 238'} />
              <TouchableOpacity onPress={()=>Actions.gocluballmembers()} style={{ position:'absolute', right:12, top:18}}>
                <Text style={[texts.LISTTITLE, { color:colors.PURPLE }]}>View All Members</Text>
              </TouchableOpacity>
            </View>

            <Bar />

            <Text style={[texts.HEADLINE,{marginHorizontal:12}]}>Events</Text>

            <FlatList
              data={JOBLISTING}
              keyExtractor={(item, i) => String(i)}
              renderItem={this._renderEvent}
            />

            <TouchableOpacity onPress={()=>Actions.goclubpastevent()} style={[commonStyles.longbutton, {alignItems:'center'}]}>
              <Text style={[texts.HEADLINE, {color:colors.PURPLE}]}>View Past Events</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Actions.goclubnewevent()} style={[commonStyles.longbutton, {alignItems:'center', backgroundColor:colors.PURPLE}]}>
              <Text style={[texts.HEADLINE, {color:colors.WHITE}]}>Create New Event</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Flex style={{ backgroundColor: colors.WHITE, padding: 10 }}>
                <Image
                  style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 5 }}
                  source={{ uri: 'https://sudardjattanusukma.files.wordpress.com/2017/10/qdjh-yang-mi-wallpaper-wallpaper-939875373.jpg' }}
                />
                <View>
                  <Text style={[texts.CAPTION.PRIMARY, { marginLeft: 20 }]}>{'Owner'}</Text>
                  <Text style={[styles.listTitle, { marginLeft: 20 }]}>{'Alan.Tam'}</Text>
                </View>
              </Flex>
            </TouchableOpacity>

            <TouchableOpacity>
              <Flex style={{ backgroundColor: colors.WHITE, padding: 10, marginTop:8 }}>
                <Image
                  style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 5 }}
                  source={{ uri: 'http://www.dabanzixun.com/wp-content/uploads/2017/07/yang-mi.jpg' }}
                />
                <View>
                  <Text style={[texts.CAPTION.PRIMARY, { marginLeft: 20 }]}>{'Admin'}</Text>
                  <Text style={[styles.listTitle, { marginLeft: 20 }]}>{'Clarence.Wang'}</Text>
                </View>
              </Flex>
            </TouchableOpacity>

            <Bar />

            <ScrollView horizontal style={{ padding: 1 }}>
              {
                TestTags.map((data, index) => 
                  <JobButton key={index} text={data.Tag} color={colors.PURPLE} />
                )
              }                 
            </ScrollView>

            <Bar />

            <View style={{ padding: 12, backgroundColor: '#fff' }}>
              <Text style={styles.headText}>Active Group</Text>
              <Text style={styles.normalText}>Latest response: 0 min ago</Text>
            </View>

            <Bar />

            <Flex justify="between" style={{ padding: 12 }}>
              <Text style={styles.smallText}>GoClub reference no: S38291</Text>
              <Text style={styles.smallText}>{'Created On 2019 - 02 - 26'}</Text>
            </Flex>

            <Flex justify="between" style={{ paddingHorizontal: 12, paddingVertical:10, backgroundColor:colors.LIGHTPURPLE }}>
              <Text style={styles.smallText}>21 People joined this goClub recently!</Text>
              <Text style={styles.smallText}>{'3 viewing now'}</Text>
            </Flex>

            {/* <TouchableOpacity style={{backgroundColor:colors.PURPLE, alignItems:'center'}}>
                <Text style={[texts.HEADLINE, {color:colors.WHITE, padding:15}]}>Request To Join GoClub</Text>
            </TouchableOpacity> */}

            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{flex:2}}>
                <Flex style={{ backgroundColor: colors.WHITE, padding: 10 }}>
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 5 }}
                    source={{ uri: 'http://asianwiki.com/images/d/d9/Xuan_Dong.jpg' }}
                  />
                  <View>
                    <Text style={[texts.CAPTION.PRIMARY, { marginLeft: 20 }]}>{'Owner'}</Text>
                    <Text style={[styles.listTitle, { marginLeft: 20 }]}>{'Alan.Tam'}</Text>
                  </View>
                </Flex>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>Actions.goclubchat()} style={{flex:1, backgroundColor:colors.PURPLE, justifyContent:'center', alignItems:'center', position:'relative'}}>
                  <FontAwesome name="wechat" size={30} color={colors.WHITE} />
                  <View style={{backgroundColor:colors.RED, justifyContent:'center', alignItems:'center', width:22, height:22, borderRadius:11, position:'absolute', right:26, top:12}}>
                    <Text style={{color:colors.WHITE}}>3</Text>
                  </View>
              </TouchableOpacity>
            </View>
       </ScrollView>
    )
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
            {!showFiltering && this.renderContent()}
            {this.renderModalReport()}
            {this.renderModalDone()}
            {this.renderModalLeave()}
            {this.renderModalDelete()}

      </View>
    );
  }
}

export default GoClubProfile;

const styles = StyleSheet.create({
  normalText: texts.CAPTION.PRIMARY,
  smallText: texts.CAPTION.SECONDARY,
  listTitle: texts.LISTTITLE,
  listText: texts.LISTTEXT,
  headText: texts.HEADLINE,
});
