import React from 'react';
import Header from '../../components/Header';
import MainListItem from '../../components/MainListItem';

import { View, StyleSheet, FlatList, Modal, ScrollView } from 'react-native';
import { colors } from '../../common/colors';
import { images } from '../../common/images';
import { commonStyles } from '../../common/commonStyles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import api from "../../service/api";
import Cache from "../../utils/cache";
import LottieScreen from '../../components/Lottie';

import * as actionsJob from "../../store/job/actions";
import * as actionsCommon from "../../store/common/actions";
import i from '../../common/i';

class ServiceListing extends React.Component {

  state = {
    all:[],
    isWaiting:false,
  }

  componentDidMount(){
    this.getServicesByUser()
  }

  getServicesByUser = () => {
    this.setState({isWaiting:true})
    api.getServicesByUser(Cache.currentUser.Id, (err,res)=>{ if (err == null ){ 
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
        type={1}
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
        <Header action="servicelisting" title="Service Listing" type={2}/>
        {this.state.isWaiting && <LottieScreen />}
        <FlatList
            data={this.state.all}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._ItemSeparator}
          />
        {/* <Flex style={{ backgroundColor: colors.WHITE, padding: 5, marginTop: 10 }}>
          <Flex direction="column" style={{ width: 100 }}>
            <Image source={images.icon.delete} style={commonStyles.ICON.largeSocialIcon} />
            <Text>Deleted</Text>
          </Flex>
          <Flex direction="column" align="start">
            <Text style={texts.LISTTEXT}> Total deleted services : 0 </Text>
          </Flex>
          <Image source={images.icon.right_arrow_cyan} style={commonStyles.ICON.iconRight}/>
        </Flex> */}
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    getServicesByUser: state.job.getServicesByUser,
    token:state.common.token,
    userId:state.common.userId
  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch),
    actionsCommon: bindActionCreators(actionsCommon, dispatch)
  })
)(ServiceListing);

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: "rgba(0, 0, 0, .08)"
  }
});
