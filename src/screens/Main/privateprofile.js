// import React from 'react';
// import Header from '../../components/Header';

// import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
// import { Flex, WhiteSpace } from 'antd-mobile-rn';
// import { Entypo, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
// import { colors } from '../../common/colors';
// import { Rating } from 'react-native-ratings';
// import { images } from '../../common/images';
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { Actions } from 'react-native-router-flux';
// import Cache from "../../utils/cache";

// import * as actionsJob from "../../store/job/actions";
// import * as actionsCommon from "../../store/common/actions";
// import { commonStyles } from '../../common/commonStyles';

// const BannerWidth = Dimensions.get('window').width;
// const BannerHeight = 180;

// // const images = [
// //   'http://asianwiki.com/images/d/d9/Xuan_Dong.jpg'
// // ];

// class PrivateProfile extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       me:null,
//       starCount: 5,
//     };
//   }

//   componentDidMount(){
//     this.setState({me:Cache.currentUser})
//   }

//   onStarRatingPress(rating) {
//     this.setState({
//       starCount: rating,
//     });
//   }

//   renderPage(image, index) {
//     return (
//       <View key={index}>
//         <Image style={{ width: BannerWidth, height: BannerHeight }} source={{ uri: image }} />
//       </View>
//     );
//   }

//   render() {
//     const { me } = this.state
//     if(!me){
//       return false
//     }
//     console.log('###########################    me', me)
//     return (
//       <View style={{ flex: 1, flexDirection: 'column' }}>

//         <Header title={"Private Profile"}  rightElement={(
//             <TouchableOpacity style={commonStyles.ICON.iconRight} onPress={()=>Actions.editprofile()}>
//               <Image
//                 source={images.icon.orange_right_edit}
//                 style={commonStyles.IMAGE.logo_round_35}
//               />
//             </TouchableOpacity>
//         )}/>

//         <ScrollView>
//         <Image source ={{uri: me.PhotoURL ? me. PhotoURL : images.no_user}} style={{width:'100%', height:200}}/>
//           <View style={{ backgroundColor: '#fff' }}>
//             <Text style={styles.name}>
//               {me.UserName}
//             </Text>
//           </View>
//           <Flex
//             style={{
//               backgroundColor: colors.WHITE,
//               padding: 15,
//               marginTop: 10,
//             }}>
//             <Feather name="phone" size={20} color={colors.WHITE} />
//             <Flex direction="column" align="start">
//               <Flex>
//                 <Rating
//                   type="star"
//                   ratingCount={5}
//                   imageSize={17}
//                   onFinishRating={this.ratingCompleted}
//                 />
//                 <Text style={{ fontFamily: 'Muli', fontSize: 14, marginLeft: 10 }}>
//                   ({me.Rate ? me.Rate : '0'})
//                 </Text>
//               </Flex>
//             </Flex>
//             <Flex style={{ position: 'absolute', right: 10 }}>
//               <Text
//                 style={{
//                   color: colors.ORANGE,
//                   fontFamily: 'Muli-Bold',
//                   fontSize: 15,
//                 }}>
//                 See All Reviews
//               </Text>
//             </Flex>
//           </Flex>

//           <Flex
//             style={{
//               backgroundColor: colors.WHITE,
//               padding: 15,
//               marginTop: 10,
//             }}>
//             <Feather name="phone" size={20} color={colors.GREY4} />
//             <Flex direction="column" align="start">
//               <Text style={{ fontFamily: 'Muli', fontSize: 14, marginLeft: 10 }}>
//                {me.PhoneNumber}
//               </Text>
//             </Flex>
//           </Flex>

//           <Flex
//             style={{
//               backgroundColor: colors.WHITE,
//               padding: 15,
//               marginTop: 10,
//             }}>
//             <MaterialCommunityIcons
//               name="email-outline"
//               size={20}
//               color={colors.GREY4}
//             />
//             <Flex direction="column" align="start">
//               <Text style={{ fontFamily: 'Muli', fontSize: 14, marginLeft: 10 }}>
//                {me.Email}
//               </Text>
//             </Flex>
//           </Flex>

//           <Flex
//             style={{
//               backgroundColor: colors.WHITE,
//               padding: 15,
//               marginTop: 10,
//             }}>
//             <Entypo name="direction" size={20} color={colors.GREY4} />
//             <Flex direction="column" align="start">
//               <Text style={{ fontFamily: 'Muli', fontSize: 14, marginLeft: 10 }}>
//                 {me.Address.BUILDING}
//               </Text>
//             </Flex>
//           </Flex>

//           <Flex
//             style={{
//               backgroundColor: colors.WHITE,
//               padding: 15,
//               marginTop: 10,
//             }}>
//             <MaterialIcons
//               name="error-outline"
//               size={24}
//               color={colors.GREY4}
//             />
//             <Flex direction="column" align="start">
//               <Text style={{
//                   fontFamily: 'Muli',
//                   fontSize: 14,
//                   marginLeft: 10,
//                   marginRight: 20,
//                 }}>
//                 {me.Overview}
//               </Text>
//             </Flex>
//           </Flex>

//           <WhiteSpace />
//           <WhiteSpace style={{ backgroundColor: '#dbdbde', height: 1 }} />

//           <View style={{ backgroundColor: '#fff' }}>
//             <Flex style={{ padding: 10 }}>
//               <View
//                 style={{
//                   width: 90,
//                   borderColor: colors.ORANGE,
//                   borderWidth: 1,
//                   borderRadius: 20,
//                   paddingVertical: 5,
//                 }}>
//                 <Text style={{ textAlign: 'center', color: colors.ORANGE }}>
//                   afternoon
//                 </Text>
//               </View>

//               <View
//                 style={{
//                   width: 90,
//                   borderColor: colors.ORANGE,
//                   borderWidth: 1,
//                   borderRadius: 20,
//                   paddingVertical: 5,
//                   marginLeft: 10,
//                 }}>
//                 <Text style={{ textAlign: 'center', color: colors.ORANGE }}>
//                   transport
//                 </Text>
//               </View>
//             </Flex>

//             <View
//               style={{
//                 margin: 10,
//                 borderWidth: 1,
//                 borderColor: colors.ORANGE,
//                 padding: 12,
//               }}>
//               <Text
//                 style={{
//                   fontFamily: 'Muli-Bold',
//                   fontSize: 16,
//                   textAlign: 'center',
//                   color: colors.ORANGE,
//                 }}>
//                 View Public Profile
//               </Text>
//             </View>
//           </View>
         
//         </ScrollView>
//       </View>
//     );
//   }
// }

// export default connect(
//   state => ({
//       me: state.common.me,
//       profile:state.common.profile,
//       token:state.common.token,
//       userId:state.common.userId
//   }),
//   dispatch => ({
//       actionsJob: bindActionCreators(actionsJob, dispatch),
//       actionsCommon: bindActionCreators(actionsCommon, dispatch)
//   })
// )(PrivateProfile);

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       backgroundColor: 'pink',
//   },
//   name:{
//     fontFamily: 'Muli-Bold',
//     fontSize: 32,
//     textAlign: 'center',
//     paddingVertical: 12,
//   }
// })