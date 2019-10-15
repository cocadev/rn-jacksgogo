// import React from 'react'
// import ChatButton from '../../components/ChatButton'
// import LottieScreen from '../../components/Lottie'
// import Header from "../../components/Header"

// import { ScrollView, View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native'
// import { Flex, WhiteSpace } from 'antd-mobile-rn'
// import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
// import { texts } from '../../common/texts'
// import { Actions } from 'react-native-router-flux'
// import { colors } from '../../common/colors'
// import { bindActionCreators } from "redux"
// import { connect } from "react-redux"

// import * as actionsJob from "../../store/job/actions"
// import * as actionsCommon from "../../store/common/actions"
// import { commonStyles } from '../../common/commonStyles';

// class ClientChat extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       content: '',
//       messages: [],
//       my_offer:{},
//       showModal:false,
//       offer:0,
//       chat:[]
//     };

//     this.onDeclineOffer = this.onDeclineOffer.bind(this)
//     this.onAcceptOffer = this.onAcceptOffer.bind(this)
//     this.onShow = this.onShow.bind(this)
//     this.onCancel = this.onCancel.bind(this)
//   }

//   componentDidMount(){
//     this.props.actionsJob.getJobByID(this.props.job.Job.ID, this.props.job. UserID, this.props.token)
//   }

//   componentDidUpdate(prevProps) {

//     if (this.props.matched_offer !== prevProps.matched_offer) {
//       if (this.props.matched_offer){
//         let newelement = {
//           status: 0,
//           title: 'My offer: ' + this.props.matched_offer.CurrencyCode + ' ' + this.props.matched_offer.Amount + '.00'
//         }
//         this.setState(prevState => ({
//           chat: [...prevState.chat, newelement]
//         }))
//       }
//     }
//   }

//   onCancelOffer() {

//     let offer_id = this.props.matched_offer.ID
//     this.props.actionsJob.cancelOffer(offer_id, this.props.userId, this.props.token)
//     let currency = this.props.matched_offer.CurrencyCode
//     let amount = this.props.matched_offer.Amount
//     let newelement = {
//       status: 1,
//       title: 'Your offer is cancelled ' + currency + ' ' + amount + '.00'
//     }
//     this.setState(prevState => ({
//       chat: [...prevState.chat, newelement]
//     }))
//   }

//   onCancel(){
//     this.setState({showModal: false})
//   }

//   onShow(){
//     this.setState({showModal: true})
//   }

//   onDeclineOffer(){
//     this.setState({showModal: false})
//     this.props.actionsJob.editOffer(this.props.matched_offer.ID, this.props.userId, this.state.offer, 'USD', this.props.token, this.props.job.ID)
//   }

//   onAcceptOffer(){

//   }

//   renderModal() {
//     const {offer} = this.state
//     return (
//       <Modal
//         visible={this.state.showModal}
//         transparent={true}
//         onRequestClose={() => {}}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modal}>

//             <Flex justify='space-between' style={{margin:12, marginTop:30}}>
//               <Text style={texts.HEADLINE}>Choose a payment method:</Text>
//               <TouchableOpacity onPress={this.onCancel}>
//                 <Text style={[texts.HEADLINE, {color:colors.CYAN}]}>Cancel</Text>
//               </TouchableOpacity>
//             </Flex>

//             <View style={{height:1, width:'120%', marginVertical:20, backgroundColor:'#e2e1e4'}}/>

//             <Text style={[texts.HEADLINE, {marginHorizontal:12, marginBottom:10}]}>Total: $ 180.00</Text>
//             <Text style={[texts.LISTTEXT, {marginHorizontal:12, marginVertical:6}]}>Congratulations on finding a good match!</Text>
//             <Text style={[texts.LISTTEXT, {marginHorizontal:12}]}>Next, let's set up a payment method. The payment will only be released when the first appointment job is completed.</Text>

//             <TouchableOpacity onPress={this.onDeclineOffer} style={{flex:1, margin:15, height:45, marginTop:15, alignItems:'center', justifyContent:'center', backgroundColor:colors.CYAN}}>
//               <Text style={[texts.LISTTITLE, {color:'#fff'}]}>Pay by credit card ending in 3792</Text>
//             </TouchableOpacity>

//             <TouchableOpacity onPress={this.onAcceptOffer} style={{flex:1, height:45, margin:15, marginTop:5, alignItems:'center', justifyContent:'center', backgroundColor:colors.CYAN}}>
//               <Text style={[texts.LISTTITLE, {color:'#fff'}]}>Pay by Jacks Dollar - balance J$ 200.00</Text>
//             </TouchableOpacity>

//           </View>
//         </View>
//       </Modal>
//     );
//   }

//   render() {

//     console.log('==========matched_offer==========', this.props.matched_offer)

//     const { loading } = this.props;

//     if(loading){
//       return <LottieScreen />
//     }

//     return (
//       <View style={styles.container}>
       
//        <Header title={""}  rightElement={(
//           <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => {Actions.logbook()}}>
//             <Text style={[styles.title, { color: colors.ORANGE }]}>Save</Text>
//           </TouchableOpacity>
//        )}/>

