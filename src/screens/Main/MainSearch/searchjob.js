import React from 'react'
import Bar from '../../../components/Bar'
import Header from '../../../components/Header'

import { ScrollView,  View, TextInput, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import { texts } from '../../../common/texts'
import { Actions } from 'react-native-router-flux'
import { colors } from '../../../common/colors'
import { WhiteSpace, Flex } from '@ant-design/react-native'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { commonStyles } from '../../../common/commonStyles';
import { images } from '../../../common/images';

import * as actionsJob from "../../../store/job/actions";
import * as actionsCommon from "../../../store/common/actions";

function GetNamefromCategoryID(all, value) {
  var mapping = all.find(function(u){
      return u.ID == value;
  });

  return " " + mapping.Name + " "
}

class SearchJob extends React.Component {

  constructor() {
    super();
    this.state = {
      content: ''
    }
  }

  _renderItem = ({ item }) => (
      <TouchableOpacity onPress={() =>{
        this.props.actionsJob.setQuery(item.name)
        this.props.actionsJob.setCategoryID(item.categories)
        this.props.navigation.navigate('SearchResult')
      }}>
        <View style={styles.list}>
          <Text style={[styles.listtext, { marginTop: 10, lineHeight: 22 }]}>{item.name}</Text>
          <Text style={[styles.caption, { lineHeight: 18 }]}>Categories:
            {
              item.categories.map((item, index) => (
                <Text key={index}>{GetNamefromCategoryID(this.props.categories, item)}</Text>
              ))
            }  
          </Text>
        </View>
    </TouchableOpacity>
  )

  _ItemSeparator = () => <View style={styles.separator} />;

  render() {

    console.log('history -->', this.props.searchHistory)

    const { job_type } = this.props

    return (
      <View style={styles.container}>
        <ScrollView>

         <Header type={job_type} title="Search" leftElement={(
            <TouchableOpacity style={{ position: 'absolute', left: 5, zIndex:100, width:40, height:40, backgroundColor:'#fff', alignItems:'center', justifyContent:'center' }} onPress={()=>this.props.navigation.navigate('Home')}>
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
                this.props.actionsJob.setQuery(this.state.content)
                this.props.navigation.navigate('SearchResult')
              }} >
                <Image source={job_type == 'job' ? images.icon.cyan_search : images.icon.green_search } style={commonStyles.IMAGE.logo_round_35}/>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('AdvancedSearch')}>
            <View style={{ margin: 10, borderWidth: 1, borderColor: job_type == 'job' ? colors.CYAN : colors.GREEN, padding: 12 }}>
              <Text style={{ fontFamily: 'Muli-Bold', fontSize: 16, textAlign: 'center', color: job_type == 'job' ? colors.CYAN : colors.GREEN }}>Advanced {job_type}</Text>
            </View>
          </TouchableOpacity>

          <Bar />
          <WhiteSpace />

          <Flex style={{ padding: 10 }} justify='between'>
            <Text style={styles.headline}>History</Text>
            <TouchableOpacity onPress={()=>{this.props.actionsJob.removeCategoryID()}}>
              <Text style={[styles.listtitle, { color: job_type == 'job' ? colors.CYAN : colors.GREEN }]}>Clear</Text>
            </TouchableOpacity>
          </Flex>

          <WhiteSpace />

          <FlatList
              style={{ marginTop: 10 }}
              data={this.props.searchHistory}
              keyExtractor={(item, i) => String(i)}
              renderItem={this._renderItem}
              ItemSeparatorComponent={this._ItemSeparator}
          />

          <WhiteSpace />

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
    searchHistory: state.job.searchHistory,
    categories:state.job.categories
  }),
  dispatch => ({
    actionsJob: bindActionCreators(actionsJob, dispatch),
    actionsCommon: bindActionCreators(actionsCommon, dispatch)
  })
)(SearchJob);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff1',
  },
  listtext: texts.LISTTEXT,
  listtitle: texts.LISTTITLE,
  caption: texts.CAPTION.SECONDARY,
  headline: texts.HEADLINE,
  list: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingBottom:5,
  },
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
  separator: {
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
});