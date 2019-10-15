import * as React from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import  {images} from '../../common/images';
import * as actions from "../../store/common/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Toast } from 'antd-mobile-rn'
import { Actions } from 'react-native-router-flux';
import LottieScreen from '../../components/Lottie';

class SignUp extends React.Component {

    state = {
        name:'Mong',
        password:'123qwe!@#QWE',
        confirm:'123qwe!@#QWE',
        regionID:'45bc6642-8ef1-e711-80d8-f48e38c2d0c8',
        email:'Mong@gmail.com',
        message: ''
    }

    SignUp= async ()=>{

        const {password,confirm,name,email,regionID} = this.state;

        if ( password !== confirm){
            return Toast.fail('Confirm password is not matched')
        }


        this.props.actions.userRegister(name, password, email, regionID);
        
    }

    render() {

        const {name, email, password, confirm} = this.state;

        if(this.props.loading){
            return <LottieScreen />
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f9f9f9' }}>

                <TouchableOpacity style={{ position: 'absolute', left: 10, top: 30 }} onPress={()=>this.props.navigation.goBack()}>
                    <Image
                        source={images.icon.button_backarrow_orange}
                        style={{width:25,height:25}}
                    />
                </TouchableOpacity>

                <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                    <Image 
                      source={images.logo}
                      style={{ width: 110, height: 110 }} />
                </View>

                <Text style={[styles.titleText, { marginTop: 20, fontSize: 22 }]}>Welcome To Jacks Go Go!</Text>

                <View style={{ width: '100%' }}>
                    <TextInput
                        style={[styles.input]}
                        underlineColorAndroid='transparent'
                        placeholder="Nickname"
                        onChangeText={name => this.setState({ name })}
                        value={name}
                    />
                </View>

                <View style={{ width: '100%' }}>
                    <TextInput
                        style={[styles.input]}
                        underlineColorAndroid='transparent'
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={email}
                    />
                </View>

                <View style={{ width: '100%' }}>
                    <TextInput
                        style={[styles.input]}
                        underlineColorAndroid='transparent'
                        placeholder="Password"
                        onChangeText={password => this.setState({ password })}
                        value={password}
                    />
                </View>

                <View style={{ width: '100%' }}>
                    <TextInput
                        style={[styles.input]}
                        underlineColorAndroid='transparent'
                        placeholder="Confirm Password"
                        onChangeText={confirm => this.setState({ confirm })}
                        value={confirm}
                    />
                </View>

                <TouchableOpacity 
                     style={[styles.button, { backgroundColor: '#eaeaea', marginTop: 12 }]}
                     onPress={this.SignUp}>
                    <Text style={[styles.titleText, { color: colors.GREY2 }]}>Sign Up</Text>
                </TouchableOpacity>

                <Text style={styles.titleText}>or</Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={[styles.titleText, { color: '#fff' }]}>Sign In With Facebook</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default connect(
    state => ({
        region: state.common.region,
        user:state.common.user,
        loading:state.common.loading
    }),
    dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(SignUp);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
    },
    titleText: {
        fontSize: 17,
        color: colors.BLACK,
        fontFamily: 'Muli-Bold',
        marginLeft: 10,
    },
    caption: texts.CAPTION.SECONDARY,
    primary: texts.LISTTEXT,

    input: {
        height: 42,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 10,
        paddingLeft: 10,
        fontSize: 18,
        fontFamily: 'Muli'
    },
    country: {
        height: 42,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: 45,
        width: '95%',
        marginHorizontal: 10,
        marginVertical: 6,
        backgroundColor: '#4267b2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
})