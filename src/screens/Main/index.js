import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Modal, Button, WingBlank, Flex } from "antd-mobile-rn";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../common/colors";
import { texts } from "../../common/texts";
import MainNavigator from "../../common/navigator";
import { Actions } from "react-native-router-flux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../store/common/actions";
import * as actionsJob from "../../store/job/actions";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false
    };
  }

  showModal2 = () => this.setState({ visible2: true });
  onClose2 = () => this.setState({ visible2: false });

  render() {
    return (
      <View style={{ flexDirection: "column", flex: 1, paddingTop: 5 }}>
        <View style={{ flex: 1 }}>
          <MainNavigator />
          <View
            style={{
              position: "absolute",
              left: "50%",
              bottom: 25
            }}
          >
            <Button
              onClick={this.showModal2}
              style={{
                position: "relative",
                left: "-50%",
                borderRadius: 50,
                backgroundColor: colors.ORANGE,
                width: 70,
                height: 70
              }}
            >
              <Entypo name="plus" size={30} color={colors.WHITE} />
            </Button>
          </View>

          <Modal
            hidden={true}
            style={{ flex: 1, position: "absolute", bottom: 110 }}
            transparent={false}
            visible={this.state.visible2}
            animationType="slide-up"
            onClose={this.onClose2}
          >
            {!this.props.token ? (
              <Flex align="end" direction="column">
                <TouchableOpacity
                  style={[styles.item, { borderColor: colors.GREEN }]}
                  onPress={() => {
                    this.setState({ visible2: false });
                    Actions.postjob({index:1});
                  }}
                >
                  <Text style={[styles.listTitle, { lineHeight: 30 }]}>
                    I can do this !
                  </Text>
                  <Text style={styles.listText}>
                    Come and join us in our talent list.
                  </Text>
                  <Text
                    style={[
                      styles.listTitle,
                      { color: colors.GREEN, lineHeight: 32 }
                    ]}
                  >
                    Post your Service Now
                  </Text>
                </TouchableOpacity>

                <WingBlank />

                <TouchableOpacity
                  onPress={() => {
                    this.setState({ visible2: false });
                    Actions.postjob({index:0});
                  }}
                  style={styles.item}
                >
                  <Text style={[styles.listTitle, { lineHeight: 30 }]}>
                    Help! I need to get a job done!
                  </Text>
                  <Text
                    style={[
                      styles.listText,
                      { textAlign: "center", lineHeight: 22 }
                    ]}
                  >
                    Don't worry, post your job here and we will find you a great
                    talent!
                  </Text>
                  <Text
                    style={[
                      styles.listTitle,
                      { color: colors.CYAN, lineHeight: 32 }
                    ]}
                  >
                    Post your Job Now
                  </Text>
                </TouchableOpacity>
              </Flex>
            ) : (
              <View style={{ flex: 1 }}>
                <Button
                  onClick={this.onClose2}
                  style={{
                    position: "relative",
                    left: "205%",
                    top: 80,
                    borderRadius: 50,
                    backgroundColor: colors.ORANGE,
                    width: 70,
                    height: 70
                  }}
                >
                  <Entypo name="cross" size={30} color={colors.WHITE} />
                </Button>
              </View>
            )}

            <View
              style={{
                position: "absolute",
                left: "50%",
                top: 300
              }}
            >
              <Button
                onClick={this.onClose2}
                style={{
                  position: "relative",
                  left: "-50%",
                  borderRadius: 50,
                  backgroundColor: colors.ORANGE,
                  width: 70,
                  height: 70
                }}
              >
                <Entypo name="cross" size={30} color={colors.WHITE} />
              </Button>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    token: state.common.token
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    actionsJob: bindActionCreators(actionsJob, dispatch)
  })
)(Main);

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    borderColor: colors.CYAN,
    borderWidth: 1,
    flexDirection: "column",
    margin: 12,
    padding: 11,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "90%"
  },
  listTitle: texts.LISTTITLE,
  listText: texts.LISTTEXT
});
