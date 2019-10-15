// import * as React from 'react'
// import * as actionsJob from "../../store/job/actions"
// import { View, TouchableOpacity, Text, Image, TextInput, FlatList  } from 'react-native'
// import { commonStyles } from '../../common/commonStyles'
// import { texts } from '../../common/texts'
// import { images } from '../../common/images'
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import Header from '../../components/Header'
// import LottieScreen from '../../components/Lottie';
// import { Actions } from 'react-native-router-flux';

// class Location extends React.Component {

//   state = {content:''}

//   componentDidMount(){
//     this.props.actionsJob.stopLoading()
//   }

//   SearchLocation = () =>{
//     this.props.actionsJob.SearchLocation(this.state.content)
//   }

//   _renderItem = ({ item }) => (
//     <TouchableOpacity 
//          onPress={()=>{
//            this.props.actionsJob.setLocation(item);
//            Actions.pop('location')
//           }} 
//          style={{backgroundColor:'#fff', paddingVertical:12, marginTop:5, paddingLeft:10}}>
//         <Text style={[texts.BODY.PRIMARY, {lineHeight:25}]}>{item.ADDRESS}</Text>
//     </TouchableOpacity>
//   );

//   render() {

//     const {loading,locations} = this.props

//     console.log('my loading', loading)

//     return (
//       <View style={commonStyles.container}>
//         <Header action="location" title="Location" />
//         <View style={[commonStyles.VIEW.searchView, {marginTop:0, backgroundColor:'transparent'}]}>
//             <TouchableOpacity onPress={this.SearchLocation} style={{position:'absolute', right:20}}>
//               <Image source={images.icon.cyan_search} style={commonStyles.IMAGE.logo_round_35}/>
//             </TouchableOpacity>
//             <TextInput
//               style={[commonStyles.INPUT.favSearch, {marginLeft:10, zIndex:-1, width:'94%'}]}  
//               underlineColorAndroid="transparent"
//               placeholder="Search location"
//               onChangeText={content => this.setState({ content })}
//               value={this.state.content}
//             />
//         </View>
//         <Text style={[texts.HEADLINE, {lineHeight:45, paddingHorizontal:12}]}>Suggestions Nearby</Text>
        
//         {
//           loading
//           ? <LottieScreen />
//           : <FlatList
//               data={locations}
//               keyExtractor={(item, i) => String(i)}
//               renderItem={this._renderItem}
//               ItemSeparatorComponent={this._ItemSeparator}
//             />
//         }
        
//       </View>
//     )
//   }
// }

// export default connect(
//   state => ({
//     locations:state.job.locations,
//     location:state.job.location,
//     loading:state.job.loading
//   }),
//   dispatch => ({
//     actionsJob: bindActionCreators(actionsJob, dispatch),
//   })
// )(Location);