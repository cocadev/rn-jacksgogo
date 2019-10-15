import React from 'react'
import LottieScreen from '../../../components/Lottie';
import MainListItem from '../../../components/MainListItem';
import Header from '../../../components/Header';

import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Flex } from '@ant-design/react-native';
import { Entypo, MaterialCommunityIcons, FontAwesome, EvilIcons } from '@expo/vector-icons';
import { colors } from '../../../common/colors';
import { texts } from '../../../common/texts';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { images } from '../../../common/images';
import { commonStyles } from '../../../common/commonStyles';

import * as actionsJob from "../../../store/job/actions";

class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
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

    let historydata = {
      name:this.props.searchQuery,
      categories: this.props.searchCategoryID
    }
    this.props.actionsJob.setSearchHistory(historydata)
  }

  componentDidUpdate(prevProps) {

    if ( this.props.searchjobs !== prevProps.searchjobs ) {
      this.setState({ loading: false });
    }

  }

  _renderItem = ({ item }) => (
    <MainListItem
      data={item}
      image={item.Attachments.length > 0 ? item.Attachments[0].URL : images.no_image}
      title={item.Title}
      money={item.Budget}
      IsUrgent={item.IsUrgent}
      position={item.Address ? item.Address.Address : 'No Address'}
      type = {this.props.job_type}
      icon={item.Category.Image}
    ></MainListItem>);

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {

    // console.log('Can I get Query', this.props.searchQuery)
    // console.log('Can I get CategoryID', this.props.searchCategoryID)
    // console.log('!!!!!!!!!!!___________________!!!!!!!!!!!!!!!!!!!!', this.props.searchHistory)

    const { job_type } = this.props;


    return (
      <View style={commonStyles.container}>
        <ScrollView>
        <Header type={job_type} title="Search Results" leftElement={(
            <TouchableOpacity style={{ position: 'absolute', left: 5, zIndex:100, width:40, height:40, backgroundColor:'#fff', alignItems:'center', justifyContent:'center' }} onPress={()=>this.props.navigation.navigate('SearchJob')}>
              <Image
                source={job_type == 'job' ? images.icon.left_arrow_cyan : images.icon.left_arrow_green}
                style={{width:30,height:30}}
               />
            </TouchableOpacity>
          )}/>

          <Flex style={{ padding: 2, backgroundColor: '#fff' }}>
            <EvilIcons onPress={() => Actions.reset('main')} name="search" size={22} color={colors.GREY2} style={{marginLeft:12}}/>
            <Text style={[styles.smalltext, { marginLeft: 10 }]}>{this.props.searchQuery}</Text>
            <Text style={[styles.smalltext, { position: 'absolute', right: 10 }]}>{this.props.searchjobs.length} results found</Text>
          </Flex>

          <Flex style={{ padding: 14, alignItems: 'center', borderColor: '#ddd', borderWidth: 1, backgroundColor: '#fff', marginTop: 1 }}>
            <View
              style={{
                position: 'absolute',
                right: 70,
                top: 8,
                borderRadius: 30,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>

              <TouchableOpacity onPress={this.showModal2}>
                <FontAwesome name="sliders" size={22} color={job_type == 'job' ? colors.CYAN : colors.GREEN} />
              </TouchableOpacity>

            </View>
            <View
              style={{
                backgroundColor: job_type == 'job' ? colors.CYAN : colors.GREEN,
                position: 'absolute',
                right: 20,
                top: 10,
                borderRadius: 30,
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => Actions.map()}>

                <FontAwesome name="map-o" size={18} color={colors.WHITE} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.title, { color: job_type == 'job' ? colors.CYAN : colors.GREEN }]}>By Distance</Text>
            <Text style={[styles.title, { marginLeft: 10 }]}>By Date</Text>
          </Flex>

          <View style={{ marginTop: 5 }}>
            {
              this.state.loading
                ? <LottieScreen />
                : <FlatList
                  data={this.props.searchjobs}
                  keyExtractor={(item, i) => String(i)}
                  renderItem={this._renderItem}
                  ItemSeparatorComponent={this._ItemSeparator}
                />
            }

          </View>

          <Flex style={{ backgroundColor: colors.WHITE, padding: 5, marginTop: 5 }}>
            <Flex direction='column' style={{ width: 120 }}>
              <MaterialCommunityIcons
                name="delete"
                size={60}
                color={colors.ORANGE}
              />
              <Text>Deleted</Text>
            </Flex>
            <Flex direction="column" align='start'>

              <Text style={{ fontFamily: 'Muli', fontSize: 14 }}>Total deleted services : 0</Text>

            </Flex>
            <Flex style={{ position: 'absolute', right: 10 }}>
              <Entypo
                name="chevron-right"
                size={20}
                color={job_type == 'job' ? colors.CYAN : colors.GREEN}
              />
            </Flex>
          </Flex>
        </ScrollView>
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
)(SearchResult);

const styles = StyleSheet.create({
  title: texts.LISTTITLE,
  separator: {
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
  searchButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    borderRadius: 30,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
