import React from 'react';
import Header from '../../components/Header';
import MainListItem from '../../components/MainListItem';
import SettingModal2 from './settingmodal2';
import GarageView from '../../components/GarageView'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Flex, Modal, Slider } from '@ant-design/react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { colors } from '../../common/colors';
import { texts } from '../../common/texts';
import { MapView } from 'expo';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from 'underscore'

import * as actionsJob from "../../store/job/actions";
const mapping=[]
class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      isLoading: true,
      markers: [],
      value:0.2
    };
  }

  componentDidMount() {
      let data = {
        PageIndex: 0,
        PageSize: 100,
        Query: this.props.searchQuery,
        CategoryIDs: this.props.searchCategoryID,
        IsJob: this.props.job_type == 'job' ? true : false
      }
      this.props.actionsJob.SearchAppointments( data, this.props.token);
      if (this.props.searchjobs){
         mapping = _.filter(this.props.searchjobs, (u)=>{
          return u.User.Address.LATITUDE != null 
        })
      }
  }

  showModal2 = () => this.setState({ visible2: true });
  onClose2 = () => this.setState({ visible2: false });

  _renderItem = ({ item }) => (
    <MainListItem image={item.image} title={item.title} money={item.money} position={item.position} iconColor={colors.CYAN} fav={item.fav} sold={item.sold} urgnet={item.urgent}></MainListItem>
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  handleChange = value => this.setState({ changingValue: value })


  render() {

    console.log(mapping)

    return (
      <View style={{}}>
        <ScrollView>

          <Header title='Active Jobs Around' />

          <Flex style={{ padding: 22, alignItems: 'center', borderColor: '#ddd', borderWidth: 1, backgroundColor: '#fff' }}>
            <View style={styles.sliderIcon}>
              <TouchableOpacity onPress={this.showModal2}>
                <FontAwesome name="sliders" size={30} color={colors.CYAN} />
              </TouchableOpacity>
            </View>
            <View style={styles.menuIcon}>
              <Feather name="menu" size={22} color={colors.WHITE} />
            </View>
            <Text style={[styles.title, { marginLeft: 10 }]}>25 Jobs</Text>
          </Flex>

          <View style={{ height: 500 }}>
          <MapView
              style={{ width: '100%', flex: 1 }}
              region={{
                latitude: 1.285079,
                longitude: 103.85280,
                latitudeDelta: this.state.value,
                longitudeDelta: this.state.value,
              }}
          >
              {
                mapping.map((marker, index) => {
                const coords = {
                    latitude: parseFloat(marker.User.Address.LATITUDE),
                    longitude: parseFloat(marker.User.Address.LONGITUDE),
                };

              return (
                  <MapView.Marker
                      key={index}
                      coordinate={coords}
                      image={require('../../../assets/images/other/counter_blueactive.png')}
                  >
                     <MapView.Callout>
                        <GarageView {...marker} />
                      </MapView.Callout>     
                  </MapView.Marker>
              );
            })}
          </MapView>
          </View>

          <View style={{ position:'absolute', bottom:50, width:'82%', marginHorizontal:30, opacity:0.7, height:80,padding:15, backgroundColor:'#fff' }}>
            <Text>Search for jobs within radius of {this.state.changingValue}</Text>
            <Slider defaultValue={this.state.value} onChange={(value) => this.handleChange(value)} />
          </View>

        </ScrollView>

        <Modal
          transparent={false}
          visible={this.state.visible2}
          animationType="slide-up" 
          onClose={this.onClose2}>
          <SettingModal2 />
        </Modal>

      </View>
    );
  }
}

export default connect(
  state => ({
    searchjobs: state.job.searchjobs,
    category: state.job.category,
    token: state.common.token,
    alljobs:state.job.alljobs,
    job_type:state.job.job_type,
    allservices:state.job.allservices,
    searchCategoryID:state.job.searchCategoryID,
    searchQuery:state.job.searchQuery,
    searchHistory:state.job.searchHistory
  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch)
  })
)(Map);

const styles = StyleSheet.create({
  title: texts.LISTTITLE,
  separator: {
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
  sliderIcon:{
    position: 'absolute',
    right: 70,
    top: 17,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon:{
    backgroundColor: colors.CYAN,
    position: 'absolute',
    right: 20,
    top: 16,
    borderRadius: 30,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCallout:{
    flex: 1, 
    position: 'relative',
    backgroundColor:'#fff',
    elevation:3,
  },
  calloutText:{

  },
  listText1: texts.LISTTEXT,
  listText2: texts.CAPTION.SECONDARY,
});
