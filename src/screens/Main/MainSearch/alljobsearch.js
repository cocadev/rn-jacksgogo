import React from 'react'
import LottieScreen from '../../../components/Lottie';
import MainListItem from '../../../components/MainListItem';

import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Modal } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { colors } from '../../../common/colors';
import { images } from '../../../common/images';
import { commonStyles } from '../../../common/commonStyles';

import UtilService from '../../../utils/utils';
import i from '../../../common/i';
import api from "../../../service/api";

export default class AllJobSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isWaiting: false,
      text: '',
      items: []
    };
    this.arrayholder = [];

  }

  componentDidMount() {
    if(this.props.navigation.getParam('ID')){
      this.props.navigation.getParam('index') == 0 
      ? this.getJobsByCategory('Jobs', this.props.navigation.getParam('ID'), 20)
      : this.getJobsByCategory('Services', this.props.navigation.getParam('ID'), 20)
    }else{
      this.props.navigation.getParam('index') == 0 
      ? this.getAllItems('Jobs', 20)
      : this.getAllItems('Services', 20)
    }
  }

  getJobsByCategory(type, id, count) {
    setTimeout(()=>{this.setState({isWaiting: false})}, 10000); 
    this.setState({ isWaiting: true })
    api.getJobsByCategory(type, id, count, (err, res) => {
      if (err == null) {
        this.setState({ items: res.Value, isWaiting: false })
        this.arrayholder = res.Value;      
      }
    })
  }

  getAllItems(type, count) {
    setTimeout(()=>{this.setState({isWaiting: false})}, 10000); 
    this.setState({ isWaiting: true })
    api.getAllItems(type, count, (err, res) => {
      if (err == null) {
        this.setState({ items: res.Value, isWaiting: false })
        this.arrayholder = res.Value;      
      }
    })
  }

  _renderItem = ({ item }) => (
    <MainListItem
      data={item}
      image={item.Attachments.length > 0 ? item.Attachments[0].URL : images.no_image}
      title={item.Title}
      money={item.Amount}
      type={this.props.navigation.getParam('index')}
      position={item.Address ? item.Address.BUILDING : "No Address"}
      IsUrgent={item.IsUrgent}
      icon={item.Category.Image}
      ID={item.ID}
      currency={item.CurrencyCode}
    />
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  searchFilterFunction = text => {    
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.Title.toUpperCase()}`;
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });    
    this.setState({ items: newData });  
  };

  render() {
    console.log('items', this.state.items)
    return (
      <ScrollView style={i.container}>
        <View style={i.mainHeader}>
          <View style={{justifyContent:'center'}}>
             <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home')}} style={{ position: 'absolute', left: 0, top: 3 }}>
              <Image source={UtilService.getBackIcon(this.props.navigation.getParam('index'))} style={{width:30, height:30}} local={true} />
             </TouchableOpacity>
             <TouchableOpacity style={{ position: 'absolute', right: 42, top: 3 }}>
              <Image source={UtilService.getSearchIcon(this.props.navigation.getParam('index'))} style={{width:30, height:30}} local={true} />
             </TouchableOpacity>
            <TextInput
              style={[i.textinput, { marginHorizontal:37}]}
              underlineColorAndroid="transparent"
              placeholder={this.props.navigation.getParam('filter')}
              onChangeText={text => {this.searchFilterFunction(text);this.setState({ text })}}
              value={this.state.text}
            />
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('FavJob')}}
              style={{ position: 'absolute', right: 2, top: 3 }}>
              <View style={[commonStyles.ICON.inputIcon, { backgroundColor: UtilService.getColor(this.props.index) }]}>
                <Foundation name="heart" size={21} color={colors.WHITE} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{elevation:3, height:38, marginTop:10, justifyContent:'center'}}>

             <TouchableOpacity style={{ position: 'absolute', right: 2, top: 3 }}>
              <Image source={UtilService.getMapIcon(this.props.navigation.getParam('index'))} style={{width:30, height:30}} local={true} />
             </TouchableOpacity>
             <TouchableOpacity style={{ position: 'absolute', right: 40, top: 3 }}>
              <Image source={UtilService.getFilterIcon(this.props.navigation.getParam('index'))} style={{width:30, height:30}} local={true} />
             </TouchableOpacity>
             <View style={{flexDirection:'row', alignItems: 'center',}}>
                <TouchableOpacity>
                  <Text style={{marginLeft:12, color:colors.GREY1}}>By Distance</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{marginLeft:12, color:colors.GREY1}}>By Date</Text>
                </TouchableOpacity>
             </View>
          </View>

        </View>

        {this.state.isWaiting && <LottieScreen/>}

        <FlatList
          data={this.state.items}
          keyExtractor={(item, i) => String(i)}
          renderItem={this._renderItem}
          ItemSeparatorComponent={this._ItemSeparator}
        />

        <View style={{height:25}}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
});
