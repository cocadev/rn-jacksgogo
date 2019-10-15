import React from 'react';
import { ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import * as actions from "../../store/common/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const COVERS = [
  require('../../../assets/images/background/1.jpg'),
  require('../../../assets/images/background/2.jpg'),
  require('../../../assets/images/background/3.jpg'),
  require('../../../assets/images/background/4.jpg'),
  require('../../../assets/images/background/5.jpg'),
  require('../../../assets/images/background/6.jpg'),
  require('../../../assets/images/background/7.jpg'),
  require('../../../assets/images/background/8.jpg'),
];

class Album extends React.Component {

  render() {

    if(!this.props.token){
      return false
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {COVERS.map((source, i) => (
          <Image key={i} source={source} style={styles.cover} />
        ))}
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
      token:state.common.token
  }),
  dispatch => ({
      actions: bindActionCreators(actions, dispatch)
  })
)(Album);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343C46',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cover: {
    width: '50%',
    height: Dimensions.get('window').width / 2,
  },
});