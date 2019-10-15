import * as React from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import { FontAwesome } from '@expo/vector-icons';
import { images } from '../../common/images';
import * as actions from "../../store/common/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import LottieScreen from '../../components/Lottie';
import api from "../../service/api";
import Cache from "../../utils/cache";
import { commonStyles } from '../../common/commonStyles';

class SignIn extends React.Component {

    state = {
        Username: "Dong", // Mong, Mongr, Song, Kong, Gong, Yong, Dong, dev122@bot.com
        Password: '123qwe!@#QWE', //123qwe!@#QWE, Abc123!@#
        isWaiting: false,
    }

    componentDidMount() {
        this.props.actions.getRegions();
    }
 
    onSignIn = () => {
        this.setState({isWaiting:true})     
        setTimeout(()=>{this.setState({isWaiting: false})}, 10000); 
        api.login(this.state.Username, this.state.Password, (err,res)=>{
            if (err == null ){
                Cache.currentUser = res.Value
                Cache.token = res.APIToken.access_token
                console.log('********************* currentUser ************************', Cache.currentUser)
                this.setState({isWaiting:false})
                Actions.main()
            }
            this.setState({isWaiting:false})
            })
    };

    renderIndicator() {
        return (
          <Modal
            visible={this.state.isWaiting}
            transparent={true}
            onRequestClose={() => {}}
          >
            <View style={commonStyles.LOADING.indicatorContainer}>
              <View style={commonStyles.LOADING.indicator}>
                <LottieScreen />
              </View>
            </View>
          </Modal>
        );
    }

    render() {

        const { region } = this.props;
        const { Username, Password } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f9f9f9' }}>

                <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                    <Image
                        source={images.logo}
                        style={{ width: 110, height: 110 }} />
                </View>
                <Text style={[styles.titleText, { marginTop: 20, fontSize: 25 }]}>Sign In</Text>

                <Flex justify="around">

                    <TouchableOpacity style={[styles.country, { flex: 1 }]} >
                        <Image source={{ uri: region.flag }} style={{ width: 35, height: 35, borderRadius: 18 }} />
                        <Text style={[styles.LISTTEXT, { marginLeft: 10 }]}>+{region.countryCode}</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={[styles.input, { width: '62%' }]}
                        underlineColorAndroid='transparent'
                        placeholder="Name"
                        onChangeText={Username => this.setState({ Username })}
                        value={Username}
                    />
                </Flex>

                <View style={{ width: '100%' }}>

                    <TextInput
                        style={[styles.input]}
                        underlineColorAndroid='transparent'
                        placeholder="Password"
                        Password={true}
                        onChangeText={Password => this.setState({ Password })}
                        value={Password}
                    />

                    <TouchableOpacity style={{ position: 'absolute', right: 26, top: 18 }} onPress={this.onButtonPassword}>
                        <FontAwesome
                            name="question"
                            size={27}
                            color={colors.ORANGE}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={this.onSignIn} style={[styles.button, { backgroundColor: '#eaeaea', marginTop: 12 }]}>
                    <Text style={[styles.titleText, { color: colors.GREY2 }]}>Sign In</Text>
                </TouchableOpacity>

                <Text style={styles.titleText}>or</Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={[styles.titleText, { color: '#fff' }]}>Sign In With Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Actions.signup() }} style={[styles.button, { borderColor: colors.ORANGE, borderWidth: 1, backgroundColor: 'transparent' }]}>
                    <Text style={[styles.titleText, { color: colors.ORANGE }]}>New here? Sign up!</Text>
                </TouchableOpacity>

                {this.renderIndicator()}


            </View>
        )
    }
}

export default connect(
    state => ({
        region: state.common.region,
        regions: state.common.regions,
        user: state.common.user,
        token: state.common.token,
        loading:state.common.loading
    }),
    dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(SignIn);

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
        paddingLeft: 5,
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
    },
})