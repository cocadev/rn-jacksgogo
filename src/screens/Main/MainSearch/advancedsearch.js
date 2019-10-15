import React from 'react'
import Bar from '../../../components/Bar'
import Header from '../../../components/Header'

import { ScrollView, View, TextInput, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import { texts } from '../../../common/texts'
import { Actions } from 'react-native-router-flux'
import { colors } from '../../../common/colors'
import { WhiteSpace, Flex, Checkbox, Grid } from 'antd-mobile-rn'
import { images } from '../../../common/images';
import { commonStyles } from '../../../common/commonStyles';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actionsJob from "../../../store/job/actions";
import * as actionsCommon from "../../../store/common/actions";
const width = Dimensions.get("window").width;

class AdvancedSearch extends React.Component {

  constructor() {
    super();
    this.state = {
      content: ''
    }
  }

  render() {

    const {job_type} = this.props
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~searchCategoryID~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', this.props.searchCategoryID)
    // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~searchQuery~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', this.props.searchQuery)

    return (
      <View style={styles.container}>
        <ScrollView>
          <Header type={job_type} title="Search" leftElement={(
            <TouchableOpacity style={{ position: 'absolute', left: 10, zIndex:100 }} onPress={()=>this.props.navigation.navigate('SearchJob')}>
              <Image
                source={job_type == 'job' ? images.icon.left_arrow_cyan : images.icon.left_arrow_green}
                style={{width:30,height:30}}
               />
            </TouchableOpacity>
          )}/>
        
        <View>
            <TextInput
              style={styles.input}
              underlineColorAndroid='transparent'
              placeholder={ job_type == 'job' ? "Search Jobs" : "Search Services"}
              onChangeText={content => this.setState({ content })}
              value={this.state.content}
            />

            <View style={styles.searchButton}>
              <TouchableOpacity onPress={()=>{ 
                this.props.navigation.navigate('SearchResult')
                this.props.actionsJob.setQuery(this.state.content)
                
                }}>
                <Image source={job_type == 'job' ? images.icon.cyan_search : images.icon.green_search } style={commonStyles.IMAGE.logo_round_35}/>
              </TouchableOpacity>
            </View>
          </View>

          <Bar />

          <View style={{ paddingHorizontal: 10 }}>
            <Text style={[styles.headline, { lineHeight: 47, marginTop: 1 }]}>Area</Text>

            <Flex>
              <View style={{ flex: 1 }}>
                <Checkbox>CBD</Checkbox>
              </View>
              <View style={{ flex: 1 }}>
                <Checkbox>Orchard</Checkbox>
              </View>
            </Flex>

            <WhiteSpace />

            <Flex>
              <View style={{ flex: 1 }}>
                <Checkbox>Central South</Checkbox>
              </View>
              <View style={{ flex: 1 }}>
                <Checkbox>Newton</Checkbox>
              </View>
            </Flex>

            <WhiteSpace />

            <Flex>
              <View style={{ flex: 1 }}>
                <Checkbox>Eunos</Checkbox>
              </View>
              <View style={{ flex: 1 }}>
                <Checkbox>Toa Payoh</Checkbox>
              </View>
            </Flex>

            <WhiteSpace />

            <Text style={[styles.headline, { lineHeight: 45, marginTop: 10 }]}>Categories</Text>
          
            <View style={{ marginHorizontal: 12 }}>
              <Grid
                data={this.props.categories}
                columnNum={4}
                isCarousel
                hasLine={false}
                renderItem={dataItem => (
                  
                  <TouchableOpacity onPress={() => { this.props.actionsJob.searchCategoryID(dataItem.ID) }}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        this.props.searchCategoryID.includes(dataItem.ID)
                          ? "#e1f1f8"
                          : colors.WHITE,
                      marginHorizontal: 3,
                      width: width / 5,
                      height: width / 5
                    }}
                  >
                    <Image
                      source={{ uri: dataItem.Image }}
                      style={{ width: 35, height: 35 }}
                      alt=""
                    />
                    <Text style={[ styles.smallText, { textAlign: "center", color: colors.ORANGE }]}>
                      {dataItem.Name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <WhiteSpace />

            <Text style={[styles.headline, { lineHeight: 22, marginTop: 20 }]}>Additional Tags</Text>

            <TextInput
              style={[styles.input, { marginHorizontal: 0 }]}
              underlineColorAndroid='transparent'
              placeholder="Separate tags with comma"
              onChangeText={content => this.setState({ content })}
              value={this.state.content}
            />

            <WhiteSpace />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  state => ({
    job: state.job.job,
    job_type: state.job.job_type,
    userId: state.common.userId,
    token: state.common.token,
    categories: state.job.categories,
    category: state.job.category,
    searchCategoryID:state.job.searchCategoryID,
    searchQuery:state.job.searchQuery

  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch),
    actionsCommon: bindActionCreators(actionsCommon, dispatch)
  })
)(AdvancedSearch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
  },
  caption: texts.CAPTION.SECONDARY,
  headline: texts.HEADLINE,
  searchButton: {
    position: 'absolute',
    right: 20,
    top: 18,
    backgroundColor: colors.CYAN,
    borderRadius:18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: 'Muli'
  },
  category: {
    width: 80,
    height: 80,
    backgroundColor: '#e1f1f8',
    alignItems: 'center'
  }
});