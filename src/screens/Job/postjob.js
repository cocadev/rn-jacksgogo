import React from "react"
import Bar from "../../components/Bar"
import { ScrollView, Platform, View, TextInput, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Modal, KeyboardAvoidingView, Picker, TouchableWithoutFeedback } from "react-native"
import { texts } from "../../common/texts"
import { colors } from "../../common/colors"
import { WhiteSpace, Flex, Grid, Toast } from "antd-mobile-rn"
import { Actions } from "react-native-router-flux"
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { ImagePicker, Permissions, ImageManipulator } from 'expo'
import api from "../../service/api";
import { commonStyles } from '../../common/commonStyles';

import * as actions from "../../store/job/actions"
import LottieScreen from "../../components/Lottie";
import Cache from "../../utils/cache";
import Header from "../../components/Header";
import TagInput from 'react-native-tag-input';
import UtilService from "../../utils/utils";
import i from "../../common/i";

const inputProps = {
  keyboardType: 'default',
  placeholder: 'Tags',
  autoFocus: true,
  style: {
    fontSize: 18,
    marginVertical: Platform.OS == 'ios' ? 10 : 2,
    paddingLeft: 10
  },
};
const width = Dimensions.get("window").width;

class PostJob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job_service: "",
      visibleModal: false,
      content: "",
      location: "",
      content: "",
      currency: "",
      title: "",
      amount: "",
      description: "",
      file: '',
      categories: [],
      isWaiting: false,
      isUrgent: false,
      image: [],
      tags: [],
      text: "",
      horizontalTags: [],
      horizontalText: "",
      address: null,

      suggestions: [{ name: 'Mickey Mouse' },],
      tagsSelected: []
    };
  }

  componentDidMount() {
    this.getAllCategories()
  }

  getAllCategories() {
    api.getAllCategories((err, res) => {
      if (err == null) {
        this.setState({ categories: res.Value })
      }
    })
  }

  ////tag////

  onChangeTags = (tags) => {
    this.setState({ tags });
  }

  onChangeText = (text) => {
    this.setState({ text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      this.setState({
        tags: [...this.state.tags, this.state.text],
        text: "",
      });
    }
  }

  labelExtractor = (tag) => tag;

  ///////////////////////////////

  onButtonPost = () => {


    const { categoryId, title, amount, description, tags, type, isUrgent, image, currency } = this.state;

    const location = this.state.address && this.state.address.ID

    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ category', categoryId)
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ title', title)
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ amount', amount)
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ description', description)
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ isUrgent', isUrgent)
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ image', image)
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ userId', Cache.currentUser.Id)

    this.setState({ isWaiting: true })

    if (this.props.index == 0) {
      api.createJob(categoryId, Cache.currentUser.Id, title, description, tags, amount, currency, false, isUrgent, image, location, (err, res) => {
        if (err == null && res.Success) {
          console.log('rrrrrrrrrrrrrrrrrrrrrrr', res)
          this.setState({ isWaiting: false })
          Toast.success('Success !')
          Actions.viewjob({ jobId: res.Value, index:0 })
        } else {
          Toast.fail('Fail!')
        }
        this.setState({ isWaiting: false })
      })
    } else {
      api.createService(categoryId, Cache.currentUser.Id, title, description, tags, amount, currency, false, isUrgent, image, location, (err, res) => {
        if (err == null) {
          this.setState({ isWaiting: false })
          Toast.success('Success !')
          Actions.viewjob({ jobId: res.Value, index:1 })

        } else {
          Toast.fail('Fail!')
        }
        this.setState({ isWaiting: false })
      })
    }
  }



  // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 1', title)
  // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 1', title)
  // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 1', title)

  // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 1', title)
  // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 1', title)
  // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 1', title)


  // if (category.ID ) {
  //   if (job_type == 'job'){
  //     actions.createJob(
  //       category.ID, userId, token, title, amount, description, tags, isUrgent, image
  //     );
  //   } else {
  //     actions.createService(
  //       category.ID, userId, token, title, amount, description, tags, isUrgent, image
  //     );
  //   }
  // } else {
  //   Toast.info("Please choose category");
  // }

  _renderImages() {
    let images = [];
    this.state.image.map((item, index) => {
      images.push(
        <Image
          key={index}
          source={{ uri: item }}
          style={{ width: 120, height: 120, marginLeft: 12, borderRadius: 3 }}
        />
      );
    });

    return images;
  }

  takePicture = async () => {
    let res = await Permissions.askAsync(Permissions.CAMERA)
    if (res.status === 'granted') {
      let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status === 'granted') {
        let image = await ImagePicker.launchCameraAsync({
          quality: 0.6
        })
        if (!image.cancelled) {
          const manipResult = await ImageManipulator.manipulateAsync(
            image.uri,
            [{ resize: { width: 768 } }],
            { format: 'jpeg', compress: 0.6 }
          );
          api.uploadImage(manipResult.uri, (err, res) => {
            if (err == null) {
              this.setState({
                image: this.state.image.concat(res),
              });
              console.log('************************', this.state.image)
            }
          })
        }
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);
    this.setState({ file: result.uri })

    if (!result.cancelled) {
      api.uploadImage(result.uri, (err, res) => {
        if (err == null) {
          this.setState({
            image: this.state.image.concat(res),
          });
          console.log('************************', this.state.image)
        }
      })
    }
  };

  renderIndicator() {
    return (
      <Modal
        visible={this.state.isWaiting}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={commonStyles.LOADING.indicatorContainer}>
          <View style={commonStyles.LOADING.indicator}>
            <LottieScreen />
          </View>
        </View>
      </Modal>
    );
  }

  rendervisibleModal() {
    return (
      <Modal
        visible={this.state.visibleModal}
        transparent={true}
        onRequestClose={() => { this.setState({ visibleModal: false }) }}
      >
        <View style={commonStyles.LOADING.indicatorContainer}>
          <View style={[commonStyles.LOADING.indicator, { width: 200 }]}>
            <Flex direction='row' justify='space-between'>
              <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={this.takePicture}>
                <MaterialCommunityIcons name="camera" size={40} color={colors.CYAN} />
                <Text>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={this._pickImage}>
                <Ionicons name="md-images" size={40} color={colors.CYAN} />
                <Text>Images</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => this.setState({ visibleModal: false })}>
                <Ionicons name="ios-close-circle-outline" size={40} color={colors.RED} />
                <Text>Close</Text>
              </TouchableOpacity>
            </Flex>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { title, amount, description, job_service, currency } = this.state;
    const { location, index } = this.props;
    console.log('my location', location)

    return (
      <KeyboardAvoidingView behavior='padding' enabled style={i.container}>
        <ScrollView>
          <Header title={""} leftElement={(
            <View style={{ position: 'absolute', left: 12, height: 40, width: 40, backgroundColor: '#fff', justifyContent: 'flex-end', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => Actions.pop()} ><Text style={[texts.HEADLINE, { marginBottom: 5, color: UtilService.getColor(index) }]}>Quit</Text></TouchableOpacity>
            </View>
          )} rightElement={(
            <View style={{ position: 'absolute', right: 12, height: 40, width: 40, backgroundColor: '#fff', justifyContent: 'flex-end', alignItems: 'center' }}>
              <TouchableOpacity onPress={this.onButtonPost}><Text style={[texts.HEADLINE, { marginBottom: 5, color: UtilService.getColor(index) }]}>Post</Text></TouchableOpacity>
            </View>
          )} />

          <View style={{ marginTop: 10 }}>
            <Text style={styles.titleText}>
              Choose category for your {job_service}:
            </Text>

            <View style={{ marginHorizontal: 20 }}>
              <Grid
                data={this.state.categories}
                columnNum={4}
                isCarousel
                hasLine={false}
                renderItem={dataItem => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ categoryId: dataItem.ID });
                    }}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        this.state.categoryId == dataItem.ID
                          ? "#e1f1f8"
                          : colors.WHITE,
                      marginHorizontal: 3,
                      width: width / 5,
                      height: width / 5
                    }}
                  >
                    <Image
                      source={{ uri: dataItem.Image }}
                      style={{ width: 35, height: 35 }}
                      alt=""
                    />
                    <Text style={[styles.smallText, { textAlign: "center", color: colors.ORANGE }]}>
                      {dataItem.Name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <Bar />

            <Text style={styles.titleText}>Include photos (optional):</Text>

            <ScrollView horizontal>
              {this._renderImages()}
              <TouchableOpacity style={[styles.buttonPost, { borderColor: UtilService.getColor(index) }]} onPress={() => this.setState({ visibleModal: true })}>
                <MaterialCommunityIcons name="plus" size={40} color={UtilService.getColor(index)} />
              </TouchableOpacity>
            </ScrollView>

            <Bar />

            <Text style={styles.titleText}>Basic Info:</Text>

            <Flex justify="around">
              <Text style={styles.titleText}>Title</Text>
              <TextInput
                style={[styles.input, { width: "80%" }]}
                underlineColorAndroid="transparent"
                placeholder="Find a Talent"
                onChangeText={title => this.setState({ title })}
                value={title}
              />
            </Flex>

            <Flex justify="around">
              <Text style={styles.titleText}>Price</Text>
              <TextInput
                style={[styles.input, { width: "80%" }]}
                keyboardType='numeric'
                underlineColorAndroid="transparent"
                placeholder="150"
                onChangeText={amount => this.setState({ amount })}
                value={amount}
              />
            </Flex>

            <Flex justify="around">
              <Text style={styles.titleText}>Currency Code</Text>
              <Picker
                selectedValue={currency}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.setState({ currency: itemValue })}>
                <Picker.Item label="USD" value="$" />
                <Picker.Item label="CNY" value="¥" />
                <Picker.Item label="Euro" value="€" />
                <Picker.Item label="INR" value="₹" />
                <Picker.Item label="GBP" value="£" />
                <Picker.Item label="SGD" value="S$" />
              </Picker>
            </Flex>

            <Bar />

            <Flex justify="between">
              <Text style={styles.titleText}>Location (optional)</Text>
              <TouchableOpacity
                onPress={() => Actions.profilelocation({
                  update: (i) => {
                    this.setState({
                      address: i
                    })
                  }
                })}
              >
                <Text style={[styles.titleText, { color: UtilService.getColor(index), marginRight: 10 }]}> Add </Text>
              </TouchableOpacity>
            </Flex>

            {this.state.address &&
              <TextInput
                editable={false}
                style={[styles.input, { width: "95%" }]}
                underlineColorAndroid="transparent"
                multiline={true}
                numberOfLines={3}
                onChangeText={title => this.setState({ title })}
                value={this.state.address.ADDRESS}
              />}

            <Bar />

            <View>
              <Text style={[styles.titleText, { textAlign: "left" }]}>
                Describe the Job
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={3}
                style={[styles.input, { width: "94%", height: 80 }]}
                underlineColorAndroid="transparent"
                placeholder="Explain in detail"
                onChangeText={description => this.setState({ description })}
                value={description}
              />
            </View>

            <View >
              <Text style={styles.titleText}>Tags</Text>
              <TagInput
                style={{ marginHorizontal: 12 }}
                value={this.state.tags}
                onChange={this.onChangeTags}
                labelExtractor={this.labelExtractor}
                text={this.state.text}
                onChangeText={this.onChangeText}
                tagColor={UtilService.getColor(index)}
                tagTextColor="white"
                inputProps={inputProps}
                maxHeight={100}
              />
            </View>

            <Flex justify="around">
              <Text style={styles.titleText}>Type of Job</Text>
              <Picker
                selectedValue={this.state.isUrgent}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.setState({ isUrgent: itemValue })}>
                <Picker.Item label="Normal" value={false} />
                <Picker.Item label="Urgent" value={true} />
              </Picker>
            </Flex>
            <WhiteSpace />
          </View>
        </ScrollView>
        {this.renderIndicator()}
        {this.rendervisibleModal()}

      </KeyboardAvoidingView>
    );
  }
}

export default connect(
  state => ({
    categories: state.job.categories,
    category: state.job.category,
    wholejobs: state.job.wholejobs,
    token: state.common.token,
    userId: state.common.userId,
    job_type: state.job.job_type,
    location: state.job.location,
    loading: state.job.loading
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(PostJob);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eceff1"
  },
  titleText: {
    fontSize: 17,
    color: colors.BLACK,
    fontFamily: "Muli-Bold",
    lineHeight: 25,
    marginLeft: 10,
    marginVertical: 5
  },
  caption: texts.CAPTION.SECONDARY,
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: "Muli"
  },
  picker: {
    height: 50,
    width: '58%',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 5,
    paddingLeft: 10,
  },
  category: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  buttonPost: {
    width: 120,
    height: 120,
    marginLeft: 12,
    borderWidth: 1, borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
