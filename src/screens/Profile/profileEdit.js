import React from "react"
import Bar from "../../components/Bar"
import Header from "../../components/Header"
import { ScrollView, View, TextInput, Text, StyleSheet, TouchableOpacity, Dimensions, Image, KeyboardAvoidingView, Platform, Modal } from "react-native"
import { texts } from "../../common/texts"
import { colors } from "../../common/colors"
import { WhiteSpace, Flex, Toast } from "antd-mobile-rn"
import { Actions } from "react-native-router-flux"
import {ImagePicker,Permissions,ImageManipulator} from 'expo'
import Cache from "../../utils/cache";
import api from "../../service/api";
import { commonStyles } from "../../common/commonStyles";
import TagInput from 'react-native-tag-input';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import i from '../../common/i';

const inputProps = {
  keyboardType: 'default',
  placeholder: 'Tags',
  style: {
    fontSize: 18,
    marginVertical: Platform.OS == 'ios' ? 10 : 2,
    paddingLeft:10,
  },
};
const BannerWidth = Dimensions.get("window").width;

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image:Cache.currentUser.PhotoURL,
      phone: Cache.currentUser.PhoneNumber,
      email: Cache.currentUser.Email,
      description:Cache.currentUser.Overview,
      address: Cache.currentUser.Address,
      tags:[],
      visibleModal:false,
      file:''
    };
  }

  handleFileChange = files => this.setState({ files });

  renderPage(URL, index) {
    return (
      <View key={index}>
        <Image
          style={{ width: BannerWidth / 2.5, height: BannerWidth / 4.5 }}
          source={{ uri: URL }}
        />
      </View>
    );
  }

  onButtonQuit = () =>{
      Actions.pop('editprofile')
  }

  onButtonSave = () =>{

    this.setState({isWaiting:true})
    let { email, phone, image, description, address, tags } = this.state;
    api.editProfile(email, phone, image, description, address, tags,  (err,res)=>{ 
      if (err == null ){ 
        Toast.success('Success !')
      } else{
        Toast.fail('Fail!')
    }
    this.setState({isWaiting:false})
  }) 

  }

  takePicture = async () => {

    let res = await Permissions.askAsync(Permissions.CAMERA)
    if ( res.status ==='granted'){
        let {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if ( status === 'granted' ){
            let image = await ImagePicker.launchCameraAsync({
                quality:0.6
            })

            if ( !image.cancelled ){

                const manipResult = await ImageManipulator.manipulateAsync(
                    image.uri,
                    [{resize:{width:768}}],
                    { format: 'jpeg', compress:0.6 }
                );

                api.uploadImage(manipResult.uri, (err, res)=>{

                  if ( err == null ){
                      this.setState({
                        image: res,
                      });
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
    this.setState({file:result.uri})

    if (!result.cancelled) {
      api.uploadImage(result.uri, (err, res)=>{
        if ( err == null ){
            this.setState({
              image: res,
            });
        }     
      })
    }
  };

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

  rendervisibleModal() {
    return (
      <Modal
        visible={this.state.visibleModal}
        transparent={true}
        onRequestClose={() => {this.setState({visibleModal:false})}}
      >
        <View style={commonStyles.LOADING.indicatorContainer}>
          <View style={[commonStyles.LOADING.indicator, {width:200}]}>
            <Flex direction='row' justify='space-between'>
               <TouchableOpacity style={{marginHorizontal:10}} onPress={this.takePicture}>
                  <MaterialCommunityIcons name="camera" size={40} color={colors.CYAN}/>
                  <Text>Camera</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{marginHorizontal:10}} onPress={this._pickImage}>
                  <Ionicons name="md-images" size={40} color={colors.CYAN}/>
                  <Text>Images</Text>
               </TouchableOpacity>
               <TouchableOpacity style={{marginHorizontal:10}} onPress={()=>this.setState({visibleModal:false})}>
                  <Ionicons name="ios-close-circle-outline" size={40} color={colors.RED}/>
                  <Text>Close</Text>
               </TouchableOpacity>
            </Flex>
          </View>
        </View>
      </Modal>
    );
  }

  add = () => {
    Actions.profilelocation({update:(i)=>{
      this.setState({
        address:i
      })
    }})
  }

  render() {

    const { image } = this.state;
    
    return (
      <KeyboardAvoidingView style={i.container} behavior = 'padding' enabled>
        <ScrollView >

          <Header title={"Edit Profile"} leftElement={(
                <View style={{position:'absolute', left:12, height:40, width:40, backgroundColor:'#fff', justifyContent:'flex-end', alignItems:'center'}}>
                  <TouchableOpacity onPress={()=>Actions.main()}><Text style={[texts.HEADLINE, {marginBottom:5, color:colors.ORANGE}]}>Quit</Text></TouchableOpacity>
                </View>
            )} rightElement={(
            <TouchableOpacity style={{ position: 'absolute', right: 10, bottom:7 }} onPress={this.onButtonSave}>
              <Text style={[styles.title, { color: colors.ORANGE }]}>Save</Text>
            </TouchableOpacity>
          )}/>

          <View style={{ marginTop: 10, flex:1 }}>
            <Text style={styles.titleText}>Include photos :</Text>

            <TouchableOpacity onPress={()=>this.setState({visibleModal:true})}>
              <Image source ={{uri: image}} style={{width:'100%', height:200}}/>
            </TouchableOpacity>
            
            <View style={{backgroundColor:"#f7e9e1", marginTop:7, paddingHorizontal:12}}>
              <Text style={texts.BODY.PRIMARY}>Tap on the pictures to edit/crop.</Text>
            </View>

            <Bar />

            <Text style={[texts.HEADLINE, {marginLeft:12}]}>Basic Info (only visible to you):</Text>

            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[texts.BODY.PRIMARY,{marginLeft:12}]}>Mobile No.</Text>
              <TextInput
                style={[commonStyles.INPUT.simple, {flex:1}]}
                underlineColorAndroid="transparent"
                placeholder="Mobile No."
                onChangeText={phone => this.setState({ phone })}
                value={this.state.phone}
              />
            </View>

            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={[texts.BODY.PRIMARY,{marginLeft:12}]}>Email</Text>
              <TextInput
                style={[commonStyles.INPUT.simple, {flex:1}]}
                underlineColorAndroid="transparent"
                placeholder="Email "
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </View>

            <View style={styles.bar}></View>

              
            <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:12}}>
              <Text style={[texts.HEADLINE]}>Address (only visible to you)</Text>
              <TouchableOpacity onPress={this.add}>
                <Text style={[texts.HEADLINE, {color:colors.ORANGE}]}>Add</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              editable = {false}
              style={[commonStyles.INPUT.simple, {flex:1}]}
              underlineColorAndroid="transparent"
              placeholder="Address"
              onChangeText={address => this.setState({ address })}
              value={this.state.address && this.state.address.BUILDING}
            />

            <Bar/>

            <Text style={[texts.HEADLINE,{marginLeft:12}]}>Give a description about yourself.</Text>
            <TextInput
              multiline={true}
              textAlignVertical={'top'}
              style={[commonStyles.INPUT.simple, {flex:1, height:50}]}
              underlineColorAndroid="transparent"
              placeholder="Description"
              onChangeText={description => this.setState({ description })}
              value={this.state.description}
            />

            <View style={{position:'relative', marginHorizontal:12}}>
              <Text style={[texts.HEADLINE, { marginTop:12}]}>Tags</Text>
              <TagInput
                  style={{marginHorizontal:12}}
                  value={this.state.tags}
                  onChange={this.onChangeTags}
                  labelExtractor={this.labelExtractor}
                  text={this.state.text}
                  onChangeText={this.onChangeText}
                  tagColor={colors.ORANGE}
                  tagTextColor="white"
                  inputProps={inputProps}
                  maxHeight={100}
              />
            </View>
              
            <WhiteSpace />

            {this.rendervisibleModal()}

          </View>

        </ScrollView>
        
      </KeyboardAvoidingView>
    );
  }
}

export default ProfileEdit;

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
  category: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  title: texts.HEADLINE,
  bar:{
    height:1, 
    width:'100%',
    marginBottom:8, 
    marginTop:20, 
    backgroundColor:'#dbdbde' 
  }

});
