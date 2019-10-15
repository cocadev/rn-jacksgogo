import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { texts } from '../../common/texts';
import { commonStyles } from '../../common/commonStyles';
import Header from '../../components/Header';
import { colors } from '../../common/colors';
import GoClubFeedbackListItem from '../../components/GoClubFeedbackListItem';
import { FEEDBACK3 } from '../../common/staticdata';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { images } from '../../common/images';
import Avatar from '../../components/Avatar';

export default class GoClubAllSchedules extends React.Component {

  constructor(){
      super();
      this.state={
        modalEvent: false,
        content:''
      }
  }

  _renderItem = ({ item }) => (
      <GoClubFeedbackListItem image={item.image} title={item.name} position={item.position} count={item.count} admin={item.admin} me={item.me} pending={item.pending} edit={true}/>
  );

  _ItemSeparator = () => <View style={styles.separator} />; 
  
  renderModalEvent() {
    return (
      <Modal
        visible={this.state.modalEvent}
        transparent={true}
        onRequestClose={() => {}}
      >
        <View style={commonStyles.modalView}>
          <View style={[commonStyles.modalContent, {height:250}]}>
               <View style={{justifyContent:'center', alignItems:'center', flex:2}}>
                  <Text style={[texts.HEADLINE, {marginVertical:12}]}>Delete This Day's Event?</Text>
                  <Text style={[texts.TITLE2, {textAlign:'center'}]}>30 Dec, 2017</Text>
                  <Text style={{marginHorizontal:30, textAlign:'center'}}>Let attendees know why you are deleting the event for the day.</Text>
               </View>
               <TextInput 
                    style={[commonStyles.INPUT.normal, {marginBottom:12}]}
                    underlineColorAndroid="transparent"
                    placeholder="Reason"
                    onChangeText={content => this.setState({ content })}
                    value={this.state.content}
                />
               <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <TouchableOpacity style={{height:50, flex:1, backgroundColor:colors.LIGHTPURPLE, alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({modalEvent:false})}>
                  <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({modalEvent:false})} style={{height:50, flex:1, backgroundColor:colors.RED, alignItems:'center', justifyContent:'center'}}>
                  <Text style={[texts.LISTTITLE, {color:colors.WHITE}]}>Delete</Text>
                </TouchableOpacity>
               </View>
             </View>
        </View>
      </Modal>
    );
  }

  _body(item) {
    return(
        <View style={{flexDirection:'row', backgroundColor:colors.WHITE}}>
            <Avatar image={item.image} size={30} left={40}/>
            <View>
                <Text style={texts.CAPTION.PRIMARY}>{item.title}</Text>
                <Text style={texts.CAPTION.SECONDARY}>{item.description}</Text>
            </View>
        </View>
    )
  }

  _headUp(item) {
      return(
          <View style={{flexDirection:'row', paddingVertical:3, paddingHorizontal:12, backgroundColor:colors.WHITE, justifyContent:'space-between', alignItems:'center'}}>
              <View style={{flexDirection:'row', justifyContent:'center'}}>
                 <Image source={images.icon_startwork_inactive} style={{width:26, height:26, marginLeft:10,}} />
                 <Text style={[texts.LISTTITLE, {marginTop:3, marginLeft:6}]}>{item.date}</Text>
              </View>
              <TouchableOpacity >
                <Text style={[texts.LISTTITLE, {color:colors.PURPLE}]}>Cancel</Text>
              </TouchableOpacity>
          </View>
      )
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Header title="Schedule" />
        <View style={{ backgroundColor:colors.WHITE, elevation:1, width:'100%', flexDirection:'row', paddingVertical:4}}>
            <Image source={images.icon_cat_gardening} style={{width:26, height:26, marginLeft:20}} />
            <View style={{marginLeft:6}}>
                <Text style={[texts.CAPTION.LISTTEXT]}>Neighbourhood Match</Text>
                <Text style={{color:colors.GREY3}}>Independent event</Text>
                <Text>16 Jul, 2017 10:00 AM - 12:30 PM</Text>
            </View>
        </View>

        <View style={{marginTop:10, flex:1}}>
            <Text style={[texts.TITLE2, {marginLeft:12}]}>2018</Text>
            <Text style={[texts.HEADLINE, {marginLeft:12, marginBottom:8}]}>Jan 2018</Text>

            <AccordionList
                extraData={this.state}
                list={FEEDBACK3}
                header={this._headUp}
                body={this._body}
             /> 
        </View>

        {this.renderModalEvent()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
    separator: {
        height: 5,
        backgroundColor: 'rgba(0, 0, 0, .08)',
    },
});
