import React from 'react';
import MainListItem from '../../../components/MainListItem';
import { View, Text, Image, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { colors } from '../../../common/colors';
import { images } from '../../../common/images';
import { commonStyles } from '../../../common/commonStyles';
import { texts } from '../../../common/texts';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actionsJob from "../../../store/job/actions";
import * as actionsCommon from "../../../store/common/actions";

class FavouriteService extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  componentDidMount(){
    const {actionsJob, userId, token} = this.props
    actionsJob.GetFavoriteServicesByUser(userId, token)
  }

  _renderItem = ({ item }) => (
    <MainListItem
      data={item.Job}
      image={ item.Job.Attachments.length > 0 ? item.Job.Attachments[0].URL : images.no_image }
      title={item.Job.Title}
      money={item.Job.Amount}
      position={item.Job.User.Address.ADDRESS ? item.Job.User.Address.ADDRESS : "No Address"}
      type = {'service'}
      IsUrgent={item.Job.IsUrgent}
      icon={item.Job.Category.Image}
      action={'viewjob'}
    />
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {

    console.log('my mapping', this.props.getFavoriteServicesByUser)

    return (
      <View style={commonStyles.container}>
        <View style={commonStyles.VIEW.searchView}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("MyFav")} style={{position:'absolute', left:10}}>
              <Image source={images.icon.left_arrow_green} style={commonStyles.IMAGE.logo_round_35}/>
            </TouchableOpacity>
            <TextInput
              style={commonStyles.INPUT.favSearch}  
              underlineColorAndroid="transparent"
              placeholder={"Favourite Services"}
              onChangeText={content => this.setState({ content })}
              value={this.state.content}
            />
            <TouchableOpacity style={{position:'absolute', right:20}}>
              <Image source={images.icon.green_search} style={commonStyles.IMAGE.logo_round_35}/>
            </TouchableOpacity>
          </View>
        <FlatList
            data={this.props.getFavoriteServicesByUser}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._ItemSeparator}
          />
        <Flex style={{ backgroundColor: colors.WHITE, padding: 5, marginTop: 10 }}>
          <Flex direction="column" style={{ width: 100 }}>
            <Image source={images.icon.delete} style={commonStyles.ICON.largeSocialIcon} />
            <Text>Deleted</Text>
          </Flex>
          <Flex direction="column" align="start">
            <Text style={texts.LISTTEXT}> Total deleted jobs : 0 </Text>
          </Flex>
          <Image source={images.icon.right_arrow_green} style={commonStyles.ICON.iconRight}/>
        </Flex>
      </View>
    );
  }
}

export default connect(
  state => ({
    getFavoriteServicesByUser: state.job.getFavoriteServicesByUser,
    token:state.common.token,
    userId:state.common.userId,
    job_type:state.job.job_type
  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch),
    actionsCommon: bindActionCreators(actionsCommon, dispatch)
  })
)(FavouriteService);

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: "rgba(0, 0, 0, .08)"
  }
});
