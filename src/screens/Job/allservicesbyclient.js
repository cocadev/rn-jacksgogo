import React from 'react';
import Header from '../../components/Header';

import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import MainListItem from '../../components/MainListItem';
import { images } from '../../common/images';
import i from '../../common/i';
import api from "../../service/api";
import LottieScreen from '../../components/Lottie';

class AllServicesByClient extends React.Component {

  constructor(){
    super();
    this.state={
      isWaiting:false,
      items:[]
    }
  }

  componentDidMount(){
    this.setState({isWaiting:true})
    api.getServicesByUser(this.props.User.Id, (err,res)=>{ if (err == null ){ 
      this.setState({ items: res.Value})
    } else{

    }
    this.setState({isWaiting:false})
  })}

  _renderItem = ({ item }) => (
    <MainListItem
      data={item}
      image={ item.Attachments.length > 0 ? item.Attachments[0].URL : images.no_image }
      title={item.Title}
      money={item.Amount}
      type = {'service'}
      position={item.Address ? item.Address.Address : "No Address"}
      IsUrgent={item.IsUrgent}
      icon={item.Category.Image}
  />
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {

    const { isWaiting, items} = this.state;

    return (
      <ScrollView style={i.container}>

        <Header title={'All Services by ' + this.props.User.UserName} type={1}/>

        <Flex style={{ padding: 22, alignItems: 'center', borderBottomColor: '#ddd', borderBottomWidth: 1, backgroundColor: '#fff' }}>
          <View
            style={{
              position: 'absolute',
              right: 70,
              top: 17,
              borderRadius: 30,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome name="sliders" size={30} color={colors.GREEN} />
          </View>

          <View
            style={{
              backgroundColor: colors.GREEN,
              position: 'absolute',
              right: 20,
              top: 16,
              borderRadius: 30,
              width: 36,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome name="map-o" size={22} color={colors.WHITE} />
          </View>

          <Text style={[styles.title, { color: colors.GREEN }]}>By Distance</Text>
          <Text style={[styles.title, { marginLeft: 10 }]}>By Ratings</Text>
        </Flex>

        <View style={{ marginTop: 1 }}>
          {isWaiting && <LottieScreen />}
          {!isWaiting &&  <FlatList
            data={items}
            keyExtractor={(item, i) => String(i)}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._ItemSeparator}
          />}

         
        </View>
      </ScrollView>
    );
  }
}

export default AllServicesByClient;

const styles = StyleSheet.create({
  title: texts.HEADLINE,
  separator: {
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  }
});
