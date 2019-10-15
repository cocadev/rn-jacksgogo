import * as React from 'react'
import { View, TouchableOpacity, Text, Image, TextInput, FlatList } from 'react-native'
import { commonStyles } from '../../common/commonStyles'
import { texts } from '../../common/texts'
import { images } from '../../common/images'
import Header from '../../components/Header'
import LottieScreen from '../../components/Lottie';
import { Actions } from 'react-native-router-flux';
import api from "../../service/api";

class ProfileLocation extends React.Component {

  state = {
    query:'',
    locations:[],
    isWaiting:false,
  }

  SearchLocation =() => {
    this.setState({ isWaiting: true})
    api.searchLocation(this.state.query, (err,res)=>{
        if (err == null ){ 
          this.setState({ locations:res.Value })
        }
     this.setState({isWaiting:false})
    })
  }

  setAddress = (address) =>{
    if(this.props.update){
        this.props.update(address)
        Actions.pop();
    }
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity 
         onPress={()=>this.setAddress(item)} 
         style={{backgroundColor:'#fff', paddingVertical:12, marginTop:5, paddingLeft:10}}>
        <Text style={[texts.BODY.PRIMARY, {lineHeight:25}]}>{item.ADDRESS}</Text>
    </TouchableOpacity>
  );

  render() {

    return (
      <View style={commonStyles.container}>
        <Header title="Location" type={2} />
        <View style={[commonStyles.VIEW.searchView, {marginTop:0, backgroundColor:'transparent'}]}>
            <TouchableOpacity onPress={this.SearchLocation} style={{position:'absolute', right:20, top:13}}>
              <Image source={images.icon.cyan_search} style={commonStyles.IMAGE.logo_round_30}/>
            </TouchableOpacity>
            <TextInput
              style={[commonStyles.INPUT.favSearch, {marginLeft:10, zIndex:-1, width:'94%'}]}  
              underlineColorAndroid="transparent"
              placeholder="Search location"
              onChangeText={query => this.setState({ query })}
              value={this.state.query}
            />
        </View>
        <Text style={[texts.HEADLINE, {lineHeight:45, paddingHorizontal:12}]}>Suggestions Nearby</Text>
        {this.state.isWaiting && <LottieScreen />}

        <FlatList
            data={this.state.locations}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._ItemSeparator}
        />


        
      </View>
    )
  }
}

export default ProfileLocation;