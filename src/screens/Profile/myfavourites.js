import React from 'react';
import Header from '../../components/Header';

import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import { Foundation } from '@expo/vector-icons';
import { colors } from '../../common/colors';
import { commonStyles } from '../../common/commonStyles';
import { images } from '../../common/images';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import api from "../../service/api";
import Cache from "../../utils/cache";
import LottieScreen from '../../components/Lottie';
import * as actionsJob from "../../store/job/actions";
import * as actionsCommon from "../../store/common/actions";
import i from '../../common/i';

class FavouritesList extends React.Component {
  render(){
    return(
      <Flex style={styles.list}>
        <View style={[commonStyles.ICON.roundIIcon, {backgroundColor:this.props.color}]}> 
          <Foundation name="heart" size={28} color={colors.WHITE} />
        </View>
      <Flex direction="column" align="start">
        <Text style={[commonStyles.LISTTEXT, {marginLeft:12}]}>
          {this.props.title} ({this.props.count})
        </Text>
      </Flex>
      <Image source={images.icon.right_arrow_orange} style={commonStyles.ICON.iconRight}/>
    </Flex>
    )
  }
}

class MyFavourites extends React.Component {

  state = {
    users:null,
    jobs:null,
    services:null,
    isWaiting:false,
  }

  componentDidMount(){
    this.getFavoriteJobsByUser()
    this.getFavoriteServicesByUser()
    this.getFavoriteUsersByUser()
  }

  getFavoriteJobsByUser(){
    this.setState({isWaiting:true})
    api.getFavoriteJobsByUser(Cache.currentUser.Id, (err,res)=>{ if (err == null ){ 
      this.setState({ jobs: res.Value})
    } else{}
    this.setState({isWaiting:false})
  })}

  getFavoriteServicesByUser(){
    this.setState({isWaiting:true})
    api.getFavoriteServicesByUser(Cache.currentUser.Id, (err,res)=>{ if (err == null ){ 
      this.setState({ services: res.Value})
    } else{}
    this.setState({isWaiting:false})
  })}

  getFavoriteUsersByUser(){
    this.setState({isWaiting:true})
    api.getFavoriteUsersByUser(Cache.currentUser.Id, (err,res)=>{ if (err == null ){ 
      this.setState({ users: res.Value})
    } else{}
    this.setState({isWaiting:false})
  })}

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

  render() {

    const { users, services, jobs} = this.state;

    return (
      <ScrollView style={i.container}>
        <Header title="My Favourites" leftElement={(
            <TouchableOpacity style={[commonStyles.VIEW.headerElement, {left:6}]} onPress={()=>this.props.navigation.navigate('Home')}>
              <Image
                source={images.icon.left_arrow_orange}
                style={{width:35,height:35}}
               />
            </TouchableOpacity>
          )}/>

        <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('FavJob', { jobs:jobs }) }}>
          <FavouritesList title={'Jobs'} count= {jobs ? jobs.length: '0'} color={colors.CYAN}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('FavService', { services:services}) }}>
          <FavouritesList title={'Talents'} count= {services ? services.length : '0'} color={colors.GREEN}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('FavEvent')}>
          <FavouritesList title={'Events'} count= {'0'} color={colors.PURPLE}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FavUser', { users:users})}}>
          <FavouritesList title={'Users'} count= {users ? users.length : '0'} color={colors.ORANGE}/>
        </TouchableOpacity>

        {this.renderIndicator()}

      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    job_type:state.job.job_type,
    token:state.common.token,
    userId:state.common.userId,
    getFavoriteJobsByUser: state.job.getFavoriteJobsByUser,
    getFavoriteServicesByUser:state.job.getFavoriteServicesByUser,
    getFavoriteUsersByUser:state.job.getFavoriteUsersByUser

  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch),
    actionsCommon: bindActionCreators(actionsCommon, dispatch)

  })
)(MyFavourites);

const styles = StyleSheet.create({
  list:{
    backgroundColor: colors.WHITE,
    padding: 15,
    marginTop: 10
  }
})