//         <Flex style={{ paddingHorizontal: 8 }}>
//           <Text style={[styles.listText1, { fontWeight: '500', marginLeft:10 }]}>{this.props.job.Job.Title}</Text>
//         </Flex>

//         <Flex style={{ borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
//            <TouchableOpacity onPress={this.onShow} style={[styles.tab]}>
//               <Text style={[styles.tabtext, { color: colors.CYAN }]}>Decline Offer</Text>
//             </TouchableOpacity>
//            <TouchableOpacity onPress={this.onShow} style={[styles.tab]}>
//               <Text style={[styles.tabtext, { color: colors.CYAN, textAlign:'center' }]}>Accept Offer</Text>
//            </TouchableOpacity>
//           <View style={[styles.tab, { backgroundColor: '#14b1f8' }]}>
//             <Text style={[styles.tabtext, { color: '#fff' }]}>Set Appt</Text>
//           </View>
//         </Flex>

//         <ScrollView
//           style={styles.inverted}
//           contentContainerStyle={styles.content}
//         >

//           {this.state.chat.map((text, i) => {
//             const odd = text.key % 2;
//             return (
//               <View
//                 key={i}
//                 style={[odd ? styles.even : styles.odd, styles.inverted]}
//               >
//                 <Image
//                   style={styles.avatar}
//                   source={{ uri:
//                     odd
//                       ? null
//                       : this.props.matched_offer.User.PhotoURL
//                   }}
//                 />
//                 <View
//                   style={[styles.bubble, odd ? styles.sent : styles.received]}
//                 >
//                   <Text style={odd ? styles.sendText : styles.receivedText}>
//                     <Text style={text.status == 1 ? styles.removeText : null}>{text.title}</Text>
//                   </Text>
//                 </View>
//               </View>
//             );
//           })}
//         </ScrollView>

//         <Flex style={{ marginBottom: 12, justifyContent: 'center', alignItems: 'center' }}>
//           <ChatButton text='hello!' color={colors.CYAN} />
//           <ChatButton text='Can we negotiate?' color={colors.CYAN} />
//         </Flex>

//         <View style={{ borderTopColor: '#ddd', borderTopWidth: 1.4 }}>
//           <TextInput
//             style={{
//               height: 50,
//               borderColor: 'gray',
//               borderWidth: 1,
//               borderRadius: 5,
//               margin: 10,
//               marginTop: 10,
//               marginLeft: 50,
//               paddingLeft: 10,
//               width: '84%'
//             }}
//             underlineColorAndroid='transparent'
//             placeholder="Message"
//             onChangeText={content => this.setState({ content })}
//             value={this.state.content}
//           />

//           <View style={styles.pin}>
//             <SimpleLineIcons name="social-pinterest" size={26} color={colors.CYAN} />
//           </View>

//           <View style={styles.searchButton}>
//             <Ionicons name="md-arrow-up" size={26} color='#fff' />
//           </View>
//           {this.renderModal()}

//         </View>
//       </View>
//     );
//   }
// }

// export default connect(
//   state => ({
//     chat: state.job.chat,
//     job:state.job.job,
//     offer: state.job.offer,
//     situation: state.job.situation,
//     userId:state.common.userId,
//     loading:state.job.loading,
//     matched_offer:state.job.matched_offer,
//     token:state.common.token
//   }),
//   dispatch => ({
//     actionsJob: bindActionCreators(actionsJob, dispatch),
//     actionsCommon: bindActionCreators(actionsCommon, dispatch)
//   })
// )(ClientChat);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eceff1',
//   },
//   inverted: {
//     transform: [{ scaleY: 1 }],
//   },
//   content: {
//     padding: 16,
//   },
//   even: {
//     flexDirection: 'row-reverse',
//   },
//   odd: {
//     flexDirection: 'row',
//   },
//   avatar: {
//     marginVertical: 8,
//     marginHorizontal: 6,
//     height: 40,
//     width: 40,
//     borderRadius: 20,
//     borderColor: 'rgba(0, 0, 0, .16)',
//     borderWidth: StyleSheet.hairlineWidth,
//   },
//   bubble: {
//     marginVertical: 8,
//     marginHorizontal: 6,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//   },
//   sent: {
//     backgroundColor: '#cbeaf8',
//   },
//   received: {
//     backgroundColor: '#eaeaea',
//   },
//   sentText: {
//     color: 'black',
//     maxWidth: 180

//   },
//   receivedText: {
//     color: 'black',
//     maxWidth: 180

//   },
//   searchButton: {
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//     borderRadius: 30,
//     backgroundColor: '#ddd',
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   pin: {
//     position: 'absolute',
//     left: 10,
//     bottom: 20,
//     borderRadius: 30,
//     width: 30,
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   listText1: texts.LISTTEXT,
//   tabtext: texts.LISTTITLE,
//   tab: {
//     backgroundColor: '#e7f7fe',
//     height: 45,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }, 
//   removeText: {
//     textDecorationLine: 'line-through'
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0,0.5)",
//     alignItems: "center",
//     justifyContent: "flex-end"
//   },
//   modal: {
//     width: '100%',
//     height: 400,
//     bottom:0,
//     backgroundColor: "white",
//     elevation:3,
//   }
// });