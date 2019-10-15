import React from 'react';
import { ScrollView, View, Image, Text, TextInput, StyleSheet } from 'react-native';
import { Flex, WhiteSpace } from '@ant-design/react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import { colors } from '../../common/colors';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../store/job/actions";
import { Rating } from 'react-native-ratings';

class Review extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', marginTop: 25, backgroundColor: '#fff', borderBottomColor: '#d3d3d3', borderBottomWidth: 1 }}>
          <Text style={{ textAlign: "center", marginVertical: 13, fontSize: 20, fontFamily: 'Muli-Bold'}}>AliciaLeong</Text>
          <Entypo onPress={() => Actions.pop('review')} style={{ position: 'absolute', left: 10 }} name="chevron-left" size={36} color={colors.CYAN} />
          <Entypo onPress={() => Actions.pop('mainchat')} style={{ position: 'absolute', right: 10 }} name="dots-three-horizontal" size={36} color={colors.CYAN} />
        </View>
        <ScrollView>
          <Flex style={{ padding: 8, borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
            <MaterialCommunityIcons name="broom" size={32} color={colors.ORANGE} style={{ marginHorizontal: 1 }} />
            <Flex direction='column'>
              <Text style={[styles.listTitle, { fontWeight: '500' }]}>Housemaid Needed</Text>
              <Text style={[styles.listTitle, { fontWeight: '500' }]}>17/7 Sunday 10 AM</Text>
            </Flex>
          </Flex>

          <Flex style={{ backgroundColor: colors.WHITE, padding: 20 }}>
            <Image
              style={{ width: 45, height: 45, borderRadius: 50, marginLeft: 5 }}
              source={{ uri: 'https://i.mydramalist.com/rYo6pc.jpg' }}
            />
            <Text style={[styles.listTitle, { marginLeft: 20 }]}>AliciaLeong</Text>
          </Flex>

          <Text style={[styles.listText, { padding: 15 }]}>Congratulations on the completed job!</Text>
          <Text style={[styles.listText, { padding: 15 }]}>Please leave a review of feedback for the client.</Text>

          <View style={{ backgroundColor: '#fff', padding: 12 }}>
            <View style={{ justifyContent:'center', alignItems:'center' }}>
              <Rating type='star' ratingCount={5} imageSize={50} style={{ marginLeft: 12 }} onFinishRating={this.ratingCompleted} />
            </View>
            <WhiteSpace />
            <TextInput style={{ borderColor: '#ddd', borederRadius: 15, borderWidth: 1, padding:12, fontSize:18 }} placeholder='e.g. Phenomental work!' />
            <WhiteSpace />
            <Text style={styles.listText}>to be earned: 10</Text>
          </View>

        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Review);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
  },
  listTitle: texts.LISTTEXT,
  listText: texts.LISTTITLE,
});