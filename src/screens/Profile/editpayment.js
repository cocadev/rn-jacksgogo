import React from "react"
import Header from "../../components/Header"
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Modal  } from "react-native"
import { texts } from "../../common/texts"
import { colors } from "../../common/colors"
import { WhiteSpace, Toast, } from "antd-mobile-rn"
import { images } from "../../common/images";
import { Actions } from "react-native-router-flux"
import Stripe from 'react-native-stripe-api';
import LottieScreen from "../../components/Lottie";
import { commonStyles } from "../../common/commonStyles";
import api from "../../service/api";
import Cache from "../../utils/cache";

const apiKey = 'pk_test_BL00TQAirLHZaTkMxeUUln34';
const client = new Stripe(apiKey);

// Create a Stripe token with new card infos

class EditPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWaiting:false,
      number: '4242424242424242',
      exp_month: '02', 
      exp_year: '19', 
      cvc: '333',
      address_country: "de"
    };
  }

  async onButtonSave(no, m, y, cvc, c){

    this.setState({isWaiting: true})
    const token = await client.createToken({
      number: no,
      exp_month: m, 
      exp_year: y, 
      cvc: cvc,
      address_country: c
    });
    token&&this.createCustomer(token.id)
  }

  createCustomer(token){
    console.log('Cache.currentUser.Id', Cache.currentUser.Id)
    console.log('token', token)

    api.createCustomer(Cache.currentUser.Id, token, (err,res)=>{ if (err == null ){ 
      Toast.success(res.Message)
      this.setState({isWaiting:false})
      Cache.currentUser.StripeToken = token
      if ( this.props.update ) {
        this.props.update(token)
        Actions.pop()
      }
    } else{ 
      Toast.fail('Fail!')
    }})  
  }

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
    const { number, exp_month, exp_year, cvc, address_country } = this.state
    return (
      <KeyboardAvoidingView style={styles.container} behavior = 'padding'  enabled>

          <Header title={"Payment Method"}  rightElement={(
            <TouchableOpacity style={{ position: 'absolute', right: 10, bottom:7 }} onPress={()=> this.onButtonSave(number, exp_month, exp_year, cvc, address_country)}>
              <Text style={[styles.title, { color: colors.ORANGE }]}>Save</Text>
            </TouchableOpacity>
          )}/>

          <View style={{ marginTop: 10, flex:1,  justifyContent:'center' }}>

            <View style={{justifyContent:'center', alignItems:'center', width:'100%'}}>
              <Image source ={images.card} style={{width:'55%', height:120, marginVertical:20}}/>
            </View>
            <View style={{justifyContent:'center'}}>
              <TextInput
                style={[styles.input, {  }]}
                underlineColorAndroid="transparent"
                onChangeText={number => this.setState({ number })}
                value={this.state.number}
              />
              <Text style={styles.placeholder}>Card No.</Text>
            </View>

            <View style={{justifyContent:'center'}}>
              <TextInput
                style={[styles.input]}
                underlineColorAndroid="transparent"
                onChangeText={exp_month => this.setState({ exp_month })}
                value={this.state.exp_month}
              />
              <Text style={styles.placeholder}>Expiry month</Text>
             </View>

            <View style={{justifyContent:'center'}}>
              <TextInput
                style={[styles.input]}
                underlineColorAndroid="transparent"
                placeholder="Expiry"
                onChangeText={exp_year => this.setState({ exp_year })}
                value={this.state.exp_year}
              />
              <Text style={styles.placeholder}>Expiry year</Text>
            </View>

            <View style={{justifyContent:'center'}}>
                <TextInput
                  autoCorrect={true}
                  style={[styles.input]}
                  underlineColorAndroid="transparent"
                  placeholder="cvc"
                  onChangeText={cvc => this.setState({ cvc })}
                  value={this.state.cvc}
                />
              <Text style={styles.placeholder}>CVC</Text>
            </View>

            <TouchableOpacity style={{justifyContent:'center'}} onPress={()=>Actions.choosecountry()}>
                <View style={[styles.inputbox]}>
                  <Text style={styles.countryText}>Germany</Text>
                </View>
              <Text style={styles.placeholder}>Country</Text>
            </TouchableOpacity>
              
            <WhiteSpace />
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <Text style={[styles.title, {color:colors.ORANGE}]}>Remove This Card</Text>
            </View>
            {this.renderIndicator()}
          </View>
        
      </KeyboardAvoidingView>
    );
  }
}

export default EditPayment;

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
    marginHorizontal: 20,
    marginTop: 10,
    paddingLeft: 140,
    fontSize: 17,
    fontFamily: "Muli"
  },
  inputbox:{
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 20,
    marginTop: 10,
    paddingLeft: 140,
    justifyContent:'center'
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
  },
  placeholder:{
    position:'absolute',
    fontSize:17,
    fontWeight:'300',
    color:'#ccc',
    left:40,
    top:22,
    fontFamily: "Muli"
  },
  countryText:{
    fontSize: 17,
    fontFamily: "Muli"
  }

});
