import React from 'react';
import { ScrollView, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Flex, WingBlank, WhiteSpace } from 'antd-mobile-rn';
import { colors } from '../../common/colors';
import { Foundation } from '@expo/vector-icons';
import { texts } from '../../common/texts';
import { Actions } from 'react-native-router-flux';
import ProfileListItem from '../../components/ProfileListItem';
import Bar from '../../components/Bar';
import Cache from "../../utils/cache";
import { images } from '../../common/images';
import i from '../../common/i';

class Profile extends React.Component {

  constructor(){
    super();
    this.state={
      me:{}
    }
  }

  componentDidMount(){
    this.setState({me:Cache.currentUser})
  }

  // onButtonClickSignOut = async () => {
  //   await Modal.alert('Do you want to Sign Out?', (''), [
  //     { text: 'Cancel', onPress: () => console.log('cancel'), style: 'cancel' },
  //     { text: 'Sign Out', onPress: () => {
  //        this.props.navigation.navigate('SignIn');
  //     }}
  //   ])
  // }

  render() {
    const {me} = this.state

    return (
      <ScrollView style={i.container}>
          <ImageBackground
            source={images.profile_background}
            resizeMode='cover'
            style={styles.someAdditionalViewStyles}
          >
            <Flex justify='around' align='center'>
              <TouchableOpacity onPress={() => Actions.credit()}>
                <View style={styles.circle}>
                  <Text style={{ fontSize: 17, fontFamily: 'Muli' }}>Credit</Text>
                  <Flex>
                    <Foundation name="dollar" size={30} color={colors.ORANGE} />
                    <Text style={{ fontSize: 25, color: colors.ORANGE }}>150</Text>
                  </Flex>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => Actions.jacks()}>
                <View style={styles.circle}>
                  <Text style={{ fontSize: 17, fontFamily: 'Muli' }}>Jacks$</Text>
                  <Flex>
                    <Foundation name="dollar" size={30} color={colors.ORANGE} />
                    <Text style={{ fontSize: 25, color: colors.ORANGE }}> Credit</Text>
                  </Flex>
                </View>
              </TouchableOpacity>
            </Flex>

            <WhiteSpace />

            <TouchableOpacity onPress={() => Actions.profileprivate()}>
              <ProfileListItem text={me.UserName} image={me.PhotoURL} />
            </TouchableOpacity>

            <WingBlank style={{ height: 7 }} />

            <Flex style={{ backgroundColor: colors.WHITE, padding: 20 }}>
              <Text style={[styles.listText1, { marginLeft: 10 }]}>Region</Text>
              <Text style={[styles.listText1, { marginLeft: 10 }]}>Singapore</Text>
              <Text style={[styles.listText1, { color: colors.ORANGE, textAlign: "right", flex: 1 }]} onPress={() => Actions.changeregion()}>Change Region</Text>
            </Flex>
          </ImageBackground>

          <Bar />

          <TouchableOpacity onPress={() => this.props.navigation.navigate('MyFav')}>
            <ProfileListItem text="My Favourites" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.joblisting()}>
            <ProfileListItem text="Job Listing" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.servicelisting()}>
            <ProfileListItem text="Service Listing" />
          </TouchableOpacity>

          <Bar />

          <TouchableOpacity onPress={() => Actions.payment()}>
            <ProfileListItem text="Payment method" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.settings()}>
            <ProfileListItem text="Settings" />
          </TouchableOpacity>

          <Bar />

          <TouchableOpacity onPress={() => Actions.talktous()}>
            <ProfileListItem text="Talk to Us" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.jacksgogo()}>
            <ProfileListItem text="About JacksGoGo" />
          </TouchableOpacity>

          <Bar />

          <TouchableOpacity>
            <ProfileListItem text="Sign Out" />
          </TouchableOpacity>

          <View style={{height:25}} />

        </ScrollView>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
  },
  someAdditionalViewStyles: {
    width: '100%',
    height: 320,
    backgroundColor: 'pink'
  },
  circle: {
    borderWidth: 2,
    borderColor: colors.ORANGE,
    backgroundColor: colors.WHITE,
    borderRadius: 250,
    marginTop: 33,
    justifyContent: 'center',
    alignItems: 'center',
    width: 135,
    height: 135
  },
  listText1: texts.LISTTEXT,
});