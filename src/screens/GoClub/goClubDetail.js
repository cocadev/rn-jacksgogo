// import React from 'react';
// import CategorySmallItem from '../../components/CategorySmallItem';
// import Bar from '../../components/Bar';
// import JobButton from '../../components/JobButton';
// import Carousel from 'react-native-banner-carousel';
// import Header from "../../components/Header";
// import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
// import { Flex, WhiteSpace } from '@ant-design/react-native';
// import { colors } from '../../common/colors';
// import { texts } from '../../common/texts';
// import { ScrollView } from 'react-native-gesture-handler';
// import { JOBLISTING } from '../../common/staticdata';
// import GoEventListItem from '../../components/GoEventListItem';
// import _ from 'underscore'
// import { TestCarousel, TestTags } from '../../common/staticdata';
// import { commonStyles } from '../../common/commonStyles';

// const BannerWidth = Dimensions.get('window').width;
// const BannerHeight = 180;

// class GoClubDetail extends React.Component {

//   renderPage(URL, index) {
//     return (
//       <View key={index}>
//         <Image
//           style={{ width: BannerWidth, height: BannerHeight }}
//           source={{ uri: URL }}
//         />
//       </View>
//     );
//   }

//   _renderEvent = ({item}) => (
//     <GoEventListItem image={item.image} joined={item.joined} start={item.start} end={item.end} title={item.title} hi ={item.hi}/>
//   )

//   render() {

//     return (
//       <View style={{ flex: 1, flexDirection: 'column' }}>
//         <ScrollView>
//             <Header />
               
//               <Carousel
//                 autoplay
//                 autoplayTimeout={5000}
//                 loop
//                 index={0}
//                 pageSize={BannerWidth}
//               >
//                  {TestCarousel.map((data, index) => this.renderPage(data.URL, index))} 
//               </Carousel>

//               <WhiteSpace />

//               <View>
//                 <Flex>
//                   <View style={{ flex: 4, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 120 }}>
//                     <Image style={{ width: 50, height: 50 }} source={require('../../../assets/images/social/icon_cat_sports.png')} />
//                     <Text style={[styles.normalText, { textAlign: 'center' }]}>Sports</Text>
//                   </View>
//                   <View style={{ flex: 11, backgroundColor: '#fff', marginLeft: 10, height: 120, justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={{ fontFamily: 'Muli-Bold', fontSize: 21, textAlign: 'center', lineHeight: 25, marginTop: 3 }}>Football Ole Ole</Text>
//                   </View>
//                 </Flex>

//               </View>

//               <CategorySmallItem icon={'error-outline'} text={'Football fan club and sessions in Victory Park.'} />
//               <CategorySmallItem icon={'near-me'} text={'10, 238'} />

//               <Bar />

//               <Text style={[texts.HEADLINE,{marginHorizontal:12}]}>Events</Text>
//               <FlatList
//                 data={JOBLISTING}
//                 keyExtractor={(item, i) => String(i)}
//                 renderItem={this._renderEvent}
//               />
//               <View style={[commonStyles.longbutton, {alignItems:'center'}]}>
//                 <Text style={[texts.HEADLINE, {color:colors.PURPLE}]}>View Past Events</Text>
//               </View>

//               <TouchableOpacity>
//                 <Flex style={{ backgroundColor: colors.WHITE, padding: 10 }}>
//                   <Image
//                     style={{ width: 70, height: 70, borderRadius: 50, marginLeft: 5 }}
//                     source={{ uri: 'http://www.hazelearth.com/admin-content/thumbs/nouser.jpg' }}
//                   />
//                   <Flex direction='column'>
//                     <Text style={[styles.listTitle, { marginLeft: 20 }]}>{'Owner'}</Text>
//                     <Text style={[styles.listTitle, { marginLeft: 20 }]}>{'Alan.Tam'}</Text>
//                   </Flex>
//                 </Flex>
//               </TouchableOpacity>

//               <Bar />

//               <ScrollView horizontal style={{ padding: 1 }}>
//                 {
//                   TestTags.map((data, index) => 
//                     <JobButton key={index} text={data.Tag} color={colors.PURPLE} />
//                   )
//                 }                 
//               </ScrollView>

//               <Bar />

//               <View style={{ padding: 12, backgroundColor: '#fff' }}>
//                 <Text style={styles.headText}>Active Group</Text>
//                 <Text style={styles.normalText}>Latest response: 0 min ago</Text>
//               </View>

//               <Bar />

//               <Flex justify="between" style={{ padding: 12 }}>
//                 <Text style={styles.smallText}>GoClub reference no: S38291</Text>
//                 <Text style={styles.smallText}>{'Created On 2019 - 02 - 26'}</Text>
//               </Flex>

//               <Flex justify="between" style={{ paddingHorizontal: 12, paddingVertical:10, backgroundColor:colors.LIGHTPURPLE }}>
//                 <Text style={styles.smallText}>21 People joined this goClub recently!</Text>
//                 <Text style={styles.smallText}>{'3 viewing now'}</Text>
//               </Flex>

//               <TouchableOpacity style={{backgroundColor:colors.PURPLE, alignItems:'center'}}>
//                   <Text style={[texts.HEADLINE, {color:colors.WHITE, padding:15}]}>Join Event</Text>
//               </TouchableOpacity>

//             </ScrollView>
//       </View>
//     );
//   }
// }

// export default GoClubDetail;

// const styles = StyleSheet.create({
//   normalText: texts.CAPTION.PRIMARY,
//   smallText: texts.CAPTION.SECONDARY,
//   listTitle: texts.LISTTITLE,
//   listText: texts.LISTTEXT,
//   headText: texts.HEADLINE,
// });
