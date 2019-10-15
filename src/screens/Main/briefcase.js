import React from 'react'
import LottieScreen from '../../components/Lottie'

import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Badge, Flex, NoticeBar } from 'antd-mobile-rn'
import { MaterialIcons } from '@expo/vector-icons'
import { colors } from '../../common/colors'
import { texts } from '../../common/texts'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Actions } from 'react-native-router-flux'
import api from "../../service/api";
import Cache from "../../utils/cache";

import * as actions from "../../store/common/actions"
import * as actionsjob from "../../store/job/actions"
import i from '../../common/i';
import UtilService from '../../utils/utils';
import Avatar from '../../components/Avatar'

class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      items: [],
      isWaiting: false
    };
  }

  componentDidMount() {
    this.getOffersByUser()
  }

  // getOffersByUser(ID){
  //   this.setState({isWaiting:true})
  //   api.getOffersByUser(ID, (err,res)=>{ 

  //     if (err == null ){ 
  //     console.log('--------------------------- items ======================', res.Value)
  //     this.setState({ items:res.Value}) 
  //     // let fav_mapping = _.find(this.state.itemProfile.Favorite, (u)=>{
  //     //   return u.User.Id == Cache.currentUser.Id 
  //     // })
  //   }
  // })
  //      this.setState({isWaiting:false})
  // }

  getOffersByUser = () => {
    this.setState({ isWaiting: true })
    api.getOffersByUser(Cache.currentUser.Id, (err, res) => {
      if (err == null) {
        this.setState({ isWaiting: false, items: res.Value })
      } else {
        Toast.fail('Fail!')
      }
    })
  }

  _renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        Actions.mainchat({
          session: this.state.items[index].Sessions,
          itemProfile: this.state.items[index].Job,
          offer_id: this.state.items[index].ID,
          PhotoURL: this.state.items[index].User.Id == Cache.currentUser.Id ? this.state.items[index].Job.User.PhotoURL : this.state.items[index].User.PhotoURL,
          UserName: this.state.items[index].User.UserName,
          UserId: this.state.items[index].User.Id == Cache.currentUser.Id ? this.state.items[index].Job.User.Id : this.state.items[index].User.Id
        })
      }}
    >
      <View style={styles.item}>
        <Image style={styles.image} source={{ uri: Cache.currentUser.Id == item.User.Id ? item.Job.User.PhotoURL : item.User.PhotoURL }} />
        <View style={styles.details}>
          <Flex style={{ marginTop: 10 }}>
            <MaterialIcons name={item.icon} size={25} color={colors.ORANGE} />
            <Text style={styles.title}> {item.Job.Title}</Text>
          </Flex>
          {item.camera ? (
            <Flex>
              <MaterialIcons name={item.camera} size={22} color={colors.GREY4} />
              <Text style={[styles.description, { marginLeft: 12 }]}>Photo</Text>
            </Flex>
          ) : (
              <NoticeBar
                style={{ backgroundColor: '#fff', marginLeft: -7, marginTop: -4 }}
                marqueeProps={{
                  loop: true,
                  style: { fontSize: 12, color: '#ddd', fontFamily: 'Muli' },
                }}>
                {item.LastMessage}
              </NoticeBar>
            )}
        </View>
        <Text style={styles.time}>{item.CreatedOn.slice(0, 10)}</Text>
        <Badge style={styles.badge} text={item.JobUserUnreadMessage} />
      </View>
    </TouchableOpacity>
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {
    let { items, isWaiting } = this.state;
    console.log('_________________________________________________________________', items)
    return (
      <ScrollView style={i.container}>
        <View style={i.mainHeader}>
          <View style={{justifyContent: 'center',}}>
            <TouchableOpacity style={{ position: 'absolute', right: 5 }}>
              <Avatar image={UtilService.getSearchIcon(2)} size={30} local={true} />
            </TouchableOpacity>
            <TextInput
              style={i.textinput}
              underlineColorAndroid="transparent"
              placeholder="Search in Briefcase"
              onChangeText={content => this.setState({ content })}
              value={this.state.content}
            />
            
          </View>
        </View>

        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }} onPress={() => this.getOffersByUser()}>
          <Text style={{ marginHorizontal: 15, color: colors.ORANGE }}>Refresh</Text>
        </TouchableOpacity>
        {isWaiting ? <LottieScreen /> : null}
        {
          !isWaiting && items && <FlatList
            style={{ marginTop: 10 }}
            data={items}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._ItemSeparator}
          />}
          <View style={{height:24}} ></View>
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    token: state.common.token,
    userId: state.common.userId,
    briefcase: state.job.briefcase,
    chatinfo: state.job.chatinfo
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    actionsjob: bindActionCreators(actionsjob, dispatch)
  })
)(Contact);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    height: 70,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 20,
  },
  details: {
    margin: 8,
    width: '70%',
  },
  title: texts.LISTTITLE,
  description: texts.CAPTION.SECONDARY,
  badge: {
    position: 'absolute',
    right: 30,
    bottom: 20,
  },
  time: {
    color: '#999',
    position: 'absolute',
    right: 10,
    top: 13,
    fontSize: 13,
    fontFamily: 'Muli',
  },
  separator: {
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
  header: {
    height: 64,
    width: '100%',
    paddingTop: 7,
    marginTop: -12,
    backgroundColor: '#fff',
    elevation: 5,
  }
});
