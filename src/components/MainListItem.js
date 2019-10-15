import * as React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import { colors } from '../common/colors';
import { MaterialIcons, Foundation } from '@expo/vector-icons';
import { texts } from '../common/texts';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionsJob from "../store/job/actions";
import * as actionsCommon from "../store/common/actions";
import { images } from '../common/images';
import { commonStyles } from '../common/commonStyles';
import _ from 'underscore'

class MainListItem extends React.Component {

  render() {
    const { image, position, money, title, sold, icon, data, IsUrgent, action, type, ID, currency } = this.props;

    var fav_mapping = _.find(data.Favorite, (u) => {
      return u.User.Id == this.props.userId
    })

    return (
      <TouchableOpacity
        onPress={() => { action == 'viewjob' ? Actions.viewjob({ job: data, index: type }) : Actions.jobprofile({ itemProfile: data, index: type }) }}>
        <Flex style={{ backgroundColor: colors.WHITE }}>
          <View>
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: image,
              }}
            />
            {
              fav_mapping ? <View
                style={{
                  backgroundColor: type == 0 ? colors.CYAN : colors.GREEN,
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  borderRadius: 30,
                  width: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Foundation name="heart" size={14} color={colors.WHITE} />
              </View>
                : null
            }

            {
              sold == 1
                ? <Image style={commonStyles.ICON.sold} source={images.icon.sold} />
                : null
            }

            {
              IsUrgent
                ? <Image style={commonStyles.ICON.urgent} source={images.icon.urgent} />
                : null
            }

          </View>
          <Flex direction="column" align='start'>
            <Flex align='start'>
              <Image style={{ width: 25, height: 25, marginLeft: 13 }} source={{ uri: icon }} />
              <Text style={[styles.listText1, { marginLeft: 3, marginTop: -1, marginRight: 160 }]}>{title}</Text>
            </Flex>
            <Flex style={{ width: '75%', backgroundColor: '#fff' }} align='start'>
              <Image source={images.icon_location} style={{ marginLeft: 15, width: 20, height: 20 }} />
              <Text style={[styles.listText2, { fontSize: 14, paddingTop: 2, marginLeft: 5 }]}>{position}</Text>
            </Flex>
            <Flex>
              <Image source={images.icon_budget} style={{ marginLeft: 15, width: 18, height: 18 }} />
              <Text style={[styles.listText1, { marginLeft: 3 }]}> {currency ? currency : ''} {currency ? money : 'Not Sured'}</Text>
            </Flex>
          </Flex>

          {
            type == 0
              ? <Image source={images.icon.right_arrow_cyan} style={commonStyles.ICON.iconRight} />
              : <Image source={images.icon.right_arrow_green} style={commonStyles.ICON.iconRight} />
          }

        </Flex>
      </TouchableOpacity>
    )
  }
}

export default connect(
  state => ({
    categories: state.job.categories,
    categoryID: state.job.categoryID,
    wholejobs: state.job.wholejobs,
    userId: state.common.userId,
  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch),
    actionsCommon: bindActionCreators(actionsCommon, dispatch)
  })
)(MainListItem);


const styles = StyleSheet.create({
  listText1: texts.LISTTEXT,
  listText2: texts.CAPTION.SECONDARY,
});
