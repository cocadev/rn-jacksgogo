import React from 'react';
import Header from '../../components/Header';
import MainListItem from '../../components/MainListItem';

import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../common/colors';
import { images } from '../../common/images';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actionsJob from "../../store/job/actions";
import * as actionsCommon from "../../store/common/actions";
import api from "../../service/api";
import Cache from "../../utils/cache";
import LottieScreen from '../../components/Lottie';
import i from '../../common/i';

class JobListing extends React.Component {

  state = {
    all:[],
    isWaiting:false,
  }

  componentDidMount(){
    this.getJobsByUser()
  }

  getJobsByUser = () => {
    this.setState({isWaiting:true})
    setTimeout(()=>{this.setState({isWaiting: false})}, 10000); 
    api.getJobsByUser(Cache.currentUser.Id, (err,res)=>{ if (err == null ){ 
      this.setState({ all: res.Value})
    } else{
    }
    this.setState({isWaiting:false})
  })  
  }

  _renderItem = ({ item }) => (
    <MainListItem
      data={item}
      image={ item.Attachments.length > 0 ? item.Attachments[0].URL : images.no_image }
      title={item.Title}
      type={0}
      money={item.Amount}
      position={item.Address ? item.Address.Address : "No Address"}
      iconColor={colors.CYAN}
      IsUrgent={item.IsUrgent}
      icon={item.Category.Image}
      action={'viewjob'}
    />
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {

    return (
      <ScrollView style={i.container}>

        <Header action="joblisting" title="Job Listing" type={2} />
        {this.state.isWaiting && <LottieScreen />}

        <FlatList
            data={this.state.all}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._ItemSeparator}
        />
        <View style={{height:25}}></View>
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    getJobsByUser: state.job.getJobsByUser,
    token:state.common.token,
    userId:state.common.userId
  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch),
    actionsCommon: bindActionCreators(actionsCommon, dispatch)
  })
)(JobListing);

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: "rgba(0, 0, 0, .08)"
  }
});
