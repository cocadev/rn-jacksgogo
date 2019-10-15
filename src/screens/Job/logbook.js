import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Flex, SegmentedControl, WhiteSpace, Modal } from 'antd-mobile-rn';
import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import { colors } from '../../common/colors';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../store/job/actions";
import { Rating } from 'react-native-ratings';
import { images } from '../../common/images';
import Header from '../../components/Header';

class LogBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
    this.onClose = this.onClose.bind(this)
  }

  onValueChange = value => {

    if (value == 'Appointments') {
      console.log('hi')
    } else {
      console.log('hello')
    }
  }

  showModal = () => this.setState({ visible: true })
  onClose = () => this.setState({ visible: false })

  onAcceptedDate = () =>{
     if(this.props.update){
       this.props.update('accept')
       Actions.pop();
     }
  }

  onDeclineDate = () =>{
    if(this.props.update){
      this.props.update('cancel')
      Actions.pop();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={{ justifyContent: 'center', marginTop: 25, backgroundColor: '#fff', borderBottomColor: '#d3d3d3', borderBottomWidth: 1 }}>
          <Text style={{ textAlign: "center", marginVertical: 13, fontSize: 20, fontFamily: 'Muli-Bold' }}>AliciaLeong</Text>
          <Entypo onPress={() => Actions.pop('mainchat')} style={{ position: 'absolute', left: 10 }} name="chevron-left" size={36} color={colors.CYAN} />
          <Entypo onPress={() => Actions.pop('mainchat')} style={{ position: 'absolute', right: 10 }} name="dots-three-horizontal" size={36} color={colors.CYAN} />
        </View> */}
        <Header  action="talktous" title="Talk To Us" FavElement={(
                <TouchableOpacity>
                  <Image
                    source={images.icon.more_cyan}
                    style={{ width:32,height:32 }}
                  />
              </TouchableOpacity>
        )}/>
        <ScrollView>
          <Flex style={{ paddingHorizontal: 8 }}>
            <MaterialCommunityIcons name="broom" size={32} color={colors.ORANGE} style={{ marginHorizontal: 1 }} />
            <Text style={[styles.listText1, { fontWeight: '500' }]}>Housemaid Needed</Text>
          </Flex>

          <SegmentedControl
            values={['Appointments', 'Payments']}
            backgroundColor='#f0f'
            tintColor={colors.CYAN}
            selectedIndex={0}
            style={{ marginHorizontal: 10, height: 35, marginBottom: 10 }}
            onChange={this.onChange} onValueChange={this.onValueChange}
          />

          <View style={{ backgroundColor: '#fff', padding: 18 }}>
            <Text style={styles.headtext}>17/7 Sunday 10 AM</Text>
          </View>

          <Flex style={{ backgroundColor: colors.CYAN, marginTop: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 55, backgroundColor: '#e7f7fe' }}
              onPress={this.onDeclineDate}
            >
              <Text style={[styles.headtext, { textAlign: 'center', color: colors.CYAN }]}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, height: 55, justifyContent: 'center', alignItems: 'center' }}
              onPress={this.onAcceptedDate}
            >
              <Text style={[styles.headtext, { textAlign: 'center', color: '#fff' }]}>Accepted Date</Text>
            </TouchableOpacity>
          </Flex>

          <WhiteSpace />

          <Flex style={{ backgroundColor: colors.WHITE, padding: 20 }}>
            <Text style={[styles.listTitle, { color: colors.BLACK }]}>25/7 12:30 PM</Text>
            <View style={styles.icon}>
              <Entypo name="cross" size={36} color={colors.CYAN} />
            </View>
            <View style={[styles.icon, {right:20}]}>
              <Feather name="check" size={36} color={colors.WHITE} />
            </View>
          </Flex>

          <WhiteSpace />

          <Flex style={{ backgroundColor: colors.WHITE, padding: 20 }}>
            <Text style={[styles.listTitle, { color: colors.BLACK }]}>17/7 Sunday 10 AM</Text>
            <View style={styles.icon}>
              <Entypo name="cross" size={36} color={colors.CYAN} />
            </View>
            <TouchableOpacity onPress={this.showModal} style={[styles.icon, {right:20}]}>
              <Feather name="check" size={36} color={colors.WHITE} />
            </TouchableOpacity>
          </Flex>

          <View style={{ padding: 18 }}>
            <Text style={styles.headtext}>Completed Jobs</Text>
          </View>

          <Flex style={{ backgroundColor: colors.CYAN, marginTop: 1 }}>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 55, backgroundColor: '#e7f7fe' }}
              onPress={() => {
                this.props.actions.setChat({
                  key: 0,
                  title: 'Refund Request 17/7 Sunday 10 AM declined.'
                });

                this.props.actions.setSituation('funddeclined');
                Actions.mainchat();

              }}>
              <Text style={[styles.headtext, { textAlign: 'center', color: colors.CYAN }]}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, height: 55, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff3b30' }}
              onPress={() => {
                this.props.actions.setChat({
                  key: 0,
                  title: 'Refund Request 17/7 Sunday 10 AM accepted.'
                });
                this.props.actions.setSituation('fundaccepted');
                Actions.mainchat();

              }}>
              <Text style={[styles.headtext, { textAlign: 'center', color: '#fff' }]}>Accepted Date</Text>
            </TouchableOpacity>
          </Flex>

          <View style={{ padding: 18 }}>
            <TouchableOpacity onPress={()=>Actions.review()}>
              <Text style={[styles.headtext, { textAlign: 'right', color: colors.CYAN }]}>Reviews </Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: '#fff', padding: 18 }}>
            <Text style={styles.headtext}>6/7 noon</Text>
          </View>

          <View style={{ height: 1, width: '100%', backgroundColor: colors.GREY3 }}></View>

          <Flex style={{ backgroundColor: colors.WHITE, padding: 10 }}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 5 }}
              source={{ uri: 'https://i.mydramalist.com/rYo6pc.jpg' }}
            />
            <Rating
              type='star'
              ratingCount={5}
              imageSize={10}
              style={{ marginLeft: 12 }}
              onFinishRating={this.ratingCompleted}
            />
            <Image
              style={{ width: 45, height: 45, borderRadius: 50, marginLeft: 15 }}
              source={{ uri: 'https://i.mydramalist.com/eg3Ddf.jpg' }}
            />
            <Rating
              type='star'
              ratingCount={5}
              imageSize={10}
              style={{ marginLeft: 12 }}
              onFinishRating={this.ratingCompleted}
            />
            <Entypo name="chevron-down" size={32} color={colors.CYAN} style={{ position: 'absolute', right: 15 }} />
          </Flex>

          <View style={{ backgroundColor: '#fff', padding: 18 }}>
            <Text style={styles.headtext}>1/7 12pm</Text>
          </View>

          <Flex style={{ backgroundColor: colors.WHITE, padding: 10 }}>
            <Image
              style={{ width: 45, height: 45, borderRadius: 50, marginLeft: 5 }}
              source={{ uri: 'https://i.mydramalist.com/rYo6pc.jpg' }}
            />
            <Text style={[styles.listTitle, { marginLeft: 20 }]}>Please clean the bathtub.</Text>
          </Flex>

          <View style={{ height: 1, width: '100%', backgroundColor: colors.GREY3 }}></View>

          <Flex style={{ backgroundColor: colors.WHITE, padding: 10 }}>
            <Image
              style={{ width: 45, height: 45, borderRadius: 50, marginLeft: 5 }}
              source={{ uri: 'https://i.mydramalist.com/eg3Ddf.jpg' }}
            />
            <Rating
              type='star'
              ratingCount={5}
              imageSize={10}
              style={{ marginLeft: 12 }}
              onFinishRating={this.ratingCompleted}
            />
            <Text style={[styles.listTitle, { position: 'absolute', right: 55, color: colors.CYAN }]}>Review</Text>
            <Entypo name="chevron-down" size={32} color={colors.CYAN} style={{ position: 'absolute', right: 15 }} />
          </Flex>

          <Modal title='' transparent onClose={this.onClose} visible={this.state.visible}>

            <Flex direction='column' style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.listText, { fontSize: 20 }]}>Mark Job As Done?</Text>
              <WhiteSpace style={{ height: 10 }} />
              <Text style={[styles.listTitle, { textAlign: 'center', fontSize: 11 }]}>AliciaLeong will be requested to confirm.</Text>
              <WhiteSpace style={{ height: 50 }} />
              <Flex style={{ position: 'absolute', bottom: 0 }}>
                <TouchableOpacity
                  style={{ backgroundColor: '#e7f7fe', height: 40, flex: 1 }}
                  onPress={this.onClose}>
                  <Text style={{ color: colors.CYAN, textAlign: 'center', fontSize: 14, paddingTop: 9, paddingRight: 15 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: colors.CYAN, height: 40, flex: 1 }}
                  onPress={() => {
                    this.props.actions.setChat({
                      key: 0,
                      title: 'Appointment: 17/7 Sunday 10 AM marked as done.'
                    });
                    this.setState({ visible: false })
                    this.props.actions.setSituation('done');
                    Actions.mainchat();
                  }}>
                  <Text style={{ color: '#fff', textAlign: 'center', fontSize: 14, paddingTop: 9, paddingRight: 15 }}> Job Done</Text>
                </TouchableOpacity>
              </Flex>
            </Flex>
          </Modal>

        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    chat: state.job.chat,
    offer: state.job.offer,
    situation: state.job.situation
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(LogBook);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
  },
  icon:{
    width: 40,
    height: 40, 
    backgroundColor: colors.WHITE, 
    borderColor: colors.CYAN, 
    borderWidth: 1, 
    borderRadius: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'absolute', 
    right: 80 
  },
  listTitle: texts.LISTTEXT,
  listText: texts.LISTTITLE,
  headtext: texts.HEADLINE
});