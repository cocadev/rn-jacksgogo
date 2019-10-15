import React, { Component } from 'react';
import { Button, TextInput, KeyboardAvoidingView, StyleSheet,View, TouchableOpacity, Text, Modal, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { commonStyles } from '../../common/commonStyles';
import { Flex, Toast, WhiteSpace } from '@ant-design/react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';

import Header from '../../components/Header';
import api from "../../service/api";
import _ from 'underscore'
import Cache from "../../utils/cache";
import LottieScreen from '../../components/Lottie';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import UtilService from '../../utils/utils';
import { images } from '../../common/images';

class MainChat extends Component {
  state = {
    messages: [],
    offer_id:null,
    ChannelSid: null,
    makeOfferModal:false,
    acceptOfferModal:false,
    setAppointmentModal:false,
    showFiltering: false,
    SessionId:'',
    offer:'',
    date:'',
    comment:'',
    index:0,
    isWaiting:false,
    isDateTimePickerVisible: false,
    disable: true,
    itemProfile:null,
    indents:[],
    selectedOption: { name: 'View Job Listing', index: 0 },
    options: [
      { name: 'View Job Listing', index: 0 },
      { name: 'Send SMS', index: 1 },
      { name: 'Hide Template Replies', index: 2 },
    ],
  };

  componentDidMount(){
    if(this.props.offer_id){  
      this.setState({offer_id: this.props.offer_id})
      this.getChatHistory(this.props.offer_id)
    }
    this.getCustomerByUserID()
    if(this.props.session.length>0){
      this.setState({SessionId:this.props.session[0].ID})
    }
  };

  onPressItem(item) {
    this.setState({ showFiltering: false, isSetDating: true });
  }

  renderFiltering() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({ showFiltering: false })}
        style={{ elevation: 5, backgroundColor: '#848389' }}>
        <View style={{ width: '100%', padding: 15, backgroundColor: '#fff' }}>
          {this.state.options.map((item, index) => {
            let isSelected = item.index == this.state.selectedOption.index;
            let weight = isSelected ? 'bold' : 'normal';
            return (
              <TouchableOpacity
                onPress={() => this.onPressItem(item)}
                key={index}
                style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
                <Text style={{ flex: 1, fontSize: 15, color: colors.CYAN, fontWeight: weight }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </TouchableOpacity>
    );
  }

  getCustomerByUserID = () => {
    api.getCustomerByUserID(Cache.currentUser.Id, (err,res)=>{ if (err == null ){ 
      Cache.currentUser.CustomerID = res.Value.CustomerID
      console.log('******************************************get customer ID*******************************************', Cache.currentUser)
    } else{
      console.log('Can not get customer ID')
    }})  
  }

  getChatHistory(id){
    this.setState({isWaiting:true})
    api.getChatHistory(id, (err,res)=>{ if (err == null ){ 
      this.setState({isWaiting:false})
      if(res.Value.length > 0){
        this.setState({ChannelSid: res.Value[0].ChannelID})
      }

      var indents=[]

      if(this.props.session && this.props.session[0].Status > 0){
        indents.push({
          _id: Math.round(Math.random() * 1000000),
          text: 'Appointment date: \n' + UtilService.getDateTime(this.props.session[0].Date) + ' \n' + UtilService.getDay(this.props.session[0].Date) + ' ' + UtilService.getHourMinutes(this.props.session[0].Date) + ' accepted!',
          user: {  
            _id: Cache.currentUser.Id,
            name: this.props.UserName,
            avatar: this.props.PhotoURL
          }
        });
      }

      if(this.props.session && this.props.session[0].Status >= 0){
          indents.push({
            _id: Math.round(Math.random() * 1000000),
            text: this.props.session[0].Comment + '\nAppointment date: \n' + UtilService.getDateTime(this.props.session[0].Date) + ' ' + UtilService.getDay(this.props.session[0].Date) + ' ' + UtilService.getHourMinutes(this.props.session[0].Date),
            user: {  
              _id: this.props.session[0].UserID,
              name: this.props.UserName,
              avatar: this.props.PhotoURL
            }
          });
      }

      

     
      for (var i = 0; i < res.Value.length; i++) {
          indents.push({
            _id: Math.round(Math.random() * 1000000),
            text: res.Value[i].Message.replace('<italic>','').replace('</italic>','').replace('<bold>','').replace('</bold>',''),
            createdAt: res.Value[i].SentOn,
            user: {  
              _id: res.Value[i].SenderID,
              name: this.props.UserName,
              avatar: this.props.PhotoURL
            }
          });
      }

     
      // for (var i = 0; i < res.Value.length; i++) {
      //   console.log('text', this.props.session[i].Comment + '\n Appointment date: \n' + getDateTime(this.props.session[i].Date) + ' ' + getDay(this.props.session[i].Date) + ' ' + getHourMinutes(this.props.session[i].Date))
      //   console.log('this.props.session[i].Date', this.props.session[i].ID)
      //   indents.push({
      //     _id: Math.round(Math.random() * 1000000),
      //     text: 'hello',
      //     user: {  
      //       _id: 1,
      //       name: this.props.UserName,
      //       avatar: this.props.PhotoURL
      //     }
      //   }
      //   );
      //  }


      this.setState({ messages:  indents})
      Toast.success(res.Message)
    } else{
      Toast.fail('Fail!')
    }})  
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
  _handleDatePicked = (date) => {
    this.setState({date})
    this._hideDateTimePicker();
  };
 

  // refresh111111111(){}
    // let currentOffer = this.props.itemProfile.Offer
    // let offer_mapping = _.find(currentOffer, (u)=>{
    //   return u.UserID == Cache.currentUser.Id 
    // })
    // console.log('offer_mapping', offer_mapping)
    // if(offer_mapping){
    //    offer_id = offer_mapping.ID
    //    if(offer_mapping.Status > 0) {
    //     this.state.messages.unshift({
    //       _id: Math.round(Math.random() * 1000000),
    //       text: 'My offer: ' + offer_mapping.CurrencyCode + ' ' + offer_mapping.Amount,
    //       createdAt: offer_mapping.CreatedOn,
    //       user: {  
    //         _id: offer_mapping.UserID,
    //         name: this.props.itemProfile.User.UserName,
    //         avatar: this.props.itemProfile.User.UserName
    //     }
    //    })}

    //    if(offer_mapping.Status > 2) {
    //     this.state.messages.unshift({
    //       _id: Math.round(Math.random() * 1000000),
    //       text: 'Offer of ' + offer_mapping.CurrencyCode + ' ' + offer_mapping.Amount + ' acccepted!',
    //       createdAt: offer_mapping.CreatedOn,
    //       user: {
    //         _id: this.props.itemProfile.UserID,
    //         name: this.props.itemProfile.User.UserName,
    //         avatar: this.props.itemProfile.User.PhotoURL
    //     }
    //    })
    //    this.state.messages.unshift({
    //     _id: Math.round(Math.random() * 1000000),
    //     text: this.props.itemProfile.User.StripeToken ? 'Payment method set up.' : 'Payment method is not set up.',
    //     createdAt: offer_mapping.CreatedOn,
    //     user: {
    //       _id: this.props.itemProfile.UserID,
    //       name: this.props.itemProfile.User.UserName,
    //       avatar: this.props.itemProfile.User.PhotoURL
    //   }
    //  })
    //  this.state.messages.unshift({
    //   _id: Math.round(Math.random() * 1000000),
    //   text: 'Appointment date: \n' + UtilService.getDateTime(offer_mapping.LastActiveOn) + UtilService.getDay(offer_mapping.LastActiveOn) + UtilService.getHourMinutes(offer_mapping.LastActiveOn),
    //   createdAt: offer_mapping.CreatedOn,
    //   user: {
    //     _id: this.props.itemProfile.UserID,
    //     name: this.props.itemProfile.User.UserName,
    //     avatar: this.props.itemProfile.User.PhotoURL
    // }})}}  
  // }

  handleClickMakeOffer = () => {
    this.setState({makeOfferModal:false, isWaiting: true})
    api.createOffer(this.props.itemProfile.ID, Cache.currentUser.Id, this.state.offer, 'USD', (err,res)=>{ if (err == null ){ 

      this.setState({isWaiting:false, offer_id: res.Value})
      this.getChatHistory(res.Value)
    } else{
      Toast.fail('Fail!')
    }})  
  }

  handleCancelOffer = () => {
    this.setState({isWaiting: true})
    api.cancelOffer(this.state.offer_id, Cache.currentUser.Id, (err,res)=>{ if (err == null ){ 
      this.setState({isWaiting:false})
      this.getChatHistory(this.state.offer_id)
    } else{
      Toast.fail('Fail!')
    }})  
  }

  handleClickEditOffer = () => {
    this.setState({makeOfferModal:false, isWaiting: true})
    api.editOffer(this.state.offer_id, Cache.currentUser.Id, this.state.offer, 'USD', 0, (err,res)=>{ if (err == null ){ 
      this.setState({isWaiting:false, offer_id: res.Value})
      this.getChatHistory(res.Value)
    } else{
      Toast.fail('Fail!')
    }})  
  }

  handleDeclineOffer = () => {
    this.setState({isWaiting: true})
    api.declineOffer(this.state.offer_id, Cache.currentUser.Id, (err,res)=>{ if (err == null ){ 
      this.setState({isWaiting:false})
      this.getChatHistory(this.state.offer_id)
    } else{
      Toast.fail('Fail!')
    }})  
  }

  handleClickAcceptOffer = () => {
    this.setState({isWaiting: true})
    api.acceptOffer(this.state.offer_id, Cache.currentUser.Id, Cache.currentUser. CustomerID, 100, 'USD', (err,res)=>{ if (err == null ){ 
      this.setState({isWaiting:false})
      this.getChatHistory(this.state.offer_id)
    } else{
      Toast.fail('Fail!')
    }})  
  }

  onMessageSend = () => {
    this.setState({isWaiting: true})
    api.onMessageSend(this.state.ChannelSid, this.state.text, Cache.currentUser.Id, new Date(), this.props.UserId, (err,res)=>{ if (err == null ){ 
      console.log('This is test from ------------->>>>>>>>>>>>>>>>>>>', Cache.currentUser.Id)
      console.log('This is test to ------------->>>>>>>>>>>>>>>>>>>', this.props.UserId)
      console.log('This is test to -------------ChannelSid', this.state.ChannelSid)
      console.log('This is test to -------------text', this.state.text)

      console.log('This is test messages ------------->>>>>>>>>>>>>>>>>>>', res)
      this.setState({isWaiting:false, text: null})

      this.getChatHistory(this.state.offer_id)
    } else{
      Toast.fail('Fail!')
    }})  
  }

  onAcceptOfferCreditCard = () => {
    this.setState({acceptOfferModal:false})
    if(Cache.currentUser.StripeToken){
      this.handleClickAcceptOffer()
    } else{
      Actions.editpayment({update:()=>{
        this.handleClickAcceptOffer()
      }})
    }
  }

  handleClickSetAppointment = () => {
    this.setState({setAppointmentModal:false, isWaiting: true})
    api.addSession(this.state.offer_id, Cache.currentUser.Id, this.state.date, this.state.comment, (err,res)=>{ if (err == null ){ 
      this.setState({isWaiting:false})
      console.log('*1', this.state.offer_id)
      console.log('*2', Cache.currentUser.Id)
      console.log('*3', this.state.date)
      console.log('*4', this.state.comment)

      console.log('********************************************** res', res)
      this.getChatHistory(this.state.offer_id)
    } else{
      Toast.fail('Fail!')
    }})  
  }

  acceptedSession = () => {
    // console.log('session id', this.state.SessionId)
    // console.log('currencet user id', Cache.currentUser.Id)
    this.setState({isWaiting: true})
    api.acceptedSession(this.state.SessionId, Cache.currentUser.Id, (err,res)=>{ if (err == null ){
      // console.log('********************************************** res', 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhello', res)
      this.setState({isWaiting:false})
      this.getChatHistory(this.state.offer_id)
    } else{
      Toast.fail('Fail!')
    }})  
  }

  onAcceptOfferJacksDollar = () => {
  }  

  componentWillMount() {
    // this.setState({ messages:  [
    //   {
    //     _id: Math.round(Math.random() * 1000000),
    //     text: 'My Offer 180 USD.',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //       name: 'React Native',
    //     },
    //   },
    //   {
    //     _id: Math.round(Math.random() * 1000000),
    //     text: 'My Offer 180 USD.',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'John',
    //     },
    //   },
    //   // {
    //   //   _id: Math.round(Math.random() * 1000000),
    //   //   text: '',
    //   //   createdAt: new Date(),
    //   //   user: {
    //   //     _id: 2,
    //   //     name: 'React Native',
    //   //   },
    //   //   image: 'http://www.pokerpost.fr/wp-content/uploads/2017/12/iStock-604371970-1.jpg',
    //   //   sent: true,
    //   //   received: true,
    //   // },
    //   // {
    //   //   _id: Math.round(Math.random() * 1000000),
    //   //   text: 'Send me a picture!',
    //   //   createdAt: new Date(),
    //   //   user: {
    //   //     _id: 1,
    //   //     name: 'Developer',
    //   //   },
    //   // },
    //   // {
    //   //   _id: Math.round(Math.random() * 1000000),
    //   //   text: 'Yes, and I use Gifted Chat!',
    //   //   createdAt: new Date(),
    //   //   user: {
    //   //     _id: 2,
    //   //     name: 'React Native',
    //   //     avatar: 'http://www.pokerpost.fr/wp-content/uploads/2017/12/iStock-604371970-1.jpg'
    //   //   },

    //   //   sent: true,
    //   //   received: true
    //   // },
    //   // {
    //   //   _id: Math.round(Math.random() * 1000000),
    //   //   text: 'Are you building a chat app?',
    //   //   createdAt: new Date(),
    //   //   user: {
    //   //     _id: 1,
    //   //     name: 'Developer',
    //   //   },
    //   // },
    //   // {
    //   //   _id: Math.round(Math.random() * 1000000),
    //   //   text: "You can chat",
    //   //   createdAt: new Date(),
    //   //   system: true,
    //   // },
    // ]});
  }

  onCancel = () => {
    this.setState({acceptOfferModal:false})
  }

  acceptOffer() {
    return (
      <Modal
        visible={this.state.acceptOfferModal}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={styles.modalAcceptContainer}>
          <View style={styles.modalAccept}>

            <Flex justify='space-between' style={{margin:12, marginTop:20}}>
              <Text style={texts.HEADLINE}>Choose a payment method:</Text>
              <TouchableOpacity onPress={this.onCancel}>
                <Text style={[texts.HEADLINE, {color:colors.CYAN}]}>Cancel</Text>
              </TouchableOpacity>
            </Flex>

            <View style={{height:1, width:'120%', marginVertical:10, marginBottom:20, backgroundColor:'#e2e1e4'}}/>

            <Text style={[texts.HEADLINE, {marginHorizontal:12, marginBottom:10}]}>Total: $ 180.00</Text>
            <Text style={[texts.LISTTEXT, {marginHorizontal:12, marginVertical:6}]}>Congratulations on finding a good match!</Text>
            <Text style={[texts.LISTTEXT, {marginHorizontal:12}]}>Next, let's set up a payment method. The payment will only be released when the first appointment job is completed.</Text>
            <WhiteSpace />
            <TouchableOpacity onPress={this.onAcceptOfferCreditCard} style={{flex:1, height:45, marginVertical:10, marginHorizontal:12, borderRadius:4, alignItems:'center', justifyContent:'center', backgroundColor:colors.CYAN}}>
              <Text style={[texts.LISTTITLE, {color:'#fff'}]}>{Cache.currentUser.StripeToken? 'Pay by credit card ending in 180': 'Set up credit card'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onAcceptOfferJacksDollar} style={{flex:1, height:45, marginVertical:10, marginHorizontal:12, borderRadius:4, alignItems:'center', justifyContent:'center', backgroundColor:colors.GREY4}}>
              <Text style={[texts.LISTTITLE, {color:'#8a8a8a'}]}>Jacks Dollar - balance j$ 0.00</Text>
            </TouchableOpacity>
            <WhiteSpace />
          </View>
        </View>
      </Modal>
    );
  }

  makeOffer(){
    return (
        <Modal
          visible={this.state.makeOfferModal}
          transparent={true}
          onRequestClose={() => {}}
        >
          <View style={commonStyles.MODAL.Container}>
            <View style={commonStyles.MODAL.Content}>
              <View style={{flexDirection:'row', justifyContent:'space-between', margin:12}}>
                <Text>Eugene 's budget </Text>
                <Text>200 USD</Text>
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:5,}}>
                <Text style={{marginTop:10, marginLeft:10}}>Your Offer</Text>
                <TextInput
                  style={[styles.input, { width: "40%" }]}
                  keyboardType='numeric'
                  underlineColorAndroid="transparent"
                  onChangeText={offer => this.setState({ offer })}
                  value={this.state.offer}
                />
              </View>

              <TouchableOpacity style={[commonStyles.center, {backgroundColor:colors.CYAN, flex: 1}]}  onPress={this.state.index == 0 ? this.handleClickMakeOffer: this.handleClickEditOffer} >
                <Text style={{color:colors.WHITE}}>{this.state.index == 0 ? 'Submit Offer': 'Edit Offer'}</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      );
  }

  setAppointment(){
    return (
        <Modal
          visible={this.state.setAppointmentModal}
          transparent={true}
          onRequestClose={() => {}}
        >
          <View style={commonStyles.MODAL.Container}>
            <View style={[commonStyles.MODAL.Content, {height: 250}]}>
            <View >
                <Text style={{marginTop:10, marginLeft:10}}>Select Date</Text>
                <TouchableOpacity onPress={this._showDateTimePicker} style={styles.datepicker}>
                  <Text style={{fontSize:18}}>{this.state.date && UtilService.getDateTime(this.state.date)}</Text>
                </TouchableOpacity>
                <DateTimePicker 
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />
              </View>

              <View style={{ marginBottom:5,}}>
                <Text style={{marginTop:5, marginLeft:10}}>Comment(optional)</Text>
                <TextInput
                  style={[styles.input, { width: "92%" }]}
                  underlineColorAndroid="transparent"
                  onChangeText={comment => this.setState({ comment })}
                  value={this.state.comment}
                />
              </View>

              <TouchableOpacity style={[commonStyles.center, {backgroundColor:colors.CYAN, flex: 1}]}  onPress={this.handleClickSetAppointment} >
                <Text style={{color:colors.WHITE}}>Set Appointment</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      );
  }

  renderIndicator() {
    return (
      <Modal
        visible={this.state.isWaiting}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={commonStyles.LOADING.indicatorContainer}>
          <View style={commonStyles.LOADING.indicator}>
            <LottieScreen />
          </View>
        </View>
      </Modal>
    );
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    let {showFiltering} = this.state;
    console.log(' ************ my session', this.props.session)
    console.log(' ************ offer id', this.state.offer_id)

    return (
      <KeyboardAvoidingView behavior='padding' enabled style={commonStyles.container}>
        <Header action="talktous" title="Talk To Us" FavElement={(
                <TouchableOpacity onPress={()=>this.setState({showFiltering:!showFiltering})} style={{position:'absolute', right:10}}>
                  <Image
                    source={images.icon.more_cyan}
                    style={{ width:32,height:32 }}
                  />
              </TouchableOpacity>
        )}/>

        {this.state.showFiltering && this.renderFiltering()}


        <Flex style={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <TouchableOpacity onPress={()=>this.setState({makeOfferModal:true, index:0})} style={[styles.tab]}>
              <Text style={[styles.tabtext, { color: colors.CYAN }]}>Make Offer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleCancelOffer} style={[styles.tab]}>
              <Text style={[styles.tabtext, { color: colors.CYAN, textAlign:'center' }]}>Cancel Offer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({makeOfferModal:true, index:1,})} style={[styles.tab, { backgroundColor: '#5ac8fa' }]}>
              <Text style={[styles.tabtext, { color: '#fff' }]}>Edit Offer</Text>
            </TouchableOpacity>
            <TouchableOpacity 
               onPress={()=>Actions.logbook({update:()=>{
                this.acceptedSession()
              }})} 
               style={[styles.tab, { backgroundColor: '#14b1f8' }]}>
              <Text style={[styles.tabtext, { color: '#fff' }]}>Set Appt</Text>
            </TouchableOpacity>
        </Flex>

        <Flex style={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
            <TouchableOpacity onPress={this.handleDeclineOffer} style={[styles.tab]}>
              <Text style={[styles.tabtext, { color: colors.CYAN }]}>Decline Offer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({acceptOfferModal:true})} style={[styles.tab, { backgroundColor: '#5ac8fa' }]}>
              <Text style={[styles.tabtext, { color: '#fff', textAlign:'center' }]}>Accept Offer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.setState({setAppointmentModal:true, index:1})} style={[styles.tab, { backgroundColor: '#14b1f8' }]}>
              <Text style={[styles.tabtext, { color: '#fff' }]}>Set Appt</Text>
            </TouchableOpacity>
        </Flex>
        
        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          renderInputToolbar={this.state.disable ? () => null : undefined}
          user={{
            _id: Cache.currentUser.Id,
          }}
        />

        <View style={{ borderTopColor: '#ddd', borderTopWidth: 1.4 }}>
          <TextInput
            style={styles.messageBox}
            underlineColorAndroid='transparent'
            placeholder="Message"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />

          <View style={styles.pin}>
            <SimpleLineIcons name="social-pinterest" size={26} color={colors.CYAN} />
          </View>

          <TouchableOpacity 
             style={styles.searchButton}
             onPress={this.onMessageSend}>
            <Ionicons name="md-arrow-up" size={26} color='#fff' />
          </TouchableOpacity>
        </View>
        
        {this.makeOffer()}
        {this.renderIndicator()}
        {this.acceptOffer()}
        {this.setAppointment()}

     </KeyboardAvoidingView>
    );
  }
}

export default MainChat;

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderColor:'#ddd',
    padding:2,
    height:25,
    margin:2,
    backgroundColor:'#999'
  },
  pin: {
    position: 'absolute',
    left: 10,
    bottom: 15,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    position: 'absolute',
    right: 20,
    bottom: 15,
    borderRadius: 30,
    backgroundColor: '#ddd',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBox:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    marginTop: 10,
    marginLeft: 50,
    fontSize:18,
    paddingLeft: 10,
    width: '84%'
  },
  tabtext: texts.LISTTITLE,
  tab: {
    backgroundColor: '#e7f7fe',
    height: 45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: "Muli"
  },
  modalAcceptContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  modalAccept: {
    width: '100%',
    height: 350,
    bottom:0,
    backgroundColor: "white",
    elevation:3,
  },
  datepicker:{
    width:'92%',
    height:50,
    borderRadius:5,
    borderWidth:1,
    borderColor:colors.GREY2,
    margin:12,
    paddingLeft:12,
    justifyContent:'center'
  }
})